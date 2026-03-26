import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { getInitials, getAvatarColor } from '../utils';

interface UserCardProps {
  user: User;
  index: number;
}

export default function UserCard({ user, index }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      onClick={() => navigate(`/user/${user.id}`)}
      className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40
        p-5 cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getAvatarColor(user.id)}
            flex items-center justify-center text-white text-sm font-bold shadow-sm
            group-hover:scale-105 transition-transform duration-200`}>
            {getInitials(user.name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">@{user.username}</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-7 h-7 rounded-lg bg-surface-100 dark:bg-dark-600 flex items-center justify-center
            text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-200"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </motion.div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="truncate font-mono">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 5.33 5.33l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
          </svg>
          <span>{user.phone.split(' ')[0]}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-surface-100 dark:border-dark-600/40">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {user.company.name}
        </span>
      </div>
    </motion.div>
  );
}
