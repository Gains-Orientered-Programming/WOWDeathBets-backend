import {
  createBettingController,
  getBettingByIdController,
  getBettingsByUserIdController,
  deleteBettingByIdController,
  getAllBettingsController,
} from '../controllers/betting-controller';
import { Express, RequestHandler } from 'express';

function routes(app: Express) {
  app.get('/bettings', getAllBettingsController as RequestHandler);
  app.post('/bettings', createBettingController as RequestHandler);
  app.get('/bettings/:id', getBettingByIdController as RequestHandler);
  app.get('/bettings/userId/:id', getBettingsByUserIdController as RequestHandler);
  app.delete('/bettings/:id', deleteBettingByIdController as RequestHandler);
}

export default routes;
