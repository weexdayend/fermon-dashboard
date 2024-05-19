'use client'

import React from 'react'
import ListProduk from './list-produk'

type Props = {
  eventSocket: any;
  eventMessage: any;
}

function Produk({ eventSocket, eventMessage }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListProduk
        eventSocket={eventSocket}
        eventMessage={eventMessage}
      />
    </div>
  )
}

export default Produk