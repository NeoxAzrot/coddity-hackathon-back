import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express from 'express';

import { connectDatabase } from 'database/connect';

import apolloServer from 'graphql/connect';

dotenvExpand.expand(dotenv.config());
const API_PORT = process.env.API_PORT || 3000;

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://warmd.fr',
  'http://www.warmd.fr',
  'http://warmd-api.herokuapp.com',
  'http://warmd.netlify.app',
];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

const startServer = async () => {
  await apolloServer({ app, port: API_PORT });

  await connectDatabase();
};

startServer();
