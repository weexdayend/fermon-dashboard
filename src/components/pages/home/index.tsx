import React from 'react'
import CardInfo from './card-info'

type Props = {}

function index({}: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <CardInfo />
    </div>
  )
}

export default index