import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { createSecureServer } from './utils/secureServer';
import { response } from './utils/response';

dotenv.config();

class App {
  public app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandlers();
  }

  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
          }
        },
      })
    );
  }

  private version1(): void {
    this.app.use('/api/v1', routes);
  }

  private initializeRoutes(): void {
    this.version1();
  }

  private initializeErrorHandlers(): void {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ error: 'Route not found' });
    });

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
      response(res, 500, 'Internal Server Error');
    });
    
  }

  public start(): void {
    createSecureServer(this.app);
  }
}

export default App;
