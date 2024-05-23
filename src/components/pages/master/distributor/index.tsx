'use client'

import React, { useEffect, useState } from 'react'
import ListDistributor from './list-distributor'

import { socket } from '@/socket'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: any;
}

function Distributor({ eventSocket, eventMessage, role }: Props) {

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListDistributor
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Distributor