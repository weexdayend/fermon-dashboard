'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  Check,
  CirclePlusIcon,
  DatabaseIcon,
  MoreHorizontal,
  X,
} from "lucide-react"

type Props = {}

function CardInfo({}: Props) {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.greatjbb.com/total')

      setData(response.data);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full flex flex-col gap-4 pt-6'>
      <div className='w-full col-span-3 flex flex-row items-center gap-4'>
        <h1 className='text-6xl font-bold pb-2 mb-4'>Overview</h1>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {
          data && data.filter((x: any) => x.keterangan !== 'User').map((item: any, index: number) => (
            <Card key={index} className='border shadow-none last:col-span-2'>
              <CardContent className='flex flex-col p-6'>
                <h1 className='text-4xl font-bold'>{item.total}</h1>
                <h1 className='text-base opacity-70'>{item.keterangan}</h1>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default CardInfo