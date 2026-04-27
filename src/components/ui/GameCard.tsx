import React from 'react';
import { GameProgress } from '../../types';
import { ProgressBar } from './ProgressBar';

interface GameCardProps {
  game: GameProgress;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onUpdate, onDelete }) => {
  const isPlatinum = game.status === 'platinum' || game.earnedAchievements === game.totalAchievements;

  const statusColors = {
    backlog: 'bg-gray-100 text-gray-800 border-gray-200',
    playing: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    platinum: 'bg-yellow-50 text-yellow-700 border-yellow-300 font-bold',
  };

  const badgeColor = statusColors[game.status] || statusColors.backlog;

  return (
    <div className={`p-5 rounded-xl border ${isPlatinum ? 'border-yellow-400 shadow-sm' : 'border-gray-200'} bg-white hover:shadow-md transition-shadow relative overflow-hidden group`}>
      {/* Botones de acción rápidos escondidos hasta hover */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onUpdate && (
          <button onClick={() => onUpdate(game.id)} className="text-gray-400 hover:text-indigo-600 transition" aria-label="Editar" title="Editar">
             {/* Icono de lápiz simplificado (placeholder) */}
            ✏️
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(game.id)} className="text-gray-400 hover:text-red-600 transition" aria-label="Eliminar" title="Eliminar">
             {/* Icono de tacho simplificado (placeholder) */}
            🗑️
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {/* Header: Título y Plataforma */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 truncate pr-10" title={game.title}>
            {game.title} {isPlatinum && '🏆'}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {game.platform && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                {game.platform}
              </span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-md border ${badgeColor} capitalize`}>
              {game.status}
            </span>
          </div>
        </div>

        {/* Progress section */}
        <div className="mt-2">
          <ProgressBar 
            current={game.earnedAchievements} 
            total={game.totalAchievements} 
          />
        </div>
      </div>
    </div>
  );
};
