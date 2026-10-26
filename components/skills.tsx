'use client'

import { Section } from '@/components/section'
import { skills, type Level } from '@/lib/content'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const levelOrder: Level[] = ['solid', 'comfortable', 'learning']

const levelDot: Record<Level, string> = {
  solid: 'bg-brand',
  comfortable: 'border border-brand bg-brand/30',
  learning: 'border border-dashed border-muted-foreground',
}

function LevelDot({ level }: { level: Level }) {
  return <span aria-hidden="true" className={cn('size-2 shrink-0 rounded-full', levelDot[level])} />
}

export function Skills() {
  const { ui } = useLocale()

  return (
    <Section id="skills" index={4} label={ui.sections.skills} heading={ui.skills.heading}>
      <div className="skill-legend flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase">{ui.skills.legend}</span>
        {levelOrder.map((level) => (
          <span key={level} className="skill-legend-item flex items-center gap-2">
            <LevelDot level={level} />
            {ui.skills.levels[level]}
          </span>
        ))}
      </div>

      <div className="skill-mosaic mt-10">
        {skills.map((group) => (
          <div key={group.group} className="skill-group reveal">
            <h3 className="skill-group-title">{ui.skills.groups[group.group]}</h3>
            <ul className="skill-list">
              {[...group.items]
                .sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level))
                .map((skill) => (
                  <li
                    key={skill.name}
                    className={cn('skill-item', {
                      'skill-item-solid': skill.level === 'solid',
                      'skill-item-comfortable': skill.level === 'comfortable',
                      'skill-item-learning': skill.level === 'learning',
                    })}
                  >
                    <LevelDot level={skill.level} />
                    {skill.name}
                    <span className="sr-only">— {ui.skills.levels[skill.level]}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
