import { ReactElement, useEffect, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import { HiChevronUp } from 'react-icons/hi';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import cn from 'classnames';

import UserLayout from 'components/layouts/user';
import { Input, Button, Header, Paragraph } from 'components';
import { apiClient, toast } from 'helpers';

type Fields = {
  score: number | '';
  reason: string | '';
};

function LoveScore() {
  const purposeRef = useRef<'increase' | 'decrease'>('increase');
  const { isLoading, data } = useQuery('totalScore', apiClient.get.loveScore);
  const mutation = useMutation('mutateScore', apiClient.post.loveScore);
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState } = useForm<Fields>({
    mode: 'onSubmit',
    defaultValues: {
      score: '',
      reason: '',
    },
  });

  const { isDirty, isSubmitting } = useFormState({ control });

  const submitHandler: SubmitHandler<Fields> = async (data) => {
    const convertPoint = purposeRef.current === 'increase' ? 1 : -1;
    mutation.mutate(
      {
        ...data,
        score: Number(data.score) * convertPoint,
      },
      {
        onSuccess(data) {
          const { payload } = data?.data;
          if (payload.score < 5) {
            toast.textOnly(
              convertPoint > 0
                ? `Chòiii oiii được cộng ${payload.score} điểm luôn 🥰`
                : `Buồn ghê, tự dưng bị trừ ${payload.score} điểm :((`
            );
          } else {
            toast.textOnly(
              convertPoint > 0
                ? `Chòi iu thương lắm mới cho ${payload.score} điểm phải hong 🥰🥰🥰`
                : `Trời sao trừ điểm nhiều dạ, cho tui xin lỗi mòoo 😱`
            );
          }
          queryClient.invalidateQueries('totalScore');
        },
        onError(error) {
          console.error(error);
          toast.error('Ơ bị lỗi rồi ><');
        },
      }
    );
  };

  return (
    <>
      <div className="relative mainImg mb-3 mx-auto">
        <Image src="/images/love-score.svg" layout="fill" />
      </div>
      <Header className="text-yellow-800 text-center">
        Tiết kiệm mua vé nàoo
      </Header>
      <div className="py-3 text-center font-semibold text-6xl text-yellow-500 mb-6">
        {isLoading ? 'Đang load nhó' : data.data?.payload?.totalScore + 'mt'}
      </div>

      <div className="bg-yellow-400 text-yellow-600 bg-opacity-20 py-4 px-3 rounded-md mb-4">
        <div className="flex items-center">
          Vé một chiều{' '}
          <a
            href="https://tre.vtc.vn/tra-tu-love-you-to-the-moon-and-back-mang-y-nghia-gi-ma-nghe-lang-man-vay-ar604924.html"
            target="_blank"
            className="inline-block underline ml-2"
          >
            Love you to the moon and back
          </a>
        </div>
        <Button
          className="mt-2"
          onClick={() => toast.error('Hết vé! Vé đã được mua bởi Chou yangho')}
        >
          1000mt / vé (sắp hết)
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-12 gap-3 mb-6"
      >
        <Controller
          name="score"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Nhập điểm vô bạn oiii',
            },
            min: {
              value: 1,
              message: 'Nhập số tự nhiên từ 1 - 1000 bạn oiii',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              errorMessage={formState.errors?.score?.message}
              type="number"
              placeholder="Nhập số điểm (bắt buộc)"
              className="col-span-12"
            />
          )}
        />
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Sao bạn cộng điểm cho tui dọ"
              className="col-span-12"
            />
          )}
        />
        <div className="col-span-full grid grid-cols-2 gap-3">
          <Button
            type="submit"
            onClick={() => (purposeRef.current = 'increase')}
            disabled={isSubmitting || !isDirty}
          >
            Thêm điểm
          </Button>
          <Button
            type="submit"
            onClick={() => (purposeRef.current = 'decrease')}
            disabled={isSubmitting || !isDirty}
          >
            Trừ điểm
          </Button>
        </div>
      </form>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>Đừng ấn vô đây, không sẽ bị shock á</span>
              <HiChevronUp
                className={cn(open && 'transform rotate-180', 'w-5 h-5')}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500 px-3 py-2">
              <Paragraph>
                Cuối cùng cùng làm này làm kia xong rồi nè 😜 Dù cho kết quả có
                ra sao, thì ít nhất tui cũng đã cho Yangho của tui 1000 niềm vui
                🥰
              </Paragraph>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <style jsx>{`
        .mainImg {
          width: 60vw;
          height: 60vw;
        }

        @media (min-width: 768px) {
          .mainImg {
            width: 15vw;
            height: 15vw;
          }
        }
      `}</style>
    </>
  );
}

LoveScore.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default LoveScore;
