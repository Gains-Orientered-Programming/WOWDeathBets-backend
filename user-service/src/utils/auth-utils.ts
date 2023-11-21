import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model';
import dotenv from 'dotenv';

dotenv.config();
// Function to compare a plain password with a hashed password
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

// // Function to generate a JSON Web Token (JWT) for a user
// export const generateJWT = (user: User): string => {
//   const payload = {
//     userId: user.id, // Include any relevant user data here
//     email: user.email,
//     // Add any other user claims as needed
//   };

//   // Generate a JWT with an expiration time (e.g., 1 hour)
//   const token = jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return token;
// };
