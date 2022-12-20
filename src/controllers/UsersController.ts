import { Request, Response } from 'express';
import { createUser } from '../useCases/createUser';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const tokenAndUserData = await createUser({
      name,
      email,
      password,
    });

    return response.json(tokenAndUserData);
  }
}