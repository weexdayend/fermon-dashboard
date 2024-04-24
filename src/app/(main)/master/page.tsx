import React from 'react'

import ComponentMaster from '@/components/pages/master'

type Props = {}

function Master({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <ComponentMaster />
    </div>
  )
}

export default Master