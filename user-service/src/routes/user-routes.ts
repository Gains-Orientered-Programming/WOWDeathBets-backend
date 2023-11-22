// src/routes/user-routes.ts
import express from 'express';
import {
  createUserController,
  getUserByUsernameController,
  getUserByEmailController,
  smokeTest,
  getUserByIdController,
  deleteUserByIdController,
} from '../controllers/user-controller';

const router = express.Router();

// Define user routes
router.post('/create-user', createUserController);
router.get('/username/:username', getUserByUsernameController);
router.get('/email/:email', getUserByEmailController);
router.get('/smoke-test', smokeTest);
router.get('/user/:id', getUserByIdController);
router.delete('/user/:id', deleteUserByIdController);

export default router;
