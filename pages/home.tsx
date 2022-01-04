import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import UserLayout from 'components/layoutUser';
import { Header, CountDown } from 'components';
import { useMenu } from 'hooks';

function Home() {
  const { menuRoutes } = useMenu({ removeCurrentPage: true });

  return (
    <>
      <div className="relative aspect-square w-1/2 mx-auto mb-8 rounded-full overflow-hidden">
        <Image src="/images/couplemint.jpeg" layout="fill" />
      </div>
      <Header variant="head2" className="text-center mb-6">
        <CountDown />
      </Header>
      <div className="space-y-2 text-gray-700">
        {menuRoutes.map((i) => (
          <Link href={i.pathname} key={i.pathname}>
            <a
              className={cn(
                'block p-4 rounded text-center',
                i.isNew
                  ? 'bg-blue-300 bg-opacity-20 border border-blue-300 text-blue-600'
                  : 'bg-gray-300 bg-opacity-10'
              )}
            >
              {i.text}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Home;
