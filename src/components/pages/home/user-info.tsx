"use client"

import React, { useEffect } from 'react';

import { Button } from "@/components/ui/button"
import { User } from "@/types/user"
import { signOut } from "next-auth/react"

import { io } from 'socket.io-client';

const socket = io('https://socket.synchronice.id', {
  transports: ['polling'],
  withCredentials: true,
});

type UserInfoProps = {
  user: User
}

export default function UserInfo({ user }: UserInfoProps) {

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Socket connected with ID: ${socket.id}`);
    });
  
    socket.on('connect_error', (error) => {
      console.error('WebSocket connection failed:', error);
    });
  
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
  
    return () => {
      console.log('Cleaning up socket connection');
      socket.disconnect();
    };
  }, []);  

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