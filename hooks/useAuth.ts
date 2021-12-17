import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
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

  const [status, setStatus] = useState<AuthStates>('idle');
  const [authState, setAuthRecoilState] = useRecoilState(globalStates.auth);

  useEffect(() => {
    const value = localStorage.get('authInfo');
    if (value) {
      const { expiredAt, ...rest } = value;
      const isAuth = dayjs().isBefore(expiredAt);
      setAuthRecoilState(rest);
      setStatus(isAuth ? 'authenticated' : 'guess');
    } else {
      router.replace(routes.auth());
    }
  }, []);

  useEffect(() => {
    if (onAuthStateChange) {
      onAuthStateChange(status);
    }
  }, [status]);

  const logOut = () => {
    localStorage.clear();
    router.replace(routes.auth());
  };

  const resetAuth = () => {
    setAuthRecoilState({ avatarUrl: null, user: null });
  };

  return { authState: { status, ...authState }, logOut, resetAuth };
}

export default useAuth;
