import { BadRequestException } from 'common/exceptions';
import { MediaUserRepository } from './media.user.repository';
import { CloudinaryService } from 'common/services/cloudinary-service';
import { UserAvatarEntity } from './media.user.entity';

class MediaUserServiceClass {
  constructor(private readonly mediaUserRepository = MediaUserRepository) {}

  async uploadUserMedia(
    file: Express.Multer.File | undefined,
    userId: number,
  ): Promise<UserAvatarEntity> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const { url, publicId } = await CloudinaryService.upload({
      buffer: file.buffer,
    });

    const existingMedia = await this.mediaUserRepository.findByUserId(userId);

    if (existingMedia) {
      await CloudinaryService.delete(existingMedia.cloudinaryId);
      return this.mediaUserRepository.updateByUserId(
        userId,
        url,
        publicId,
      ) as Promise<UserAvatarEntity>;
    }

    return this.mediaUserRepository.create({
      url,
      cloudinaryId: publicId,
      userId,
    });
  }
}

export const MediaUserService = new MediaUserServiceClass();
