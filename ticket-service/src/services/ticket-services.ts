import Ticket from '../models/ticket-model';
import { Types } from 'mongoose';

export const createTicket = async (ticketData: {
  userId: string;
  characterName: string;
  amount: number;
}) => {
  try {
    const ticket = new Ticket({ ...ticketData });
    await ticket.save();
    return ticket;
  } catch (error) {
    throw error;
  }
};

export const getTicketById = async (id: string) => {
  try {
    const ticket = await Ticket.findOne({ _id: id });
    return ticket;
  } catch (error) {
    throw error;
  }
};

export const getTicketsByUserId = async (userId: string) => {
  try {
    const tickets = await Ticket.find({ userId: userId });
    return tickets;
  } catch (error) {
    throw error;
  }
};

export const getAllTickets = async () => {
  try {
    const tickets = await Ticket.find();
    return tickets;
  } catch (error) {
    throw error;
  }
};

interface Tickets {
  characterName: string;
  amount: string;
}


export const deleteTicketById = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);
    const result = await Ticket.deleteOne({ _id: objectId });

    if (result && result.deletedCount === 1) {
      return true; // Return true to indicate successful deletion
    }

    return false; // Return false if the ticket was not found or not deleted
  } catch (error) {
    throw error;
  }
};
