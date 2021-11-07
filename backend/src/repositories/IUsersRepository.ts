import { User } from '../entities/User';

export interface IUsersRepository {
  save(data: User): Promise<string>;
  findByEmail(email: string): Promise<(User & { _id: string }) | null>;
  userExists(userId: string): Promise<boolean>;
  // update(data: Omit<User, 'email'>): Promise<void>;
}
