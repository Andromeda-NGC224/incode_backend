import { BadRequestException, NotFoundException } from 'common/exceptions';
import { MediaUserRepository } from './media.user.repository';
import { CloudinaryService } from 'common/services/cloudinary-service';
import { UserAvatarEntity } from './media.user.entity';

class MediaUserServiceClass {
  constructor(
    private readonly mediaUserRepository = MediaUserRepository,
    private readonly cloudinaryService = CloudinaryService,
  ) {}

  async uploadUserMedia(
    file: Express.Multer.File | undefined,
    userId: number,
  ): Promise<UserAvatarEntity> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const { url, publicId } = await this.cloudinaryService.upload({
      buffer: file.buffer,
    });

    const existingMedia = await this.mediaUserRepository.findByUserId(userId);

    if (existingMedia) {
      await this.cloudinaryService.delete(existingMedia.cloudinaryId);
      const updatedMedia = await this.mediaUserRepository.updateByUserId(
        userId,
        url,
        publicId,
      );

      if (!updatedMedia) {
        throw new NotFoundException(`User media for user ${userId} not found`);
      }

      return updatedMedia;
    }

    return this.mediaUserRepository.create({
      url,
      cloudinaryId: publicId,
      userId,
    });
  }
}

export const MediaUserService = new MediaUserServiceClass();
