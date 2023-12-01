import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import {
  createUser,
  getUserByUsername,
  getUserByEmail,
  deleteUserById,
  getUserById,
  deleteUserByUsername,
  loginUser,
} from '../services/user-services';

const mongodbURI = process.env.MONGODB_URI || '';

beforeAll(async () => {
  await mongoose.connect(mongodbURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Service Tests', () => {
  describe('Create User', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'create_testuser',
        email: 'create-test@example.com',
        password: 'create-testpassword',
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
      // First, create a user
      const userData = {
        username: 'username_testuser',
        email: 'username-test@example.com',
        password: 'username-testpassword',
      };

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, get the user by ID
      const retrievedUser = await getUserByUsername(newUser.username);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?._id).toEqual(newUser._id);
      expect(retrievedUser?.username).toBe(newUser.username);
      expect(retrievedUser?.email).toBe(newUser.email);
      await deleteUserById(retrievedUser?._id);
    });
  });

  describe('Get User by Email', () => {
    it('should get a user by their email', async () => {
      // First, create a user
      const userData = {
        username: 'email_testuser',
        email: 'email-test@example.com',
        password: 'email-testpassword',
      };

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, get the user by ID
      const retrievedUser = await getUserByEmail(newUser.email);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?._id).toEqual(newUser._id);
      expect(retrievedUser?.username).toBe(newUser.username);
      expect(retrievedUser?.email).toBe(newUser.email);
      await deleteUserById(retrievedUser?._id);
    });
  });

  describe('Get User by ID', () => {
    it('should get a user by their ID', async () => {
      // First, create a user
      const userData = {
        username: 'id_testuser',
        email: 'id-test@example.com',
        password: 'id-testpassword',
      };

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, get the user by ID
      const retrievedUser = await getUserById(newUser._id);

      // Finally, check if the retrieved user matches the created user
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?._id).toEqual(newUser._id);
      expect(retrievedUser?.username).toBe(newUser.username);
      expect(retrievedUser?.email).toBe(newUser.email);
      await deleteUserById(retrievedUser?._id);
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

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, delete the user
      await deleteUserById(newUser._id);

      // Finally, try to get the user by ID and expect it to be null
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

      const newUser = await createUser(userData);
      expect(newUser).toBeDefined();

      // Then, delete the user
      await deleteUserByUsername(newUser.username);

      // Finally, try to get the user by ID and expect it to be null
      const deletedUser = await getUserByUsername(newUser.username);
      expect(deletedUser).toBeNull();
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

describe('loginUser', () => {
  it('should login a user and return a valid JWT', async () => {
    const userData = {
      email: 'user@example.com',
      username: 'username',
      password: 'password',
      currency: 0,
    };

    // Create the user
    const createdUser = await createUser(userData);

    // Login the user
    const loginData = { email: createdUser.email, password: userData.password };
    const token = await loginUser(loginData);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    expect(decoded).toMatchObject({ userId: createdUser._id.toString(), email: createdUser.email });

    // Delete user to clean up the test
    await deleteUserById(createdUser._id);
  });
});
