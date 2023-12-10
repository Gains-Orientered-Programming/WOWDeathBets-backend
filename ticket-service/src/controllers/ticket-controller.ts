// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import { createTicket, 
   getTicketsByUserId, 
   getAllTickets,
   deleteTicketById } from '../services/ticket-services';

// Controller function to create a new deposit ticket
export const createTicketController = async (req: Request, res: Response) => {
  try {
    const newTicket = await createTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create deposit ticket.' });
  }
};

export const getAllTicketsController = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets(); // Call the service function to get all tickets
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get tickets.' });
  }
};



export const getTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticket = await getTicketsByUserId(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get ticket.' });
  }
};

export const deleteTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteTicketById(id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete ticket.' });
  }
};
