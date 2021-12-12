import { useEffect, useState } from 'react';
import { localStorage } from 'helpers';

import dayjs from 'dayjs';

type AuthStates = 'idle' | 'authenticated' | 'guess';
type UseAuthOptions = Partial<{
  onAuthStateChange: (state: AuthStates) => void;
}> | null;

function useAuth({ onAuthStateChange }: UseAuthOptions = {}) {
  const [authState, setAuthState] = useState<AuthStates>('idle');

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

  return { authState };
}

export default useAuth;
