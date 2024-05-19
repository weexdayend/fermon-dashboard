'use client'

import React from 'react'
import ListMapping from './list-mapping'

type Props = {
  eventSocket: any;
  eventMessage: any;
}

function Mapping({ eventSocket, eventMessage }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListMapping
        eventSocket={eventSocket}
        eventMessage={eventMessage}
      />
    </div>
  )
}

export default Mapping