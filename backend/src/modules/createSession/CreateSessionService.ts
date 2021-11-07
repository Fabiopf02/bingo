import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { Crypt } from '../../utils/crypt';
import { ICreateSessionRequestDTO } from './CreateSessionDTO';

export class CreateSessionService {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    data: ICreateSessionRequestDTO,
  ): Promise<Omit<User, 'password'> & { _id: string }> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('User does not exist');
    }

    const comparePassword = Crypt.compare(data.password, user.password);

    if (!comparePassword) {
      throw new Error('Incorrect password!');
    }

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
