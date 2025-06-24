import { cloudinary } from './cloudinary.config';
import type { UploadApiResponse } from 'cloudinary';
import { UploadFile } from './types';
import { BadRequestException } from 'common/exceptions';

export const uploadStreamPromise = (
  file: UploadFile,
  folder: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          return reject(
            new BadRequestException('Could not upload file to Cloudinary'),
          );
        }
        if (!result) {
          return reject(
            new BadRequestException('No result returned from Cloudinary'),
          );
        }
        resolve(result);
      },
    );
    stream.end(file.buffer);
  });
};
