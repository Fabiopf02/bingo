import { Request, Response } from 'express';
import { Token } from '../../utils/token';
import { CreateUserService } from './CreateUserService';

export class CreateUserController {
  constructor(private createUser: CreateUserService) {
    this.createUser = createUser;
  }

  async handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const userId = await this.createUser.execute({ name, email, password });

      const token = Token.generate(userId);

      return response.status(201).json({ _id: userId, token });
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
