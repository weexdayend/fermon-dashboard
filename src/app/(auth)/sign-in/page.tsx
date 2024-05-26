"use client"

import React from 'react'
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import Image from 'next/legacy/image'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const imageWidth = 150;
const aspectRatio = 50 / 150;

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

const SignIn = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await signIn("credentials", { 
        username: data.username, 
        password: data.password, 
        callbackUrl: '/home' ,
      });
    } catch (error) {
      // Check if the error is due to email or password not found
      if (error instanceof Error && error.message.includes('credentials')) {
        // Display a custom error message to the user
        console.error('Email or password not found');
        // You can set state or display an error message in your component
      } else {
        // If the error is not related to email or password, log it for debugging
        console.error('An error occurred during sign-in:', error);
        // Optionally, display a generic error message to the user
      }
    }
  }

  return (
    <main className='flex h-screen w-screen'>
      <div className="h-full w-full relative">
        <Image
          src="/assets/image/fertilizer-home.jpg"
          width={1920}
          height={1080}
          alt="saptakarya"
          priority={true}
          className="object-cover h-full w-full"
          layout='fill'
        />
        <div className="absolute inset-0 bg-black opacity-45"></div>
        <div className="absolute top-[40vh] left-10 w-full text-white py-8">
          <h1 className="text-6xl font-semibold">Fertilizer Monitoring</h1>
          <p className="text-lg">For monitoring distribution of your fertilizer.</p>
        </div>
      </div>
      <div className="h-full w-[600px] flex flex-col gap-4 items-center justify-center bg-white">
        <div className="w-full flex flex-col gap-12 items-center">
          <Image
            src="/assets/icons/logo-pi-warna.svg"
            width={imageWidth}
            height={imageWidth * aspectRatio}
            alt="saptakarya"
            priority={true}
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type='text' 
                        placeholder='Username' 
                        {...field} 
                        value={field.value || ''}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type='password' 
                        placeholder='Password' 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              <div className='flex flex-col gap-2 w-full h-fit'>
                <Button className='w-full bg-blue-500 text-white hover:bg-blue-600' type="submit">Sign-in</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default SignIn