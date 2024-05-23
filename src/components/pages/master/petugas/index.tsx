'use client'

import React from 'react'
import ListPetugas from './list-petugas'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: any;
}

function Petugas({ eventSocket, eventMessage, role }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListPetugas
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Petugas