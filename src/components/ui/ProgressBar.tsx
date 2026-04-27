import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, showLabel = true }) => {
  // Asegurarnos de no dividir por cero y limitar a 100%
  const percentage = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;
  
  // Cambiamos el color basado en si está platinado o no
  const isPlatinum = percentage === 100;
  const barColor = isPlatinum ? 'bg-yellow-400' : 'bg-indigo-600';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="text-gray-700">Progreso</span>
          <span className={`${isPlatinum ? 'text-yellow-600 font-bold' : 'text-gray-900'}`}>
            {percentage}% ({current}/{total})
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`${barColor} h-2.5 rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
