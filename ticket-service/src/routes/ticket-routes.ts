import {
  createTicketController,
  getTicketByIdController,
  getAllTicketsController,
  deleteTicketByIdController
} from '../controllers/ticket-controller';
import { Express, RequestHandler } from 'express';

function routes(app: Express) {
  app.post('/tickets', createTicketController as RequestHandler);
  app.get('/tickets', getAllTicketsController as RequestHandler);
  app.get('/tickets/userId/:id', getTicketByIdController as RequestHandler);
  app.delete('/tickets/:id', deleteTicketByIdController as RequestHandler);
}

export default routes;
