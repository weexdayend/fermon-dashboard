import React from 'react'

type Props = {}

function CardHeader({}: Props) {
  return (
    <div className='w-full flex flex-col p-6 border rounded-lg gap-2'>
      <h1 className='text-sm opacity-80'>Select first to show the data :</h1>
      <div className='w-full flex flex-row gap-2'>
        <div className='w-fit h-full px-4 py-2 rounded-lg border-indigo-700 bg-indigo-500 text-white cursor-pointer hover:bg-indigo-500/90'>
          <h1>Overview</h1>
        </div>

        <div className='w-fit h-full px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-100/50'>
          <h1>Jabar 1</h1>
        </div>

        <div className='w-fit h-full px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-100/50'>
          <h1>Jabar 2</h1>
        </div>

        <div className='w-fit h-full px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-100/50'>
          <h1>Jabar 3</h1>
        </div>

        <div className='w-fit h-full px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-100/50'>
          <h1>Banten</h1>
        </div>
      </div>
    </div>
  )
}

export default CardHeader