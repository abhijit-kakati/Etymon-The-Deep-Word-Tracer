
import React from 'react';
import { EtymologyStep } from '../types';

interface HistoryItemProps {
  step: EtymologyStep;
  isFirst: boolean;
  isLast: boolean;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ step, isFirst, isLast }) => {
  return (
    <div className="relative flex gap-6 pb-10 last:pb-0 group">
      {/* Line connecting items */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 w-[2px] h-full bg-slate-200 dark:bg-slate-800 group-last:hidden" />
      )}
      
      {/* Circle indicator */}
      <div className="relative z-10">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
          ${isFirst 
            ? 'border-slate-800 dark:border-slate-100 bg-slate-800 dark:bg-slate-100' 
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isFirst ? 'bg-white dark:bg-slate-900' : 'bg-slate-300 dark:bg-slate-700'}`} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {step.period}
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">
              — {step.yearsAgo}
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 w-fit">
            {step.region}
          </span>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50 serif">
              "{step.word}"
            </h4>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                {step.language}
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {step.simplifiedLanguage}
              </span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
