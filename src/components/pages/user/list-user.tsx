'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

import { MoreHorizontal } from "lucide-react"

type Props = {}

type UserListProps = {
  name: string
  email: string
  password: string
  status_user: boolean
  image: string
  role: string
}

const options = [
  { label: 'SUPER ADMIN', value: 'SUPER ADMIN' },
  { label: 'ADMIN', value: 'ADMIN' },
  { label: 'REPORT', value: 'REPORT' },
  { label: 'VIEW', value: 'VIEW' },
];

function ListUser({}: Props) {
  const [data, setData] = useState<any[]>([])

  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState<boolean>(true)
  const [role, setRole] = useState('')

  const [item, setItem] = useState<any>()
  const [dataChanged, setDataChanged] = useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.greatjbb.com/user/all');

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const fetchEditUser = async () => {
    const payload = {
      email: email
    }

    try {
      const response = await axios.post('https://api.greatjbb.com/user', payload);
      const data = response.data

      setItem(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchEditUser()
    }
  }, [])

  useEffect(() => {
    if (item) {
      setName(item.name || '')
      setEmail(item.email || '')
      setRole(item.role || '')
      setStatus(item.status_user || false)
    }
  }, [item])

  const handleSubmit = async () => {    
    const payload: UserListProps = {
      name: name,
      email: email,
      password: password,
      image: image,
      status_user: status,
      role: role
    };

    try {
      userId
        ? await axios.put(`https://api.greatjbb.com/user`, payload)
        : await axios.post('https://api.greatjbb.com/register', payload);
      
      fetchData();
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const columns: ColumnDef<UserListProps>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="text-sm grid grid-cols-2 gap-4">{row.getValue("name")}<Badge className={`w-fit ${user.role ? 'bg-blue-500' : 'bg-gray-400'}`}>{user.role ? user.role : 'not-assign yet'}</Badge></div>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "status_user",
      header: "Status User",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("status_user") === true ? 'Active' : 'Disable'}</div>
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
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className='w-full' 
                    onClick={() => {
                      setUserId(user.email)
                      setEmail(user.email)
                    }}
                  >
                    Edit User
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
          List User
        </CardHeader>
        <CardContent className="space-y-2 px-6 py-6">
          <div className="w-full">
            <div className="flex flex-row justify-between items-center py-4">
              <Input
                placeholder="Filter email..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <SheetTrigger asChild>
                <Button 
                  variant="outline"
                >
                  Add New User
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
              userId ? 'Edit User' : 'Add New User'
            }
          </SheetTitle>
          <SheetDescription>
            Add new user for fermon app.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endpoint" className="text-right">
              Email
            </Label>
            <Input id="endpoint" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
          </div>
          {
            !userId && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endpoint" className="text-right">
                    Password
                  </Label>
                  <Input id="endpoint" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endpoint" className="text-right">
                    Confirm Password
                  </Label>
                  <Input id="endpoint" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="col-span-3" />
                </div>
              </>
            )
          }
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endpoint" className="text-right">
              Role
            </Label>
            <Select onValueChange={(e) => setRole(e)}>
              <SelectTrigger className="col-span-3">
                <SelectValue>{role}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {
              userId && (
              <Label className="text-right col-span-4">
                Current role <span className='font-bold'>{role}</span>
              </Label>
              )
            }
          </div>
          <div className='w-full h-1 rounded-full bg-gray-100 my-10' />
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor="endpoint" className="text-right">
              Status
            </Label>
            <Switch
              className="col-span-2"
              checked={status}
              onCheckedChange={() => setStatus(!status)}
            />
            <Label htmlFor="airplane-mode">{status ? 'active':'in-active'}</Label>
          </div>
        </div>
        <SheetFooter className='py-20'>
          <SheetClose asChild>
            <Button 
              type="submit" 
              onClick={() => handleSubmit()}
            >
              {
                userId ? 'Edit User' : 'Submit User'
              }
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ListUser