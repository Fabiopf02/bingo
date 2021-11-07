import cors from 'cors';
import express from 'express';
import './config/dotenv';
import './config/mongoose/connection';
import { routes } from './routes';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(routes);

server.listen(process.env.PORT || 3333, () => {
  console.log(
    `Server is running in http://localhost:${process.env.PORT || 3333}`,
  );
});
