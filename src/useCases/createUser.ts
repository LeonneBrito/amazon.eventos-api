import bcrypt from 'bcrypt';
import prisma from '../database/prisma';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export async function createUser({
  name,
  email,
  password,
}: ICreateUserDTO) {
  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      OR: {
        email,
      }
    }
  });

  if (userAlreadyExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  });
}