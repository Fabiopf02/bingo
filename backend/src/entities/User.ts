import { Crypt } from '../utils/crypt';

export class User {
  name: string;

  email: string;

  password: string;

  constructor(data: User) {
    this.name = data.name;
    this.email = data.email;
    this.password = Crypt.encrypt(data.password);
  }

  static create(data: User): User {
    const user = new User(data);

    return user;
  }
}
