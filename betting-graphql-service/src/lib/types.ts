import { Collection, ObjectId } from 'mongodb';

export interface Betting {
  _id?: ObjectId;
  userId: string;
  characterName: string;
  realm: string;
  region: string;
  amount: number;
}

export interface Database {
  bettings: Collection<Betting>;
}
