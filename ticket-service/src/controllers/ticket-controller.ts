// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import { createTicket, 
   getTicketByUserId, 
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


export const getTicketByUserIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const bettings = await getTicketByUserId(id);
    if (!bettings) {
      return res.status(404).json({ message: 'ticket not found' });
    }
    res.json(bettings);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get ticket.' });
  }
};

export const getTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticket = await getTicketByUserId(id);
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
