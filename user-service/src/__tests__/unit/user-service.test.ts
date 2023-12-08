const mockingoose = require('mockingoose');
import jwt from 'jsonwebtoken';
import { beforeAll, afterAll, describe, expect, it, afterEach } from '@jest/globals';
import {
  createUser,
  getUserByUsername,
  getUserByEmail,
  deleteUserById,
  getUserById,
  deleteUserByUsername,
  loginUser,
} from '../../services/user-services';
import mongoose from 'mongoose';
import User from '../../models/user-model';

jest.mock('../../utils/auth-utils.ts', () => ({
  ...jest.requireActual('../../utils/auth-utils.ts'),
  comparePasswords: jest.fn(() => Promise.resolve(true)),
}));

beforeAll(async () => {
  // No need to connect to MongoDB in unit tests
});

afterAll(async () => {
  // No need to disconnect from MongoDB in unit tests
});

afterEach(() => {
  // Reset the mocks after each test
  mockingoose.resetAll();
});

describe('User Service Tests', () => {
  describe('Create User', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'create_testuser',
        email: 'create-test@example.com',
        password: 'create-testpassword',
      };

      mockingoose(User).toReturn(userData, 'save');

      const newUser = await createUser(userData);

      expect(newUser).toBeDefined();
      expect(newUser.username).toBe(userData.username);
      expect(newUser.email).toBe(userData.email);
    });
  });

  describe('Get User by Username', () => {
    it('should get a user by their username', async () => {
      // First, create a user
      const userData = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        username: 'username_testuser',
        email: 'username-test@example.com',
        password: 'username-testpassword',
      };

      mockingoose(User).toReturn(userData, 'save');

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, mock the getUserByUsername function
      mockingoose(User).toReturn(userData, 'findOne');

      // Then, get the user by username
      const retrievedUser = await getUserByUsername(newUser.username);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?._id).toEqual(newUser._id);
      expect(retrievedUser?.username).toBe(newUser.username);
      expect(retrievedUser?.email).toBe(newUser.email);
    });
  });

  describe('Get User by Email', () => {
    it('should get a user by their email', async () => {
      // First, create a user
      const userData = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        username: 'email_testuser',
        email: 'email-test@example.com',
        password: 'email-testpassword',
      };

      mockingoose(User).toReturn(userData, 'save');

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, mock the getUserByEmail function
      mockingoose(User).toReturn(userData, 'findOne');

      // Then, get the user by email
      const retrievedUser = await getUserByEmail(newUser.email);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?._id).toEqual(newUser._id);
      expect(retrievedUser?.username).toBe(newUser.username);
      expect(retrievedUser?.email).toBe(newUser.email);

      // Perhaps delete this
      // // Mock the deleteUserById function
      // mockingoose(User).toReturn(null, 'deleteOne');
      // await deleteUserById(retrievedUser?._id);
    });
  });

  describe('Get User by ID', () => {
    it('should get a user by their ID', async () => {
      // First, create a user
      const userData = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        username: 'id_testuser',
        email: 'id-test@example.com',
        password: 'id-testpassword',
      };

      mockingoose(User).toReturn(userData, 'save');

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, mock the getUserById function
      mockingoose(User).toReturn(userData, 'findOne');

      // Then, get the user by ID
      const retrievedUser = await getUserById(newUser._id);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?._id).toEqual(newUser._id);
      expect(retrievedUser?.username).toBe(newUser.username);
      expect(retrievedUser?.email).toBe(newUser.email);

      // Perhaps delete this
      // // Mock the deleteUserById function
      // mockingoose(User).toReturn(null, 'deleteOne');
      // await deleteUserById(retrievedUser?._id);
    });
  });

  describe('Delete User by ID', () => {
    it('should delete a user by their ID', async () => {
      // First, create a user
      const userData = {
        username: 'delete-id_user',
        email: 'delete-id-test@example.com',
        password: 'delete-id-testpassword',
      };

      mockingoose(User).toReturn(userData, 'save');

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, mock the deleteUserById function
      mockingoose(User).toReturn(null, 'deleteOne');
      await deleteUserById(newUser._id);

      // Finally, try to get the user by ID and expect it to be null
      mockingoose(User).toReturn(null, 'findOne');
      const deletedUser = await getUserById(newUser._id);
      expect(deletedUser).toBeNull();
    });
  });

  describe('Delete User by username', () => {
    it('should delete a user by their username', async () => {
      // First, create a user
      const userData = {
        username: 'delete-username_user',
        email: 'delete-username-test@example.com',
        password: 'delete-username-testpassword',
      };

      mockingoose(User).toReturn(userData, 'save');

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, mock the deleteUserByUsername function
      mockingoose(User).toReturn(null, 'deleteOne');
      await deleteUserByUsername(newUser.username);

      // Finally, try to get the user by username and expect it to be null
      mockingoose(User).toReturn(null, 'findOne');
      const deletedUser = await getUserByUsername(newUser.username);
      expect(deletedUser).toBeNull();
    });
  });

  describe('Handle User Not Found', () => {
    it('should handle user not found', async () => {
      const nonExistentUsername = 'nonexistentuser';

      // Mock the getUserByUsername function
      mockingoose(User).toReturn(null, 'findOne');
      const user = await getUserByUsername(nonExistentUsername);

      expect(user).toBeNull();
    });
  });

  describe('loginUser', () => {
    it('should login a user and return a valid JWT', async () => {
      const userData = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        email: 'user@example.com',
        username: 'username',
        password: 'password',
        currency: 0,
      };

      // Mock the createUser function
      mockingoose(User).toReturn(userData, 'save');
      const createdUser = await createUser(userData);

      // Mock the loginUser function
      mockingoose(User).toReturn(userData, 'findOne');
      const loginData = { email: createdUser.email, password: userData.password };
      const token = await loginUser(loginData);

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
      expect(decoded).toMatchObject({ userId: createdUser._id.toString(), email: createdUser.email });
    });
  });
});
