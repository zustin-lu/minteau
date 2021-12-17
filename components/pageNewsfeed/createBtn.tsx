import { FC } from 'react';

import { Button, Modal } from 'components';
import { useModal } from 'hooks';
import Form from './form';

const CreateFeedBtn: FC = () => {
  const { props, actions } = useModal({ title: 'Tạo bài đăng' });

  return (
    <>
      <Button
        variant="info"
        onClick={actions.open}
        className="sticky top-14 z-10 block ml-auto"
      >
        Tạo bài đăng
      </Button>
      <Modal {...props}>
        <Form onSubmited={actions.hide} />
      </Modal>
    </>
  );
};

export default CreateFeedBtn;
