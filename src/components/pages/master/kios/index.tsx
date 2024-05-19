'use client'

import React from 'react'
import ListKios from './list-kios'

type Props = {
  eventSocket: any;
  eventMessage: any;
}

function Kios({ eventSocket, eventMessage }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListKios
        eventSocket={eventSocket}
        eventMessage={eventMessage}
      />
    </div>
  )
}

export default Kios