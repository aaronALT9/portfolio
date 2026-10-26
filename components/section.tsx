import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  index: number
  label: string
  heading: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, index, label, heading, children, className }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('section-shell border-t border-border/70 py-20 md:py-28', className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="section-head grid gap-5 md:grid-cols-[12rem_1fr] md:gap-12">
          <div className="section-index md:sticky md:top-24 md:self-start">
            <span className="section-index-number">{String(index).padStart(2, '0')}</span>
            <span aria-hidden="true" className="section-index-divider" />
            <span className="section-index-label">{label}</span>
          </div>
          <div className="min-w-0">
            <h2 id={headingId} className="reveal max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-balance md:text-5xl xl:text-6xl">
              {heading}
            </h2>
            <div className="mt-10 md:mt-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
