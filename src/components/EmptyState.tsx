import { motion } from 'framer-motion';

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export default function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-dark-700 flex items-center justify-center mb-4"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} className="text-slate-300 dark:text-slate-600">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </motion.div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">No results found</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5 max-w-xs">
        No users match <span className="font-medium text-slate-600 dark:text-slate-400">"{query}"</span>. Try a different name or email.
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium
          hover:bg-brand-600 transition-colors shadow-brand"
      >
        Clear search
      </motion.button>
    </motion.div>
  );
}
