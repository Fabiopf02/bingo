import { NextFunction, Request, Response } from 'express';
import { MongoUsersRepository } from '../repositories/implementations/MongoUsersRepository';
import { Token } from '../utils/token';

const mongoUsersRepository = new MongoUsersRepository();

export async function authMiddlware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(400).json({ error: 'No token provided!' });
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2) {
      return response.status(400).json({ error: 'Token error!' });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
      return response.status(401).json({ error: 'Token malformatted!' });
    }

    Token.verify(token);

    const userId = Token.decode(token);

    if (userId !== request.headers.userid) {
      return response.status(401).json({ error: 'Operation not permitted!' });
    }

    const userExists = await mongoUsersRepository.userExists(userId);

    if (!userExists) {
      return response.status(400).json({ error: 'User does not exist!' });
    }

    return next();
  } catch (err) {
    return response.status(400).json({ error: 'Unexpected error' });
  }
}
