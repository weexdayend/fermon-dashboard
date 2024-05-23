'use client'

import React from 'react'
import ListProduk from './list-produk'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: any;
}

function Produk({ eventSocket, eventMessage, role }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListProduk
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Produk