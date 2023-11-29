// src/services/user-service.ts
import User from '../models/user-model';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';

// Function to create a new user
export const createUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword, currency: 0 });
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

// Function to get a user by their id
export const getUserById = async (id: string) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
};

//Function to get all users
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user by their id
export const deleteUserById = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);
    await User.deleteOne({ _id: objectId });
  } catch (error) {
    throw error;
  }
};

// Function to delete a user by their username
export const deleteUserByUsername = async (username: string) => {
  try {
    await User.deleteOne({ username });
  } catch (error) {
    throw error;
  }
};

// Function to delete MANY user by their username
export const deleteManyByUsername = async (username: string) => {
  try {
    await User.deleteMany({ username });
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
