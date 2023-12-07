import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';
import { Database, Betting } from '../../../lib/types';

export const bettingResolvers: IResolvers = {
  Query: {
    bettings: async (_root: undefined, _args, { db }: { db: Database }): Promise<Betting[]> => {
      return await db.bettings.find({}).toArray();
    },
  },
  Mutation: {
    createBetting: async (
      _root: undefined,
      { userId, characterName, realm, region, amount }: Betting,
      { db }: { db: Database },
    ): Promise<Betting> => {
      const newBetting = {
        userId,
        characterName,
        realm,
        region,
        amount,
      };

      const result = await db.bettings.insertOne(newBetting);

      return newBetting;
    },
  },

  Betting: {
    id: (betting: Betting): string => betting._id!.toString(),
  },
};
