import {
  createDepositTicketController,
  createWithdrawTicketController,
  getTicketByIdController,
  deleteTicketByIdController
} from '../controllers/ticket-controller';
import { Express, RequestHandler } from 'express';

function routes(app: Express) {
  app.post('/create-depositticket', createDepositTicketController as RequestHandler);
  app.post('/create-withdrawticket', createWithdrawTicketController as RequestHandler);
  app.get('/:id', getTicketByIdController as RequestHandler);
  app.delete('/:id', deleteTicketByIdController as RequestHandler);
}

export default routes;
