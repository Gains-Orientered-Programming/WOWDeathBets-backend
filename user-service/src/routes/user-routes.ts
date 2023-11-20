// src/routes/user-routes.ts
import express from 'express';
import {
  createUserController,
  getUserByUsernameController,
  getUserByEmailController,
  smokeTest,
} from '../controllers/user-controller';

const router = express.Router();

// Define user routes
router.post('/create-user', createUserController);
router.get('/username/:username', getUserByUsernameController);
router.get('/email/:email', getUserByEmailController);
router.get('/smoke-test', smokeTest);

export default router;
