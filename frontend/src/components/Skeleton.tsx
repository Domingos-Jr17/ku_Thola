
export const Skeleton = ({ className = "h-4 bg-gray-200 rounded" }: { className?: string }) => (
  <div className={`animate-pulse ${className}`} />
)
