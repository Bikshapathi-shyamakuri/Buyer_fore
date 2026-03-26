import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  resultCount: number;
  total: number;
}

export default function SearchBar({ value, onChange, resultCount, total }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
            bg-surface-50 dark:bg-dark-700
            border border-surface-200 dark:border-dark-500
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400
            transition-all duration-200"
        />
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
              bg-slate-200 dark:bg-dark-500 flex items-center justify-center
              text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-dark-400 transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.button>
        )}
      </div>

      {value && (
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap"
        >
          {resultCount} of {total} users
        </motion.span>
      )}
    </div>
  );
}
