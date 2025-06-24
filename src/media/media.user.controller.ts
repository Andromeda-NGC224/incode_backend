import { Request, Response } from 'express';
import { AbstractController } from 'common/abstract';
import { MediaUserService } from './media.user.service';

class MediaUserControllerClass extends AbstractController {
  constructor(private readonly mediaUserService = MediaUserService) {
    super();
  }

  async uploadUserMedia(req: Request, res: Response) {
    const uploadedImage = await this.mediaUserService.uploadUserMedia(
      req.file,
      req.user.id,
    );

    res.json(uploadedImage);
  }
}

export const MediaUserController = new MediaUserControllerClass();
