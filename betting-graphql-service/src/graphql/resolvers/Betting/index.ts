import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';
import { Betting } from '../../../lib/types';
import BettingModel from '../../../models/Betting.model';

export const bettingResolvers: IResolvers = {
  Query: {
    bettings: async (_root: undefined, _args): Promise<Betting[]> => {
      return await BettingModel.find();
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
