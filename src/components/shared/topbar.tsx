import Image from 'next/legacy/image'
import Link from 'next/link'

import { User2Icon } from "lucide-react";
import { getServerAuthSession } from '@/servers/auth'

const imageWidth = 100;
const aspectRatio = 50 / 100;

export default async function Topbar() {
  const authSession = await getServerAuthSession()
    
  return (
    <nav className='topbar'>
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
        <Link
          href={`/profile/${authSession?.user.email}`}
          key={'Profile'}
          className={`flex flex-row items-center justify-start px-2 py-2 rounded-xl gap-2`}
        >
          <User2Icon className={`h-5 w-5`} />
          <p className={`text-sm`}>{authSession && authSession.user.name}</p>
        </Link>
      </div>
    </nav>
  );
}