import React from 'react'
import CardProfile from './card-profile'

type Props = {}

function Index({}: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <CardProfile />
    </div>
  )
}

export default Index