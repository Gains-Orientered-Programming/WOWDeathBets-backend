import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import { createTicket, getTicketById, deleteTicketById } from '../services/ticket-services';

// Integration test
// Do I get answers from the database?

const mongodbURI = process.env.MONGODB_URI ?? '';

beforeAll(async () => {
  await mongoose.connect(mongodbURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Ticket Service Tests', () => {
  describe('Create Ticket', () => {
    it('should create a new ticket', async () => {
      const ticketData = {
        userId: 'test',
        characterName: 'test_characterName',
        amount: 0,
      };

      const newTicket = await createTicket(ticketData);

      expect(newTicket).toBeDefined();
      expect(newTicket.characterName).toBe(ticketData.characterName);
      expect(newTicket.amount).toBe(ticketData.amount);
      await deleteTicketById(newTicket._id);
    });
  });

  describe('Get Ticket by ID', () => {
    it('should get a ticket by its ID', async () => {
      // First, create a ticket
      const ticketData = {
        userId: 'test',
        characterName: 'test_characterName',
        amount: 0,
      };

      const newTicket = await createTicket(ticketData);
      expect(newTicket).toBeDefined();

      // Then, get the ticket by ID
      const retrievedTicket = await getTicketById(newTicket._id);

      // Finally, check if the retrieved ticket matches the created ticket
      expect(retrievedTicket).toBeDefined();
      expect(retrievedTicket?._id).toEqual(newTicket._id);
      expect(retrievedTicket?.characterName).toBe(newTicket.characterName);
      expect(retrievedTicket?.amount).toBe(newTicket.amount);
      await deleteTicketById(retrievedTicket?._id);
    });
  });

  describe('Delete Ticket by ID', () => {
    it('should delete a ticket by its ID', async () => {
      const ticketData = {
        userId: 'test',
        characterName: 'test_characterName',
        amount: 0,
      };

      const newTicket = await createTicket(ticketData);
      expect(newTicket).toBeDefined();

      // Then, delete the ticket
      await deleteTicketById(newTicket._id);

      // Finally, try to get the ticket by ID and expect it to be null
      const deletedTicket = await getTicketById(newTicket._id);
      expect(deletedTicket).toBeNull();
    });
  });
});
