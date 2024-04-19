'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'

import { PowerCircleIcon, User2Icon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { signOut } from "next-auth/react"

const imageWidth = 100;
const aspectRatio = 50 / 100;

export default async function Topbar() {
    
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <nav className='topbar bg-background'>
      <Link href='/home' className='flex items-center justify-center'>
        <Image
          src="/assets/icons/logo-pi-warna.svg"
          width={imageWidth}
          height={imageWidth * aspectRatio}
          alt="saptakarya"
          priority={true}
        />
      </Link>

      <div className='flex items-center gap-2'>
        <Button variant={'outline'} size={'icon'} className="w-full border-0" onClick={handleLogout}>
          <PowerCircleIcon className="h-5 w-5 text-red-500" />
        </Button>
      </div>
    </nav>
  );
}