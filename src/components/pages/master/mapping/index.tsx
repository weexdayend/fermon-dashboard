'use client'

import React from 'react'
import ListMapping from './list-mapping'

type Props = {
  eventSocket: any;
  eventMessage: any;
  role: any;
}

function Mapping({ eventSocket, eventMessage, role }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListMapping
        eventSocket={eventSocket}
        eventMessage={eventMessage}
        role={role}
      />
    </div>
  )
}

export default Mapping