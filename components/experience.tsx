'use client'

import { Section } from '@/components/section'
import { experiences } from '@/lib/content'
import { useLocale } from '@/lib/i18n'

export function Experience() {
  const { t, ui } = useLocale()

  return (
    <Section id="experience" index={3} label={ui.sections.experience} heading={ui.experience.heading}>
      <ol className="experience-grid">
        {experiences.map((job) => (
          <li key={job.company} className="experience-item reveal">
            <div className="experience-item-head">
              <p className="font-mono text-[0.64rem] tracking-[0.18em] text-muted-foreground uppercase">
                <time>{t(job.period)}</time>
              </p>
              <span aria-hidden="true" className="experience-dot" />
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
              {job.company}
              <span className="ml-2 font-normal text-muted-foreground">— {t(job.role)}</span>
            </h3>

            <p className="mt-4 max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
              {t(job.summary)}
            </p>

            <h4 className="sr-only">{ui.experience.missions}</h4>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {job.missions.map((mission) => (
                <li key={mission.fr} className="experience-mission flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-brand" />
                  {t(mission)}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <li key={tag} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
