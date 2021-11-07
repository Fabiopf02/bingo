import { User } from '../../entities/User';
import UserSchema from '../../schemas/User';
import { IUsersRepository } from '../IUsersRepository';

export class MongoUsersRepository implements IUsersRepository {
  async save(data: User): Promise<string> {
    const response = await UserSchema.create(data);
    return String(response._id);
  }

  async findByEmail(email: string): Promise<(User & { _id: string }) | null> {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return null;
    }
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await UserSchema.findById(userId);

    return Boolean(user);
  }
}
