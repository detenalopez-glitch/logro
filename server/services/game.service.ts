import { v4 as uuidv4 } from 'uuid';
import { GameProgress, CreateGameDto } from '../types';

class GameService {
  private games: GameProgress[] = [];

  async getAllGames(): Promise<GameProgress[]> {
    // Simulando delay de red
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.games), 500);
    });
  }

  async getGameById(id: string): Promise<GameProgress | undefined> {
    return new Promise((resolve) => {
      const game = this.games.find((g) => g.id === id);
      setTimeout(() => resolve(game), 300);
    });
  }

  async createGame(data: CreateGameDto): Promise<GameProgress> {
    return new Promise((resolve) => {
      const newGame: GameProgress = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.games.push(newGame);
      setTimeout(() => resolve(newGame), 500);
    });
  }

  async updateGame(id: string, data: Partial<CreateGameDto>): Promise<GameProgress | undefined> {
    return new Promise((resolve) => {
      const index = this.games.findIndex((g) => g.id === id);
      if (index === -1) return resolve(undefined);

      const updatedGame: GameProgress = {
        ...this.games[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      this.games[index] = updatedGame;
      setTimeout(() => resolve(updatedGame), 500);
    });
  }

  async deleteGame(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const initialLength = this.games.length;
      this.games = this.games.filter((g) => g.id !== id);
      setTimeout(() => resolve(this.games.length < initialLength), 300);
    });
  }
}

export const gameService = new GameService();
