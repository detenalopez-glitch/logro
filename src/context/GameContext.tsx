import React, { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GameProgress } from '../types';
import { gamesApi } from '../api/games';

interface GameState {
  games: GameProgress[];
  loading: boolean;
  error: string | null;
}

type GameAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: GameProgress[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_GAME'; payload: GameProgress }
  | { type: 'UPDATE_GAME'; payload: GameProgress }
  | { type: 'DELETE_GAME'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: GameState = {
  games: [],
  loading: false,
  error: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, games: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_GAME':
      return { ...state, games: [...state.games, action.payload] };
    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map((g) =>
          g.id === action.payload.id ? action.payload : g
        ),
      };
    case 'DELETE_GAME':
      return {
        ...state,
        games: state.games.filter((g) => g.id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load initial data from Backend API
  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await gamesApi.getAll();
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (err) {
        if (isMounted) {
          dispatch({ 
            type: 'FETCH_ERROR', 
            payload: err instanceof Error ? err.message : 'Error al cargar juegos'
          });
        }
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
