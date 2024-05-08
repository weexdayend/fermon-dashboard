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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import Link from 'next/link';

type AppListProps = {
  id: string
  app_name: string
  app_endpoint: string
  app_status: string
  time_taken: string
  last_checked: string
}

type Props = {}

function ListApp({}: Props) {
  const [data, setData] = useState<any[]>([])

  const [appId, setAppId] = useState('')
  const [appName, setAppName] = useState('')
  const [endpoint, setEndpoint] = useState('')

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.synchronice.id/app-relation');
      
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleSubmit = async () => {    
    const payload: {
      app_name: string;
      app_endpoint: string;
      status_relation: string;
      id?: string;
    } = {
      app_name: appName,
      app_endpoint: endpoint,
      status_relation: 'Active',
    };

    if (appId) {
      payload.id = appId;
    }

    try {
      const response = appId
        ? await axios.put(`https://api.synchronice.id/app-relation`, payload)
        : await axios.post('https://api.synchronice.id/app-relation', payload);
      
      if (response.status === 200) {
        console.log(`Application ${appId ? 'edited' : 'added'} successfully!`);
        fetchData();
      } else {
        console.error(`Failed to ${appId ? 'edit' : 'add'} application:`, response.statusText);
      }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const columns: ColumnDef<AppListProps>[] = [
    {
      accessorKey: "app_name",
      header: "App Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("app_name")}</div>
      ),
    },
    {
      accessorKey: "app_endpoint",
      header: "Endpoint",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={row.getValue("app_endpoint")} target="_blank">
                <Button variant={'outline'} className='border-blue-500 hover:border-blue-700 text-sm text-blue-500 hover:text-blue-700'>Visit App</Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue("app_endpoint")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "app_status",
      header: "Status Code",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("app_status")}</div>
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const app = row.original
   
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
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className='w-full' 
                    onClick={() => {
                      setAppId(app.id)
                      setAppName(app.app_name)
                      setEndpoint(app.app_endpoint)
                    }}
                  >
                    Edit App
                  </Button>
                </SheetTrigger>
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
    
  return (
    <Sheet>
      <Card className='border shadow-none'>
        <CardHeader className='text-xl font-bold'>
          List App
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
              <SheetTrigger asChild>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setAppId('')
                    setAppName('')
                    setEndpoint('')
                  }}
                >
                  Add New App
                </Button>
              </SheetTrigger>
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {
              appId ? 'Edit Application' : 'Add Application'
            }
          </SheetTitle>
          <SheetDescription>
            Add new application for monitoring.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              App Name
            </Label>
            <Input id="name" value={appName} onChange={(e) => setAppName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endpoint" className="text-right">
              Endpoint
            </Label>
            <Input id="endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => handleSubmit()}>Submit Application</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ListApp