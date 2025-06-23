import { cloudinary } from './cloudinary.config';
import type { UploadApiResponse } from 'cloudinary';
import { UploadFile } from './types';

export const uploadStreamPromise = (
  file: UploadFile,
  folder: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result)
          return reject(new Error('No result returned from Cloudinary'));
        resolve(result);
      },
    );
    stream.end(file.buffer);
  });
};
