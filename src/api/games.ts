import { fetchClient } from './client';
import type { GameProgress } from '../types';

export const gamesApi = {
  getAll: () => 
    fetchClient<GameProgress[]>('/games'),
    
  getById: (id: string) => 
    fetchClient<GameProgress>(`/games/${id}`),
    
  create: (data: Omit<GameProgress, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchClient<GameProgress>('/games', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  update: (id: string, data: Partial<Omit<GameProgress, 'id' | 'createdAt' | 'updatedAt'>>) => 
    fetchClient<GameProgress>(`/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  delete: (id: string) => 
    fetchClient<{ message: string }>(`/games/${id}`, {
      method: 'DELETE',
    }),
};
