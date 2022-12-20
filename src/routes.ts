import { Router } from 'express';
import { authMiddleware } from './middlewares/auth';
import { SessionsController } from './controllers/SessionsController';
import { UsersController } from './controllers/UsersController';
import { AppointmentsController } from './controllers/AppointmentsController';

const routes = Router();

const sessionsController = new SessionsController();
const usersController = new UsersController();
const appointmentsController = new AppointmentsController();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/sessions', sessionsController.create);
routes.post('/users', usersController.create);

routes.use(authMiddleware);

routes.get('/appointments', appointmentsController.index);
routes.post('/appointments', appointmentsController.create);
  
export default routes;