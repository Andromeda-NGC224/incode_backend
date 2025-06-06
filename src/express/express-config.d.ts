import 'express';
import { QueryParamsTaskDto } from '../task/task.types';

declare module 'express-serve-static-core' {
  interface Request {
    /**
     * @property {QueryParamsTaskDto} [validatedQuery] - Зберігає валідовані та приведені параметри запиту після обробки за допомогою Zod схем.
     */
    validatedQuery?: QueryParamsTaskDto;
  }
}
