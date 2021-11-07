import { decode, JwtPayload, sign, verify } from 'jsonwebtoken';

interface IDecode extends JwtPayload {
  id: string;
}

const secret = process.env.JWT_SECRET;
const expiresIn = 604800;

export class Token {
  static generate(userId: string) {
    const token = sign({ id: userId }, String(secret), { expiresIn });

    return token;
  }

  static verify(token: string) {
    const response = verify(token, String(secret));

    return response;
  }

  static decode(token: string) {
    const response = decode(token) as IDecode;

    return response.id;
  }
}
