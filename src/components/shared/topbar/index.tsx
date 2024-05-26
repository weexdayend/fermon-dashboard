import Image from 'next/image'
import Link from 'next/link'

import ActionButton from './action-button';

const imageWidth = 100;
const aspectRatio = 50 / 100;

type Props = {}

function Index({}: Props) {
  return (
    <nav className='topbar bg-background border-b shadbow-xl'>
      <Link href='/home' className='flex items-center justify-center'>
        <Image
          src="https://utfs.io/f/5ba07116-a629-4637-9104-286e39ef087c-mnmnjd.svg"
          width={imageWidth}
          height={imageWidth * aspectRatio}
          alt="saptakarya"
          priority={true}
        />
      </Link>

      <ActionButton />
    </nav>
  )
}

export default Index