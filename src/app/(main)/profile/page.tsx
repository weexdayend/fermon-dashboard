import React from 'react'
import Index from '@/components/pages/profile'

type Props = {}

function ProfileUser({}: Props) {
  return (
    <div className='w-full h-full flex flex-col'>
      <Index />
    </div>
  )
}

export default ProfileUser