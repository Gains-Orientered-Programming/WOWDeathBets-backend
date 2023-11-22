// src/routes/user-routes.ts
import express from 'express';
import {
  createBettingController,
  getBettingByIdController,
  deleteBettingByIdController,
} from '../controllers/betting-controller';

const router = express.Router();

// Define user routes
router.post('/create-betting', createBettingController);
router.get('/betting/:id', getBettingByIdController);
router.delete('/betting/:id', deleteBettingByIdController);

export default router;
