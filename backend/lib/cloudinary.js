// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'fmax-profiles',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ width: 500, height: 500, crop: 'limit' }],
//   },
// });

// export default cloudinary;

import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'sbl-dashboard'
    });
    
    // Delete file from local storage after upload
    fs.unlinkSync(file.path);
    
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};