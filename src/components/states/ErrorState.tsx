interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      aria-live="assertive"
      className="rounded-xl border border-red-300/30 bg-red-950/30 p-5 text-white backdrop-blur-md"
      role="alert"
    >
      <p>{message}</p>
      <button
        className="mt-4 min-h-10 rounded-lg border border-white/20 px-4 py-2 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
        onClick={onRetry}
        type="button"
      >
        Tentar novamente
      </button>
    </div>
  );
}
