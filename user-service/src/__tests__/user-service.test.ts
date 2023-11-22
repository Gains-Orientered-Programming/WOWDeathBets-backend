import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import { createUser, getUserByUsername, getUserByEmail, deleteUserById } from '../services/user-services';
require('dotenv').config();

beforeAll(async () => {
  const mongodbURI = process.env.MONGODB_URI || '';
  await mongoose.connect(mongodbURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Service Tests', () => {
  describe('Create User', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const newUser = await createUser(userData);

      expect(newUser).toBeDefined();
      expect(newUser.username).toBe(userData.username);
      expect(newUser.email).toBe(userData.email);
      await deleteUserById(newUser._id);
    });
  });

  describe('Get User by Username', () => {
    it('should get a user by their username', async () => {
      const username = 'testuser';
      const user = await getUserByUsername(username);

      expect(user).toBeDefined();
      expect(user?.username).toBe(username);
    });
  });

  describe('Get User by Email', () => {
    it('should get a user by their email', async () => {
      const email = 'test@example.com';
      const user = await getUserByEmail(email);

      expect(user).toBeDefined();
      expect(user?.email).toBe(email);
    });
  });

  describe('Handle User Not Found', () => {
    it('should handle user not found', async () => {
      const nonExistentUsername = 'nonexistentuser';
      const user = await getUserByUsername(nonExistentUsername);

      expect(user).toBeNull();
    });
  });
});
