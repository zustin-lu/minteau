import { FC } from 'react';

import AccountOption from './accountOption';
import { Header, Paragraph } from 'components';
import { useAuth } from 'hooks';

const AuthSelect: FC = () => {
  const { authState } = useAuth();

  if (authState.user) {
    return null;
  }

  return (
    <div className="space-y-3">
      <Header variant="head3">Chọn tài khoản của bạn</Header>
      <AccountOption avatarUrl="/images/minteau.jpeg" name="minteau" />
      <AccountOption avatarUrl="/images/lmint.jpeg" name="lmint" />

      <Paragraph className="text-center text-sm text-gray-400">
        Doublemint ❤️
      </Paragraph>
    </div>
  );
};

export default AuthSelect;
