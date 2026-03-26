import type { User, SortState } from '../types';

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getAvatarColor(id: number): string {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-blue-600',
    'from-fuchsia-500 to-violet-600',
    'from-teal-500 to-green-600',
  ];
  return colors[id % colors.length];
}

export function filterUsers(users: User[], query: string): User[] {
  if (!query.trim()) return users;
  const q = query.toLowerCase();
  return users.filter(
    u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
}

export function sortUsers(users: User[], sort: SortState): User[] {
  return [...users].sort((a, b) => {
    const valA = sort.field === 'name' ? a.name : a.company.name;
    const valB = sort.field === 'name' ? b.name : b.company.name;
    const cmp = valA.localeCompare(valB);
    return sort.direction === 'asc' ? cmp : -cmp;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  return items.slice((page - 1) * perPage, page * perPage);
}
