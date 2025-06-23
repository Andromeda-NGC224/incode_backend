import { Request, Response } from 'express';
import { UserAvatarService } from './media.user.service';
import { cloudinaryService } from 'common/services/cloudinary-service/cloudinary.service';
import { ActiveUser } from 'common/types';

export class UserAvatarControllerClass {
  async upload(req: Request, res: Response) {
    const user = req.user as ActiveUser;
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const { url, publicId } = await cloudinaryService(
      { buffer: req.file.buffer },
      process.env.CLOUDINARY_FOLDER_NAME || 'incodeAvatars',
    );
    const avatar = await UserAvatarService.createOrUpdate(
      user.id,
      url,
      publicId,
    );
    res.status(201).json(avatar);
  }

  async update(req: Request, res: Response) {
    const user = req.user as ActiveUser;
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const { url, publicId } = await cloudinaryService(
      { buffer: req.file.buffer },
      process.env.CLOUDINARY_FOLDER_NAME || 'incodeAvatars',
    );
    const avatar = await UserAvatarService.createOrUpdate(
      user.id,
      url,
      publicId,
    );
    res.status(200).json(avatar);
  }
}

export const UserAvatarController = new UserAvatarControllerClass();
