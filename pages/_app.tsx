import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import '../public/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      {getLayout(
        <>
          <Component {...pageProps} />
          <Toaster />
        </>
      )}
    </RecoilRoot>
  );
}

export default MyApp;
