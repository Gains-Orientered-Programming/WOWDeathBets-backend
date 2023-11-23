// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import {
  createUser,
  getUserByUsername,
  getUserByEmail,
  deleteUserById,
  getUserById,
  deleteUserByUsername,
} from '../services/user-services';

// Controller function to create a new user
export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user.' });
  }
};

// Controller function to get a user by their username
export const getUserByUsernameController = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to get user.' });
  }
};

// Controller function to get a user by their email
export const getUserByEmailController = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to get user.' });
  }
};

export const smokeTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'User Service is up!' });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get user.' });
  }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteUserById(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user.' });
  }
};

export const deleteUserByUsernameController = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    await deleteUserByUsername(username);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user.' });
  }
};
