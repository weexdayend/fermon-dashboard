'use client'

import React from 'react'
import ListGudang from './list-gudang'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: any;
}

function Gudang({ eventSocket, eventMessage, role }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListGudang
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Gudang