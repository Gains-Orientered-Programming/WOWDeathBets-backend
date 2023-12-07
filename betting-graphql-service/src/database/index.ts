import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const url = 'mongodb+srv://betting:Xx7yXvx61gWFVjlm@betting.ibnhjsx.mongodb.net/';

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db('main');

  return {
    bettings: db.collection('test_bettings'),
  };
};
