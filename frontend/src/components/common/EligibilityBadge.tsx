import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

interface EligibilityBadgeProps {
  badge: 'green' | 'yellow' | 'red';
  statusText?: string;
  percentage?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const EligibilityBadge: React.FC<EligibilityBadgeProps> = ({
  badge,
  statusText,
  percentage,
  size = 'md',
}) => {
  const isGreen = badge === 'green';
  const isYellow = badge === 'yellow';

  const bgClass = isGreen
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
    : isYellow
    ? 'bg-amber-50 text-amber-800 border-amber-200'
    : 'bg-rose-50 text-rose-800 border-rose-200';

  const iconClass = isGreen
    ? 'text-emerald-600'
    : isYellow
    ? 'text-amber-600'
    : 'text-rose-600';

  const defaultText = isGreen
    ? 'Eligible / Strong Match'
    : isYellow
    ? 'Potentially Eligible'
    : 'Not Eligible';

  const text = statusText || defaultText;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-sm px-3 py-1 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  };

  return (
    <div
      className={`inline-flex items-center font-medium border rounded-full shadow-xs ${bgClass} ${sizeClasses[size]}`}
    >
      {isGreen ? (
        <CheckCircle className={`w-4 h-4 ${iconClass}`} />
      ) : isYellow ? (
        <AlertTriangle className={`w-4 h-4 ${iconClass}`} />
      ) : (
        <XCircle className={`w-4 h-4 ${iconClass}`} />
      )}
      <span>{text}</span>
      {percentage !== undefined && (
        <span
          className={`ml-1 font-bold text-xs px-1.5 py-0.5 rounded-full ${
            isGreen
              ? 'bg-emerald-200 text-emerald-900'
              : isYellow
              ? 'bg-amber-200 text-amber-900'
              : 'bg-rose-200 text-rose-900'
          }`}
        >
          {percentage}% Match
        </span>
      )}
    </div>
  );
};
