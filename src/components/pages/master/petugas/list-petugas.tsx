'use client'

import axios, { AxiosRequestConfig } from 'axios'
import React, { useState, useRef, useEffect, Fragment } from 'react'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'

import { cn } from '@/libs/utils'

import { Spinner } from '@/components/ui/spinner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from '@/components/ui/badge'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  HardDriveDownloadIcon,
  ArrowBigRightDashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LucideTrash2,
  FileCheck2Icon,
  Trash2Icon,
  XCircleIcon,
  PenSquareIcon,
  CheckCircle,
  CheckIcon
} from "lucide-react"

import * as XLSX from 'xlsx';
import TableEvent from '../report/table-event'
import Image from 'next/legacy/image'

type Props = {
  eventSocket: []
  eventMessage: string
  role: string
}

type UserListProps = {
  id: string
  kode_petugas: string
  nama_petugas: string
  contact: string
  contact_wa: string
  jabatan: string
  wilker: []
  status_kepagawaian: string
  status_petugas: any
}

const exampelData = [
  {
    kode_petugas: '',
    nama_petugas: '',
    contact: '',
    contact_wa: '',
    jabatan: '',
    status_kepegawaian: '',
    email: ''
  }
]

function ListPetugas({ eventMessage, eventSocket, role }: Props) {
  const [data, setData] = useState<any[]>([])
  const [dataWilayah, setDataWilayah] = useState<any[]>([])
  const [loader, setLoader] = useState(false)

  const [dataPetugas, setDataPetugas] = useState({})
  
  const [openImport, setOpenImport] = useState(false)

  const handleOpenImport = () => {
    setOpenImport(!openImport)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [query, setQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = searchTerm !== '' ? data.filter(item =>
    item.kode_petugas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_petugas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.wilker.some((wil: any) => 
      wil.nama.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : data;

  const filteredWilayah = 
    query === ''
      ? dataWilayah
      : dataWilayah.filter((airport: any) => {
            const nameMatch = airport.nama
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''));
            
            const kodeMatch = airport.kode
              ?.toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''));
            
            return nameMatch || kodeMatch;
          });


  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editData, setEditData] = useState<boolean>(false)

  const [idPetugas, setIdPetugas] = useState<string>('')
  const [kodePetugas, setKodePetugas] = useState<string>('')
  const [namaPetugas, setNamaPetugas] = useState<string>('')
  const [contactPetugas, setContactPetugas] = useState<string>('')
  const [whatsappPetugas, setWhatsappPetugas] = useState<string>('')
  const [jabatanPetugas, setJabatanPetugas] = useState<string>('')
  const [wilkerPetugas, setWilkerPetugas] = useState([])
  const [statusKepagawaian, setStatusKepagawaian] = useState<string>('')
  const [statusPetugas, setStatusPetugas] = useState<string>('')

  const handleEditClick = (index: number, data: UserListProps) => {
    setEditIndex(index)
    setEditData(true)

    setIdPetugas(data.id)
    setKodePetugas(data.kode_petugas)
    setNamaPetugas(data.nama_petugas)
    setContactPetugas(data.contact)
    setWhatsappPetugas(data.contact_wa)
    setJabatanPetugas(data.jabatan)
    setWilkerPetugas(data.wilker)
    setStatusKepagawaian(data.status_kepagawaian)
    setStatusPetugas(data.status_petugas)
  };

  const handleSubmitEdit = async () => {
    setLoader(true)
    try {
      await axios.put('https://api.greatjbb.com/petugas', {
        id: idPetugas,
        kode_petugas: kodePetugas,
        nama_petugas: namaPetugas,
        contact: contactPetugas,
        contact_wa: whatsappPetugas,
        jabatan: jabatanPetugas,
        wilker: wilkerPetugas,
        status_kepagawaian: statusKepagawaian,
        status_petugas: statusPetugas,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false)
      fetchData()
    }
  }

  const [editWilkerPetugas, setEditWilkerPetugas] = useState([])

  const handleEditWilkerPetugas = (selected: any) => {
    setEditWilkerPetugas(selected)
  }

  const handleRemoveWilker = (selectedKode: string) => {
    const index = wilkerPetugas.findIndex((wilker: any) => wilker.kode === selectedKode);

    // If index is found, remove the object at that index
    if (index !== -1) {
      wilkerPetugas.splice(index, 1);
    }

    setWilkerPetugas(prevWilkerPetugas =>
      prevWilkerPetugas.filter((wilker: any) => wilker.kode !== selectedKode)
    );
  }

  const fetchData = async () => {
    setData([])
    setLoader(true)
    try {
      const response = await axios.post('https://api.greatjbb.com/petugas/id', {
        kode: "",
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false)
    }
  };

  const fetchWilayah = async () => {
    setDataWilayah([])
    setLoader(true)
    try {
      const response = await axios.get('https://api.greatjbb.com/master/wilayah');

      setDataWilayah(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchData()
    fetchWilayah()
  }, [])  

  const exportToExcel = (value: string) => {
    const exampleKeys = ['id', 'kode_petugas', 'nama_petugas', 'contact', 'contact_wa', 'jabatan', 'status_kepagawaian', 'status_petugas'];

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
      exampleDataFiltered = exampelData
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

  const inputRef = useRef<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabIdentifier = 'Petugas'

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
      await axios.post(`https://api.greatjbb.com/bulk`, formData, options)
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
    <>
      {
        (role === 'SUPER ADMIN' || role === 'ADMIN') && (
          <div className='flex flex-row items-center gap-2 p-4 rounded-lg border-2'>
            <h1 className='text-sm font-normal opacity-80'>Insert or update data with bulk : </h1>
            <Button
              className='flex flex-row gap-1.5 ml-auto'
              onClick={handleOpenImport}
            >
              Import Data
              {
                openImport ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />
              }
            </Button>
          </div>
        )
      }
      {
        openImport ? (
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
                      Update data
                    </Button>
                    <Button 
                      variant="outline"
                      className='w-full flex flex-row items-center gap-1.5'
                      onClick={() => exportToExcel('insert')}
                    >
                      Data baru
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
        ) : (
          <Card className='border shadow-none'>
            <CardHeader className='flex flex-col text-xl font-bold'>
              List Petugas
            </CardHeader>
            <CardContent className="space-y-2 px-6 py-6">
              <div className="w-full pt-6">
                {
                    data.length === 0 && (
                      <div className='flex flex-col px-4 py-4 border rounded-md text-center items-center justify-center'>
                        <h1>No result data here.</h1>
                      </div>
                    )
                  }
                {
                  data.length > 0 && (
                    <div className="flex flex-row justify-between items-center py-4">
                      <div className='w-full flex flex-row gap-2 items-center'>
                        <Input
                          placeholder="Cari nama, kode petugas atau wilayah kerja..."
                          className="max-w-sm"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  )
                }
                <div className="rounded-md">
                  <div className='flex flex-col w-full gap-4'>
                  {
                    data && currentItems.map((item: UserListProps, index: number) => (
                      <div key={index+item.kode_petugas} className='flex flex-col px-4 py-4 border rounded-md'>
                        <div className='ml-auto'>
                          {
                            editIndex === index && editData ? (
                              <div className='flex flex-row gap-1 items-center'>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant={'ghost'}
                                      size={'icon'}
                                      className='text-red-600'
                                    >
                                      <XCircleIcon size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action will not save your edited data, and not will be saved into our databases.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          setEditIndex(index === editIndex ? null : index)
                                          setEditData(false)
                                          fetchData()
                                        }}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant={'ghost'}
                                      size={'icon'}
                                      className={'text-green-600'}
                                    >
                                      <CheckCircle size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action will not save your edited data, and not will be saved into our databases.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          handleSubmitEdit()
                                          setEditIndex(index === editIndex ? null : index)
                                          setEditData(false)
                                        }}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            ) : (
                              <>
                               {
                                (role === 'SUPER ADMIN' || role === 'ADMIN') && (
                                  <Button
                                    variant={'ghost'}
                                    size={'icon'}
                                    onClick={() => handleEditClick(index, item)}
                                  >
                                    <PenSquareIcon size={16} />
                                  </Button>
                                )
                               }
                              </>
                            )
                          }
                        </div>
                        <div className='grid grid-cols-4 gap-4 w-full py-4 px-4'>
                        {
                          editIndex === index ? 
                          (
                            <>
                              <div className='flex flex-col w-full gap-4'>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='kode_petugas'>Kode Petugas</Label>
                                  <Input id='kode_petugas' value={kodePetugas} onChange={(e) => setKodePetugas(e.target.value)} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='nama_petugas'>Nama Petugas</Label>
                                  <Input id='nama_petugas' value={namaPetugas} onChange={(e) => setNamaPetugas(e.target.value)} />
                                </div>
                              </div>
                              <div className='flex flex-col w-full gap-4'>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='contact_petugas'>Contact Petugas</Label>
                                  <Input id='contact_petugas' value={contactPetugas} onChange={(e) => setContactPetugas(e.target.value)} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='whatsapp_petugas'>Whatsapp Petugas</Label>
                                  <Input id='whatsapp_petugas' value={whatsappPetugas} onChange={(e) => setWhatsappPetugas(e.target.value)} />
                                </div>
                              </div>
                              <div className='flex flex-col w-full gap-4'>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='jabatan_petugas'>Jabatan Petugas</Label>
                                  <Input id='jabatan_petugas' value={jabatanPetugas} onChange={(e) => setJabatanPetugas(e.target.value)} />
                                </div>
                              </div>
                              <div className='flex flex-col w-full gap-4'>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='status_kepegawaian'>Status Kepegawaian</Label>
                                  <Input id='status_kepegawaian' value={statusKepagawaian} onChange={(e) => setStatusKepagawaian(e.target.value)} />
                                </div>
                              </div>
                              
                              <div className='w-full col-span-4 h-0.5 rounded-full bg-gray-100 my-2' />

                              <div className='col-span-4 w-full flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                  <h1 className='text-xs opacity-70'>Wilayah Kerja :</h1>
                                  <div className='flex flex-row w-full items-center gap-2'>
                                    {
                                      wilkerPetugas.map((wil: any, wilIndex: number) => (
                                        <div 
                                          key={wilIndex}
                                          className='w-fit flex flex-row items-center gap-1 px-2 py-1 rounded-full border'
                                        >
                                          <Trash2Icon onClick={() => handleRemoveWilker(wil.kode)} size={16} className='cursor-pointer text-red-600' />
                                          <h1 className='text-xs w-full'>{wil.nama}</h1>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                                <Combobox multiple value={wilkerPetugas} onChange={setWilkerPetugas} onClose={() => setQuery('')}>
                                  <div className="relative">
                                    <ComboboxInput
                                      className={cn(
                                        'w-full rounded-lg border bg-white py-1.5 pr-8 pl-3 text-sm/6 text-gray-600',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                      )}
                                      displayValue={(person: any) => person?.nama}
                                      onChange={(event) => setQuery(event.target.value)}
                                      placeholder='Cari provinsi, kota atau kabupaten...'
                                    />
                                  </div>
                                  <Transition
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setQuery('')}
                                  >
                                    <ComboboxOptions
                                      anchor="bottom"
                                      className="shadow-lg w-[var(--input-width)] rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                    >
                                      {filteredWilayah.map((person, index) => (
                                        <ComboboxOption
                                          key={index+person.kode}
                                          value={person}
                                          className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                          disabled={wilkerPetugas.some((selectedPerson: any) => selectedPerson.kode === person.kode)}
                                        >
                                          <CheckIcon className={wilkerPetugas.some((selectedPerson: any) => selectedPerson.kode === person.kode) ? "size-4 fill-white" : "invisible"} />
                                          <div className={`text-sm/6 ${wilkerPetugas.some((selectedPerson: any) => selectedPerson.kode === person.kode) ? "text-gray-500" : "text-gray-800"}`}>{person.nama}</div>
                                        </ComboboxOption>
                                      ))}
                                    </ComboboxOptions>
                                  </Transition>
                                </Combobox>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className='flex flex-col w-full'>
                                <h1 className='text-sm'>{item.nama_petugas}</h1>
                                <h1 className='text-xs opacity-70'>{item.jabatan}</h1>
                              </div>
                              <div className='flex flex-col w-full gap-1.5'>
                                <div>
                                  <h1 className='text-xs opacity-70'>Contact</h1>
                                  <h1 className='text-sm'>{item.contact}</h1>
                                </div>
                                <div>
                                  <h1 className='text-xs opacity-70'>Whatsapp</h1>
                                  <h1 className='text-sm'>{item.contact_wa}</h1>
                                </div>
                              </div>
                              <div className='flex flex-col w-full'>
                                <h1 className='text-xs opacity-70'>Status Kepegawaian</h1>
                                <h1 className='text-sm'>{item.status_kepagawaian}</h1>
                              </div>

                              <div className='w-full col-span-4 h-0.5 rounded-full bg-gray-100 my-2' />

                              <div className='col-span-4 flex flex-col gap-1.5'>
                                <h1 className='text-xs opacity-70'>Wilayah Kerja :</h1>
                                <div className='flex flex-row w-full items-center gap-2'>
                                  {
                                    item && item.wilker.map((wil: any, wilIndex: number) => (
                                      <Badge key={wilIndex}>
                                        {wil.nama}
                                      </Badge>
                                    ))
                                  }
                                </div>
                              </div>
                            </>
                          )
                        }
                      </div>
                    </div>
                    ))
                  }
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  {
                    data.length > 0 && (
                      <div className="flex flex-row items-center space-x-2">
                        <Button
                          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        {Array.from(Array(Math.ceil(filteredData.length / itemsPerPage)).keys()).map((pageNumber, index, array) => {
                          const page = pageNumber + 1;
                          const isCurrentPage = currentPage === page;
                          // Display only the first, last, and pages around the current page
                          if (
                            page === 1 ||
                            page === currentPage ||
                            page === currentPage - 1 ||
                            page === currentPage + 1 ||
                            page === Math.ceil(filteredData.length / itemsPerPage)
                          ) {
                            return (
                              <Button
                                key={pageNumber}
                                className={`px-4 py-2 mx-1 ${isCurrentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                                onClick={() => paginate(page)}
                              >
                                {page}
                              </Button>
                            );
                          }
                          // Render the ellipsis button if there's a gap between page numbers
                          if (array[index - 1] !== pageNumber - 1) {
                            return (
                              <span key={`ellipsis-${pageNumber}`} className="mx-1">
                                ...
                              </span>
                            );
                          }
                          // If the page is not displayed and there's no gap, return null
                          return null;
                        })}
                        <Button
                          className={`px-4 py-2 mx-1 ${currentPage === Math.ceil(filteredData.length / itemsPerPage) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                        >
                          Next
                        </Button>
                      </div>
                    )
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        )
      }
    </>
  )
}

export default ListPetugas