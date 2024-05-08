'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { z } from "zod";

import { Spinner } from '@/components/ui/spinner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type Props = {
  dataPetugas: any
}

function FormPetugas({ dataPetugas }: Props) {
  const [kodePetugas, setKodePetugas] = useState('')
  const [namaPetugas, setNamaPetugas] = useState('')
  const [contact, setContact] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [departemen, setDepartemen] = useState('')
  const [wilker, setWilker] = useState([])
  const [statusKepegawaian, setStatusKepegawaian] = useState('')
  const [statusPetugas, setStatusPetugas] = useState(true)
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    if (dataPetugas) {
      setKodePetugas(dataPetugas.kode_petugas || '')
      setNamaPetugas(dataPetugas.nama_petugas || '')
      setDepartemen(dataPetugas.departemen || '')
      setContact(dataPetugas.contact || '')
      setWhatsapp(dataPetugas.contact_wa || '')
      setStatusKepegawaian(dataPetugas.status_kepagawaian || '')
      setJabatan(dataPetugas.jabatan || '')
      setPhoto(dataPetugas.foto || '')
      setStatusPetugas(dataPetugas.status_petugas || false)
    }
  }, [dataPetugas])

  const handleSubmit = async () => {    
    const payload = { 
      kode_petugas: kodePetugas, 
      nama_petugas: namaPetugas, 
      contact: contact, 
      contact_wa: whatsapp, 
      jabatan: jabatan, 
      wilker: wilker,
      status_kepagawaian: statusKepegawaian
   };

    try {
      dataPetugas
        ? await axios.put(`https://api.greatjbb.com/user`, payload)
        : await axios.post('https://api.greatjbb.com/register', payload);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-4">
        <h1>Informasi Pribadi</h1>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="name" className="text-left">
            Kode
          </Label>
          <Input 
            type='number' 
            value={kodePetugas} 
            onChange={(e) => setKodePetugas(e.target.value)} 
            className="col-span-3" 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="endpoint" className="text-left">
            Nama
          </Label>
          <Input 
            type='text' 
            value={namaPetugas} 
            onChange={(e) => setNamaPetugas(e.target.value)} 
            className="col-span-3" 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="endpoint" className="text-left">
            No Tlp.
          </Label>
          <Input 
            type='text' 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
            className="col-span-3" 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="endpoint" className="text-left">
            Whatsapp
          </Label>
          <Input 
            type='text' 
            value={whatsapp} 
            onChange={(e) => setWhatsapp(e.target.value)} 
            className="col-span-3" 
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Informasi Penugasan</h1>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="endpoint" className="text-left">
            Departemen
          </Label>
          <Input 
            type='text' 
            value={departemen} 
            onChange={(e) => setDepartemen(e.target.value)} 
            className="col-span-3" 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="endpoint" className="text-left">
            Jabatan
          </Label>
          <Input 
            type='text' 
            value={jabatan} 
            onChange={(e) => setJabatan(e.target.value)} 
            className="col-span-3" 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="endpoint" className="text-left">
            Kepegawaian
          </Label>
          <Input 
            type='text' 
            value={statusKepegawaian} 
            onChange={(e) => setStatusKepegawaian(e.target.value)} 
            className="col-span-3" 
          />
        </div>
      </div>
    </div>
  )
}

export default FormPetugas