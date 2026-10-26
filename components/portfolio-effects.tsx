'use client'

import { useEffect } from 'react'

export function PortfolioEffects() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const follower = document.querySelector<HTMLElement>('.cursor-follower')
    const orbital = document.querySelector<HTMLElement>('.cursor-orbital')
    if (!dot || !follower || !orbital) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let orbitalAngle = 0
    let frame = 0
    let trailCounter = 0

    const updateCursorState = () => {
      const interactive = document.elementFromPoint(mouseX, mouseY)?.closest('a, button, input, textarea, [role="button"]')
      const active = !!interactive
      document.body.classList.toggle('cursor-active', active)
      dot.classList.toggle('is-active', active)
      follower.classList.toggle('is-active', active)
      orbital.classList.toggle('is-active', active)
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
      <div className="portfolio-background" aria-hidden="true">
      </div>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-follower" aria-hidden="true" />
      <div className="cursor-orbital" aria-hidden="true" />
    </>
  )
}