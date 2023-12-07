import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { connectDatabase } from './database';
import { resolvers, typeDefs } from './graphql';

const PORT = 8080;

const mount = async (app: Application) => {
  try {
    const db = await connectDatabase();

    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) }) as any;
    await server.start();
    server.applyMiddleware({ app, path: '/api' });

    app.listen(PORT, () => console.log(`[app] : http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

mount(express());
