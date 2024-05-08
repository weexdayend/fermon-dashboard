import React from 'react'
import ListKabupaten from './list-kabupaten'

type Props = {}

function Kabupaten({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListKabupaten />
    </div>
  )
}

export default Kabupaten