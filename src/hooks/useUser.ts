import { useState, useEffect, useCallback } from 'react';
import { fetchUser } from '../services/api';
import type { User } from '../types';

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUser(id: number): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUser(id);
      setUser(data);
    } catch {
      setError('Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  return { user, loading, error, refetch: load };
}
