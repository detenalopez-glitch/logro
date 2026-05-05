import { Request, Response, NextFunction } from 'express';
import { gameService } from '../services/game.service';
import { CreateGameDto } from '../types';

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

export const getGameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const game = await gameService.getGameById(id);
    
    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: CreateGameDto = req.body;
    
    // Validación básica
    if (!data.title) {
      return res.status(400).json({ error: 'El título es requerido' });
    }
    if (data.earnedAchievements > data.totalAchievements) {
      return res.status(400).json({ error: 'Logros obtenidos no pueden ser mayores a los totales' });
    }

    const newGame = await gameService.createGame(data);
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const data: Partial<CreateGameDto> = req.body;

    const updatedGame = await gameService.updateGame(id, data);
    
    if (!updatedGame) {
      return res.status(404).json({ error: 'Juego no encontrado para actualizar' });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const deleted = await gameService.deleteGame(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Juego no encontrado para eliminar' });
    }

    res.status(200).json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
