import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { apiClient, toast } from 'helpers';

type Props = {
  id: string;
};

const DeleteBtn: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.delete.feed, {
    onSuccess() {
      queryClient.invalidateQueries('newsfeed');
    },
    onError() {
      toast.error('Lỗi ồi xóa hong được');
    },
  });

  return (
    <div
      className="text-sm text-blue-800 w-full text-right cursor-pointer"
      onClick={() =>
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Xác nhận xóa
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Bạn có muốn xóa bài đăng này không?
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l border-gray-200">
              <button
                onClick={() => {
                  toast.remove(t.id);
                  mutation.mutate(id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg px-4 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Có
              </button>
              <button
                onClick={() => toast.remove(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg px-4 py-2 flex items-center justify-center text-sm font-medium text-red-600 hover:bg-gray-100"
              >
                Không
              </button>
            </div>
          </div>
        ))
      }
    >
      Xóa
    </div>
  );
};

export default DeleteBtn;
