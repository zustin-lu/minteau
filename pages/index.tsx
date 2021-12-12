import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import Image from 'next/image';
import Header from 'next/head';

import { apiClient, toast, localStorage } from 'helpers';
import { routes } from 'constant';
import { useAuth } from 'hooks';
import { Button, Input } from 'components';

type Fields = {
  pwd: string;
};
function Auth() {
  const router = useRouter();
  const { control, handleSubmit, reset, setFocus } = useForm<Fields>({
    defaultValues: { pwd: '' },
  });

  const { isDirty, isSubmitting, isSubmitSuccessful } = useFormState({
    control,
  });

  const { authState } = useAuth({
    onAuthStateChange(state) {
      if (state === 'authenticated') {
        router.replace(routes.home());
      }
    },
  });

  const submitHandler: SubmitHandler<Fields> = async ({ pwd }) => {
    try {
      const { data } = await apiClient.post.auth({ pwd });
      const { expiredAt } = data.payload || {};
      localStorage.set('authExpiredAt', expiredAt);
      toast.success('Chúc mừng đồng chí đã nhập đúng mật khẩu');
      router.replace(routes.home());
    } catch (err) {
      toast.info('Sai mật khẩu rồi đồng chí ơiii');
      reset();
      setFocus('pwd');
    }
  };

  if (authState === 'authenticated') {
    return null;
  }

  return (
    <div
      className="container mx-auto px-12 py-4 flex flex-col items-center justify-center"
      style={{ height: '100vh' }}
    >
      <div
        className="rounded-full overflow-hidden relative"
        style={{ width: 160, height: 160 }}
      >
        <Image src="/images/minteau.jpeg" layout="fill" className="rounded" />
      </div>

      <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
        <div className="text-sm font-normal text-gray-500 mt-6">
          Mật khẩu là nước uống yêu thích của em, viết liền không dấu
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
              placeholder="Mời yangho nhập mật khẩu"
            />
          )}
        />

        <Button
          type="submit"
          variant="info"
          className="w-full"
          disabled={isSubmitting || !isDirty || isSubmitSuccessful}
        >
          Dzoooooooo
        </Button>
      </form>
    </div>
  );
}

Auth.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header>For Minteau</Header>
      {page}
    </>
  );
};

export default Auth;
