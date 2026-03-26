import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import ErrorState from '../components/ErrorState';
import { useUser } from '../hooks/useUser';
import { getInitials, getAvatarColor } from '../utils';

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40 p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl skeleton" />
          <div className="space-y-3 flex-1">
            <div className="h-6 w-48 rounded skeleton" />
            <div className="h-4 w-32 rounded skeleton" />
            <div className="h-4 w-56 rounded skeleton" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40 p-6 space-y-3">
            <div className="h-4 w-24 rounded skeleton" />
            <div className="h-3 w-full rounded skeleton" />
            <div className="h-3 w-3/4 rounded skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}

function InfoRow({ icon, label, value, mono }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-surface-100 dark:border-dark-600/40 last:border-0">
      <span className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">{label}</p>
        <p className={`text-sm text-slate-800 dark:text-slate-200 break-all ${mono ? 'font-mono' : ''}`}>{value}</p>
      </div>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

function SectionCard({ title, icon, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40 shadow-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-brand-500">{icon}</span>
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading, error, refetch } = useUser(Number(id));

  return (
    <Layout>
      <PageTransition>
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl
            bg-white dark:bg-dark-700 border border-surface-200 dark:border-dark-600/40
            text-sm font-medium text-slate-600 dark:text-slate-300
            hover:bg-surface-50 dark:hover:bg-dark-600
            shadow-card transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Dashboard
        </motion.button>

        {loading ? (
          <DetailSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : user ? (
          <div className="space-y-5">
            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-dark-700 rounded-2xl border border-surface-200 dark:border-dark-600/40 shadow-card overflow-hidden"
            >
              {/* Gradient banner */}
              <div className={`h-24 bg-gradient-to-r ${getAvatarColor(user.id)} opacity-80`} />
              <div className="px-8 pb-8">
                <div className="flex flex-col sm:flex-row gap-5 items-start -mt-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAvatarColor(user.id)}
                    flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white dark:ring-dark-700`}>
                    {getInitials(user.name)}
                  </div>
                  <div className="pt-10 sm:pt-12 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                        <p className="text-sm text-slate-400 dark:text-slate-500">@{user.username}</p>
                      </div>
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium
                          hover:bg-brand-600 transition-colors shadow-brand"
                      >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        {user.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Detail grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SectionCard
                delay={0.05}
                title="Contact Info"
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              >
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                  label="Email"
                  value={user.email}
                  mono
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 5.33 5.33l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>}
                  label="Phone"
                  value={user.phone}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                  label="Website"
                  value={user.website}
                  mono
                />
              </SectionCard>

              <SectionCard
                delay={0.1}
                title="Address"
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
              >
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                  label="Street"
                  value={`${user.address.street}, ${user.address.suite}`}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                  label="City"
                  value={user.address.city}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M4 10h16M4 14h16"/></svg>}
                  label="Zipcode"
                  value={user.address.zipcode}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                  label="Geo"
                  value={`${user.address.geo.lat}, ${user.address.geo.lng}`}
                  mono
                />
              </SectionCard>

              <SectionCard
                delay={0.15}
                title="Company"
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              >
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                  label="Company Name"
                  value={user.company.name}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                  label="Catchphrase"
                  value={user.company.catchPhrase}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                  label="Business"
                  value={user.company.bs}
                />
              </SectionCard>

              <SectionCard
                delay={0.2}
                title="Account Details"
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              >
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  label="Full Name"
                  value={user.name}
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  label="Username"
                  value={`@${user.username}`}
                  mono
                />
                <InfoRow
                  icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                  label="User ID"
                  value={`#${user.id.toString().padStart(4, '0')}`}
                  mono
                />
              </SectionCard>
            </div>
          </div>
        ) : null}
      </PageTransition>
    </Layout>
  );
}
