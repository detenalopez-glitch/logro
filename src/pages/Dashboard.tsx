import { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { GameCard } from '../components/ui/GameCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import AddGameForm from '../components/forms/AddGameForm';
import { Layout } from '../components/ui/Layout';

export default function Dashboard() {
  const { games, loading, error, stats, deleteGame } = useGames();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => {
    alert(`En el futuro esto abrirá el formulario para editar el juego ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este juego de tu colección?')) {
      deleteGame(id);
    }
  };

  // We want to show maybe just the top recent ones on Dashboard, 
  // but for now let's just slice the last 4.
  const recentGames = [...games].reverse().slice(0, 4);

  return (
    <Layout>
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

        {/* Resumen de Estadísticas */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400" role="img" aria-label="Error">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total en Colección</dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-600">{stats.totalGames}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Juegos Platinados</dt>
              <dd className="mt-1 text-3xl font-semibold text-yellow-500 flex items-center gap-2">
                {stats.totalPlatinum} 🏆
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Progreso Promedio</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.averageCompletion}%</dd>
            </div>
          </div>
        </div>

        {/* Grid de Tarjetas */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Juegos Recientes</h2>
          {loading ? (
             <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Cargando juegos...</p>
             </div>
          ) : recentGames.length === 0 ? (
             <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Empieza por añadir un juego para ver tus estadísticas.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onUpdate={handleEdit} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal de añadir juegos */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Añadir Nuevo Juego">
          <AddGameForm onSuccess={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </Layout>
  );
}
