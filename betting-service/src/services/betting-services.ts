// src/services/user-service.ts
import Betting from '../models/betting-model';
import { Types } from 'mongoose';

// Function to create a new user
export const createBetting = async ({
  userId,
  characterName,
  region,
  realm,
  amount,
  status = 'pending',
}: {
  userId: string;
  characterName: string;
  region: string;
  realm: string;
  amount: number;
  status?: string;
}) => {
  try {
    const bettingData = { userId, characterName, region, realm, amount, status };
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

export const getAllBettingByUserId = async (userId: string) => {
  try {
    const bettings = await Betting.find({ userId: userId });
    return bettings;
  } catch (error) {
    throw error;
  }
};

export const getAllBettings = async () => {
  try {
    const bettings = await Betting.find();
    return bettings;
  } catch (error) {
    throw error;
  }
};

interface Bettings {
  characterName: string;
  realm: string;
  region: string;
  amount: string;
}

export const getMostBetted = async () => {
  try {
    const bettings = await Betting.find();

    // Create a map to store the total amount for each character name
    const characterAmountMap: { [key: string]: number } = {};

    // Calculate total amount for each character name
    bettings.forEach((betting) => {
      const { characterName, amount } = betting;
      if (characterAmountMap[characterName]) {
        characterAmountMap[characterName] += parseFloat(String(amount));
      } else {
        characterAmountMap[characterName] = parseFloat(String(amount));
      }
    });

    // Sort character names by total amounts in descending order
    const sortedCharacterNames = Object.keys(characterAmountMap).sort(
      (a, b) => characterAmountMap[b] - characterAmountMap[a],
    );

    // Get the top 3 character names or less if there are fewer than 3 unique character names
    const top3CharacterNames = sortedCharacterNames.slice(0, 3);

    // Construct an array of objects with the desired structure for the top character names
    const result: Bettings[] = top3CharacterNames.map((characterName) => {
      const bettingsWithSameCharacter = bettings.filter((betting) => betting.characterName === characterName);

      const totalAmount = bettingsWithSameCharacter.reduce(
        (total, betting) => total + parseFloat(String(betting.amount)),
        0,
      );

      const { _id, realm, region, __v } = bettingsWithSameCharacter[0]; // Assuming realm and region are the same for the character

      return {
        _id,
        characterName,
        realm,
        region,
        amount: totalAmount.toFixed(2), // Format total amount to string with 2 decimal places
        __v,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user by their id
export const deleteBettingById = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);
    const result = await Betting.deleteOne({ _id: objectId });

    if (result && result.deletedCount === 1) {
      return true; // Return true to indicate successful deletion
    }

    return false; // Return false if the betting was not found or not deleted
  } catch (error) {
    throw error;
  }
};

export const deleteManyByCharacterName = async (characterName: string) => {
  try {
    await Betting.deleteMany({ characterName: characterName });
  } catch (error) {
    throw error;
  }
};
