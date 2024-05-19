'use client'

import React, { useEffect, useState } from 'react'

import Produk from './produk'
import Alokasi from './alokasi'
import Harga from './harga'

import Provinsi from './provinsi'
import Kabupaten from './kabupaten'
import Kecamatan from './kecamatan'
import Gudang from './gudang'
import Distributor from './distributor'
import Kios from './kios'

import Mapping from './mapping'
import Report from './report'
import Petugas from './petugas'

import MenuBar from './menu-bar'


import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import {
  ArrowLeftIcon,
  NetworkIcon
} from 'lucide-react'

import { socket } from '@/socket'

type Props = {}

function Index({}: Props) {
  const { toast } = useToast()

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  
  const [eventSocket, setEventSocket] = useState<any>([])
  const [eventMessage, setEventMessage] = useState<string>('')

  const [importStatus, setImportStatus] = useState<string | null>(null)

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
        toast({
          variant: "default",
          title: "Migration Success!",
          description: "Your csv data has been success import into database.",
        })
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("bulk progress", onEventResponse);
    socket.on("bulk completed", onEventCompleted);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.off("bulk progress", onEventResponse);
      socket.off("bulk completed", onEventCompleted);
    };
  }, []);

  useEffect(() => {
    if (importStatus === 'OK') {
      setEventSocket([])
      setEventMessage('')
      setImportStatus(null)
    }
  }, [importStatus])

  const [showing, setShowing] = useState<any>('')

  const handleShowing = (value: any) => {
    setShowing(value)
  }

  const componentMapping: { [key: string]: React.ReactNode } = {
    Produk: <Produk eventSocket={eventSocket} eventMessage={eventMessage} />,
    Alokasi: <Alokasi eventSocket={eventSocket} eventMessage={eventMessage} />,
    Harga: <Harga eventSocket={eventSocket} eventMessage={eventMessage} />,
    Provinsi: <Provinsi />,
    Kabupaten: <Kabupaten />,
    Kecamatan: <Kecamatan />,
    Gudang: <Gudang eventSocket={eventSocket} eventMessage={eventMessage} />,
    Distributor: <Distributor eventSocket={eventSocket} eventMessage={eventMessage} />,
    Kios: <Kios eventSocket={eventSocket} eventMessage={eventMessage} />,
    Mapping: <Mapping eventSocket={eventSocket} eventMessage={eventMessage} />,
    Report: <Report />,
    Petugas: <Petugas eventSocket={eventSocket} eventMessage={eventMessage} />,
  };

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      {
        showing ? (
          <div className='flex flex-row w-full items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <Button 
                variant={'ghost'} 
                size={'icon'}
                onClick={() => setShowing('')}
              >
                <ArrowLeftIcon size={24} />
              </Button>
              <h1 className='text-3xl font-bold'>{showing}</h1>
            </div>
            <div
              className='flex flex-row gap-1.5 px-4 py-2 rounded-lg border'
            >
              <NetworkIcon size={16} className={`${isConnected ? 'text-green-500' : 'text-red-500'}`} />
              <p className='text-sm opacity-80'>{isConnected ? 'Connected' : 'Disconnect'}</p>
            </div>
          </div>
        ) : (
          <MenuBar handle={handleShowing} />
        )
      }
      
      {isConnected && showing && componentMapping[showing]}
    </div>
  )
}

export default Index