import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Header from 'next/head';

import { routes } from 'constant';
import { useAuth } from 'hooks';
import { SelectAccount, LoginForm } from 'components';

function Auth() {
  const router = useRouter();

  const { authState } = useAuth({
    onAuthStateChange(state) {
      if (state === 'authenticated') {
        router.replace(routes.home());
      }
    },
  });

  if (authState === 'authenticated') {
    return null;
  }

  return (
    <div
      className="mx-auto px-12 py-4 flex flex-col items-center justify-center bg-gray-100"
      style={{ height: '100vh' }}
    >
      <SelectAccount />
      <LoginForm />
    </div>
  );
}

Auth.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header>For Minteau</Header>
      {page}
    </>
  );
};

export default Auth;
