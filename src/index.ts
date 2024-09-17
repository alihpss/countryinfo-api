import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (_req: Request, res: Response) => {
  res.send('CountryInfo API is running!');
});

app.listen(3001, () =>
  console.log('Server is runnig at http://localhost:3001'),
);
