interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = 'Carregando previsão do tempo…',
}: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur-md"
      role="status"
    >
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-white/25 border-t-accent-400 motion-reduce:animate-none"
      />
      <span>{message}</span>
    </div>
  );
}
