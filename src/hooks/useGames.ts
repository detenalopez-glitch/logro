import { useContext, useCallback, useMemo } from 'react';
import { GameContext } from '../context/GameContext';
import type { GameProgress, StatSummary } from '../types';
import { gamesApi } from '../api/games';

export function useGames() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGames must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const addGame = useCallback(async (game: Omit<GameProgress, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Optimistic logic o direct wait. Para simplicidad esperamos la respuesta
      const newGame = await gamesApi.create(game);
      dispatch({ type: 'ADD_GAME', payload: newGame });
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof Error ? err.message : 'Error al añadir el juego' 
      });
      throw err; // para que el UI pueda reaccionar
    }
  }, [dispatch]);

  const updateGame = useCallback(async (id: string, game: Partial<GameProgress>) => {
    try {
      const updatedGame = await gamesApi.update(id, game);
      dispatch({ type: 'UPDATE_GAME', payload: updatedGame });
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof Error ? err.message : 'Error al actualizar el juego' 
      });
      throw err;
    }
  }, [dispatch]);

  const deleteGame = useCallback(async (id: string) => {
    try {
      await gamesApi.delete(id);
      dispatch({ type: 'DELETE_GAME', payload: id });
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof Error ? err.message : 'Error al eliminar el juego' 
      });
      throw err;
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, [dispatch]);

  const stats = useMemo<StatSummary>(() => {
    const totalGames = state.games.length;
    if (totalGames === 0) return { totalGames: 0, totalPlatinum: 0, averageCompletion: 0 };
    
    let totalPlatinum = 0;
    let totalCompletion = 0;

    state.games.forEach((g) => {
      if (g.status === 'platinum' || (g.totalAchievements > 0 && g.earnedAchievements === g.totalAchievements)) {
        totalPlatinum++;
      }
      if (g.totalAchievements > 0) {
        totalCompletion += (g.earnedAchievements / g.totalAchievements) * 100;
      }
    });

    const averageCompletion = Math.round(totalCompletion / totalGames);

    return { totalGames, totalPlatinum, averageCompletion };
  }, [state.games]);

  return {
    games: state.games,
    loading: state.loading,
    error: state.error,
    stats,
    addGame,
    updateGame,
    deleteGame,
    clearError,
  };
}
