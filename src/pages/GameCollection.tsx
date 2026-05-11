import { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { Layout } from '../components/ui/Layout';
import { GameCard } from '../components/ui/GameCard';
import { Modal } from '../components/ui/Modal';
import AddGameForm from '../components/forms/AddGameForm';
import { Button } from '../components/ui/Button';
import type { GameProgress } from '../types';

export default function GameCollection() {
  const { games, loading, error, deleteGame } = useGames();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<GameProgress | null>(null);

  const handleEdit = (id: string) => {
    const game = games.find((g) => g.id === id);
    if (game) {
      setEditingGame(game);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      await deleteGame(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGame(null);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mi Colección</h1>
        <Button onClick={() => { setEditingGame(null); setIsModalOpen(true); }}>+ Añadir Juego</Button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400" role="img" aria-label="Error">🚫</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">Cargando colección...</p>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No tienes juegos en tu colección aún.</p>
          <Button onClick={() => { setEditingGame(null); setIsModalOpen(true); }}>Añadir mi primer juego</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onUpdate={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingGame ? "Editar Juego" : "Añadir Juego"}
      >
        <AddGameForm 
          initialData={editingGame} 
          onSuccess={handleCloseModal} 
          onCancel={handleCloseModal} 
        />
      </Modal>
    </Layout>
  );
}
