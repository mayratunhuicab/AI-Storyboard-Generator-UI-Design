import React from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'generating' | 'completed' | 'error';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const configs = {
    generating: {
      icon: Loader2,
      label: 'Generando',
      className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      iconClassName: 'animate-spin',
    },
    completed: {
      icon: CheckCircle2,
      label: 'Completado',
      className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      iconClassName: '',
    },
    error: {
      icon: AlertCircle,
      label: 'Error',
      className: 'bg-red-500/20 text-red-400 border-red-500/30',
      iconClassName: '',
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.className}`}
    >
      <Icon size={12} className={config.iconClassName} />
      <span>{config.label}</span>
    </div>
  );
};
