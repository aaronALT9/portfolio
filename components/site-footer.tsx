'use client'

import { ArrowUpIcon } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'
import { LocalTime } from '@/components/local-time'
import { useLocale } from '@/lib/i18n'
import { profile } from '@/lib/site'

export function SiteFooter() {
  const { ui } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="site-footer-inner flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. {ui.footer.built}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2 tabular-nums">
              {ui.footer.time}: <LocalTime />
            </span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <GitHubIcon className="size-4" />
              {profile.githubHandle}
            </a>
            <a href={profile.cv} download className="hover:text-foreground">
              {ui.footer.cv}
            </a>
            <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              {ui.footer.top}
              <ArrowUpIcon className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
