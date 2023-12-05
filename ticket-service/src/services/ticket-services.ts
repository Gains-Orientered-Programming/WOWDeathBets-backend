// src/services/user-service.ts
import { Types } from 'mongoose';
import Ticket from '../models/ticket-model';

// Function to create a new Deposit ticket
export const createTicket = async (ticketData: {
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

// Function to get a ticket by ID
export const getTicketByUserId = async (userId: string) => {
  try {
    const user = await Ticket.findOne({ userId: userId });
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to delete a ticket by ID
export const deleteTicketById = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);
    await Ticket.deleteOne({ _id: objectId });
  } catch (error) {
    throw error;
  }
};

