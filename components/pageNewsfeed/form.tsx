import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePicture, AiFillCloseCircle } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';

import { apiClient, toast } from 'helpers';
import { useAuth, useImagePreview } from 'hooks';
import { Button } from 'components';

type Fields = {
  images: Array<typeof File>;
  caption: string;
};

type Props = {
  onSubmited?: () => void;
};

const NewsfeedForm: FC<Props> = ({ onSubmited }) => {
  const { register, getValues, setValue, watch, formState, reset } =
    useForm<Fields>({
      defaultValues: {
        images: [],
        caption: '',
      },
    });

  const { authState } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.post.feed, {
    onSuccess() {
      toast.success('Post của bạn đã được đăng gòi ớ!');
      queryClient.invalidateQueries('newsfeed');
      onSubmited?.();
      reset();
    },
  });

  const previews = useImagePreview(watch('images'));

  const handleFileChange = async (e) => {
    const newFile = e.target.files[0];
    const images = getValues('images');
    setValue('images', [...images, newFile]);
  };

  const handleSubmit = () => {
    const imageValues = getValues('images');
    const captionValue = getValues('caption');

    const formData = new FormData();
    for (const file of imageValues) {
      formData.append('images', file as any);
    }
    formData.append('caption', captionValue);
    formData.append('author', authState.user);
    mutation.mutate(formData);
  };

  const handleRemoveImage = (idx: number) => {
    const images = [...getValues('images')];
    images.splice(idx, 1);
    setValue('images', images);
  };

  return (
    <>
      <label htmlFor="uploadInput">
        <div className="inline-flex justify-center items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 bg-gray-400 text-gray-600 mb-3">
          <AiOutlinePicture />
          <span>Thêm ảnh</span>
        </div>
        <input
          className="w-0 h-0 hidden"
          id="uploadInput"
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleFileChange}
        />
      </label>
      {Boolean(previews?.length) && (
        <div className="flex flex-wrap space-x-3 mb-3">
          {previews.map((preview, idx) => (
            <div className="w-20 h-20 relative">
              <AiFillCloseCircle
                className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 text-red-600 text-2xl"
                onClick={() => handleRemoveImage(idx)}
              />
              <img
                src={preview}
                className="max-w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
      <textarea
        rows={4}
        className="resize-none border outline-none rounded-lg w-full p-2 text-gray-600"
        placeholder="Nhập nội dung ở đây nè bé"
        {...register('caption')}
      ></textarea>
      <Button
        onClick={handleSubmit}
        variant="info"
        disabled={mutation.isLoading || !formState.isDirty}
        className="ml-auto mt-3"
      >
        {mutation.isLoading ? 'Đang tạo ...' : 'Tạo bài viết'}
      </Button>
    </>
  );
};

export default NewsfeedForm;
