import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useGames } from '../../hooks/useGames';
import { Button } from '../ui/Button';
import type { GameStatus } from '../../types';

interface AddGameFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormValues extends Record<string, unknown> {
  title: string;
  platform: string;
  totalAchievements: number;
  earnedAchievements: number;
  status: GameStatus;
}

export default function AddGameForm({ onSuccess, onCancel }: AddGameFormProps) {
  const { addGame } = useGames();

  const { values, errors, isSubmitting, setIsSubmitting, handleChange, validate, resetForm } = useForm<FormValues>(
    {
      title: '',
      platform: '',
      totalAchievements: 0,
      earnedAchievements: 0,
      status: 'playing',
    },
    {
      title: (val: unknown) => (!String(val).trim() ? 'El título es requerido' : null),
      totalAchievements: (val: unknown) => (Number(val) < 0 ? 'Debe ser 0 o mayor' : null),
      earnedAchievements: (val: unknown) => (Number(val) < 0 ? 'Debe ser 0 o mayor' : null),
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (values.earnedAchievements > values.totalAchievements) {
        alert('Los logros obtenidos no pueden ser mayores que el total.');
        return;
      }

      setIsSubmitting(true);
      try {
        await addGame(values);
        resetForm();
        if (onSuccess) onSuccess();
      } catch (err) {
        // Error handled globally via Context, but we can show it here or keep form open
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título del Juego</label>
        <input
          type="text"
          className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          value={values.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ej: Hollow Knight"
        />
        {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Plataforma</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={values.platform}
          onChange={(e) => handleChange('platform', e.target.value)}
          placeholder="Ej: PC, PS5, Xbox"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Total de Logros</label>
          <input
            type="number"
            className={`w-full p-2 border rounded ${errors.totalAchievements ? 'border-red-500' : 'border-gray-300'}`}
            value={values.totalAchievements}
            onChange={(e) => handleChange('totalAchievements', Number(e.target.value))}
            min={0}
          />
          {errors.totalAchievements && <span className="text-red-500 text-xs mt-1">{errors.totalAchievements}</span>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Logros Obtenidos</label>
          <input
            type="number"
            className={`w-full p-2 border rounded ${errors.earnedAchievements ? 'border-red-500' : 'border-gray-300'}`}
            value={values.earnedAchievements}
            onChange={(e) => handleChange('earnedAchievements', Number(e.target.value))}
            min={0}
          />
          {errors.earnedAchievements && <span className="text-red-500 text-xs mt-1">{errors.earnedAchievements}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={values.status}
          onChange={(e) => handleChange('status', e.target.value as GameStatus)}
        >
          <option value="backlog">Pendiente (Backlog)</option>
          <option value="playing">Jugando</option>
          <option value="completed">Completado</option>
          <option value="platinum">Platinado (100%)</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Juego'}
        </Button>
      </div>
    </form>
  );
}
