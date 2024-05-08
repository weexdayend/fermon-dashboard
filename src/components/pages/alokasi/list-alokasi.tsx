'use client'

import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatabaseIcon, MoreHorizontal } from "lucide-react"

import { mkConfig, generateCsv, download } from 'export-to-csv'

type Props = {}

const csvConfig = mkConfig({
  fieldSeparator: ',',
  filename: 'sample', // export file name (without .csv)
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

// export function
// Note: change _ in Row<_>[] with your Typescript type.
const exportExcel = (rows: Row<any>[]) => {
  const rowData = rows.map((row) => row.original)
  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}

type UserListProps = {
  nominal: string
  bulan: string
  tahun: string
  keterangan: string
  kode: string
  kategori: string
  nama: string
  alamat: string
}

function ListAlokasi({}: Props) {
  const [data, setData] = useState<any[]>([])
  const [database, setDatabase] = useState('')

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 12, //default page size
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.synchronice.id/admin/alokasi/distributor');

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const columns: ColumnDef<UserListProps>[] = [
    {
      accessorKey: "kode",
      header: "Kode",
      cell: ({ row }) => {
        return (
          <div className="text-sm">{row.getValue("kode")}</div>
        )
      },
    },
    {
      accessorKey: "nama",
      header: "Nama Distributor",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("nama")}</div>
      ),
    },
    {
      accessorKey: "bulan",
      header: "Bulan",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("bulan")}</div>
      ),
    },
    {
      accessorKey: "tahun",
      header: "Tahun",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("tahun")}</div>
      ),
    },
    {
      accessorKey: "nominal",
      header: "Nominal",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("nominal")}</div>
      ),
    },
    {
      accessorKey: "keterangan",
      header: "Keterangan",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("keterangan")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Button 
                  variant="ghost" 
                  className='w-full'
                >
                  Edit Alokasi
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
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

  return (
    <Card className='border shadow-none'>
      <CardHeader className='text-xl font-bold'>
        List Alokasi Pupuk
        <h1 className='text-sm font-normal opacity-80 pt-6'>Select the database first :</h1>
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
                  // fetchData(year.toString())
                }}
                disabled={database === year.toString()}
              >
                <DatabaseIcon size={16} /> {year}
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-6 py-6">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center py-4">
            <Input
              placeholder="Filter nama distributor..."
              value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("nama")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className='flex flex=row gap-4'>
              {/* <Button 
                variant="outline"
                onClick={() => exportExcel(table.getFilteredRowModel().rows)}
              >
                Export to CSV
              </Button> */}
              <Button 
                variant="outline"
              >
                Add New User
              </Button>
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

export default ListAlokasi