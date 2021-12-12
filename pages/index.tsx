import { ReactElement, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from 'next/head';

import { apiClient, toast, localStorage } from 'helpers';
import { routes } from 'constant';
import { useAuth } from 'hooks';

export default function Home() {
  const pwdRef = useRef();
  const router = useRouter();

  const { authState } = useAuth({
    onAuthStateChange(state) {
      if (state === 'authenticated') {
        router.replace(routes.greeting());
      }
    },
  });

  const handleSubmit = async () => {
    try {
      const pwdValue = (pwdRef.current as any).value;
      const { data } = await apiClient.post.auth({ pwd: pwdValue });
      const { expiredAt } = data.payload || {};
      localStorage.set('authExpiredAt', expiredAt);
      toast.success('Chúc mừng đồng chí đã nhập đúng mật khẩu');
      router.push(routes.greeting());
    } catch (err) {
      toast.info('Sai mật khẩu rồi đồng chí ơiii');
    }
  };

  if (authState === 'idle') {
    return null;
  }

  return (
    <div
      className="container mx-auto px-12 py-4 flex flex-col items-center justify-center"
      style={{ height: '100vh' }}
    >
      <div
        className="rounded-full overflow-hidden relative"
        style={{ width: 160, height: 160 }}
      >
        <Image src="/images/minteau.jpeg" layout="fill" className="rounded" />
      </div>

      <div className="space-y-3">
        <div className="text-sm font-normal text-gray-500 mt-6">
          Mật khẩu là nước uống yêu thích của em, viết liền không dấu
        </div>

        <input
          ref={pwdRef}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          type="password"
          placeholder="Mời yangho nhập mật khẩu"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleSubmit}
        >
          Dzoooooooo
        </button>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header>For Minteau</Header>
      {page}
    </>
  );
};
