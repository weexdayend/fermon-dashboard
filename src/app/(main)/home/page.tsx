import React from 'react'

import { getServerAuthSession } from '@/servers/auth'
import UserInfo from '@/components/pages/home/user-info'

const Home = async () => {  
  const authSession = await getServerAuthSession()

  return (
    <div>
      <pre>{ authSession && <UserInfo user={authSession.user} /> }</pre>
      
    </div>
  )
}

export default Home