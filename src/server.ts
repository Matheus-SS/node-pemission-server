import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import CustomErrorHandler from './errors/CustomErrorHandler';
import router from './routes';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// handling errors globally
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof CustomErrorHandler) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.PORT || 3333, () => {
  console.log("Iniciou na porta 3333");
})