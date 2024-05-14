'use client'

import React, { useEffect, useState } from 'react'

import TabContents from './tab-contents'
import TableEvent from './table-event'
import TabMigration from './tab-migration'

import { socket } from '@/socket'
import { useToast } from '@/components/ui/use-toast'

type Props = {}

interface ArrayElement {
  [key: string]: any; // Change 'any' to the appropriate type if needed
}

function Report({}: Props) {
  const { toast } = useToast()

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [tabIdentifier, setTabIdentifier] = useState<string>('')
  
  const [eventSocket, setEventSocket] = useState<any>([])
  const [eventMessage, setEventMessage] = useState<string>('')

  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [exampleData, setExampleData] = useState<any[]>([])

  const [migrationMessage, setMigrationMessage] = useState<string>('')
  const [migrationStatus, setMigrationStatus] = useState<string>('')
  const [migrationProgress, setMigrationProgress] = useState<number>(0)


function arrayToObjects(array: any[][], id: any): Array<ArrayElement> {
  let headers: string[] = [];
  if (id === 'f5' ) {
    headers.push(
      "kode_produsen", 
      "nama_produsen", 
      "no_f5", 
      "kode_distributor", 
      "nama_distributor", 
      "kode_provinsi", 
      "nama_provinsi", 
      "kode_kab_kota", 
      "nama_kab_kota", 
      "bulan", 
      "tahun",
      "kode_produk", 
      "nama_produk", 
      "stok_awal", 
      "penebusan", 
      "penyaluran", 
      "stok_akhir", 
      "status_f5",
      "keterangan"
    )
  } else {
    headers.push(
      "kode_produsen",
      "nama_produsen",
      "no_f6",
      "kode_distributor",
      "nama_distributor",
      "kode_provinsi",
      "nama_provinsi",
      "kode_kab_kota",
      "nama_kab_kota",
      "kode_kecamatan",
      "nama_kecamatan",
      "bulan",
      "tahun",
      "kode_pengecer",
      "nama_pengecer",
      "kode_produk",
      "nama_produk",
      "stok_awal",
      "penebusan",
      "penyaluran",
      "stok_akhir",
      "status_f6",
      "keterangan",
    )
  }
  return array.map((innerArray) => {
    const obj: ArrayElement = {};
    headers.forEach((header, index) => {
      obj[header] = innerArray[index];
    });
    return obj;
  });
}

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    function onEventResponse(value: any) {
      setEventMessage('Importing data is in progress...');
      setEventSocket((prevEvents: any) => [...prevEvents, value]);
    }

    function onEventCompleted(value: any) {
      if (value) {
        setEventMessage(value.message);
        setImportStatus('OK')
      }
    }

    function onExampleData(value: any) {
      const arrayOfObjects = arrayToObjects(value.data, value.id);
      setExampleData(arrayOfObjects)
    }

    function onMigrationProcess(value: any) {
      setMigrationStatus(value.status)
      setMigrationMessage(value.message)
      setMigrationProgress(value.progress)

      if (value.status == 'completed') {
        clear()
        toast({
          variant: "default",
          title: "Migration Success!",
          description: "Your csv data has been success import into database.",
        })
      }

      if (value.status == 'canceled') {
        clear()
        toast({
          variant: "destructive",
          title: "Migration Canceled!",
          description: "You has been canceled the process migration.",
        })
      }

      if (value.status == 'error') {
        clear()
        toast({
          variant: "destructive",
          title: "Migration Error!",
          description: `Migration process has been error, ${value.message}`,
        })
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("import progress", onEventResponse);
    socket.on("import completed", onEventCompleted);
    
    socket.on("example data", onExampleData);

    socket.on("migration progress", onMigrationProcess);


    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.off("import progress", onEventResponse);
      socket.off("import completed", onEventCompleted);

      socket.off("example data", onExampleData);

      socket.off("migration progress", onMigrationProcess);
    };
  }, []);

  const handleTabIdentifier = (identifier: any) => {
    setTabIdentifier(identifier)
  }

  const clear = () => {
    setTabIdentifier('')
    setEventSocket([])
    setEventMessage('')
    setImportStatus(null)
    setExampleData([])
    setMigrationMessage('')
    setMigrationStatus('')
  }

  return (
    <div className='grid grid-cols-1 w-full gap-4'>
      <TabContents
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        handleTabIdentifier={handleTabIdentifier}
      />
      <TableEvent data={eventSocket} />
      {
        importStatus === 'OK' && exampleData.length > 0 && (
          <TabMigration 
            tabIdentifier={tabIdentifier} 
            exampleData={exampleData}
            migrationMessage={migrationMessage}
            migrationStatus={migrationStatus}
            migrationProgress={migrationProgress}
          />
        )
      }
    </div>
  )
}

export default Report