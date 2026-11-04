'use client'

import { Section } from '@/components/section'
import { about } from '@/lib/content'
import { useLocale } from '@/lib/i18n'

export function About() {
  const { ui, t } = useLocale()

  return (
    <Section id="about" index={1} label={ui.sections.about} heading={ui.about.heading} variant="editorial">
      <div className="about-layout">
        <div className="about-copy reveal reveal-left">
          <p className="about-column-label">
            <span className="about-column-mark" aria-hidden="true">
              ■
            </span>
            {ui.about.columnParcours}
          </p>
          <p>{t(about.bio[0])}</p>
        </div>

        <div className="about-copy reveal reveal-left">
          <p className="about-column-label">
            <span className="about-column-mark" aria-hidden="true">
              ■
            </span>
            {ui.about.columnPassions}
          </p>
          <p>{t(about.bio[1])}</p>
        </div>

        <aside className="about-strengths reveal reveal-scale" aria-label={ui.about.strengthsLabel}>
          <p className="about-column-label">
            <span className="about-column-mark" aria-hidden="true">
              ■
            </span>
            {ui.about.columnStrengths}
          </p>
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

      <div className="about-interests">
        <ul className="about-interests-list">
          {ui.about.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
