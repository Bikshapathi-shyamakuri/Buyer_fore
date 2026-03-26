import { motion } from 'framer-motion';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-rose-400">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">Something went wrong</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5 max-w-sm">{message}</p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium
          hover:bg-rose-600 transition-colors"
      >
        Try again
      </motion.button>
    </motion.div>
  );
}
