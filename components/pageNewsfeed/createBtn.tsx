import { FC } from 'react';

import { Button, Modal } from 'components';
import { useModal } from 'hooks';
import Form from './form';

const CreateFeedBtn: FC = () => {
  const { props, actions } = useModal({ title: 'Tạo bài đăng' });

  return (
    <div className="grid grid-cols-12 gap-x-3">
      <div className="col-span-8 text-xs text-gray-700 flex items-center">
        Toi vừa sửa mấy cái lỗi linh tinh để tụi mình hem bị lỗi nựa ❤️
      </div>
      <Button
        variant="info"
        onClick={actions.open}
        className="sticky top-14 z-10 block col-span-4"
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
