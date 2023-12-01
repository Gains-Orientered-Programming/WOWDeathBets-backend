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
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  currency: number;
};

// Create a User model
const UserModel = mongoose.model<UserDocument>('User', userSchema);

// Define UserDocument interface
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  currency: number;
}

export default UserModel;
