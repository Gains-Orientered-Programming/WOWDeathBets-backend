import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { resolvers, typeDefs } from './graphql';
import mongoose from 'mongoose';
require('dotenv').config();

const PORT = 8080;
const mongodbURI = process.env.MONGODB_URI ?? '';

const mount = async (app: Application) => {
  try {
    const server = new ApolloServer({ typeDefs, resolvers }) as any;
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    await mongoose.connect(mongodbURI);

    app.listen(PORT, () => console.log(`[app] : http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

mount(express());
