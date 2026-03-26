import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  {
    to: '/',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    label: 'Dashboard',
  },
  {
    to: '/users',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Users',
  },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-16 bottom-0 w-60 z-40 hidden md:flex flex-col
        border-r border-surface-200/80 dark:border-dark-600/60
        bg-white/60 dark:bg-dark-800/60 backdrop-blur-xl px-3 py-5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 mb-2">
        Navigation
      </p>

      <nav className="flex flex-col gap-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive
                ? 'bg-brand-500 text-white shadow-brand'
                : 'text-slate-600 dark:text-slate-400 hover:bg-surface-100 dark:hover:bg-dark-700 hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-500 transition-colors'}>
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-xl bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20
          border border-brand-100 dark:border-brand-800/30 p-4">
          <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 mb-1">Live Data</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fetched from JSONPlaceholder API in real-time.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
