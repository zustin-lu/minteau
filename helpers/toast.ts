import { toast as t } from 'react-hot-toast';

const toast = {
  instance: t,
  ...t,
  textOnly: (msg: string) => t.success(msg, { icon: '' }),
  success: (msg: string) => t.success(msg),
  error: (msg: string) => t.error(msg),
  warning: (msg: string) => t(msg, { icon: '⚠️' }),
  info: (msg: string) => t(msg, { icon: '😜' }),
  myPromise: (myPromise: Promise<unknown>) =>
    t.promise(
      myPromise,
      {
        loading: 'Đang load nhó...',
        success: 'Thành công rồi nhó!',
        error: 'Ôi trời nó lỗi server gòiii',
      },
      {
        loading: {
          icon: '🔥',
        },
      }
    ),
};

export default toast;
