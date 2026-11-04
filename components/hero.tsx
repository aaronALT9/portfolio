'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const enter = 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:fill-mode-both'

export function Hero() {
  const { ui } = useLocale()
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const image = hero?.querySelector<HTMLElement>('.hero-portrait')
    if (!hero || !image) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      image.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0) scale(0.78)`
    }
    const reset = () => {
      image.style.transform = ''
    }

    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', reset)
    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', reset)
    }
  }, [])

  const [animatedLead, animatedAccent] = ui.hero.animatedLine.split('|')
  const [japaneseLead, japaneseName] = ui.hero.japaneseName.split('・')

  return (
    <section ref={heroRef} id="top" aria-labelledby="hero-heading" className="hero-stage">
      <div className="hero-image" aria-hidden="true">
        <Image
          className="hero-portrait"
          src="/hero-portrait.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero-layout">
        <h1 id="hero-heading" className={cn('hero-title', enter, 'motion-safe:delay-100')}>
          <span>{ui.hero.headlineLead}</span>
          <span className="text-brand">{ui.hero.headlineAccent}</span>
          <span className="sr-only">Aaron Zerrouk</span>
        </h1>

        <div className={cn('hero-profile', enter, 'motion-safe:delay-200')}>
          <div className="hero-profile-copy">
            <span>{ui.hero.titleLineOne}</span>
            <span>{ui.hero.titleLineTwo}</span>
            <span>{ui.hero.titleLineThree}</span>
          </div>
          <span className="hero-profile-rule" aria-hidden="true" />
        </div>

        <span
          lang="ja"
          className={cn('hero-japanese', enter, 'motion-safe:delay-200')}
        >
          <span>{japaneseLead}・</span>
          <span className="text-brand">{japaneseName}</span>
        </span>

        <div className={cn('hero-intro', enter, 'motion-safe:delay-300')}>
          <p className="hero-availability">{ui.hero.availability}</p>
          <p>{ui.hero.pitch}</p>
        </div>

        <p className={cn('hero-animated-line', enter, 'motion-safe:delay-500')}>
          <span>{animatedLead}</span>
          <span className="text-brand">{animatedAccent}</span>
        </p>
      </div>
    </section>
  )
}
