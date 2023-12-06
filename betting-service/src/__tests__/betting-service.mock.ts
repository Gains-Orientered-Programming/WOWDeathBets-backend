import mockingoose from 'mockingoose';
import Betting from '../models/betting-model';
import {
  createBetting,
  getBettingById,
  getAllBettingByUserId,
  getAllBettings,
  getMostBetted,
  deleteBettingById,
} from '../services/betting-services';

describe('Betting Services Tests', () => {
  it('should create a new betting', async () => {
    const mockBetting = {
      _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
      userId: 'test',
      characterName: 'test_characterName',
      region: 'test_region',
      realm: 'test_realm',
      amount: 0,
    };

    // Mock the save operation for the Betting model
    mockingoose(Betting).toReturn(mockBetting, 'save');

    // Call the createBetting function which interacts with the Betting model
    const newBetting = await createBetting({
      userId: 'test',
      characterName: 'test_characterName',
      region: 'test_region',
      realm: 'test_realm',
      amount: 0,
    });

    // Assertions: Check if the function created a new betting with the expected data
    expect(newBetting).toMatchObject(mockBetting);
  });

  it('should get a betting by ID', async () => {
    const mockBetting = {
      _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
      userId: 'test',
      characterName: 'test_characterName',
      region: 'test_region',
      realm: 'test_realm',
      amount: 0,
    };
    mockingoose(Betting).toReturn(mockBetting, 'findOne');
    const betting = await getBettingById('6093eb433fc0a31f2cc1cc83');
    expect(betting?.userId).toBe('test');
  });

  it('should delete a betting by ID', async () => {
    const mockBetting = {
      _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
      userId: 'test',
      characterName: 'test_characterName',
      region: 'test_region',
      realm: 'test_realm',
      amount: 0,
    };

    mockingoose(Betting).toReturn(mockBetting, 'findOneAndDelete');
    const deletedBetting = await deleteBettingById('6093eb433fc0a31f2cc1cc83');
    expect(deletedBetting).toMatchObject(mockBetting);
  });

  it('should get all bettings by userId', async () => {
    const mockBetting = [
      {
        _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      },
      {
        _id: '7093eb433fc0a31f2cc1cc84', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName2',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      },
    ];

    mockingoose(Betting).toReturn(mockBetting, 'find');
    const bettings = await getAllBettingByUserId('test');
    expect(bettings[0].characterName).toBe('test_characterName');
    expect(bettings[1].characterName).toBe('test_characterName2');
  });

  it('should get all bettings', async () => {
    const mockBetting = [
      {
        _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      },
      {
        _id: '7093eb433fc0a31f2cc1cc84', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName2',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      },
    ];

    mockingoose(Betting).toReturn(mockBetting, 'find');
    const bettings = await getAllBettings();
    expect(bettings[0].characterName).toBe('test_characterName');
    expect(bettings[1].characterName).toBe('test_characterName2');
  });

  it('should get the most betted character', async () => {
    const mockBetting = [
      {
        _id: '6093eb433fc0a31f2cc1cc83', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      },
      {
        _id: '7093eb433fc0a31f2cc1cc84', // Mocked ID
        userId: 'test',
        characterName: 'test_characterName2',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      },
    ];

    mockingoose(Betting).toReturn(mockBetting, 'find');
    const bettings = await getMostBetted();
    expect(bettings[0].characterName).toBe('test_characterName');
    expect(bettings[1].characterName).toBe('test_characterName2');
  });
});
