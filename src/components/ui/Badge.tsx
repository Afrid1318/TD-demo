import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'teal' | 'blue' | 'muted'
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps['variant']>, string> = {
  teal: 'bg-brand-teal/15 text-brand-teal border-brand-teal/30',
  blue: 'bg-brand-blue/15 text-brand-blue-light border-brand-blue/30',
  muted: 'bg-white/10 text-brand-muted border-white/15',
}

export function Badge({ children, variant = 'teal' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  )
}
