import { Router } from 'express';
import { authMiddleware } from './middlewares/auth';
import { SessionsController } from './controllers/SessionsController';
import { UsersController } from './controllers/UsersController';

const routes = Router();

const sessionsController = new SessionsController();
const usersController = new UsersController();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/sessions', sessionsController.create);
routes.post('/users', usersController.create);

routes.use(authMiddleware);
  
export default routes;