import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import Link from 'next/link';
import cn from 'classnames';

import { useAuth, useMenu } from 'hooks';
import { Button, Modal } from 'components';
import { globalStates } from 'store';

const MenuButton: FC = () => {
  const { menuRoutes } = useMenu();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const authState = useRecoilValue(globalStates.auth);

  const { logOut } = useAuth();

  return (
    <>
      <AiOutlineMenu
        className="ml-auto text-2xl"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        title={`Chào ${authState.user}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {menuRoutes.map((i) => (
          <Link href={i.pathname} key={i.pathname}>
            <a
              className={cn(
                'relative text-gray-900 py-2 pl-10 pr-4 hover:bg-blue-500 hover:bg-opacity-20 rounded block',
                i.isActive && 'bg-blue-500 bg-opacity-10'
              )}
            >
              {i.isActive && (
                <span
                  className={`${
                    true ? 'text-blue-600' : 'text-blue-600'
                  } absolute inset-y-0 left-0 flex items-center pl-3`}
                >
                  <HiCheck className="w-5 h-5" aria-hidden="true" />
                </span>
              )}
              {i.text}
            </a>
          </Link>
        ))}
        <Button variant="error" className="ml-auto mt-3" onClick={logOut}>
          Đăng xuất
        </Button>
      </Modal>
    </>
  );
};

export default MenuButton;
