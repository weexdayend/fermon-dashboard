import React from 'react'

import { getServerAuthSession } from '@/servers/auth'

const Home = async () => {  
  const authSession = await getServerAuthSession()

  return (
    <div>
      <pre>{ authSession && JSON.stringify(authSession?.user) }</pre>
    </div>
  )
}

export default Home