import { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useAuth } from 'hooks';
import { routes } from 'constant';

const DefaultLayout: FC = ({ children }) => {
  const router = useRouter();

  const { authState } = useAuth({
    onAuthStateChange(state) {
      if (state === 'guess') {
        router.replace(routes.home());
      }
    },
  });

  return (
    <>
      <Head>
        <title>For Minteau</title>
      </Head>
      <div className="w-full lg:w-5/12 mx-auto px-12 py-4 flex flex-col items-center justify-center">
        {authState === 'authenticated' && children}
      </div>
    </>
  );
};

export default DefaultLayout;
