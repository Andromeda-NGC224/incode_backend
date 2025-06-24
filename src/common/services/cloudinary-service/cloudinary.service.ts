import { BadRequestException } from 'common/exceptions';
import { cloudinary } from './cloudinary.config';
import { uploadStreamPromise } from './cloudinary.utils';
import type { CloudinaryUploadResult, UploadFile } from './types';

class CloudinaryServiceClass {
  private readonly defaultFolder: string;

  constructor() {
    this.defaultFolder = process.env.CLOUDINARY_FOLDER_NAME || 'incodeAvatars';
  }

  async upload(
    file: UploadFile,
    folder?: string,
  ): Promise<CloudinaryUploadResult> {
    const uploadFolder = folder || this.defaultFolder;
    const result = await uploadStreamPromise(file, uploadFolder);
    return { url: result.secure_url, publicId: result.public_id };
  }

  async delete(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (_error) {
      throw new BadRequestException('Could not delete file from Cloudinary');
    }
  }
}

export const CloudinaryService = new CloudinaryServiceClass();
