import React from 'react'

import ListApp from './list-app'
import CheckupApp from './list-check-app'

type Props = {}

function Index({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListApp />
      <CheckupApp />
    </div>
  )
}

export default Index