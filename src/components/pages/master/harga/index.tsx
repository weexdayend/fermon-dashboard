'use client'

import React from 'react'
import ListHarga from './list-harga'

type Props = {
  eventSocket: any;
  eventMessage: any;
}

function Harga({ eventSocket, eventMessage }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListHarga
        eventSocket={eventSocket}
        eventMessage={eventMessage}
      />
    </div>
  )
}

export default Harga