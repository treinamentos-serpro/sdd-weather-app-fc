interface EmptyStateProps {
  title: string;
  hint: string;
}

export default function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div
      aria-live="polite"
      className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/80 backdrop-blur-md"
      role="status"
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm">{hint}</p>
    </div>
  );
}
