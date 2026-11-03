'use client'

import { useEffect, useRef, useState } from 'react'
import { LocaleToggle } from '@/components/header-controls'
import { HamburgerIcon } from '@/components/hamburger-icon'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const sectionIds = ['about', 'projects', 'experience', 'skills', 'education', 'contact'] as const
const primaryIds = ['about', 'projects', 'contact'] as const

export function SiteHeader() {
  const { ui } = useLocale()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number] | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section) => section !== null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id as (typeof sectionIds)[number])
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.getElementById('mobile-nav')?.querySelector('a')?.focus()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = sectionIds.map((id) => ({ id, label: ui.nav[id] }))
  const primaryLinks = primaryIds.map((id) => ({ id, label: ui.nav[id] }))
  const activePrimaryId =
    activeSection === 'about' ? 'about' : activeSection === 'contact' ? 'contact' : activeSection ? 'projects' : null

  return (
    <header className={cn('site-header sticky top-0 z-40', scrolled && 'is-scrolled')}>
      <div className="site-header-inner">
        <a href="#top" aria-label={ui.nav.home} className="site-wordmark focus-visible:ring-2 focus-visible:ring-ring">
          aaron zerrouk
        </a>

        <nav className="site-primary-nav" aria-label={ui.nav.primary}>
          <ul>
            {primaryLinks.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={activePrimaryId === link.id ? 'location' : undefined}
                  data-active={activePrimaryId === link.id}
                >
                  {link.label}
                </a>
                {index < primaryLinks.length - 1 && <span aria-hidden="true">■</span>}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header-actions">
          <LocaleToggle />
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon-lg"
            className="site-menu-button size-12"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui.nav.close : ui.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <HamburgerIcon open={open} />
          </Button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={ui.nav.primary}
        aria-hidden={!open}
        inert={!open}
        data-open={open}
        className="menu-panel border-t border-border/60"
      >
        <ul className="mx-auto flex max-w-5xl flex-col px-5 py-5 md:px-8">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeSection === link.id ? 'location' : undefined}
                onClick={() => {
                  setOpen(false)
                  menuButtonRef.current?.focus()
                }}
                className="flex items-center justify-between py-4 text-lg text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {link.label}
                <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">
                  {String(sectionIds.indexOf(link.id) + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
