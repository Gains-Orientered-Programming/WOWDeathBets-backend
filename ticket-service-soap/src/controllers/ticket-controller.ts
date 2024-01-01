import { Request, Response } from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketsByUserId,
  deleteTicketById,
  deleteAllTicketsByCharacterName,
} from '../services/ticket-service';

// Create a function to handle SOAP requests for creating a ticket
export const createTicketSOAPService = async (req: Request, res: Response) => {
  try {
    const newTicket = await createTicket(req.body);
    const soapResponse = `<SOAPResponse>
                          <Status>Success</Status>
                          <Ticket>${JSON.stringify(newTicket)}</Ticket>
                         </SOAPResponse>`;
    res.set('Content-Type', 'application/xml');
    res.status(200).send(soapResponse);
  } catch (error) {
    const soapFault = `<SOAPFault>
                        <ErrorCode>500</ErrorCode>
                        <ErrorMessage>Unable to create deposit ticket.</ErrorMessage>
                       </SOAPFault>`;
    res.set('Content-Type', 'application/xml');
    res.status(500).send(soapFault);
  }
};

export const getAllTicketsSOAPService = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets();
    const soapResponse = `<SOAPResponse>
                          <Status>Success</Status>
                          <Tickets>${JSON.stringify(tickets)}</Tickets>
                         </SOAPResponse>`;
    res.set('Content-Type', 'application/xml');
    res.status(200).send(soapResponse);
  } catch (error) {
    const soapFault = `<SOAPFault>
                        <ErrorCode>500</ErrorCode>
                        <ErrorMessage>Unable to get tickets.</ErrorMessage>
                       </SOAPFault>`;
    res.set('Content-Type', 'application/xml');
    res.status(500).send(soapFault);
  }
};

export const getTicketByIdSOAPService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticket = await getTicketsByUserId(id);
    if (!ticket) {
      const soapResponse = `<SOAPResponse>
                            <Status>Failure</Status>
                            <Message>Ticket not found</Message>
                           </SOAPResponse>`;
      res.set('Content-Type', 'application/xml');
      res.status(404).send(soapResponse);
    } else {
      const soapResponse = `<SOAPResponse>
                            <Status>Success</Status>
                            <Ticket>${JSON.stringify(ticket)}</Ticket>
                           </SOAPResponse>`;
      res.set('Content-Type', 'application/xml');
      res.status(200).send(soapResponse);
    }
  } catch (error) {
    const soapFault = `<SOAPFault>
                        <ErrorCode>500</ErrorCode>
                        <ErrorMessage>Unable to get ticket.</ErrorMessage>
                       </SOAPFault>`;
    res.set('Content-Type', 'application/xml');
    res.status(500).send(soapFault);
  }
};

export const deleteTicketByIdSOAPService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteTicketById(id);
    const soapResponse = `<SOAPResponse>
                          <Status>Success</Status>
                          <Message>Ticket deleted successfully</Message>
                         </SOAPResponse>`;
    res.set('Content-Type', 'application/xml');
    res.status(200).send(soapResponse);
  } catch (error) {
    const soapFault = `<SOAPFault>
                        <ErrorCode>500</ErrorCode>
                        <ErrorMessage>Unable to delete ticket.</ErrorMessage>
                       </SOAPFault>`;
    res.set('Content-Type', 'application/xml');
    res.status(500).send(soapFault);
  }
};

export const deleteAllTicketsByCharacterNameSOAPService = async (req: Request, res: Response) => {
  try {
    const characterName = req.params.characterName;
    await deleteAllTicketsByCharacterName(characterName);
    const soapResponse = `<SOAPResponse>
                          <Status>Success</Status>
                          <Message>Tickets deleted successfully</Message>
                         </SOAPResponse>`;
    res.set('Content-Type', 'application/xml');
    res.status(200).send(soapResponse);
  } catch (error) {
    const soapFault = `<SOAPFault>
                        <ErrorCode>500</ErrorCode>
                        <ErrorMessage>Unable to delete ticket.</ErrorMessage>
                       </SOAPFault>`;
    res.set('Content-Type', 'application/xml');
    res.status(500).send(soapFault);
  }
};
