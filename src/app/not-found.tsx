import Link from 'next/link'
import RootLayout from '@/app/(main)/layout'
import { getServerAuthSession } from '@/servers/auth'

export default async function NotFound() {
  const authSession = await getServerAuthSession()
  
  return (
    <RootLayout>
      <div>
        {authSession ? <Link href="/home">Go back to Home</Link> : <Link href="/sign-in">Login dulu</Link>}
      </div>
    </RootLayout>
  )
}