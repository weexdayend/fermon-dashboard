'use client'

import axios from 'axios'
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
  Check,
  CirclePlusIcon,
  DatabaseIcon,
  MoreHorizontal,
  PlusCircleIcon,
  X,
  HardDriveDownloadIcon,
} from "lucide-react"

type Props = {}

type UserListProps = {
  id: string
  kode_provinsi: string
  nama_provinsi: string
}

function ListProvinsi({}: Props) {
  const [data, setData] = useState<any[]>([])
  const [database, setDatabase] = useState('')
  const [loader, setLoader] = useState(false)

  // const [open, setOpen] = useState(false)
  // const [selected, setSelected] = useState<any[]>([])
  
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

  const fetchData = async () => {
    setData([])
    setLoader(true)
    try {
      const response = await axios.post('https://api.synchronice.id/wilayah/provinsi', {
        kode: "",
        nama: ""
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const columns: ColumnDef<UserListProps>[] = [
    {
      accessorKey: "kode_provinsi",
      header: "Kode",
      cell: ({ row }) => {
        return (
          <div className="text-sm">{row.getValue("kode_provinsi")}</div>
        )
      },
    },
    {
      accessorKey: "nama_provinsi",
      header: "Nama Provinsi",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("nama_provinsi")}</div>
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
  
  // useEffect(() => {
  //   // Create a filter object for each selected year
  //   const yearFilters = selected.map(year => ({ id: "tahun", value: year.value }));
    
  //   // Apply the filter for each selected year
  //   setColumnFilters(yearFilters);
  // }, [selected]);

  // const selectables = years.filter((framework: any) => !selected.includes(framework));

  return (
    <Card className='border shadow-none'>
      <CardHeader className='flex flex-col text-xl font-bold'>
        List Provinsi
      </CardHeader>
      <CardContent className="space-y-2 px-6 py-6">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center py-4">
            <div className='flex flex-row gap-2 items-center'>
              <Input
                placeholder="Filter nama provinsi..."
                value={(table.getColumn("nama_provinsi")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("nama_provinsi")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
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

export default ListProvinsi