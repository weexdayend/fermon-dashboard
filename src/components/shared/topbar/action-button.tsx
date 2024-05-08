'use client'

import React, { useEffect } from 'react'

import { PowerCircleIcon, User2Icon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { signOut, useSession } from "next-auth/react"

import Link from "next/link"

type Props = {}

function ActionButton({}: Props) {

  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className='flex flex-row items-center gap-2'>
      {
        session?.user && (
          <Link href={'/profile'}>
            <Button variant={'outline'} className="flex flex-row gap-1 w-full">
              <User2Icon className="h-4 w-4" />
              {
                session?.user.name
              }
            </Button>
          </Link>
        )
      }
      <Button variant={'outline'} className="w-full border-0" onClick={handleLogout}>
        <PowerCircleIcon className="h-5 w-5 text-red-500" />
      </Button>
    </div>
  )
}

export default ActionButton