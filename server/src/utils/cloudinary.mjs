import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = (folder = "ecom") => {
    return new CloudinaryStorage({
        cloudinary,
        params: {
            folder: folder || 'default',
            //allowed_formats: ['jpg', 'png', 'jpeg'],
            //transformation: [{ width: 500, height: 500, crop: 'limit' }],
        }
    });
};

export { cloudinary };
