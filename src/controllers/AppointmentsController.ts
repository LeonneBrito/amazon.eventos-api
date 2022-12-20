import { Request, Response } from 'express';
import { listAppointment } from '../useCases/listAppointments';
import { createAppointment } from '../useCases/createAppointment';

export class AppointmentsController {
  async index(request: Request, response: Response) {
    const appointments = await listAppointment();

    return response.json(appointments);
  }

  async create(request: Request, response: Response) {
    const { start, end, title, userId } = request.body;

    const appointment = await createAppointment({
      start,
      end,
      title,
      userId
    });

    return response.json(appointment);
  }
}