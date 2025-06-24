import 'express';
import { ActiveUser, QueryParamsDtoSchema } from 'common/types';

declare module 'express-serve-static-core' {
  interface Request {
    /**
     * @property {QueryParamsDtoSchema} [validatedQuery] - Зберігає валідовані та приведені параметри запиту після обробки за допомогою Zod схем.
     */
    validatedQuery?: QueryParamsDtoSchema;

    user: ActiveUser;
    file?: Express.Multer.File;
  }
}
