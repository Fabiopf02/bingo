import { MongoUsersRepository } from '../../repositories/implementations/MongoUsersRepository';
import { CreateSessionController } from './CreateSessionController';
import { CreateSessionService } from './CreateSessionService';

const mongoUsersRepository = new MongoUsersRepository();
const createSessionService = new CreateSessionService(mongoUsersRepository);
const createSessionController = new CreateSessionController(
  createSessionService,
);

export { createSessionController };
