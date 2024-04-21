import { getServerAuthSession } from '@/servers/auth'

export async function getServerSideProps() {
  const authSession = await getServerAuthSession();

  return {
    props: {
      authSession,
    },
  };
}