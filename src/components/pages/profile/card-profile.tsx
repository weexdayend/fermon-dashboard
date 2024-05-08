'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useSession } from "next-auth/react"

import {
  Card,
  CardContent,
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Props = {}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function CardProfile({}: Props) {
  const { data: session } = useSession()

  const [data, setData] = useState<any>()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const fetchData = async () => {
    try {
      const response = await axios.post('https://api.greatjbb.com/user', { email: session?.user.email });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchData()
    }
  }, [session?.user])

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <Card className='border shadow-none'>
        <CardContent className="space-y-2 px-6 py-6">
          <div className='flex flex-row gap-4 items-center justify-between'>
            <div className='flex flex-row items-center gap-6'>
              <Avatar className='w-28 h-28'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h1 className='opapcity-70 text-base'>{data && data.email}</h1>
                <h1 className='font-bold text-6xl'>{data && data.name}</h1>
              </div>
            </div>
            <Badge>{data && data.role}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className='border shadow-none'>
        <CardHeader>
          <h1 className='text-3xl font-bold'>Edit Profile</h1>
          <h1 className='text-base opacity-70'>On this card you can edit your profile information.</h1>
        </CardHeader>
        <CardContent className="space-y-2 px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your email for login to admin dashboard.
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
    </div>
  )
}

export default CardProfile