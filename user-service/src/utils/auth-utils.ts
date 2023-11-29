import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user-model';

dotenv.config();
// Function to compare a plain password with a hashed password
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

// Function to generate a JSON Web Token (JWT) for a user
export const generateJWT = (user: User): string => {
  const payload = {
    userId: user._id,
    email: user.email,
    currency: user.currency,
  };

  // Generate a JWT with an expiration time (e.g., 1 hour)
  const jwtSecret = process.env.JWT_SECRET || '';
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '1h',
  });

  return token;
};
