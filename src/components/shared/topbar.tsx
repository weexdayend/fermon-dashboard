import Image from 'next/legacy/image'
import Link from 'next/link'

import Profile from './profile';

const imageWidth = 100;
const aspectRatio = 50 / 100;

export default async function Topbar() {
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

      <Profile />
    </nav>
  );
}