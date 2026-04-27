export type GameStatus = 'backlog' | 'playing' | 'completed' | 'platinum';

export interface GameProgress {
  id: string;
  title: string;
  platform?: string;
  totalAchievements: number;
  earnedAchievements: number;
  status: GameStatus;
  createdAt?: string; // Fecha en la que se agregó al tracker
  updatedAt?: string; // Última fecha en que se avanzó un logro
}

export interface StatSummary {
  totalGames: number;
  totalPlatinum: number;
  averageCompletion: number;
}
