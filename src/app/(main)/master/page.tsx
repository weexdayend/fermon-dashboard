import React from 'react'

import { DataTables } from '@/components/shared/table'
import TabContents from '@/components/pages/master/tab-contents'
import Event from './event'

type Props = {}

function Master({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className='grid grid-cols-2 w-full gap-4'>
        <Event />
        <TabContents />
        <DataTables />
      </div>
    </div>
  )
}

export default Master