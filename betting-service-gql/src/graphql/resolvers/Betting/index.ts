import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';
import { Betting } from '../../../lib/types';
import BettingModel from '../../../models/Betting.model';

interface Bettings {
  characterName: string;
  realm: string;
  region: string;
  amount: number;
}

export const bettingResolvers: IResolvers = {
  Query: {
    bettings: async (_root: undefined, _args): Promise<Betting[]> => {
      return await BettingModel.find();
    },
    getMostBetted: async (_root: undefined, _args): Promise<Bettings[]> => {
      try {
        const bettings = await BettingModel.find();

        // Create a map to store the total amount for each character name
        const characterAmountMap: { [key: string]: number } = {};

        // Calculate total amount for each character name
        bettings.forEach((betting) => {
          const { characterName, amount } = betting;
          const parsedAmount = parseFloat(String(amount));
          if (!isNaN(parsedAmount)) {
            characterAmountMap[characterName] = (characterAmountMap[characterName] || 0) + parsedAmount;
          }
        });

        // Convert characterAmountMap to an array of objects for sorting
        const characterAmountArray = Object.entries(characterAmountMap).map(([characterName, totalAmount]) => ({
          characterName,
          totalAmount,
        }));

        // Sort characters by total amounts in descending order
        characterAmountArray.sort((a, b) => b.totalAmount - a.totalAmount);

        // Get the top 3 characters or less if there are fewer than 3 unique characters
        const top3Characters = characterAmountArray.slice(0, 3);

        const result: Bettings[] = top3Characters.map(({ characterName }) => {
          const betting = bettings.find((betting) => betting.characterName === characterName);

          const amount = betting?.amount !== undefined ? Math.floor(parseFloat(String(betting.amount))) : 0;

          const realm: string | undefined = betting?.realm;
          const region: string | undefined = betting?.region;

          return {
            _id: betting?._id,
            characterName,
            realm: realm || '',
            region: region || '',
            amount,
            __v: betting?.__v,
          };
        });

        return result;
      } catch (error) {
        // Handle errors
        throw new Error('Failed to fetch most betted characters');
      }
    },
  },
  Mutation: {
    createBetting: async (_root: undefined, bettingdata: Betting): Promise<Betting> => {
      const betting = new BettingModel({ ...bettingdata });
      await betting.save();
      return betting;
    },
  },

  Betting: {
    id: (betting: Betting): string => betting._id!.toString(),
  },
};
