// src/services/user-service.ts
import User from '../models/user-model';
import bcrypt from 'bcrypt';

// Function to create a new user
export const createUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to get a user by their username
export const getUserByUsername = async (username: string) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to get a user by their email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};
