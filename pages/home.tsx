import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import UserLayout from 'components/layouts/user';
import { Modal, Button, Header } from 'components';
import { useMenu } from 'hooks';

function Home() {
  const router = useRouter();

  const { menuRoutes } = useMenu({ removeCurrentPage: true });

  return (
    <>
      <div className="relative mainImg mb-4">
        <Image src="/images/home.svg" layout="fill" />
      </div>
      <Header variant="head2" className="text-center">
        Chou đi đâu đấy?
      </Header>
      <div className="space-y-2 text-gray-700">
        {menuRoutes.map((i) => (
          <Link href={i.pathname} key={i.pathname}>
            <a className="block py-3 px-4 rounded bg-gray-300 bg-opacity-10">
              {i.text}
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .mainImg {
          width: 60vw;
          height: 40vw;
        }

        @media (min-width: 768px) {
          .mainImg {
            width: 18vw;
            height: 12vw;
          }
        }
      `}</style>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Home;
