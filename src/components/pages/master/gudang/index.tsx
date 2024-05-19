'use client'

import React from 'react'
import ListGudang from './list-gudang'

type Props = {
  eventSocket: any;
  eventMessage: any;
}

function Gudang({ eventSocket, eventMessage }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListGudang
        eventSocket={eventSocket}
        eventMessage={eventMessage}
      />
    </div>
  )
}

export default Gudang