import Link from 'next/link'
import RootLayout from '@/app/(main)/layout'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

const imageWidth = 400;
const aspectRatio = 50 / 80;

export default async function NotFound() {  
  return (
    <RootLayout>
      <div className='w-full h-full flex flex-col gap-12 items-center justify-center'>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <Image
            src="https://utfs.io/f/9a6e982a-e9bc-43fd-bfbe-24a299acd7f4-8e8ss3.png"
            width={imageWidth}
            height={imageWidth * aspectRatio}
            alt="saptakarya"
            priority={true}
          />
          <p className='text-xs opacity-70'>What are you looking for? there is nothing here.</p>
        </div>
        <Link href="/">
          <Button>
            greatjbb.com
          </Button>
        </Link>
      </div>
    </RootLayout>
  )
}