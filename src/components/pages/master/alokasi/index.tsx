'use client'

import React, { useEffect, useState } from 'react'
import ListAlokasi from './list-alokasi'

import { socket } from '@/socket'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: string;
}

function Alokasi({ eventSocket, eventMessage, role }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListAlokasi
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Alokasi