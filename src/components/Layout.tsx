import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-900 transition-colors duration-300">
      <Navbar />
      <Sidebar />
      <main className="pt-16 md:pl-60">
        <div className="max-w-7xl mx-auto p-5 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
