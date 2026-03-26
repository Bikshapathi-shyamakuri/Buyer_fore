import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import SearchBar from '../components/SearchBar';
import SortButton from '../components/SortButton';
import UserRow from '../components/UserRow';
import UserCard from '../components/UserCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import Pagination from '../components/Pagination';
import StatCard from '../components/StatCard';
import { SkeletonRow } from '../components/Skeleton';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { filterUsers, sortUsers, paginate } from '../utils';
import type { SortField, SortState } from '../types';

const PER_PAGE = 5;

export default function DashboardPage() {
  const { users, loading, error, refetch } = useUsers();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState>({ field: 'name', direction: 'asc' });
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'table' | 'grid'>('table');

  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(() => filterUsers(users, debouncedQuery), [users, debouncedQuery]);
  const sorted = useMemo(() => sortUsers(filtered, sort), [filtered, sort]);
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = useMemo(() => paginate(sorted, page, PER_PAGE), [sorted, page]);

  const handleSort = (field: SortField) => {
    setSort(prev =>
      prev.field === field
        ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { field, direction: 'asc' }
    );
    setPage(1);
  };

  const handleSearch = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  const uniqueCompanies = new Set(users.map(u => u.company.name)).size;

  return (
    <Layout>
      <PageTransition>
        {/* Header */}
        <div className="mb-7">
          <motion.h1
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            User Directory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-slate-400 dark:text-slate-500 mt-1"
          >
            Manage and explore your team members
          </motion.p>
        </div>

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <StatCard
              label="Total Users"
              value={users.length}
              color="bg-gradient-to-br from-brand-500 to-brand-600"
              delay={0.05}
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            />
            <StatCard
              label="Companies"
              value={uniqueCompanies}
              color="bg-gradient-to-br from-violet-500 to-purple-600"
              delay={0.1}
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
            />
            <StatCard
              label="Active Now"
              value={users.length}
              color="bg-gradient-to-br from-emerald-500 to-teal-600"
              delay={0.15}
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
            />
            <StatCard
              label="Search Results"
              value={filtered.length}
              color="bg-gradient-to-br from-orange-500 to-amber-500"
              delay={0.2}
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
            />
          </div>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40 shadow-card overflow-hidden"
        >
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-5 border-b border-surface-100 dark:border-dark-600/40">
            <SearchBar
              value={query}
              onChange={handleSearch}
              resultCount={filtered.length}
              total={users.length}
            />

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 dark:text-slate-500 mr-1">Sort:</span>
              <SortButton field="name" label="Name" sort={sort} onSort={handleSort} />
              <SortButton field="company" label="Company" sort={sort} onSort={handleSort} />

              {/* View toggle */}
              <div className="flex items-center rounded-lg border border-surface-200 dark:border-dark-500 overflow-hidden ml-2">
                {(['table', 'grid'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-2.5 py-1.5 transition-colors
                      ${view === v
                        ? 'bg-brand-500 text-white'
                        : 'bg-white dark:bg-dark-700 text-slate-400 dark:text-slate-500 hover:bg-surface-50 dark:hover:bg-dark-600'
                      }`}
                  >
                    {v === 'table'
                      ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                      : <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    }
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          {error ? (
            <div className="p-5">
              <ErrorState message={error} onRetry={refetch} />
            </div>
          ) : view === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-100 dark:border-dark-600/40">
                    {['User', 'Email', 'Phone', 'Company', ''].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}>
                          <td colSpan={5}>
                            <SkeletonRow />
                          </td>
                        </tr>
                      ))
                    ) : paginated.length === 0 ? (
                      <tr>
                        <td colSpan={5}>
                          <EmptyState query={debouncedQuery} onClear={() => handleSearch('')} />
                        </td>
                      </tr>
                    ) : (
                      paginated.map((user, i) => (
                        <UserRow key={user.id} user={user} index={i} />
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-surface-200 dark:border-dark-600/40 p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl skeleton" />
                        <div className="space-y-2 flex-1">
                          <div className="h-3.5 w-28 rounded skeleton" />
                          <div className="h-3 w-20 rounded skeleton" />
                        </div>
                      </div>
                      <div className="h-3 w-full rounded skeleton" />
                      <div className="h-3 w-3/4 rounded skeleton" />
                    </div>
                  ))}
                </div>
              ) : paginated.length === 0 ? (
                <EmptyState query={debouncedQuery} onClear={() => handleSearch('')} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginated.map((user, i) => (
                    <UserCard key={user.id} user={user} index={i} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {!loading && !error && sorted.length > 0 && (
            <div className="px-5 pb-5">
              <Pagination currentPage={page} totalPages={totalPages} onPage={setPage} />
              <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-3">
                Showing {Math.min((page - 1) * PER_PAGE + 1, sorted.length)}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length} users
              </p>
            </div>
          )}
        </motion.div>
      </PageTransition>
    </Layout>
  );
}
