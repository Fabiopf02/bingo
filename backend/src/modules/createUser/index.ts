import { MongoUsersRepository } from '../../repositories/implementations/MongoUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUserService';

const mongoUsersRepository = new MongoUsersRepository();
const createUserService = new CreateUserService(mongoUsersRepository);
const createUserController = new CreateUserController(createUserService);

export { createUserController };
