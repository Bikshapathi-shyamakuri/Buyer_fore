import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

export default function StatCard({ label, value, icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40
        p-5 shadow-card flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center text-white shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}
