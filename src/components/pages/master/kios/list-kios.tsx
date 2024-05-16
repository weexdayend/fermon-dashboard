'use client'

import axios, { AxiosRequestConfig } from 'axios'
import React, { useState, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  DatabaseIcon,
  HardDriveDownloadIcon,
  DownloadCloudIcon,
  ArrowBigRightDashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LucideTrash2,
  FileCheck2Icon,
  XIcon,
  CheckCircle2Icon,
  XCircleIcon,
  PenSquareIcon,
  CheckCircle
} from "lucide-react"

import * as XLSX from 'xlsx';
import TableEvent from '../report/table-event'

type Props = {
  eventSocket: []
  eventMessage: string
}

type UserListProps = {
  id: string
  kode_pengecer: string
  nama_pengecer: string
  alamat: string
  long: string
  lat: string
  tahun: string
  file: []
}

const exampelData = [
  {
    kode_pengecer: '',
    nama_pengecer: '',
    alamat: '',
    long: '',
    lat: '',
    tahun: ''
  }
]

function ListKios({ eventSocket, eventMessage }: Props) {
  const [data, setData] = useState<any[]>([])
  const [database, setDatabase] = useState('')
  const [loader, setLoader] = useState(false)

  const [openImport, setOpenImport] = useState(false)

  const handleOpenImport = () => {
    setOpenImport(!openImport)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = searchTerm !== '' ? data.filter(item =>
    item.kode_distributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_distributor.toLowerCase().includes(searchTerm.toLowerCase())
  ) : data;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const [kategoriPreview, setKategoriPreview] = useState<string>('')
  const [indexPreview, setIndexPreview] = useState<number | null>(null)
  const [pdfData, setPdfData] = useState<any>(null)

  const handleSelectPreviewFile = async (kategori: string, index: number, url: string) => {
    setKategoriPreview('')
    setIndexPreview(null)
    setPdfData(null)
    try {
      setKategoriPreview(kategori)
      setIndexPreview(index)
      fetch(url)
        .then(response => response.blob())
        .then(data => setPdfData(data))
        .catch(error => console.error('Error fetching PDF file:', error));
    } catch (e) {
      console.error(e)
    }
  }

  const [selectedKategoriFile, setSelectedKategoriFile] = useState<File | null>(null);

  const handleKategoriFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedKategoriFile(file);
    }
  };

  const handleUploadFile = async (kategori: string, kode: string) => {
    try {
      if (!selectedKategoriFile) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append('file', selectedKategoriFile);
      formData.append('kode', kode);
      formData.append('tahun', '2024');
      formData.append('name_file', selectedKategoriFile.name);
      formData.append('jenis_file', kategori);
      formData.append('keterangan', 'Gudang');
  
      const response = await axios.post('https://api.greatjbb.com/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      fetchData(database)
    }
  };

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editData, setEditData] = useState<boolean>(false)

  const [idKios, setIdKios] = useState<string>('')
  const [kodeKios, setKodeKios] = useState<string>('')
  const [namaKios, setNamaKios] = useState<string>('')
  const [alamatKios, setAlamatKios] = useState<string>('')
  const [longitudeKios, setLongitudeKios] = useState<string>('')
  const [lattitudeKios, setLattitudeKios] = useState<string>('')

  const handleEditClick = (index: number, data: UserListProps) => {
    setEditIndex(index)
    setEditData(true)

    setIdKios(data.id)
    setKodeKios(data.kode_pengecer)
    setNamaKios(data.nama_pengecer)
    setAlamatKios(data.alamat)
    setLongitudeKios(data.long)
    setLattitudeKios(data.lat)
  };

  const handleSubmitEdit = async () => {
    setLoader(true)
    try {
      await axios.put('https://api.greatjbb.com/kios', {
        id: idKios,
        kode: kodeKios,
        nama_gudang: namaKios,
        alamat: alamatKios,
        long: longitudeKios,
        lat: lattitudeKios,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false)
      fetchData(database)
    }
  }

  const fetchData = async (database: string) => {
    setData([])
    setLoader(true)
    try {
      const response = await axios.post('https://api.greatjbb.com/kios/id', {
        kode: "",
        tahun: database
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false)
    }
  };

  const resetDatabase = () => {
    setData([])
    setDatabase('')
  }

  const exportToExcel = () => {
    const exampleKeys = ['id', 'kode_pengecer', 'nama_pengecer', 'alamat', 'long', 'lat', 'tahun'];

    let exampleDataFiltered
    let formatType
    if (data.length > 0) {
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
      ['kode_pengecer', 'kode pengecer sama dengan report f6'],
      ['nama_pengecer', 'nama pengecer sama dengan report f6'],
      ['alamat', 'alamat lengkap pengecer'],
      ['long', 'longitude pengecer'],
      ['lat', 'lattitude pengecer'],
  ]);

    XLSX.utils.book_append_sheet(workbook, exampleSheet, 'Standar Format');
    XLSX.utils.book_append_sheet(workbook, standarSheet, 'Guide');

    XLSX.writeFile(workbook, `standar-data-${formatType}-kios.xlsx`);
  };

  const inputRef = useRef<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabIdentifier = 'Kios'

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
      <div className='flex flex-row items-center gap-2 p-4 rounded-lg border-2'>
        <h1 className='text-sm font-normal opacity-80'>Select the database first :</h1>
        <div className='flex flex-row items-center gap-2'>
          {[...Array(new Date().getFullYear() - 2019)].map((_, index) => {
            const year = 2020 + index;
            return (
              <Button 
                key={year}
                variant={'outline'} 
                className={`flex flex-row items-center gap-1.5 ${
                  year.toString() === database && 'text-blue-500'
                }`}
                onClick={() => {
                  setDatabase(year.toString())
                  fetchData(year.toString())
                }}
                disabled={database === year.toString()}
              >
                {database === year.toString() && loader ? (
                  <Spinner size="small" className='text-blue-500' />
                ) : (
                  <DatabaseIcon size={16} />
                )} 
                {year}
              </Button>
            );
          })}
          {
            data.length < 0 || database !== '' && (
              <Button 
                variant="ghost"
                className='w-full flex flex-row items-center border'
                onClick={resetDatabase}
              >
                <XIcon size={16} className='text-red-500' />
              </Button>
            )
          }
        </div>
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
                      onClick={exportToExcel}
                    >
                      <DownloadCloudIcon size={16} />
                      Download Format
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
              List Kios
            </CardHeader>
            <CardContent className="space-y-2 px-6 py-6">
              <div className="w-full pt-6">
                {
                  data.length > 0 && (
                    <div className="flex flex-row justify-between items-center py-4">
                      <div className='flex flex-row gap-2 items-center'>
                        <Input
                          placeholder="Cari nama atau kode gudang..."
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
                    data.length === 0 && (
                      <div className='flex flex-col px-4 py-4 border rounded-md text-center'>
                        <h1>No result data here.</h1>
                      </div>
                    )
                  }
                  {
                    data && currentItems.map((item: UserListProps, index: number) => (
                      <div key={index+item.kode_pengecer} className='flex flex-col px-4 py-4 border rounded-md'>
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
                              <Button
                                variant={'ghost'}
                                size={'icon'}
                                onClick={() => handleEditClick(index, item)}
                              >
                                <PenSquareIcon size={16} />
                              </Button>
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
                                  <Label htmlFor='kode_gudang'>Kode Kios</Label>
                                  <Input id='kode_gudang' value={kodeKios} onChange={(e) => setKodeKios(e.target.value)} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='nama_gudang'>Nama Kios</Label>
                                  <Input id='nama_gudang' value={namaKios} onChange={(e) => setNamaKios(e.target.value)} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='alamat_gudang'>Alamat Kios</Label>
                                  <Input id='alamat_gudang' value={alamatKios} onChange={(e) => setAlamatKios(e.target.value)} />
                                </div>
                              </div>
                              <div className='flex flex-col w-full gap-4'>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='long_gudang'>Longitude</Label>
                                  <Input id='long_gudang' value={longitudeKios} onChange={(e) => setLongitudeKios(e.target.value)} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <Label htmlFor='lat_gudang'>Lattitude</Label>
                                  <Input id='lat_gudang' value={lattitudeKios} onChange={(e) => setLattitudeKios(e.target.value)} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className='flex flex-col w-full'>
                                <h1 className='text-xs opacity-70'>{item.kode_pengecer}</h1>
                                <h1 className='text-sm'>{item.nama_pengecer}</h1>
                              </div>
                              <div className='flex flex-col w-full'>
                                <h1 className='text-sm'>{item.alamat}</h1>
                                <h1 className='text-xs opacity-70'>long {item.long}</h1>
                                <h1 className='text-xs opacity-70'>lat {item.lat}</h1>
                              </div>

                              <div className='w-full col-span-4 h-0.5 rounded-full bg-gray-100 my-2' />

                              <div className='col-span-4 flex flex-row flex-wrap w-full items-center gap-4'>
                                {
                                  item.file
                                  .map((file: any, idxFile: number) => (
                                    <>
                                      {
                                        file.uri === null ? (
                                          <Dialog key={idxFile}>
                                            <DialogTrigger asChild>
                                              <Button variant="outline" className='flex flex-row gap-1 w-fit py-1 px-3 rounded-full border-red-600 border'>
                                                <XCircleIcon size={16} className='text-red-600' />
                                                <h1 className='text-xs opacity-70 uppercase'>{file.kategori}</h1>
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                              <DialogHeader>
                                                <DialogTitle>Upload File Kedistributoran</DialogTitle>
                                              </DialogHeader>
                                              <div className="grid gap-4 py-4">
                                                <Input type='file' accept='pdf' className="col-span-3" onChange={handleKategoriFile} />
                                              </div>
                                              <DialogFooter>
                                                <Button onClick={() => handleUploadFile(file.kategori, item.kode_pengecer)} type="submit">Upload file</Button>
                                              </DialogFooter>
                                            </DialogContent>
                                          </Dialog>
                                        ) : (
                                          <Button
                                            key={idxFile}
                                            variant={'ghost'}
                                            className={`flex flex-row flex-wrap gap-1 w-full py-1 px-3 rounded-full ${indexPreview === index && file.kategori === kategoriPreview ? 'bg-green-600 text-white' : ' border-green-600 border'}`}
                                            onClick={() => handleSelectPreviewFile(file.kategori ,index, `https://api.greatjbb.com/file${file.uri}`)}
                                          >
                                            <CheckCircle2Icon size={16} />
                                            <h1 className='text-xs opacity-70 capitalize'>{file.kategori}</h1>
                                          </Button>
                                        ) 
                                      }
                                    </>
                                  ))
                                }
                                {
                                  indexPreview === index && pdfData !== null && (
                                    <Button
                                      variant={'ghost'}
                                      className='w-fit flex flex-row gap-1 ml-auto rounded-full'
                                      onClick={() => {
                                        setKategoriPreview('')
                                        setIndexPreview(null)
                                        setPdfData(null)
                                      }}
                                    >
                                      <XCircleIcon size={16} />
                                      Close Preview
                                    </Button>
                                  )
                                }
                              </div>
                              <div className='w-full col-span-4'>
                                {
                                  indexPreview === index && pdfData !== null && (
                                    <object data={URL.createObjectURL(pdfData)} type="application/pdf" width="100%" height="600px" className='rounded-lg'>
                                      <p>File preview not available</p>
                                    </object>
                                  )
                                }
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

export default ListKios