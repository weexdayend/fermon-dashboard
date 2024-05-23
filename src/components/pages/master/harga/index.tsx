'use client'

import React from 'react'
import ListHarga from './list-harga'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: any;
}

function Harga({ eventSocket, eventMessage, role }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListHarga
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Harga