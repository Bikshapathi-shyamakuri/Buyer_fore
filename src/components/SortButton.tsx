import { motion } from 'framer-motion';
import type { SortField, SortState } from '../types';

interface SortButtonProps {
  field: SortField;
  label: string;
  sort: SortState;
  onSort: (field: SortField) => void;
}

export default function SortButton({ field, label, sort, onSort }: SortButtonProps) {
  const isActive = sort.field === field;
  const isAsc = sort.direction === 'asc';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onSort(field)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
        ${isActive
          ? 'bg-brand-500 text-white shadow-brand'
          : 'bg-surface-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 border border-surface-200 dark:border-dark-500 hover:bg-surface-200 dark:hover:bg-dark-600'
        }`}
    >
      {label}
      <span className="flex flex-col gap-[1px]">
        <svg
          width="8" height="5" viewBox="0 0 8 5" fill="currentColor"
          className={`transition-opacity ${isActive && isAsc ? 'opacity-100' : 'opacity-30'}`}
        >
          <path d="M4 0L8 5H0L4 0Z"/>
        </svg>
        <svg
          width="8" height="5" viewBox="0 0 8 5" fill="currentColor"
          className={`transition-opacity ${isActive && !isAsc ? 'opacity-100' : 'opacity-30'}`}
        >
          <path d="M4 5L0 0H8L4 5Z"/>
        </svg>
      </span>
    </motion.button>
  );
}
