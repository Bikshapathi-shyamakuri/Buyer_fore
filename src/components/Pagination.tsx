import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPage: (p: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 pt-4">
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => onPage(currentPage - 1)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400
          bg-surface-100 dark:bg-dark-700 border border-surface-200 dark:border-dark-500
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-200 dark:hover:bg-dark-600 transition-colors"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </motion.button>

      {pages.map(p => (
        <motion.button
          key={p}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPage(p)}
          className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all
            ${p === currentPage
              ? 'bg-brand-500 text-white shadow-brand'
              : 'bg-surface-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 border border-surface-200 dark:border-dark-500 hover:bg-surface-200 dark:hover:bg-dark-600'
            }`}
        >
          {p}
        </motion.button>
      ))}

      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => onPage(currentPage + 1)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400
          bg-surface-100 dark:bg-dark-700 border border-surface-200 dark:border-dark-500
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-200 dark:hover:bg-dark-600 transition-colors"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </motion.button>
    </div>
  );
}
