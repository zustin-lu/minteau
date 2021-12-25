import axios from 'axios';
import { useState } from 'react';

const apiInstance = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/dkxznfibk/image/upload',
});

export default function useCloudinaryClient() {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const upload = async (files: any[]) => {
    setIsUploading(true);
    const formData = new FormData();
    const promises = files.map((file) => {
      formData.append('file', file);
      formData.append('upload_preset', 'adpppr45');
      return new Promise((resolve, reject) => {
        apiInstance
          .post('/', formData)
          .then(({ data: { public_id, url } = {} }) => {
            resolve({ public_id, url });
          })
          .catch((err) => reject(err));
      });
    });
    const pictures = await Promise.all(promises);
    setIsUploading(false);
    return pictures;
  };

  return {
    upload,
    isUploading,
  };
}
