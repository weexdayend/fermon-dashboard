'use client'

import React, { useEffect, useState } from 'react'
import ListDistributor from './list-distributor'

import { socket } from '@/socket'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  eventSocket: any;
  eventMessage: any;
}

function Distributor({ eventSocket, eventMessage }: Props) {

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListDistributor
        eventSocket={eventSocket}
        eventMessage={eventMessage}
      />
    </div>
  )
}

export default Distributor