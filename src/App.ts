import express from 'express';
import { Routes } from './api/routes';

class App {
  private app: express.Application;
  private PORT: string | undefined;
  private routes: Routes;

  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    this.app.use(express.json());
    this.app.use();
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`server started on PORT ${this.PORT}`);
    });
  }
}

export default App;
