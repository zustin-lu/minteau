import { atom } from 'recoil';

type AuthAtom = {
  user: 'lmint' | 'minteau' | null;
  avatarUrl: string;
};

export const globalStates = {
  auth: atom<AuthAtom>({
    key: 'authAtom',
    default: {
      user: null,
      avatarUrl: null,
    },
  }),
};
