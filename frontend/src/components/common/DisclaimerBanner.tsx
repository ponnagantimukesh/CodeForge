import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/AppContext';

interface DisclaimerBannerProps {
  sourceUrl?: string;
  sourceDoc?: string;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  sourceUrl,
  sourceDoc,
  className = '',
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={`bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2.5 ${className}`}
    >
      <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
      <div className="flex-1 leading-relaxed">
        <span>{t.dashboard.disclaimer}</span>
        {(sourceDoc || sourceUrl) && (
          <div className="mt-1 flex items-center gap-2 font-medium text-slate-700">
            {sourceDoc && <span>Source: {sourceDoc}</span>}
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline inline-flex items-center gap-1"
              >
                Official Government Portal <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
