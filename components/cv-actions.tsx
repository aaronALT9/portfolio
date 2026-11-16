'use client'

import { buttonVariants } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { profile } from '@/lib/site'
import { cn } from '@/lib/utils'

export function CvActions({ className }: { className?: string }) {
  const { ui } = useLocale()

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <a
        href={profile.cv}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10')}
      >
        {ui.hero.viewCv}
      </a>
      <a
        href={profile.cv}
        download="cv-aaron-zerrouk.pdf"
        className={cn(buttonVariants({ size: 'lg' }), 'h-10')}
      >
        {ui.hero.cv}
      </a>
    </div>
  )
}
