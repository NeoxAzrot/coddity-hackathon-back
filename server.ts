import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import { resolvers, typeDefs } from 'graphql/schema';

dotenv.config();
const PORT = process.env.PORT || 3000;

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
const startApolloServer = async (typeDefs: string, resolvers: any) => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`\n🚀 Connecting on port\u001b[1;34m http://localhost:${PORT} \u001b[0m\n`);
};

startApolloServer(typeDefs, resolvers);
