/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({ error: err.message });
  }

  return response.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(3333, () => console.log('Server is running on port 3333'));