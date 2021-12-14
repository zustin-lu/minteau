import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { localStorage } from 'helpers';
import { routes } from 'constant';

type AuthStates = 'idle' | 'authenticated' | 'guess';
type UseAuthOptions = Partial<{
  onAuthStateChange: (state: AuthStates) => void;
}> | null;

function useAuth({ onAuthStateChange }: UseAuthOptions = {}) {
  const [authState, setAuthState] = useState<AuthStates>('idle');
  const router = useRouter();

  useEffect(() => {
    const expiredTime = localStorage.get('authExpiredAt');
    const isAuth = expiredTime && dayjs().isBefore(expiredTime);
    setAuthState(isAuth ? 'authenticated' : 'guess');
  }, []);

  useEffect(() => {
    if (onAuthStateChange) {
      onAuthStateChange(authState);
    }
  }, [authState]);

  const logOut = () => {
    localStorage.remove('authExpiredAt');
    router.replace(routes.auth());
  };

  return { authState, logOut };
}

export default useAuth;
