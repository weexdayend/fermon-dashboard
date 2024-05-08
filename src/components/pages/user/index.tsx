import React from 'react'

import ListUser from './list-user'

type Props = {}

function Index({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListUser />
    </div>
  )
}

export default Index