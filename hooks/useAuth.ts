import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';

import { localStorage } from 'helpers';
import { routes } from 'constant';
import { globalStates } from 'store';

type AuthStates = 'idle' | 'authenticated' | 'guess';
type UseAuthOptions = Partial<{
  onAuthStateChange: (state: AuthStates) => void;
}> | null;

function useAuth({ onAuthStateChange }: UseAuthOptions = {}) {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthStates>('idle');
  const setAuthRecoilState = useSetRecoilState(globalStates.auth);

  useEffect(() => {
    const value = localStorage.get('authInfo');
    if (value) {
      const { expiredAt, ...rest } = value;
      const isAuth = dayjs().isBefore(expiredAt);
      setAuthRecoilState(rest);
      setAuthState(isAuth ? 'authenticated' : 'guess');
    }
  }, []);

  useEffect(() => {
    if (onAuthStateChange) {
      onAuthStateChange(authState);
    }
  }, [authState]);

  const logOut = () => {
    localStorage.clear();
    router.replace(routes.auth());
  };

  return { authState, logOut };
}

export default useAuth;
