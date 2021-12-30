import { FC } from 'react';

import { Button, Modal } from 'components';
import { useModal } from 'hooks';
import Form from './form';

const CreateFeedBtn: FC = () => {
  const { props, actions } = useModal({ title: 'Tạo bài đăng' });

  return (
    <div className="grid grid-cols-12 gap-3">
      <Button
        variant="info"
        onClick={actions.open}
        className="sticky top-14 z-10 block col-span-12 lg:col-start-8 lg:col-span-5"
      >
        Tạo bài đăng
      </Button>
      <Modal {...props}>
        <Form onSubmited={actions.hide} />
      </Modal>
    </div>
  );
};

export default CreateFeedBtn;
