import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { readFileSync } from 'fs';
import { avocadoResolvers } from './graphql/resolvers/avocado.resolvers';
import { usersResolvers } from './graphql/resolvers/users.resolvers';
import { IRequest } from './interfaces/IRequest';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';

dotenv.config({ path: '../.env' });

const typeDefs = readFileSync(
  path.join(__dirname, './graphql/schema.gql'),
  'utf8'
);

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers: [avocadoResolvers, usersResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const request: IRequest = req;
      const token = request.headers.authorization || '';

      return { token };
    },
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(
    ` 🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath} 🚀`
  );
}

startApolloServer();
