import { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import { useAuth, useMenu } from 'hooks';
import { routes } from 'constant';
import { Button, Modal } from 'components';

const UserLayout: FC = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useMemo(() => new QueryClient(), []);

  const { authState, logOut } = useAuth({
    onAuthStateChange(state) {
      if (state === 'guess') {
        router.replace(routes.auth());
      }
    },
  });

  const { menuRoutes } = useMenu();

  if (authState !== 'authenticated') {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>For Minteau</title>
      </Head>
      <div className="w-full lg:w-4/12 mx-auto px-4 lg:px-8 py-4 flex flex-col items-center justify-center relative">
        <div className="sticky top-0 left-0 right-0 w-full bg-white border-b flex items-center px-3 py-3 z-50">
          <Link href={routes.home()}>
            <a className="flex items-center">
              <Image src="/images/logo.svg" width={120} height={28} />
            </a>
          </Link>
          <AiOutlineMenu
            className="ml-auto text-2xl"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="pt-6 w-full">
          {authState === 'authenticated' && children}
        </div>
        <Modal title="Menu" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {menuRoutes.map((i) => (
            <Link href={i.pathname} key={i.pathname}>
              <a
                className={cn(
                  'relative text-gray-900 py-2 pl-10 pr-4 hover:bg-blue-500 hover:bg-opacity-20 rounded block',
                  i.isActive && 'bg-blue-500 bg-opacity-10'
                )}
              >
                {i.isActive && (
                  <span
                    className={`${
                      true ? 'text-blue-600' : 'text-blue-600'
                    } absolute inset-y-0 left-0 flex items-center pl-3`}
                  >
                    <HiCheck className="w-5 h-5" aria-hidden="true" />
                  </span>
                )}
                {i.text}
              </a>
            </Link>
          ))}
          <Button variant="error" className="ml-auto mt-3" onClick={logOut}>
            Đăng xuất
          </Button>
        </Modal>
      </div>
    </QueryClientProvider>
  );
};

export default UserLayout;
