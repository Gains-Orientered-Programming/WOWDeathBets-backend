// src/services/user-service.ts
import User from '../models/user-model';

// Function to create a new user
export const createUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const user = new User(userData);
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
