'use client'

import { Section } from '@/components/section'
import { about } from '@/lib/content'
import { useLocale } from '@/lib/i18n'

export function About() {
  const { ui, t } = useLocale()

  return (
    <Section id="about" index={1} label={ui.sections.about} heading={ui.about.heading}>
      <div className="about-layout grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="about-copy reveal max-w-2xl space-y-5 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
          {about.bio.map((paragraph) => (
            <p key={paragraph.fr}>{t(paragraph)}</p>
          ))}
        </div>

        <div className="about-collage reveal" aria-label={ui.about.strengthsLabel}>
          <div className="about-collage-stamp">MMI / web</div>
          <div className="about-collage-stack">
            {about.strengths.map((strength, i) => (
              <article key={strength.title.fr} className={`about-strength-card about-strength-card-${i + 1}`}>
                <span aria-hidden="true" className="font-mono text-[0.62rem] tracking-[0.18em] text-brand uppercase">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-lg font-semibold tracking-tight">{t(strength.title)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(strength.detail)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
