import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import Image from 'next/image';

import { apiClient, toast, localStorage } from 'helpers';
import { routes } from 'constant';
import { Button, Input } from 'components';
import { useAuth } from 'hooks';

type Fields = {
  pwd: string;
};

const LoginForm: FC = () => {
  const router = useRouter();
  const { authState, resetAuth } = useAuth();

  const { control, handleSubmit, reset, setFocus } = useForm<Fields>({
    defaultValues: { pwd: '' },
  });

  const { isDirty, isSubmitting, isSubmitSuccessful } = useFormState({
    control,
  });

  const submitHandler: SubmitHandler<Fields> = async ({ pwd }) => {
    try {
      const { data } = await apiClient.post.auth({
        pwd,
        user: authState.user,
      });
      const response = data.payload || {};
      localStorage.set('authInfo', response);
      toast.success('Chúc mừng đồng chí đã nhập đúng mật khẩu');
      router.replace(routes.home());
    } catch (err) {
      toast.info('Sai mật khẩu rồi đồng chí ơiii');
      reset();
      setFocus('pwd');
    }
  };

  const isMinteau = authState.user === 'minteau';

  if (!authState.user) {
    return null;
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
      <div
        className="rounded-full overflow-hidden relative mx-auto mb-6"
        style={{ width: 100, height: 100 }}
      >
        <Image src={authState.avatarUrl} layout="fill" className="rounded" />
      </div>

      <div className="text-sm font-normal text-gray-500 mt-6">
        Mời đồng chí nhập mật khẩu
      </div>

      <Controller
        control={control}
        name="pwd"
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input
            {...field}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            type="password"
            placeholder={
              isMinteau
                ? 'Mời yangho nhập mật khẩu'
                : 'Mời bồ không tèo của yangho nhập mật khẩu'
            }
          />
        )}
      />

      <Button
        type="submit"
        variant="info"
        className="w-full"
        disabled={isSubmitting || !isDirty || isSubmitSuccessful}
      >
        Đăng nhập
      </Button>
      <Button className="w-full" onClick={resetAuth}>
        Chọn tài khoản khác
      </Button>
    </form>
  );
};

export default LoginForm;
