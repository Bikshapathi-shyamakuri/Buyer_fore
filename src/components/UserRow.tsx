import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { getInitials, getAvatarColor } from '../utils';

interface UserRowProps {
  user: User;
  index: number;
}

export default function UserRow({ user, index }: UserRowProps) {
  const navigate = useNavigate();

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/user/${user.id}`)}
      className="group cursor-pointer border-b border-surface-100 dark:border-dark-600/40
        hover:bg-surface-50 dark:hover:bg-dark-700/60 transition-colors duration-150"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(user.id)}
            flex items-center justify-center text-white text-xs font-bold shrink-0
            shadow-sm group-hover:scale-105 transition-transform duration-200`}>
            {getInitials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">@{user.username}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 hidden sm:table-cell">
        <span className="text-sm text-slate-600 dark:text-slate-300 font-mono text-xs">{user.email}</span>
      </td>
      <td className="px-5 py-4 hidden md:table-cell">
        <span className="text-sm text-slate-600 dark:text-slate-300">{user.phone.split(' ')[0]}</span>
      </td>
      <td className="px-5 py-4 hidden lg:table-cell">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md
          bg-surface-100 dark:bg-dark-600 text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {user.company.name}
        </span>
      </td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1 text-brand-500 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
          View
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </span>
      </td>
    </motion.tr>
  );
}
