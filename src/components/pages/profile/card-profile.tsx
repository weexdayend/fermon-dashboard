'use client'

import axios from 'axios'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSession } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UploadIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import LoadingScreen from '@/components/shared/loading'

type Props = {}

const formSchema = z.object({
  id: z.string(),
  kode_petugas: z.string(),
  nama_petugas: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().regex(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    {
      message: "Invalid email format.",
    }
  ),
  phone: z.string().min(11, {
    message: "Phone number must be at least 11 digits.",
  }).max(13, {
    message: "Phone number must not exceed 13 digits.",
  }),
  whatsapp: z.string().min(11, {
    message: "WhatsApp number must be at least 11 digits.",
  }).max(13, {
    message: "WhatsApp number must not exceed 13 digits.",
  }),
  jabatan: z.string(),
  status_kepagawaian: z.string(),
  role_user: z.string(),
  wilker: z.array(z.record(z.string(), z.any())),
  foto: z.string()
})

function CardProfile({}: Props) {
  const { toast } = useToast()
  const { data: session } = useSession()

  const [data, setData] = useState<any>(null)

  const [idUser, setIdUser] = useState<string>('')
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [imageUrl, setImageUrl] = useState<string>("https://github.com/shadcn.png");

  const isDisabledButton = 
    !oldPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword;

  const handleChangePassword = async () => {
    try {
      const hit = await axios.post('https://api.greatjbb.com/user/password', { 
        id: idUser,
        oldpassword: oldPassword,
        newpassword: newPassword
      });
  
      const response = hit.data

      if (response.message === 'error') {
        toast({
          variant: "default",
          title: "Error!",
          description: "Your password has not been changed, the old password you sent is not match.",
        })
      }

      if (response.message === 'success') {
        toast({
          variant: "default",
          title: "Success!",
          description: "Your password has been success changed in the database.",
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      kode_petugas: "",
      email: "",
      phone: "",
      whatsapp: "",
      jabatan: "",
      status_kepagawaian: "",
      role_user: "",
      nama_petugas: "",
      wilker: [],
      foto: ""
    },
  })
  const { setValue, reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put('https://api.greatjbb.com/profile', values);
      reset()
    } catch (error) {
      console.error('Error insert data:', error);
    } finally {
      fetchData()
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post('https://api.greatjbb.com/user', { email: session?.user.email });

      const userData = response.data;

      setData(userData);
      setIdUser(userData.id_user);

      setValue('id', userData.id_user);
      setValue('kode_petugas', userData.kode_petugas);
      setValue('nama_petugas', userData.nama_petugas);
      setValue('email', userData.email);
      setValue('phone', userData.contact);
      setValue('whatsapp', userData.contact_wa);
      setValue('jabatan', userData.jabatan);
      setValue('status_kepagawaian', userData.status_kepagawaian);
      setValue('role_user', userData.role_user);
      setValue('wilker', userData.wilker);
      setValue('foto', userData.foto);

      setImageUrl(userData.foto || "https://github.com/shadcn.png");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [session?.user.email, setValue]);

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session?.user, fetchData]);

  const inputRef = useRef<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
        setValue('foto', base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  if (!data) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center gap-4'>
        <LoadingScreen />
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <Card className='border shadow-none'>
        <CardContent className="space-y-2 px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 items-center gap-4">
              <div className='col-span-2 flex flex-row gap-4 items-center justify-between pb-12 w-full'>
                <div className='flex flex-row items-center gap-6 relative'>
                  <Avatar className='w-28 h-28'>
                    <AvatarImage
                      className="h-full w-full rounded-[inherit] object-cover"
                      src={imageUrl} 
                      alt={data.nama_petugas || "Profile"} 
                    />
                    <AvatarFallback
                      className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                      delayMs={600}
                    >
                      CN
                    </AvatarFallback>
                    <input
                      placeholder="fileInput"
                      className="hidden"
                      ref={inputRef}
                      type="file"
                      id="file"
                      accept=".jpg"
                      onChange={(e) => handleFileChange(e)}
                      multiple={false}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-0 w-full bg-white bg-opacity-80"
                      onClick={openFileExplorer}
                      type='button'
                    >
                      <UploadIcon className="w-4 h-4" />
                    </Button>
                  </Avatar>
                  <div className='flex flex-col'>
                    <h1 className='opacity-70 text-base'>{data.email}</h1>
                    <h1 className='font-bold text-6xl'>{data.nama_petugas}</h1>
                  </div>
                </div>
                <Badge>{data.role_user}</Badge>
              </div>
              <FormField
                control={form.control}
                name="nama_petugas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your email for login to admin dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="0812...." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your regular phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <Input placeholder="0811...." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your contact whatsapp.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='col-span-2 ml-auto pt-12'>
                <Button type="submit">Edit profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className='px-6 py-6 rounded-lg border shadow-none'>
        <div className='flex flex-row items-center justify-between'>
          <h1>If you want to change the password.</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'outline'}
                className='border-red-500 text-red-500'
              >
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Make changes to your password here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="old_password" className="text-left w-full">
                    Old Password
                  </Label>
                  <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type='password' id="old_password" className="w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="new_password" className="text-left w-full">
                    New Password
                  </Label>
                  <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='password' id="new_password" className="w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm_password" className="text-left w-full">
                    Confirm Password
                  </Label>
                  <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' id="confirm_password" className="w-full" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isDisabledButton} onClick={handleChangePassword}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default CardProfile