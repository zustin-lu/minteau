import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from 'hooks';
import { routes } from 'constant';

import MenuButton from './menuButton';

const UserLayout: FC = ({ children }) => {
  const router = useRouter();
  const queryClient = useMemo(() => new QueryClient(), []);

  const { authState } = useAuth({
    onAuthStateChange(state) {
      if (state === 'guess') {
        router.replace(routes.auth());
      }
    },
  });

  if (authState.status !== 'authenticated') {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>For Minteau</title>
      </Head>
      <div className="w-full lg:w-4/12 mx-auto px-4 lg:px-8 pb-4 flex flex-col items-center justify-center relative">
        <div className="sticky top-0 left-0 right-0 w-full bg-white border-b flex items-center px-3 py-3 z-10">
          <Link href={routes.home()}>
            <a className="flex items-center">
              <Image src="/images/logo.svg" width={120} height={28} />
            </a>
          </Link>
          <MenuButton />
        </div>
        <div className="pt-4 w-full">
          {authState.status === 'authenticated' && children}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default UserLayout;
