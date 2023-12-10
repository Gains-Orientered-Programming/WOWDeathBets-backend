const mockingoose = require('mockingoose');
import Ticket from '../models/ticket-model'; // Update the import to match your actual model
import {
  createTicket,
  getTicketById,
  getAllTicketsByUserId,
  getAllTickets,
  deleteTicketById,
} from '../services/ticket-services';

describe('Ticket Services Tests', () => {
  it('should create a new ticket', async () => {
    const mockTicket = {
      userId: 'test',
      characterName: 'test_characterName',
      amount: 0,
    };

    // Mock the save operation for the Ticket model
    mockingoose(Ticket).toReturn(mockTicket, 'save');

    // Call the createTicket function which interacts with the Ticket model
    const newTicket = await createTicket({
      userId: 'test',
      characterName: 'test_characterName',
      amount: 0,
    });

    // Assertions: Check if the function created a new ticket with the expected data
    expect(newTicket).toMatchObject(mockTicket);
  });

  it('should get a ticket by ID', async () => {
    const mockTicket = {
      _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
      userId: 'test',
      characterName: 'test_characterName',
      amount: 0,
    };
    mockingoose(Ticket).toReturn(mockTicket, 'findOne');
    const ticket = await getTicketById('6093eb433fc0a31f2cc1cc83');
    expect(ticket?.userId).toBe('test');
  });

  it('should delete a ticket by ID', async () => {
    mockingoose(Ticket).toReturn({ deletedCount: 1 }, 'deleteOne');
    const deletedTicket = await deleteTicketById('6093eb433fc0a31f2cc1cc83');
    expect(deletedTicket).toBe(true);
  });

  it('should get all tickets by userId', async () => {
    const mockTicket = [
      {
        _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName',
        amount: 0,
      },
      {
        _id: '7093eb433fc0a31f2cc1cc84', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName2',
        amount: 0,
      },
    ];

    mockingoose(Ticket).toReturn(mockTicket, 'find');
    const tickets = await getAllTicketsByUserId('test');
    expect(tickets[0].characterName).toBe('test_characterName');
    expect(tickets[1].characterName).toBe('test_characterName2');
  });

  it('should get all tickets', async () => {
    const mockTicket = [
      {
        _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName',
        amount: 0,
      },
      {
        _id: '7093eb433fc0a31f2cc1cc84', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName2',
        amount: 0,
      },
    ];

    mockingoose(Ticket).toReturn(mockTicket, 'find');
    const tickets = await getAllTickets();
    expect(tickets[0].characterName).toBe('test_characterName');
    expect(tickets[1].characterName).toBe('test_characterName2');
  });
});
