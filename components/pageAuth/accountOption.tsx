import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import Image from 'next/image';

import { Button } from 'components';
import { globalStates } from 'store';

type Props = {
  avatarUrl: string;
  name: 'lmint' | 'minteau';
};

const AccountOption: FC<Props> = ({ name, avatarUrl }) => {
  const setAuthState = useSetRecoilState(globalStates.auth);

  return (
    <Button
      className="flex items-center space-x-2 bg-gray-200 hover:bg-blue-200 p-3 rounded-lg cursor-pointer w-full"
      onClick={() => {
        setAuthState({
          user: name,
          avatarUrl,
        });
      }}
    >
      <div
        className="rounded-full overflow-hidden relative"
        style={{ width: 35, height: 35 }}
      >
        <Image src={avatarUrl} layout="fill" className="rounded" />
      </div>
      <span className="text-gray-700">{name}</span>
    </Button>
  );
};

export default AccountOption;
