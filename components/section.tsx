import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  index: number
  label: string
  heading: string
  children: React.ReactNode
  variant: 'editorial' | 'showcase' | 'timeline' | 'mosaic' | 'archive' | 'contact'
  className?: string
}

export function Section({ id, index, label, heading, children, variant, className }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('section-shell border-t border-border/70 py-20 md:py-28', className)}
    >
      <div className={cn('section-layout mx-auto max-w-6xl px-5 md:px-8', `section-layout-${variant}`)}>
        <header className="section-head">
          <div className="section-index">
            <span className="section-index-number">{String(index).padStart(2, '0')}</span>
            <span aria-hidden="true" className="section-index-divider" />
            <span className="section-index-label">{label}</span>
          </div>
          <h2
            id={headingId}
            className="section-heading reveal text-4xl font-semibold tracking-[-0.05em] text-balance md:text-5xl xl:text-6xl"
          >
            {heading}
          </h2>
        </header>
        <div className="section-content">{children}</div>
      </div>
    </section>
  )
}
