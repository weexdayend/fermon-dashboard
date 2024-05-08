import React from 'react'
import ListProvinsi from './list-provinsi'

type Props = {}

function Provinsi({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <ListProvinsi />
    </div>
  )
}

export default Provinsi