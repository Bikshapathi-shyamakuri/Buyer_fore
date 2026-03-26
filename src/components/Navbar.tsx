import { motion } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';

export default function Navbar() {
  const { dark, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 border-b
        border-surface-200/80 dark:border-dark-600/60
        bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-brand">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5Z" stroke="white" strokeWidth="1.5"/>
            <circle cx="8" cy="6.5" r="2" fill="white"/>
            <path d="M3.5 12.5C4.5 10.5 6.1 9.5 8 9.5s3.5 1 4.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-sm font-bold tracking-tight text-surface-900 dark:text-white">
          UserBase<span className="text-brand-500">.</span>
        </span>
      </div>

      {/* Center badge */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 px-4 py-1.5 rounded-full bg-surface-100 dark:bg-dark-700 border border-surface-200 dark:border-dark-500">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Admin Panel</span>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center
            bg-surface-100 dark:bg-dark-700
            border border-surface-200 dark:border-dark-500
            text-slate-500 dark:text-slate-400
            hover:bg-surface-200 dark:hover:bg-dark-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </motion.button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shadow-brand">
          A
        </div>
      </div>
    </motion.header>
  );
}
