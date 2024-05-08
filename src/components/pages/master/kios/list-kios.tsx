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
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DatabaseIcon,
  MoreHorizontal,
  PlusCircleIcon,
  HardDriveDownloadIcon,
  DownloadCloudIcon,
  ArrowBigRightDashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LucideTrash2,
  FileCheck2Icon,
  XIcon,
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
  
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 12, //default page size
  });

  const fetchData = async (database: string) => {
    setData([])
    setLoader(true)
    try {
      const response = await axios.post('https://api.synchronice.id/kios/id', {
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

  const columns: ColumnDef<UserListProps>[] = [
    {
      accessorKey: "kode_pengecer",
      header: "Kode",
      cell: ({ row }) => {
        return (
          <div className="text-sm">{row.getValue("kode_pengecer")}</div>
        )
      },
    },
    {
      accessorKey: "nama_pengecer",
      header: "Nama Kios",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("nama_pengecer")}</div>
      ),
    },
    {
      accessorKey: "alamat",
      header: "Alamat",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("alamat")}</div>
      ),
    },
    {
      accessorKey: "long",
      header: "Longitude",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("long")}</div>
      ),
    },
    {
      accessorKey: "lat",
      header: "Lattitude",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("lat")}</div>
      ),
    },
    {
      accessorKey: "tahun",
      header: "Tahun",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("tahun")}</div>
      ),
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const user = row.original
   
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem>
    //             <Button 
    //               variant="ghost" 
    //               className='w-full'
    //             >
    //               Edit Alokasi
    //             </Button>
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   },
    // },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
  })

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
                <div className="flex flex-row justify-between items-center py-4">
                  <div className='flex flex-row gap-2 items-center'>
                    <Input
                      placeholder="Filter nama kios..."
                      value={(table.getColumn("nama_pengecer")?.getFilterValue() as string) ?? ""}
                      onChange={(event) =>
                        table.getColumn("nama_pengecer")?.setFilterValue(event.target.value)
                      }
                      className="max-w-sm"
                    />
                  </div>
                  <div className='flex flex=row gap-4'>
                    {/* <Button 
                      variant="outline"
                      className='flex flex-row items-center gap-1.5'
                    >
                      <PlusCircleIcon size={16} />
                      Add Kios
                    </Button> */}
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </TableHead>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        <>
                        {[...Array(12)].map((_, index) => {
                          const row = table.getRowModel().rows[index];
                          return (
                            <TableRow
                              key={index}
                              data-state={row && row.getIsSelected() && "selected"}
                            >
                              {row && row.getVisibleCells().map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex flex-row items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <div className='flex flex-row items-center'>
                      <p className='text-xs'>{pagination.pageIndex + 1} - {table.getPageCount()}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
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