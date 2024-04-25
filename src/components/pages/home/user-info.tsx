"use client"

import React from 'react';

import { Button } from "@/components/ui/button"
import { User } from "@/types/user"
import { signOut } from "next-auth/react"

type UserInfoProps = {
  user: User
}

export default function UserInfo({ user }: UserInfoProps) {

  const handleLogout = async () => {
    await signOut()
  }

  return(
   <div className="rounded-lg border shadow-lg p-10">
      <div>
        Name : {user.name}
      </div>
      <Button variant={'outline'} onClick={handleLogout}>
        Log out
      </Button>
    </div>
  )
}