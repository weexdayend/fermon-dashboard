import React from 'react'

import { dataPerformance } from './example-types'

type Props = {}

function CardPerformance({}: Props) {
  return (
    <div className='w-full flex flex-col gap-4 pt-6'>
      <div className='w-full flex flex-row items-center gap-4'>
        <h1 className='text-6xl font-bold pb-2 mb-4'>Leaderboard</h1>
      </div>
      <div className='w-full grid grid-cols-3 gap-4'>
        {
          dataPerformance.map((item: any, index: number) => (
            <div key={index} className={`first:bg-blue-500 first:text-white last:bg-rose-500 last:text-white bg-white w-full flex flex-col items-center justify-center p-6 py-6 pt-12 border rounded-lg gap-4 transition-all ease-in hover:scale-110 shadow-lg shadow-gray-500/10`}>
              <div className='flex flex-col text-center py-5 gap-1'>
                <h1 className='font-bold text-lg'>{item.kotakabupaten}</h1>
                <h1 className='text-sm opacity-70'>Rank {item.rank}</h1>
              </div>

              <div className='w-full flex flex-col gap-4 p-4 rounded-lg bg-white text-gray-800'>
                {
                  item.penyaluran.map((list: any, listIndex: number) => (
                    <div key={listIndex} className='flex flex-col gap-2'>
                      <div className='w-full flex flex-row justify-between items-center'>
                        <h1 className='font-bold text-lg opacity-70'>{list.produk}</h1>
                        <h1 className='font-bold text-lg opacity-70'>{list.persentase} %</h1>
                      </div>
                      <div className='w-full flex flex-row justify-between p-4 border rounded-lg'>
                        <div className='flex flex-col'>
                          <h1 className='text-sm font-bold pb-1 border-b-4 border-amber-500'>{list.alokasi}</h1>
                        </div>
                        <div className='flex flex-col'>
                          <h1 className='text-sm font-bold pb-1 border-b-4 border-indigo-500'>{list.realisasi}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CardPerformance