import React from 'react'

import Index from '@/components/pages/user'

type Props = {}

function User({}: Props) {
  return (
    <div className='w-full h-full flex flex-col'>
      <Index />
    </div>
  )
}

export default User