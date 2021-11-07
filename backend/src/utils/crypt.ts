import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const salt = genSaltSync(10);

export class Crypt {
  static encrypt(value: string): string {
    const encrypted = hashSync(value, salt);
    return encrypted;
  }

  static compare(value: string, encrypted: string): boolean {
    const result = compareSync(value, encrypted);

    return result;
  }
}
