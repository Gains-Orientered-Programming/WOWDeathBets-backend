// src/models/user-model.ts
import mongoose, { Schema, Document } from 'mongoose';
// Define a User schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  currency: { type: Number, default: 0, min: 0 },
});

// User type for JWT Payload
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  currency: number;
};

// Create a User model
const User = mongoose.model<UserDocument>('User', userSchema);

// Define UserDocument interface
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  currency: number;
}

export default User;
