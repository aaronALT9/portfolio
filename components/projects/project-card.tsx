'use client'

import { ArrowUpRightIcon } from 'lucide-react'
import { ProjectCover } from '@/components/projects/project-cover'
import type { Project } from '@/lib/content'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Props = { project: Project; index: number; onOpen: (project: Project) => void }

export function ProjectCard({ project, index, onOpen }: Props) {
  const { t, ui } = useLocale()

  return (
    <li className={cn('project-case-study reveal', index % 2 === 1 && 'project-case-study-reverse')}>
      <article className="project-case group">
        <div className="project-case-visual">
          <ProjectCover
            project={project}
            image={project.images[0]}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="project-case-cover aspect-[16/10] w-full"
          />
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`${project.title} — ${ui.projects.open}`}
            className="project-case-trigger focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="project-case-view" aria-hidden="true">
              {ui.projects.open}
              <ArrowUpRightIcon className="size-4" />
            </span>
          </button>
          <span aria-hidden="true" className="project-case-number">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="project-case-copy">
          <div className="flex items-center justify-between gap-3">
            <p className="project-case-kind">{t(project.kind)}</p>
            {project.upcoming && (
              <span className="project-case-soon">{ui.projects.soon}</span>
            )}
          </div>
          <h3 className="project-case-title">
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              className="project-case-title-button"
            >
              {project.title}
              <ArrowUpRightIcon aria-hidden="true" className="project-case-arrow size-5 shrink-0" />
            </button>
          </h3>
          <p className="project-case-summary">{t(project.summary)}</p>
          <ul className="project-case-tags" aria-label={ui.projects.stack}>
            {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  )
}
