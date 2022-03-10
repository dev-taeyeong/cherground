import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Routes } from './api/routes';
import { container } from './inversify.config';
import { TYPES } from './TYPES';
import { OrmConfig } from './OrmConfig';

class App {
  private app: express.Application;
  private PORT: string | undefined;
  private routes: Routes;

  constructor() {
    container.get<OrmConfig>(TYPES.OrmConfig);

    this.routes = container.get<Routes>(TYPES.Routes);
    this.PORT = process.env.PORT;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(this.routes.router);
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`server started on PORT ${this.PORT}`);
    });
  }
}

export default App;
