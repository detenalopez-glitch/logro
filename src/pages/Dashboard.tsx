import React, { useState } from 'react';
import { GameCard } from '../components/ui/GameCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { GameProgress } from '../types';

// Mock de datos para poder visualizar el Dashboard sin Backend/Context aún
const MOCK_GAMES: GameProgress[] = [
  {
    id: '1',
    title: 'Elden Ring',
    platform: 'PlayStation 5',
    totalAchievements: 42,
    earnedAchievements: 42,
    status: 'platinum',
  },
  {
    id: '2',
    title: 'Hollow Knight',
    platform: 'PC (Steam)',
    totalAchievements: 63,
    earnedAchievements: 45,
    status: 'playing',
  },
  {
    id: '3',
    title: 'Cyberpunk 2077',
    platform: 'Xbox Series X',
    totalAchievements: 44,
    earnedAchievements: 10,
    status: 'backlog',
  },
  {
    id: '4',
    title: 'Sekiro: Shadows Die Twice',
    platform: 'PC (Steam)',
    totalAchievements: 34,
    earnedAchievements: 34,
    status: 'completed',
  },
];

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => {
    alert(`En el futuro esto abrirá el formulario para editar el juego ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`En el futuro esto eliminará el juego ${id} de tu colección`);
  };

  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tu Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Seguimiento de tu progreso como cazador de trofeos.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Añadir Juego
          </Button>
        </div>
      </div>

      {/* Resumen de Estadísticas (Placeholder) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total en Colección</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">{MOCK_GAMES.length}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Juegos Platinados</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-500 flex items-center gap-2">
              1 🏆
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Progreso Promedio</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">68%</dd>
          </div>
        </div>
      </div>

      {/* Grid de Tarjetas */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Juegos Recientes</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_GAMES.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onUpdate={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </div>

      {/* Modal de prueba para añadir juegos */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Añadir Nuevo Juego">
        <div className="py-4 space-y-4 text-gray-600">
          <p>
            Acá irá el formulario con los campos: Título, Plataforma, Total de Logros, Logros Obtenidos y el Estado (Jugando, Backlog, etc).
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Guardar Juego
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
