import prisma from '../database/prisma';

export async function listAppointment() {
  const appointments = await prisma.appointment.findMany({
    include: {
      user: true
    }
  });

  return appointments;
}