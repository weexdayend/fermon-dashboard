'use client'

import axios, { AxiosRequestConfig } from 'axios'
import React, { useEffect, useState, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import {
  HardDriveDownloadIcon,
  ArrowBigRightDashIcon,
  LucideTrash2,
  FileCheck2Icon,
} from "lucide-react"

import * as XLSX from 'xlsx';
import TableEvent from '../../pages/master/report/table-event'

type Props = {
  data: []
  exampleData: []
  eventSocket: []
  eventMessage: string
}

function BulkImport({ data, exampleData, eventSocket, eventMessage }: Props) {

  const inputRef = useRef<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabIdentifier = 'Petugas'

  const exportToExcel = (value: string) => {
    const exampleKeys = ['id', 'kode_petugas', 'nama_petugas', 'contact', 'contact_wa', 'jabatan', 'status_petugas'];

    let exampleDataFiltered
    let formatType
    if (value === 'update') {
      exampleDataFiltered = data.map(obj => {
        return exampleKeys.reduce((acc: any, key: any) => {
            acc[key] = obj[key];
            return acc;
        }, {});
      });

      formatType = 'update'
    } else {
      exampleDataFiltered = exampleData
      formatType = 'baru'
    }

    const exampleSheet = XLSX.utils.json_to_sheet(exampleDataFiltered);

    const workbook = XLSX.utils.book_new();
    const standarSheet = XLSX.utils.aoa_to_sheet([]);

    XLSX.utils.sheet_add_aoa(standarSheet, [
      ['COLUMN', 'KETERANGAN'],
      ['kode_petugas', 'kode petugas'],
      ['nama_petugas', 'nama lengkap petugas'],
      ['contact', 'contact petugas'],
      ['contact_wa', 'contact wa petugas'],
      ['jabatan', 'jabatan petugas'],
  ]);

    XLSX.utils.book_append_sheet(workbook, exampleSheet, 'Standar Format');
    XLSX.utils.book_append_sheet(workbook, standarSheet, 'Guide');

    XLSX.writeFile(workbook, `standar-data-${formatType}-petugas.xlsx`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const importBulkData = async () => {
    setUploaded(true)
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    let startAt = Date.now();
    const formData = new FormData();
    formData.append('file', file);

    if (tabIdentifier) {
      formData.append('tabIdentifier', tabIdentifier);
    }

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;

        const percentage = (loaded * 100) / total;
        setProgress(+percentage.toFixed(2));

        const timeElapsed = Date.now() - startAt;
        const uploadSpeed = loaded / timeElapsed;
        const duration = (total - loaded) / uploadSpeed;
        setRemaining(duration);

        if (percentage === 100) {
          setUploaded(false);
        }
      },
    };

    try {
      await axios.post(`https://api.synchronice.id/bulk`, formData, options)
        .then(({ data }) => {
          setFile(null)
        })
      setUploaded(false)
    } catch (e: any) {
      const error =
        e.response && e.response.data
          ? e.response.data.error
          : "Sorry! something went wrong.";
      alert(error);
    }
  }

  function removeFile() {
    setFile(null);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='py-4'>
        <h1 className='text-3xl font-bold'>How to?!</h1>
        <h1 className='text-sm font-normal opacity-80'>Cara import data secara bulk.</h1>
      </div>
      
      <div className='w-full h-fit grid grid-cols-3 gap-4'>
        <div className='w-full flex flex-col p-4 border-2 rounded-lg gap-6'>
          <div className='flex rounded-full border-2 w-12 h-12 items-center justify-center'>
            <h1 className='text-xl font-bold opacity-80'>1</h1>
          </div>
          <div className='flex flex-col justify-between gap-8'>
            <h1 className='font-bold text-base'>Download formatted excel.</h1>
            <p className='text-sm opacity-70'>Untuk langkah pertama silahkan untuk unduh format excel yang sudah kita siapkan.</p>
            <div className='flex flex-row items-center gap-2'>
              <Button 
                variant="outline"
                className='w-full flex flex-row items-center gap-1.5'
                onClick={() => exportToExcel('update')}
              >
                Format Update
              </Button>
              <Button 
                variant="outline"
                className='w-full flex flex-row items-center gap-1.5'
                onClick={() => exportToExcel('insert')}
              >
                Format Insert
              </Button>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col p-4 border-2 rounded-lg gap-6'>
          <div className='flex rounded-full border-2 w-12 h-12 items-center justify-center'>
            <h1 className='text-xl font-bold opacity-80'>2</h1>
          </div>
          <div className='flex flex-col justify-between gap-8'>
            <h1 className='font-bold text-base'>Prepare your data.</h1>
            <p className='text-sm opacity-70'>Lengkapi data yang ingin anda masukkan ke dalam database, lalu export menjadi file ber-ekstensi CSV.</p>
            <div className='flex flex-row items-center gap-2'>
              <Button 
                variant="outline"
                className='w-full flex flex-row items-center gap-1.5'
                disabled
              >
                <ArrowBigRightDashIcon size={16} />
                Convert to CSV
              </Button>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col p-4 border-2 rounded-lg gap-6'>
          <div className='flex rounded-full border-2 w-12 h-12 items-center justify-center'>
            <h1 className='text-xl font-bold opacity-80'>3</h1>
          </div>
          <div className='flex flex-col justify-between gap-8'>
            <h1 className='font-bold text-base'>Upload your data.</h1>
            <p className='text-sm opacity-70'>Selanjutnya, jika anda sudah yakin dengan data yang anda isikan, silahkan untuk melakukan import data.</p>
            {
              !eventMessage ? (
                <div className='flex flex-col items-center gap-2'>  
                  <input
                    placeholder="fileInput"
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    id="file"
                    accept=".csv"
                    onChange={(e) => handleFileChange(e)}
                    multiple={false}
                  />
                  {file ? (
                    <Button 
                      className='w-full flex flex-row items-center gap-1.5'
                      onClick={importBulkData}
                    >
                      <HardDriveDownloadIcon size={16} />
                      Import Data
                    </Button>
                    ) : (
                      <Button
                        variant={'outline'}
                        onClick={openFileExplorer}
                        className='w-full'
                      >
                        Select your csv
                      </Button>
                    )
                  }
                </div>
              ) : (
                <h1 className='text-sm opacity-70'>{eventMessage}</h1>
              )
            }
          </div>
        </div>
      </div>
      <div>
      {file && (
        <div className="w-full flex flex-row items-center justify-between gap-4 p-6 rounded-lg bg-blue-100/50">
          <div className='flex flex-row gap-4 items-center'>
            <FileCheck2Icon className='w-6 h-6 opacity-70' />
            <div className='flex flex-col text-left'>
              <p className='text-sm opacity-80'>File Name: <span className='font-bold'>{file.name}</span></p>
              <p className='text-sm opacity-80'>File Size: <span className='font-bold'>{(file.size / (1024 * 1024)).toFixed(2)} MB</span></p>
            </div>
          </div>
          <LucideTrash2
            className="w-6 h-6 text-red-500 cursor-pointer"
            onClick={() => removeFile()}
          />
        </div>
      )}
      <TableEvent data={eventSocket} />
      </div>
    </div>
  )
}

export default BulkImport