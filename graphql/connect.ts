import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';

import { resolvers, typeDefs } from 'graphql/schema';

interface ApolloServerParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: any;
  port: string | number;
}

const apolloServer = async ({ app, port }: ApolloServerParams) => {
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

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`\n🚀 Server connected on \u001b[1;34m http://localhost:${port} \u001b[0m`);
};

export default apolloServer;
