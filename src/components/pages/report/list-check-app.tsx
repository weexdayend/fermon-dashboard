'use client'

import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import moment from 'moment-timezone';

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

export type AppListProps = {
  status_code: string,
  last_checked: string,
  time_taken: string,
  app_name: string,
}

export const columns: ColumnDef<AppListProps>[] = [
  {
    accessorKey: "app_name",
    header: "App Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("app_name")}</div>
    ),
  },
  {
    accessorKey: "status_code",
    header: "Status Code",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("status_code")}</div>
    ),
  },
  {
    accessorKey: "time_taken",
    header: "Time Taken",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("time_taken")} ms</div>
    ),
  },
  {
    accessorKey: "last_checked",
    header: "Last Checked",
    cell: ({ row }) => (
      <div className="text-sm">{moment.tz(row.getValue("last_checked"), 'Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')}</div>
    ),
  },
]

type Props = {}

function CheckupApp({}: Props) {
  const [data, setData] = useState<any[]>([])


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.greatjbb.com/app-checkup');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
    
  return (
    <Card className='border shadow-none'>
      <CardHeader className='text-xl font-bold'>
        Logs Checkup Applicaiton
      </CardHeader>
      <CardContent className="space-y-2 px-6 py-6">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center py-4">
            <Input
              placeholder="Filter apps name..."
              value={(table.getColumn("app_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("app_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
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
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
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
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
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

export default CheckupApp