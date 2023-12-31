// src/routes/user-routes.ts
import { Express } from 'express';
import {
  createUserController,
  getUserByUsernameController,
  getUserByEmailController,
  smokeTest,
  getUserByIdController,
  deleteUserByIdController,
  deleteUserByUsernameController,
  deleteManyByUsernameController,
  getAllUsersController,
  loginController,
} from '../controllers/user-controller';

function route(app: Express) {
  //GET
  app.get('/smoke-test', smokeTest);
  app.get('/users', getAllUsersController);
  app.get('/user/:id', getUserByIdController);
  app.get('/email/:email', getUserByEmailController);
  app.get('/username/:username', getUserByUsernameController);
  //POST
  app.post('/create-user', createUserController);
  app.post('/login', loginController);
  //DELETE
  app.delete('/user/:id', deleteUserByIdController);
  //Don't include this in the swaggerui docs
  app.delete('/user/by-username/:username', deleteUserByUsernameController);
  app.delete('/user/many-by-username/:username', deleteManyByUsernameController);
}

export default route;
