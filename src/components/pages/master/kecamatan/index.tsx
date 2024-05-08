import React from 'react'
import ListKecamatan from './list-kecamatan'

type Props = {}

function Kecamatan({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListKecamatan />
    </div>
  )
}

export default Kecamatan