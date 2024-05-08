'use client'

import React, { useState } from 'react'

import Produk from './produk'
import Alokasi from './alokasi'
import Harga from './harga'

import Provinsi from './provinsi'
import Kabupaten from './kabupaten'
import Kecamatan from './kecamatan'
import Gudang from './gudang'
import Distributor from './distributor'
import Kios from './kios'

import Mapping from './mapping'
import Report from './report'
import Petugas from './petugas'

import MenuBar from './menu-bar'

import {
  ArrowLeftIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {}

function Index({}: Props) {
  const [showing, setShowing] = useState<any>('')

  const handleShowing = (value: any) => {
    setShowing(value)
  }

  const componentMapping: { [key: string]: React.ReactNode } = {
    Produk: <Produk />,
    Alokasi: <Alokasi />,
    Harga: <Harga />,
    Provinsi: <Provinsi />,
    Kabupaten: <Kabupaten />,
    Kecamatan: <Kecamatan />,
    Gudang: <Gudang />,
    Distributor: <Distributor />,
    Kios: <Kios />,
    Mapping: <Mapping />,
    Report: <Report />,
    Petugas: <Petugas />,
  };

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      {
        showing ? (
          <Button 
            variant={'outline'} 
            size={'icon'}
            onClick={() => setShowing('')}
          >
            <ArrowLeftIcon size={24} />
          </Button>
        ) : (
          <MenuBar handle={handleShowing} />
        )
      }
      
      {showing && componentMapping[showing]}
    </div>
  )
}

export default Index