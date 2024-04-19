import { NextResponse } from 'next/server'
import { z } from 'zod'
import { EventNotifier, getSSEWriter } from 'ts-sse'
import { sakaSchema } from './types'
import { watch } from 'fs/promises';
import path, { join } from 'path';
import { spawn } from 'child_process';
import * as dateFn from "date-fns";

export const dynamic = 'force-dynamic';

type SyncEvents = EventNotifier<{
  update: {
    data: z.infer<typeof sakaSchema>,
    event: 'update'
  }
  complete: {
    data: z.infer<typeof sakaSchema>
    event: 'update'
  }
  close: {
    data: z.infer<typeof sakaSchema>
  }
  error: {
    data: z.infer<typeof sakaSchema>
  }
}>;

const watchDirectory = async (dirPath: string, notifier: SyncEvents) => {
  try {
    const watcher = watch(dirPath);

    for await (const event of watcher) {
      if (event.eventType == 'rename' && event.filename) {
        const filePath = join(dirPath, event.filename);
        
        if (filePath.endsWith('.csv')) {
          executePythonScript(filePath, notifier);
        }
      }
    }
  } catch (error) {
    console.error('Error watching directory:', error);
  }
};

const executePythonScript = (filePath: string, notifier: SyncEvents) => {
  const pythonProcess = spawn('python', [path.join('./python/import-data.py'), filePath]);

  pythonProcess.stdout.on('data', (data) => {
    const response = data.toString();
    console.log(`stdout: ${response}`);
    notifier.update({ data: response, event: 'update' });
  });

  pythonProcess.stderr.on('data', (data) => {
    const error = data.toString();
    console.error(`stderr: ${error}`);
    notifier.error({ data: error });
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      notifier.complete({ data: 'Python script executed successfully.', event: 'update' });
    } else {
      notifier.error({ data: 'Error executing Python script.' });
    }
  });
};

export async function GET() {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-y")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  const syncStatusStream = async (notifier: SyncEvents) => {
    // Start watching the uploads directory
    await watchDirectory(uploadDir, notifier);

    notifier.complete({ data: 'Watching directory for new Python scripts.', event: 'update' });
  };

  syncStatusStream(getSSEWriter(writer, encoder));

  return new NextResponse(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
