import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dkxznfibk',
  api_key: '729235222668485',
  api_secret: 'NOI3dbKAO7xMqSUy8u0ww5rxg3Q',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'minteau',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  } as any,
});

export const cloudinaryMiddleware = multer({ storage });

export const cloudinaryDelete = async (public_id: string) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (err) {
    console.error('Cloudinary fail to delete image');
  }
};
