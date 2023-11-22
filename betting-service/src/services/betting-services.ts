// src/services/user-service.ts
import Betting from '../models/betting-model';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';

// Function to create a new user
export const createBetting = async (bettingData: {
  characterName: string;
  region: string;
  realm: string;
  amount: number;
}) => {
  try {
    const betting = new Betting({ ...bettingData });
    await betting.save();
    return betting;
  } catch (error) {
    throw error;
  }
};

// Function to get a user by their id
export const getBettingById = async (id: string) => {
  try {
    const user = await Betting.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user by their id
export const deleteBettingById = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);
    await Betting.deleteOne({ _id: objectId });
  } catch (error) {
    throw error;
  }
};
