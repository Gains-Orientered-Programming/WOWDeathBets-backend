// src/models/user-model.ts
import mongoose, { Schema, Document } from 'mongoose';
//TODO: Make UUID implementation and generation
// Define a User schema
const bettingSchema = new Schema({
  characterName: String,
  region: String,
  realm: String,
  amount: Number,
});

export type User = {
  id?: string;
  characterName: string;
  region: string;
  realm: string;
  amount: number;
};

// Create a Betting model
const Betting = mongoose.model<BettingDocument>('Betting', bettingSchema);

// Define UserDocument interface
interface BettingDocument extends Document {
  characterName: string;
  region: string;
  realm: string;
  amount: number;
}

export default Betting;
