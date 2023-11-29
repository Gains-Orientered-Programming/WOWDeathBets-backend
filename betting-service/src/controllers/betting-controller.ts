// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import {
  createBetting,
  getBettingById,
  deleteBettingById,
  getAllBettingByUserId,
  getAllBettings,
} from '../services/betting-services';

// Controller function to create a new user
export const createBettingController = async (req: Request, res: Response) => {
  try {
    const newUser = await createBetting(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create betting.' });
  }
};

export const getBettingByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const betting = await getBettingById(id);
    if (!betting) {
      return res.status(404).json({ message: 'Betting not found' });
    }
    res.json(betting);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get betting.' });
  }
};

export const getBettingsByUserIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const bettings = await getAllBettingByUserId(id);
    if (!bettings) {
      return res.status(404).json({ message: 'Betting not found' });
    }
    res.json(bettings);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get betting.' });
  }
};

export const getAllBettingsController = async (req: Request, res: Response) => {
  try {
    const bettings = await getAllBettings();
    if (!bettings) {
      return res.status(404).json({ message: 'Betting not found' });
    }
    res.json(bettings);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get betting.' });
  }
};

export const deleteBettingByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteBettingById(id);
    res.json({ message: 'Betting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete betting.' });
  }
};
