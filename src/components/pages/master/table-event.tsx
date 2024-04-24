"use client"

import * as React from "react"

type Props = {
  data: any[]
}

function TableEvent({ data }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 p-6 border rounded-xl">
      {
        data.length > 0 ? (
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col text-center">
              <p className="text-xs opacity-70">Total Row</p>
              <p className="text-lg font-bold">{data[data.length - 1].total_row}</p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs opacity-70">Total Batch</p>
              <p className="text-lg font-bold">{data[data.length - 1].total_batch}</p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs opacity-70">Current Batch</p>
              <p className="text-lg font-bold">{data[data.length - 1].current_batch}<span className='text-xs opacity-70 font-regular'> / {data[data.length - 1].total_batch}</span></p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs opacity-70">Estimated Time</p>
              <p className="text-lg"><span className='font-bold'>{data[data.length - 1].estimated}</span> min.</p>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center">
            <h1 className="text-base">There is no event data yet.</h1>
          </div>
        )
      }
    </div>
  )
}

export default TableEvent