interface SkeletonCardProps {
  hasProgress?: boolean
  variant?: 'default' | 'compact'
}

export function SkeletonCard({ hasProgress = false, variant = 'default' }: SkeletonCardProps) {
  if (variant === 'compact') {
    return (
      <div className="premium-card p-5 flex flex-col items-center text-center">
        <div className="skeleton h-14 w-14 rounded-full mb-4" />
        <div className="skeleton h-4 w-3/4 mb-2" />
        <div className="skeleton h-3 w-1/2" />
      </div>
    )
  }

  return (
    <div className="premium-card group">
      {/* Image placeholder */}
      <div className="skeleton aspect-video w-full rounded-t-2xl" />
      
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />

        {hasProgress && (
          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1.5 text-[#A1A1AA]">
              <span>Progresso</span>
              <span className="skeleton h-3 w-8 inline-block align-middle" />
            </div>
            <div className="skeleton h-1.5 w-full rounded-full" />
          </div>
        )}

        <div className="pt-2 flex items-center justify-between">
          <div className="skeleton h-9 w-20 rounded-2xl" />
          <div className="skeleton h-4 w-12" />
        </div>
      </div>
    </div>
  )
}