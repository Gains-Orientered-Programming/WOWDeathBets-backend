// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import { createDepositTicket, createWithdrawTicket, getTicketById, deleteTicketById } from '../services/ticket-services';

// Controller function to create a new deposit ticket
export const createDepositTicketController = async (req: Request, res: Response) => {
  try {
    const { characterName, amount } = req.body;
    const newDepositTicket = await createDepositTicket({ characterName, amount });
    res.status(201).json(newDepositTicket);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create deposit ticket.' });
  }
};

// Controller function to create a new withdraw ticket
export const createWithdrawTicketController = async (req: Request, res: Response) => {
  try {
    const { characterName, amount } = req.body;
    const newWithdrawTicket = await createWithdrawTicket({ characterName, amount });
    res.status(201).json(newWithdrawTicket);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create withdraw ticket.' });
  }
};

export const getTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticket = await getTicketById(id);
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
