'use client'

import { useEffect } from 'react'
import { useLocale } from '@/lib/i18n'

export function PortfolioEffects() {
  const { ui } = useLocale()

  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!pointerFine || reducedMotion) {
      return
    }

    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const follower = document.querySelector<HTMLElement>('.cursor-follower')
    const orbital = document.querySelector<HTMLElement>('.cursor-orbital')
    const label = document.querySelector<HTMLElement>('.cursor-label')
    if (!dot || !follower || !orbital || !label) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let orbitalAngle = 0
    let frame = 0
    let trailCounter = 0

    const updateCursorState = () => {
      const target = document.elementFromPoint(mouseX, mouseY)
      const interactive = target?.closest('a, button, input, textarea, [role="button"]')
      const onProject = target?.closest('.project-case')
      const active = !!interactive
      document.body.classList.toggle('cursor-active', active)
      dot.classList.toggle('is-active', active)
      follower.classList.toggle('is-active', active)
      orbital.classList.toggle('is-active', active)
      label.classList.toggle('is-visible', !!onProject)
    }

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      document.body.classList.add('cursor-ready')
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      dot.style.opacity = '1'
      follower.style.opacity = '0.45'
      orbital.style.opacity = '0.8'
      label.style.left = `${mouseX + 80 > window.innerWidth ? mouseX - 56 : mouseX + 22}px`
      label.style.top = `${mouseY + 42 > window.innerHeight ? mouseY - 38 : mouseY + 18}px`
      updateCursorState()

      if (trailCounter++ % 2 === 0) {
        const trail = document.createElement('span')
        trail.className = 'cursor-trail'
        trail.style.left = `${mouseX}px`
        trail.style.top = `${mouseY}px`
        document.body.appendChild(trail)
        window.setTimeout(() => trail.remove(), 500)
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`
      orbitalAngle += 0.04
      orbital.style.left = `${mouseX + Math.cos(orbitalAngle) * 15 - 4}px`
      orbital.style.top = `${mouseY + Math.sin(orbitalAngle) * 15 - 4}px`

      frame = requestAnimationFrame(animate)
    }

    const hide = () => {
      document.body.classList.remove('cursor-ready')
      document.body.classList.remove('cursor-active')
      dot.classList.remove('is-active')
      follower.classList.remove('is-active')
      orbital.classList.remove('is-active')
      dot.style.opacity = '0'
      follower.style.opacity = '0'
      orbital.style.opacity = '0'
      label.classList.remove('is-visible')
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', hide)
    frame = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', hide)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-follower" aria-hidden="true" />
      <div className="cursor-orbital" aria-hidden="true" />
      <span className="cursor-label" aria-hidden="true">
        {ui.projects.view}
      </span>
    </>
  )
}