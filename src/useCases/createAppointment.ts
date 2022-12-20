import prisma from '../database/prisma';
import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';

export async function createAppointment({
  end,
  start,
  title,
  userId
} : ICreateAppointmentDTO) {
  if (title.length > 255) {
    throw new Error('Title cannot be longer than 255 characters');
  }

  if (start > end) {
    throw new Error('Start date cannot be after end date');
  }

  if (start < new Date()) {
    throw new Error('Start date cannot be in the past');
  }

  if (end < new Date()) {
    throw new Error('End date cannot be in the past');
  }

  if (end < start) {
    throw new Error('End date cannot be before start date');
  }

  const startDateAlreadyTaken = await prisma.appointment.findFirst({
    where: {
      start: {
        gte: start,
        lte: end
      },
      userId
    }
  });

  if (startDateAlreadyTaken) {
    throw new Error('Start date already taken');
  }

  const endDateAlreadyTaken = await prisma.appointment.findFirst({
    where: {
      end: {
        gte: start,
        lte: end
      },
      userId
    }
  });

  if (endDateAlreadyTaken) {
    throw new Error('End date already taken');
  }

  const appointment = await prisma.appointment.create({
    data: {
      end,
      start,
      title,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return appointment;
}