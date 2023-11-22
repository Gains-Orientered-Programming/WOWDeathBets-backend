// src/models/user-model.ts
import mongoose, { Schema, Document } from 'mongoose';
//TODO: Make UUID implementation and generation
// Define a User schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

export type User = {
  id?: string;
  username: string;
  email: string;
  password: string;
};

// Create a User model
const User = mongoose.model<UserDocument>('User', userSchema);

// Define UserDocument interface
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

export default User;
