import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js'

dotenv.config()

const server = express();
server.use(json());
server.use(cors());
server.use(router);

server.listen(process.env.PORT);
