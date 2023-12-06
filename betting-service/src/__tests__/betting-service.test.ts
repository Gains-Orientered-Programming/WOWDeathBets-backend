import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import { createBetting, getBettingById, deleteBettingById } from '../services/betting-services';

//unit test for betting service targetting functionalities related to to creating retrieving and deleting bettings using mongoose and mongodb
//These tests fall under the category of unit testing, focusing on individual parts or units of code to ensure they function correctly.

const mongodbURI = process.env.MONGODB_URI ?? '';

beforeAll(async () => {
  await mongoose.connect(mongodbURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Betting Service Tests', () => {
  describe('Create Betting', () => {
    it('should create a new betting', async () => {
      const bettingData = {
        userId: 'test',
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      };

      const newBetting = await createBetting(bettingData);

      expect(newBetting).toBeDefined();
      expect(newBetting.characterName).toBe(newBetting.characterName);
      expect(newBetting.region).toBe(newBetting.region);
      expect(newBetting.realm).toBe(newBetting.realm);
      expect(newBetting.amount).toBe(newBetting.amount);
      await deleteBettingById(newBetting._id);
    });
  });

  describe('Get Betting by ID', () => {
    it('should get a betting by their ID', async () => {
      // First, create a user
      const bettingData = {
        userId: 'test',
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      };

      const newBetting = await createBetting(bettingData);
      expect(newBetting).toBeDefined();

      // Then, get the user by ID
      const retrievedBetting = await getBettingById(newBetting._id);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedBetting).toBeDefined();
      expect(retrievedBetting?._id).toEqual(retrievedBetting?._id);
      expect(retrievedBetting?.characterName).toBe(retrievedBetting?.characterName);
      expect(retrievedBetting?.region).toBe(retrievedBetting?.region);
      expect(retrievedBetting?.realm).toBe(retrievedBetting?.realm);
      expect(retrievedBetting?.amount).toBe(retrievedBetting?.amount);
      await deleteBettingById(retrievedBetting?._id);
    });
  });

  describe('Delete Betting by ID', () => {
    it('should delete a betting by their ID', async () => {
      const bettingData = {
        userId: 'test',
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      };

      const newBetting = await createBetting(bettingData);
      expect(newBetting).toBeDefined();

      // Then, delete the user
      await deleteBettingById(newBetting._id);

      // Finally, try to get the user by ID and expect it to be null
      const deletedUser = await getBettingById(newBetting._id);
      expect(deletedUser).toBeNull();
    });
  });
});
