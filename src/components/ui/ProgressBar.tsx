export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-teal to-brand-blue-light transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
