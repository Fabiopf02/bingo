import { Request, Response } from 'express';
import { Token } from '../../utils/token';
import { CreateSessionService } from './CreateSessionService';

export class CreateSessionController {
  constructor(private createSession: CreateSessionService) {
    this.createSession = createSession;
  }

  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const userSession = await this.createSession.execute({ email, password });

      const token = Token.generate(userSession._id);

      return response.status(200).json({ user: userSession, token });
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
