import { Request, Response } from 'express';
import { authenticateUser } from '../useCases/authenticateUser';

export class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const tokenAndUserData = await authenticateUser({
      email,
      password,
    });

    return response.json(tokenAndUserData);
  }
}