// src/models/ticket-model.ts
import mongoose, { Schema, Document } from 'mongoose';
//TODO: Make UUID implementation and generation
// Define a ticket schema
const ticketSchema = new Schema({
  characterName: String,
  amount: Number,
});

export type User = {
  id?: string;
  characterName: string;
  region: string;
  realm: string;
  amount: number;
};

// Create a ticket model
const Ticket = mongoose.model<TicketDocument>('Ticket', ticketSchema);

// Define UserDocument interface
interface TicketDocument extends Document {
  characterName: string;
  amount: number;
}

export default Ticket;
