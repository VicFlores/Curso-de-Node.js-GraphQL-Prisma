import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { readFileSync } from 'fs';
import express from 'express';
import http from 'http';
import path from 'path';
import { avocadoResolvers } from './graphql/resolvers/avocado.resolvers';

const typeDefs = readFileSync(
  path.join(__dirname, 'graphql/schema.gql'),
  'utf8'
);

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers: [avocadoResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(
    ` 🚀 Server ready at http://localhost:4000${server.graphqlPath} 🚀`
  );
}

startApolloServer();
