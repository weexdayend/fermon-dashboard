import React from 'react'

import Index from '@/components/pages/master'

type Props = {}

function Master({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <Index />
    </div>
  )
}

export default Master