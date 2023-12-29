// src/models/user-model.ts
import mongoose, { Schema, Document } from 'mongoose';
//TODO: Make UUID implementation and generation
// Define a User schema
const bettingSchema = new Schema({
  userId: String,
  characterName: String,
  region: String,
  realm: String,
  amount: Number,
  status: String,
});

// Create a Betting model
const Betting = mongoose.model<BettingDocument>('Betting', bettingSchema);

// Define UserDocument interface
interface BettingDocument extends Document {
  userId: string;
  characterName: string;
  region: string;
  realm: string;
  amount: number;
  status: 'pending' | 'concluded' | 'resolved';
}

export default Betting;
