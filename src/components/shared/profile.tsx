'use client'

import React, { useEffect } from 'react'

import { PowerCircleIcon, User2Icon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { signOut } from "next-auth/react"

type Props = {}

function Profile({}: Props) {

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className='flex items-center gap-2'>
      <Button variant={'outline'} size={'icon'} className="w-full border-0" onClick={handleLogout}>
        <PowerCircleIcon className="h-5 w-5 text-red-500" />
      </Button>
    </div>
  )
}

export default Profile