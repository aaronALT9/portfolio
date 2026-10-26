'use client'

import { Section } from '@/components/section'
import { skills, type Level } from '@/lib/content'
import { useLocale } from '@/lib/i18n'

const levelOrder: Level[] = ['solid', 'comfortable', 'learning']

export function Skills() {
  const { ui } = useLocale()

  return (
    <Section id="skills" index={4} label={ui.sections.skills} heading={ui.skills.heading} variant="mosaic">
      <div className="skill-legend flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase">{ui.skills.legend}</span>
        {levelOrder.map((level) => (
          <span key={level} className="skill-legend-item">
            {ui.skills.levels[level]}
          </span>
        ))}
      </div>

      <div className="skill-mosaic mt-10">
        {skills.map((group) => (
          <div key={group.group} className="skill-group reveal reveal-scale">
            <h3 className="skill-group-title">{ui.skills.groups[group.group]}</h3>
            <ul className="skill-list">
              {[...group.items]
                .sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level))
                .map((skill) => (
                  <li
                    key={skill.name}
                    className={`skill-item skill-item-${skill.level}`}
                  >
                    {skill.name}
                    <span className="skill-level">{ui.skills.levels[skill.level]}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
