import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import { createBetting, getBettingById, deleteBettingById } from '../services/betting-services';

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
        characterName: 'test_characterName',
        region: 'test_region',
        realm: 'test_realm',
        amount: 0,
      };

      const newBetting = await createBetting(bettingData);

      expect(newBetting).toBeDefined();
      expect(newBetting.characterName).toBe(bettingData.characterName);
      expect(newBetting.region).toBe(bettingData.region);
      expect(newBetting.realm).toBe(bettingData.realm);
      expect(newBetting.amount).toBe(bettingData.amount);
      await deleteBettingById(newBetting._id);
    });
  });

  describe('Get Betting by ID', () => {
    it('should get a betting by their ID', async () => {
      // First, create a user
      const bettingData = {
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
      expect(retrievedBetting?._id).toEqual(newBetting?._id);
      expect(retrievedBetting?.characterName).toBe(newBetting?.characterName);
      expect(retrievedBetting?.region).toBe(newBetting?.region);
      expect(retrievedBetting?.realm).toBe(newBetting?.realm);
      expect(retrievedBetting?.amount).toBe(newBetting?.amount);
      await deleteBettingById(retrievedBetting?._id);
    });
  });

  describe('Delete Betting by ID', () => {
    it('should delete a betting by their ID', async () => {
      const bettingData = {
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
