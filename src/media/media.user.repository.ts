import { AppDataSource } from 'database';
import { UserAvatarEntity } from './media.user.entity';

class UserAvatarRepositoryClass {
  private readonly repo = AppDataSource.getRepository(UserAvatarEntity);

  create(data: Pick<UserAvatarEntity, 'url' | 'userId' | 'cloudinaryId'>) {
    const created = this.repo.create(data);
    return this.repo.save(created);
  }

  findByUserId(userId: number) {
    return this.repo.findOneBy({ userId });
  }

  async updateByUserId(userId: number, url: string, cloudinaryId: string) {
    const avatar = await this.findByUserId(userId);
    if (!avatar) return null;
    avatar.url = url;
    avatar.cloudinaryId = cloudinaryId;
    return this.repo.save(avatar);
  }

  async deleteByCloudinaryId(cloudinaryId: string) {
    return this.repo.delete({ cloudinaryId });
  }
}

export const UserAvatarRepository = new UserAvatarRepositoryClass();
