import React from 'react'

import ListWilayah from './list-wilayah'

type Props = {}

function Index({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListWilayah />
    </div>
  )
}

export default Index