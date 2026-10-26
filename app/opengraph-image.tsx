import { ImageResponse } from 'next/og'

export const alt = 'Aaron Zerrouk — Étudiant en BUT MMI · Développeur Web'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#11130f',
          color: '#f1f0e8',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            Aaron Zerrouk<span style={{ color: '#d5ff3f' }}>.</span>
          </span>
          <span style={{ fontSize: 40, color: '#b2b5a8' }}>Étudiant en BUT MMI · Développeur Web</span>
          <span style={{ fontSize: 28, color: '#d5ff3f' }}>
            Disponible — alternance, stage, job étudiant
          </span>
        </span>
        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#b2b5a8' }}>
          <span>IUT Clermont Auvergne</span>
          <span style={{ color: '#d5ff3f' }}>github.com/aaronZER69</span>
        </span>
      </div>
    ),
    size,
  )
}
