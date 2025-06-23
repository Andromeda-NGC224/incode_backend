import { cloudinary } from './cloudinary.config';
import { uploadStreamPromise } from './cloudinary.utils';
import type { CloudinaryUploadResult, UploadFile } from './types';

export const cloudinaryService = async (
  file: UploadFile,
  folder: string,
): Promise<CloudinaryUploadResult> => {
  try {
    const result = await uploadStreamPromise(file, folder);
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Could not upload file to Cloudinary');
  }
};

export const deleteFileFromCloudinary = async (
  publicId: string,
): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Could not delete file from Cloudinary');
  }
};
