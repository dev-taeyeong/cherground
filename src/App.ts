import express from 'express';

class App {
  private app: express.Application;
  private PORT: string | undefined;

  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    this.app.use(express.json());
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`server started on PORT ${this.PORT}`);
    });
  }
}

export default App;
