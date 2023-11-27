import {
  createBettingController,
  getBettingByIdController,
  deleteBettingByIdController,
} from '../controllers/betting-controller';
import { Express, RequestHandler } from 'express';

function routes(app: Express) {
  app.post('/create-betting', createBettingController as RequestHandler);
  app.get('/:id', getBettingByIdController as RequestHandler);
  app.delete('/:id', deleteBettingByIdController as RequestHandler);
}

export default routes;
