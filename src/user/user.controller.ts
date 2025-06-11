import { Response } from 'express';
import { TypedRequest } from 'common/types';
import { AbstractController } from 'common/abstract';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, QueryParamsUserDto } from './user.types';

export class UserControllerClass extends AbstractController {
  constructor(private readonly userService = UserService) {
    super();
  }

  async getAll(
    req: TypedRequest<{ query: QueryParamsUserDto }>,
    res: Response,
  ) {
    const users = await this.userService.getAll(req.query);
    res.json(users);
  }

  async create(req: TypedRequest<{ body: CreateUserDto }>, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }

  async update(
    req: TypedRequest<{ params: { id: number }; body: UpdateUserDto }>,
    res: Response,
  ) {
    const user = await this.userService.update(req.params.id, req.body);
    res.status(201).json(user);
  }

  async getById(req: TypedRequest<{ params: { id: number } }>, res: Response) {
    const user = await this.userService.findOne('id', req.params.id);
    res.status(201).json(user);
  }

  async delete(req: TypedRequest<{ params: { id: number } }>, res: Response) {
    const user = await this.userService.delete(req.params.id);
    res.status(201).json(user);
  }
}

export const UserController = new UserControllerClass();
