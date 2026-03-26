export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-surface-100 dark:border-dark-600/40">
      <div className="w-9 h-9 rounded-full skeleton" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3.5 w-36 rounded skeleton" />
        <div className="h-3 w-48 rounded skeleton" />
      </div>
      <div className="hidden sm:block w-28 h-3 rounded skeleton" />
      <div className="hidden md:block w-32 h-3 rounded skeleton" />
      <div className="hidden lg:block w-24 h-3 rounded skeleton" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-surface-200 dark:border-dark-600/40 bg-white dark:bg-dark-700 p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded skeleton" />
          <div className="h-3 w-40 rounded skeleton" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-3/4 rounded skeleton" />
      </div>
    </div>
  );
}
