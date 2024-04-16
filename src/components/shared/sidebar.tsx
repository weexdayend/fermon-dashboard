"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { sideLinks } from "@/types/types"

import { Button } from "@/components/ui/button"
import {
  PowerCircleIcon
} from 'lucide-react'

const LeftSidebar = () => {

  const handleLogout = async () => {
    await signOut()
  }

  const pathname = usePathname();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full min-w-[16vw] flex-1 flex-col gap-4 px-4'>
        {sideLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
            >
              <Button variant={'outline'} className={`w-full border-0 flex flex-row items-center justify-start cursor-pointer gap-4 p-6 active:scale-95 rounded-lg transition-all ease-linear`}>
                <link.imgURL className={`h-5 w-5 ${isActive ? 'text-indigo-500' : 'text-gray-500/70'}`} />
                <p className={`text-sm max-lg:hidden ${isActive ? 'text-indigo-500' : 'text-gray-500/70'}`}>{link.label}</p>
              </Button>
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-6'>
        <Button variant={'outline'} className="w-full border-0" onClick={handleLogout}>
          <div className='flex flex-row items-center justify-start cursor-pointer gap-2 p-4'>
            <PowerCircleIcon className="h-5 w-5 text-red-500" />

            <p className='text-sm max-lg:hidden'>Logout</p>
          </div>
        </Button>
      </div>
    </section>
  );
};

export default LeftSidebar;