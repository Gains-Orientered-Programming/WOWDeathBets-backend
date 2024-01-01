import {
  createTicketSOAPService,
  getTicketByIdSOAPService,
  deleteTicketByIdSOAPService,
  getAllTicketsSOAPService,
  deleteAllTicketsByCharacterNameSOAPService,
} from '../controllers/ticket-controller';
import { Express, RequestHandler } from 'express';

function routes(app: Express) {
  app.post('/tickets', createTicketSOAPService as RequestHandler);
  app.get('/tickets', getAllTicketsSOAPService as RequestHandler);
  app.get('/tickets/userId/:id', getTicketByIdSOAPService as RequestHandler);
  app.delete('/tickets/:id', deleteTicketByIdSOAPService as RequestHandler);
  app.delete('/tickets/byCharacterName/:characterName', deleteAllTicketsByCharacterNameSOAPService as RequestHandler);
}

export default routes;
