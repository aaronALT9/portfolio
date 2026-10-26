'use client'

import { ArrowDownIcon, ArrowUpRightIcon, DownloadIcon } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'
import { LocalTime } from '@/components/local-time'
import { buttonVariants } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { profile } from '@/lib/site'
import { cn } from '@/lib/utils'

const enter = 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:fill-mode-both'

export function Hero() {
  const { ui } = useLocale()

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:px-8 md:pt-20 md:pb-28">
        <div className="hero-shell grid items-end gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
          <div>
            <p
              className={cn(
                'status-pill inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.18em] text-muted-foreground uppercase',
                enter,
              )}
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
              </span>
              {ui.hero.status}
            </p>

            <h1
              id="hero-heading"
              className={cn(
                'mt-8 max-w-[10ch] text-5xl font-semibold tracking-[-0.08em] text-balance sm:text-6xl md:text-7xl xl:text-[8rem]',
                enter,
                'motion-safe:delay-100',
              )}
            >
              Aaron
              <span className="text-brand"> Zerrouk</span>
            </h1>

            <p
              className={cn(
                'mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base font-medium text-foreground md:text-xl',
                enter,
                'motion-safe:delay-150',
              )}
            >
              {ui.hero.title}
              <span lang="ja" className="font-mono text-xs font-normal text-muted-foreground uppercase tracking-[0.2em]">
                アーロン・ゼルーク
              </span>
            </p>

            <p
              className={cn(
                'mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg',
                enter,
                'motion-safe:delay-200',
              )}
            >
              {ui.hero.pitch}
            </p>

            <div className={cn('mt-10 flex flex-wrap gap-3', enter, 'motion-safe:delay-300')}>
              <a href="#projects" className={cn(buttonVariants({ size: 'lg' }), 'h-10 px-4')}>
                {ui.hero.projects}
                <ArrowDownIcon data-icon="inline-end" />
              </a>
              <a
                href={profile.cv}
                download
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10 px-4')}
              >
                <DownloadIcon data-icon="inline-start" />
                {ui.hero.cv}
              </a>
              <a href="#contact" className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-10 px-4')}>
                {ui.hero.contact}
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </div>
          </div>

          <aside className={cn('hero-signature', enter, 'motion-safe:delay-250')} aria-label="Signature de studio">
            <div className="hero-signature-top">
              <span className="hero-signature-label">Web designer / dev</span>
              <span className="hero-signature-mark" aria-hidden="true">
                AZ
              </span>
            </div>

            <svg viewBox="0 0 340 340" aria-hidden="true" className="hero-signature-art">
              <path d="M54 218c32-68 92-103 160-99 35 2 65 21 86 53" />
              <path d="M84 235c22-12 42-16 63-13 30 4 56 21 77 46" />
              <path d="M38 142c44-56 102-84 169-84 50 0 94 17 128 52" />
              <path d="M113 87l40 99 42-116 39 109" />
              <circle cx="246" cy="115" r="10" />
              <circle cx="93" cy="255" r="8" />
            </svg>

            <div className="hero-signature-meta">
              <span>MMI</span>
              <span>Clermont</span>
            </div>
          </aside>
        </div>

        <dl
          className={cn(
            'mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-6 text-sm sm:grid-cols-3 md:mt-24',
            enter,
            'motion-safe:delay-500',
          )}
        >
          <div>
            <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">{ui.hero.time}</dt>
            <dd className="mt-1 font-medium tabular-nums">
              <LocalTime />
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
              {ui.hero.school}
            </dt>
            <dd className="mt-1 font-medium">{ui.hero.based}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">GitHub</dt>
            <dd className="mt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
              >
                <GitHubIcon className="size-3.5" />
                {profile.githubHandle}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
