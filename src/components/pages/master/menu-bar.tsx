'use client'

import React from 'react'

import {
  BoxIcon, // Produk
  BaggageClaimIcon, // Alokasi
  BanknoteIcon, // Harga
  SatelliteIcon, // Provinsi
  SatelliteDishIcon, // Kabupaten
  Grid2X2Icon, // Kecamatan
  WarehouseIcon, // Gudang
  ForkliftIcon, // Distributor
  StoreIcon, // Kios
  LandPlotIcon, // Mapping Area
  FileBoxIcon, // Report
  UsersRoundIcon, // Petugas
} from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
  handle: (value: any) => void
}

type MenuItem = {
  icon: JSX.Element;
  label: string;
  value: string;
  tag: string
}

const menu: MenuItem[] = [
  { icon: <BoxIcon size={24} />, label: 'Produk', value: 'Produk', tag: 'Master Produk' },
  { icon: <BaggageClaimIcon size={24} />, label: 'Alokasi', value: 'Alokasi', tag: 'Master Produk' },
  { icon: <BanknoteIcon size={24} />, label: 'Harga', value: 'Harga', tag: 'Master Produk' },

  { icon: <SatelliteIcon size={24} />, label: 'Provinsi', value: 'Provinsi', tag: 'Master Area' },
  { icon: <SatelliteDishIcon size={24} />, label: 'Kabupaten', value: 'Kabupaten', tag: 'Master Area' },
  { icon: <Grid2X2Icon size={24} />, label: 'Kecamatan', value: 'Kecamatan', tag: 'Master Area' },

  { icon: <WarehouseIcon size={24} />, label: 'Gudang', value: 'Gudang', tag: 'Master Mitra' },
  { icon: <ForkliftIcon size={24} />, label: 'Distributor', value: 'Distributor', tag: 'Master Mitra' },
  { icon: <StoreIcon size={24} />, label: 'Kios', value: 'Kios', tag: 'Master Mitra' },

  { icon: <LandPlotIcon size={24} />, label: 'Mapping', value: 'Mapping', tag: 'Master Mapping' },
  { icon: <FileBoxIcon size={24} />, label: 'F5 & F6', value: 'Report', tag: 'Master Mapping' },
  { icon: <UsersRoundIcon size={24} />, label: 'Petugas', value: 'Petugas', tag: 'Master Mapping' },
];

function MenuBar({ handle }: Props) {
  const uniqueTags = Array.from(new Set(menu.map(item => item.tag)));
  
  return (
    <div className="grid grid-cols-2 gap-6">
      {uniqueTags.map((tag, index) => (
        <div key={index} className="flex flex-col gap-4">
          <h1 className="text-base opacity-70">{tag}</h1>
          <div className="grid grid-cols-3 gap-2">
            {menu
              .filter(menuItem => menuItem.tag === tag)
              .map((menuItem, menuItemIndex) => (
                <Button 
                  key={menuItemIndex}
                  className='flex flex-col items-center gap-1.5 h-fit py-4' 
                  variant={'outline'} 
                  onClick={() => handle(menuItem.value)}
                >
                  {menuItem.icon} 
                  {menuItem.label}
                </Button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuBar