import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import { createUser, getUserByUsername, getUserByEmail } from '../services/user-services';
import dotenv from 'dotenv';

dotenv.config();

// const mongodbURI = process.env.MONGODB_URI || '';
const mongodbURI = 'mongodb+srv://users:Eq6ylDvIvlmgs6AN@users.jg9w7bo.mongodb.net/';

beforeAll(async () => {
  await mongoose.connect(mongodbURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Service Tests', () => {
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
  });

  it('should get a user by their username', async () => {
    const username = 'testuser';
    const user = await getUserByUsername(username);

    expect(user).toBeDefined();
    expect(user?.username).toBe(username);
  });

  it('should get a user by their email', async () => {
    const email = 'test@example.com';
    const user = await getUserByEmail(email);

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });

  it('should handle user not found', async () => {
    const nonExistentUsername = 'nonexistentuser';
    const user = await getUserByUsername(nonExistentUsername);

    expect(user).toBeNull();
  });
});
