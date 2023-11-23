// src/routes/user-routes.ts
import express from 'express';
import {
  createUserController,
  getUserByUsernameController,
  getUserByEmailController,
  smokeTest,
  getUserByIdController,
  deleteUserByIdController,
  deleteUserByUsernameController,
  deleteManyByUsernameController,
} from '../controllers/user-controller';

const router = express.Router();

// Define user routes
//GET
router.get('/smoke-test', smokeTest);
router.get('/user/:id', getUserByIdController);
router.get('/email/:email', getUserByEmailController);
router.get('/username/:username', getUserByUsernameController);
//POST
router.post('/create-user', createUserController);
//DELETE
router.delete('/user/:id', deleteUserByIdController);
router.delete('/user/by-username/:username', deleteUserByUsernameController);
router.delete('/user/many-by-username/:username', deleteManyByUsernameController);

export default router;
