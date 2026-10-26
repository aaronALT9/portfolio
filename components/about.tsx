'use client'

import { Section } from '@/components/section'
import { about } from '@/lib/content'
import { useLocale } from '@/lib/i18n'

export function About() {
  const { ui, t } = useLocale()

  return (
    <Section id="about" index={1} label={ui.sections.about} heading={ui.about.heading} variant="editorial">
      <div className="about-layout grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="about-copy reveal max-w-2xl space-y-5 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
          {about.bio.map((paragraph) => (
            <p key={paragraph.fr}>{t(paragraph)}</p>
          ))}
        </div>

        <aside className="about-strengths reveal" aria-label={ui.about.strengthsLabel}>
          <p className="about-stamp">{ui.about.stampLabel}</p>
          <ul className="about-strength-list">
            {about.strengths.map((strength) => (
              <li key={strength.title.fr}>
                <h3>{t(strength.title)}</h3>
                <p>{t(strength.detail)}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  )
}
