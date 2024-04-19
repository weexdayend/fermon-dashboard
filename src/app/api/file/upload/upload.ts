import { NextRequest, NextResponse } from "next/server";
import { stat, mkdir, writeFile } from "fs/promises";
import { spawn } from 'child_process';
import * as dateFn from "date-fns";
import mime from "mime";
import path, { join } from 'path';

export async function handleUpload(formData: FormData): Promise<{ uploadDir: string, filename: string }> {
  const file = formData.get("file") as Blob | null;
  if (!file) {
    throw new Error("File blob is required.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-y")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while trying to create directory when uploading a file\n", e);
      throw new Error("Something went wrong.");
    }
  }

  const timestamp = Date.now();
  const uniqueSuffix = `${timestamp}-${Math.round(Math.random() * 1e9)}`;

  const extension = mime.getExtension(file.type);
  if (!extension) {
    throw new Error("Invalid file type");
  }

  const filename = `${uniqueSuffix}.${extension}`;
  await writeFile(`${uploadDir}/${filename}`, buffer);

  const pythonProcess = spawn('python', [path.join('./python/import-data.py'), `${uploadDir}/${filename}`]);

  return { uploadDir, filename };
}
