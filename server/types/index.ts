export type GameStatus = 'backlog' | 'playing' | 'completed' | 'platinum';

export interface GameProgress {
  id: string;
  title: string;
  platform?: string;
  totalAchievements: number;
  earnedAchievements: number;
  status: GameStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameDto {
  title: string;
  platform?: string;
  totalAchievements: number;
  earnedAchievements: number;
  status: GameStatus;
}
