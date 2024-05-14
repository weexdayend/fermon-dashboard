import Image from 'next/legacy/image'
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
          src="https://raw.githubusercontent.com/weexdayend/fermon-dashboard/e0c322c7aa39b91fbeb62208893fc1e07b910d2d/public/assets/icons/logo-pi-warna.svg"
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