import { UserAvatarEntity } from './media.user.entity';
import { UserAvatarRepository } from './media.user.repository';
import { deleteFileFromCloudinary } from 'common/services/cloudinary-service/cloudinary.service';

class UserAvatarServiceClass {
  async createOrUpdate(
    userId: number,
    url: string,
    cloudinaryId: string,
  ): Promise<UserAvatarEntity> {
    const existing = await UserAvatarRepository.findByUserId(userId);
    if (existing) {
      await deleteFileFromCloudinary(existing.cloudinaryId);
      const updated = await UserAvatarRepository.updateByUserId(
        userId,
        url,
        cloudinaryId,
      );
      if (updated) return updated;
    }
    return UserAvatarRepository.create({ userId, url, cloudinaryId });
  }

  async getByUserId(userId: number): Promise<UserAvatarEntity | null> {
    return UserAvatarRepository.findByUserId(userId);
  }
}

export const UserAvatarService = new UserAvatarServiceClass();
