import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../database/prisma';
import { User } from '@prisma/client';

import { auth } from '../config/auth';
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO';

interface IResponse {
  user: User;
  token: string;
}

export async function authenticateUser({
  email,
  password,
}: IAuthenticateUserDTO): Promise<IResponse> {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('Email/Password incorrect');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Email/Password incorrect');
  }

  const token = jwt.sign({}, auth.secret, {
    expiresIn: '60m',
    subject: user.id,
  });

  return { user, token };
}


