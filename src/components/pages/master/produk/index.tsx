'use client'

import React, { useEffect, useState } from 'react'
import ListProduk from './list-produk'

import { socket } from '@/socket'
import { useToast } from '@/components/ui/use-toast'

type Props = {}

function Produk({}: Props) {
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

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      {
        isConnected && (
          <ListProduk
            eventSocket={eventSocket}
            eventMessage={eventMessage}
          />
        )
      }
    </div>
  )
}

export default Produk