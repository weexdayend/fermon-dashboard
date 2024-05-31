import React from 'react'

import { dataRealisasi } from './example-types'

type Props = {}

function CardAchievement({}: Props) {
  return (
    <div className='w-full flex flex-col gap-8 pt-6'>
      <div className='w-full grid grid-cols-3 gap-4 mb-4'>
        <div className='w-full col-span-3 flex flex-row items-center gap-4'>
          <h1 className='text-6xl font-bold pb-2 mb-4'>Realisasi F5</h1>
        </div>
        {
          dataRealisasi.map((item: any, index: number) => (
            <div key={index} className='w-full flex flex-col p-4 border rounded-lg gap-4 transition-all ease-in hover:scale-110 shadow-lg shadow-gray-500/10'>
              <div className='flex flex-col'>
                <h1 className='font-bold text-lg'>{item.kategori}</h1>
                <h1 className='text-sm opacity-70'>Data yang disajikan berdasarkan tahun berjalan.</h1>
              </div>
              {
                item.penyaluran.map((list: any, listIndex: number) => (
                  <div key={listIndex} className='flex flex-col gap-2'>
                    <div className='w-full flex flex-row justify-between items-center'>
                      <h1 className='font-bold text-lg opacity-70'>{list.produk}</h1>
                      <h1 className='font-bold text-lg opacity-70'>{list.persentase} %</h1>
                    </div>
                    <div className='w-full flex flex-row justify-between p-4 border rounded-lg'>
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-bold pb-1 border-b-4 border-amber-500'>{list.alokasi}</h1>
                      </div>
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-bold pb-1 border-b-4 border-indigo-500'>{list.realisasi}</h1>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className='w-full flex flex-row items-center justify-center gap-6'>
                <div className='flex flex-row gap-1.5 items-center'>
                  <div className='h-2 w-4 rounded-full bg-amber-500' />
                  <h1 className='text-sm opacity-70'>(Alokasi)</h1>
                </div>
                <div className='flex flex-row gap-1.5 items-center'>
                  <div className='h-2 w-4 rounded-full bg-indigo-500' />
                  <h1 className='text-sm opacity-70'>(Realisasi)</h1>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <div className='w-full grid grid-cols-3 gap-4'>
        <div className='w-full col-span-3 flex flex-row items-center gap-4'>
          <h1 className='text-6xl font-bold pb-2 mb-4'>Realisasi F6</h1>
        </div>
        {
          dataRealisasi.map((item: any, index: number) => (
            <div key={index} className='w-full flex flex-col p-4 border rounded-lg gap-4 transition-all ease-in hover:scale-110 shadow-lg shadow-gray-500/10'>
              <div className='flex flex-col'>
                <h1 className='font-bold text-lg'>{item.kategori}</h1>
                <h1 className='text-sm opacity-70'>Data yang disajikan berdasarkan tahun berjalan.</h1>
              </div>
              {
                item.penyaluran.map((list: any, listIndex: number) => (
                  <div key={listIndex} className='flex flex-col gap-2'>
                    <div className='w-full flex flex-row justify-between items-center'>
                      <h1 className='font-bold text-lg opacity-70'>{list.produk}</h1>
                      <h1 className='font-bold text-lg opacity-70'>{list.persentase} %</h1>
                    </div>
                    <div className='w-full flex flex-row justify-between p-4 border rounded-lg'>
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-bold pb-1 border-b-4 border-amber-500'>{list.alokasi}</h1>
                      </div>
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-bold pb-1 border-b-4 border-indigo-500'>{list.realisasi}</h1>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className='w-full flex flex-row items-center justify-center gap-6'>
                <div className='flex flex-row gap-1.5 items-center'>
                  <div className='h-2 w-4 rounded-full bg-amber-500' />
                  <h1 className='text-sm opacity-70'>(Alokasi)</h1>
                </div>
                <div className='flex flex-row gap-1.5 items-center'>
                  <div className='h-2 w-4 rounded-full bg-indigo-500' />
                  <h1 className='text-sm opacity-70'>(Realisasi)</h1>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CardAchievement