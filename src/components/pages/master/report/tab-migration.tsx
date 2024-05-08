'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  tabIdentifier: any
  exampleData: any
  migrationMessage: any
  migrationStatus: any
}

// const headers: string[] = [
//   "kode_produsen", "nama_produsen", "no_f5", "kode_distributor", "nama_distributor", "kode_provinsi", "nama_provinsi", "kode_kab_kota", "nama_kab_kota", "bulan", "tahun", "status_f5", "kode_produk", "nama_produk", "stok_awal", "penebusan", "penyaluran", "stok_akhir", "keterangan"
// ];

function TabMigration({ tabIdentifier, exampleData, migrationMessage, migrationStatus }: Props) {
  const [headers, setHeaders] = useState<string[]>([])

  useEffect(() => {
    if (tabIdentifier === 'f5') {
      setHeaders([
        "kode_produsen", 
        "nama_produsen", 
        "no_f5", 
        "kode_distributor", 
        "nama_distributor", 
        "kode_provinsi", 
        "nama_provinsi", 
        "kode_kab_kota", 
        "nama_kab_kota", 
        "bulan", 
        "tahun", 
        "kode_produk", 
        "nama_produk", 
        "stok_awal", 
        "penebusan", 
        "penyaluran", 
        "stok_akhir", 
        "status_f5",
        "keterangan"
      ])
    } else {
      setHeaders([
        "kode_produsen",
        "nama_produsen",
        "no_f6",
        "kode_distributor",
        "nama_distributor",
        "kode_provinsi",
        "nama_provinsi",
        "kode_kab_kota",
        "nama_kab_kota",
        "kode_kecamatan",
        "nama_kecamatan",
        "bulan",
        "tahun",
        "kode_pengecer",
        "nama_pengecer",
        "kode_produk",
        "nama_produk",
        "stok_awal",
        "penebusan",
        "penyaluran",
        "stok_akhir",
        "status_f6",
        "keterangan",
      ])
    }
  }, [tabIdentifier])

  const handleMigrate = async (grant_access: any) => {
    try {
      const response = await axios.post('https://api.greatjbb.com/migrate', { tabIdentifier, grant_access });

      if (response.status === 200) {
        console.log('Response:', response.data);
      }
    } catch (error) {
      console.error('Error during migration:', error);
    }
  };

  return (
    <div className="w-full h-fit">
      {
        migrationMessage !== '' && migrationStatus !== null ? (
          <Card className='border shadow-none'>
            <CardContent className="space-y-2 px-6 py-6 flex flex-col items-center justify-center">
              <h1>{migrationMessage}</h1>
            </CardContent>
          </Card>
        ) : (
          <Card className='border shadow-none'>
            <CardContent className="space-y-2 px-6 py-6">
              <h1>Here is the example data:</h1>
              <Table className='table-auto'>
                <TableHeader className='bg-gray-50'>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableHead key={index} className='p-4'>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exampleData.map((item: any, index: number) => (
                    <TableRow key={index}>
                      {headers.map((header, idx) => (
                        <TableCell key={idx} className='p-4'>{item[header]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <p>Please check the data first, then if you sure the data is correct, click <span className="font-bold underline">Migrate Button</span> below!</p>
            </CardContent>
            <CardFooter>
              <div className='ml-auto flex flex-row gap-2'>
                <Button variant={'destructive'} onClick={() => handleMigrate(false)}>Cancel</Button>
                <Button onClick={() => handleMigrate(true)}>Migrate</Button>
              </div>
            </CardFooter>
          </Card>
        )
      }
    </div>
  )
}

export default TabMigration