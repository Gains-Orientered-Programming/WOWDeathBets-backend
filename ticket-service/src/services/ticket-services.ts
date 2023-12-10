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

export const getAllTicketsByUserId = async (userId: string) => {
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

export const getMostTicketed = async () => {
  try {
    const tickets = await Ticket.find();

    // Create a map to store the total amount for each character name
    const characterAmountMap: { [key: string]: number } = {};

    // Calculate total amount for each character name
    tickets.forEach((ticket) => {
      const { characterName, amount } = ticket;
      if (characterAmountMap[characterName]) {
        characterAmountMap[characterName] += parseFloat(String(amount));
      } else {
        characterAmountMap[characterName] = parseFloat(String(amount));
      }
    });

    // Sort character names by total amounts in descending order
    const sortedCharacterNames = Object.keys(characterAmountMap).sort(
      (a, b) => characterAmountMap[b] - characterAmountMap[a],
    );

    // Get the top 3 character names or less if there are fewer than 3 unique character names
    const top3CharacterNames = sortedCharacterNames.slice(0, 3);

    // Construct an array of objects with the desired structure for the top character names
    const result: Tickets[] = top3CharacterNames.map((characterName) => {
      const ticketsWithSameCharacter = tickets.filter((ticket) => ticket.characterName === characterName);

      const totalAmount = ticketsWithSameCharacter.reduce(
        (total, ticket) => total + parseFloat(String(ticket.amount)),
        0,
      );

      const { _id, __v } = ticketsWithSameCharacter[0];

      return {
        _id,
        characterName,
        amount: totalAmount.toFixed(2), // Format total amount to string with 2 decimal places
        __v,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

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
