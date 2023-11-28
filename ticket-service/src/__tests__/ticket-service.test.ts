import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import { createDepositTicket, createWithdrawTicket, } from '../services/ticket-services';
import { deleteTicketByIdController } from '../controllers/ticket-controller';

const mongodbURI = process.env.MONGODB_URI ?? '';

beforeAll(async () => {
  await mongoose.connect(mongodbURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Ticket Service Tests', () => {
  describe('Create Ticket', () => {
    it('should create a new ticket for deposit', async () => {
      const ticketData = {
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      };

      const newTicket = await createDepositTicket(ticketData);

      expect(newTicket).toBeDefined();
      expect(newTicket.characterName).toBe(newTicket.characterName);
      expect(newTicket.amount).toBe(newTicket.amount);
      await deleteTicketByIdController(newTicket._id);
    });
  });
});
