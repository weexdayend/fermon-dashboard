'use client'

import React, { useState } from 'react'

import TabContents from './tab-contents'
import TableEvent from './table-event'

type Props = {}

function ComponentMaster({}: Props) {
  const [dataEvent, setDataEvent] = useState<any[]>([])

  const handleDataEvent = (value: any) => {
    setDataEvent(value)
  }

  return (
    <div className='grid grid-cols-1 w-full gap-4'>
      <TabContents handle={handleDataEvent} />
      <TableEvent data={dataEvent} />
    </div>
  )
}

export default ComponentMaster