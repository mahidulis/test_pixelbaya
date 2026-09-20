import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { GlassBg, SharedNav, SharedFooter, usePageEnter } from './SharedLayout'

// ── Video Editing projects (YouTube) ─────────────────────────────────────────
const VIDEO_PROJECTS = {
  main: { id: 'jMQKxVwsaH0', title: 'Video Edit', type: 'Full Video', year: '2025' },
  shorts: [
    { id: 'z6lmOjpH4Fo', title: 'Reel #1', type: 'YouTube Short', year: '2025' },
    { id: '5K_TYT9x4eU', title: 'Reel #2', type: 'YouTube Short', year: '2025' },
    { id: 'dYUZihZN4Bo', title: 'Reel #3', type: 'YouTube Short', year: '2025' },
  ],
}

// ── Brand Identity projects (thumbnail + PDF) ────────────────────────────────
const BRAND_IDENTITY_PROJECTS = [
  {
    name: 'Nao Branding',
    thumbnail: new URL('./imports/Nao_Branding.jpg', import.meta.url).href,
    pdf: new URL('./imports/Nao_Branding.pdf', import.meta.url).href,
    year: '2025',
    tags: ['Logo', 'Brand System', 'Guidelines'],
  },
  {
    name: "Nita's Branding",
    thumbnail: new URL('./imports/nitas-Brandin.jpg', import.meta.url).href,
    pdf: new URL('./imports/nitas-Branding.pdf', import.meta.url).href,
    year: '2025',
    tags: ['Logo', 'Identity', 'Brand Book'],
  },
  {
    name: 'OPUS Branding',
    thumbnail: new URL('./imports/OPUS-branding.jpg', import.meta.url).href,
    pdf: new URL('./imports/OPUS-branding.pdf', import.meta.url).href,
    year: '2025',
    tags: ['Logo', 'Typography', 'Guidelines'],
  },
  {
    name: 'Velrion Branding',
    thumbnail: new URL('./imports/Velrion_Branding.jpg', import.meta.url).href,
    pdf: new URL('./imports/Velrion_Branding.pdf', import.meta.url).href,
    year: '2025',
    tags: ['Logo', 'Brand Identity', 'Print'],
  },
]

const BRAND_HERO = new URL('./imports/02-Brand-Identity-1.jpg', import.meta.url).href

// ── Other works (no Brand Identity) ─────────────────────────────────────────
const ALL_WORKS = [
  // UI / UX Design
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-01.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-02.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-03.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-04.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-05.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-06.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-07.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-08.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-09.jpg', import.meta.url).href, desc: '' },
  { title: 'UI / UX Design', category: 'UI / UX Design', tags: ['UI Design', 'Web', '2025'], metric: 'UI Design', year: '2025', img: new URL('./imports/Frame-10.jpg', import.meta.url).href, desc: '' },

  // Packaging — coming soon

  // Web Design — coming soon
]

// ── Logo Design projects ──────────────────────────────────────────────────────
const LOGO_PROJECTS = [
  { name: 'LogoFolio', img: new URL('./imports/01-LogoFolio-1.jpg', import.meta.url).href, year: '2025', tags: ['Logo Design', 'Identity', 'Branding'] },
  { name: 'LogoFolio', img: new URL('./imports/01-LogoFolio-2.jpg', import.meta.url).href, year: '2025', tags: ['Logo Design', 'Identity', 'Branding'] },
  { name: 'LogoFolio', img: new URL('./imports/01-LogoFolio-3.jpg', import.meta.url).href, year: '2025', tags: ['Logo Design', 'Identity', 'Branding'] },
  { name: 'LogoFolio', img: new URL('./imports/01-LogoFolio-4.jpg', import.meta.url).href, year: '2025', tags: ['Logo Design', 'Identity', 'Branding'] },
]

// ── Graphic Design subcategories ─────────────────────────────────────────────
const GRAPHIC_SUBCATEGORIES = [
  {
    name: 'Social Media Campaign',
    year: '2025',
    tags: ['Social Media', 'Campaign', 'Content Design'],
    thumbnail: new URL('./imports/03-Social_Media-1.jpg', import.meta.url).href,
    images: [
      new URL('./imports/03-Social-Media-02.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-03.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-04.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-05.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-06.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-07.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-08.jpg', import.meta.url).href,
      new URL('./imports/03-Social-Media-09.jpg', import.meta.url).href,
    ],
  },
  {
    name: 'YouTube Creatives',
    year: '2025',
    tags: ['YouTube', 'Thumbnail Design', 'Channel Banner'],
    thumbnail: new URL('./imports/04-Youtube-Creatives-1.jpg', import.meta.url).href,
    images: [
      new URL('./imports/04-Youtube-Creatives-2.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-3.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-4.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-5.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-6.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-7.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-8.jpg', import.meta.url).href,
      new URL('./imports/04-Youtube-Creatives-9.jpg', import.meta.url).href,
    ],
  },
  {
    name: 'Jersey Design',
    year: '2025',
    tags: ['Jersey', 'Sports Apparel', 'Print Design'],
    thumbnail: new URL('./imports/05-Jersey-Design-1.jpg', import.meta.url).href,
    images: [
      new URL('./imports/05-Jersey-Design-2.jpg', import.meta.url).href,
      new URL('./imports/05-Jersey-Design-3.jpg', import.meta.url).href,
      new URL('./imports/05-Jersey-Design-4.jpg', import.meta.url).href,
    ],
  },
]

const CATEGORIES = ['All', 'Logo Design', 'Brand Identity', 'UI / UX & Web Design', 'Video Editing', 'Graphic Design', 'Packaging Design']

const VIDEO_COUNT = 1 + VIDEO_PROJECTS.shorts.length

const TOTAL_COUNT =
  LOGO_PROJECTS.length +
  BRAND_IDENTITY_PROJECTS.length +
  ALL_WORKS.length +
  GRAPHIC_SUBCATEGORIES.reduce((acc, s) => acc + 1 + s.images.length, 0) +
  VIDEO_COUNT

// ── PDF Viewer Modal ──────────────────────────────────────────────────────────
function PDFModal({ brand, onClose }: { brand: typeof BRAND_IDENTITY_PROJECTS[0]; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>

      {/* header bar */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '14px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(10,0,0,0.8)',
          flexShrink: 0,
        }}
      >
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: '#FF9A3C', background: 'rgba(255,154,60,0.1)',
          border: '1px solid rgba(255,154,60,0.25)',
          borderRadius: 100, padding: '3px 12px',
        }}>BRAND IDENTITY</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
          {brand.name}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <a
            href={brand.pdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100, padding: '7px 16px', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FF9A3C'; e.currentTarget.style.borderColor = 'rgba(255,154,60,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
          >Open in new tab ↗</a>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', borderRadius: '50%', width: 36, height: 36,
              fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,154,60,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          >✕</button>
        </div>
      </div>

      {/* PDF iframe */}
      <div onClick={e => e.stopPropagation()} style={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          src={brand.pdf}
          title={brand.name}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>
    </div>
  )
}

// ── Logo Design section ───────────────────────────────────────────────────────
function LogoSection() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: '#FF9A3C', background: 'rgba(255,154,60,0.1)',
          border: '1px solid rgba(255,154,60,0.25)', borderRadius: 100, padding: '4px 14px',
        }}>LOGO DESIGN</span>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          LogoFolio
        </h3>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {LOGO_PROJECTS.length} pieces · 2025
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, margin: '0 auto' }}>
        {LOGO_PROJECTS.map((p, i) => (
          <LogoCard key={i} project={p} />
        ))}
      </div>
    </div>
  )
}

function LogoCard({ project }: { project: typeof LOGO_PROJECTS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: 'hidden',
        border: `1px solid ${hov ? 'rgba(255,154,60,0.4)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.25s',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <img
        src={project.img}
        alt="Logo Design"
        style={{
          width: '100%', height: 'auto', display: 'block',
          transform: hov ? 'scale(1.01)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }}
      />
    </div>
  )
}

function LogoAllCard({ project }: { project: typeof LOGO_PROJECTS[0] }) {
  const [hov, setHov] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}
      >
        <div style={{
          position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: 12,
          border: `1px solid ${hov ? 'rgba(255,154,60,0.5)' : 'rgba(255,255,255,0.07)'}`,
          transition: 'border-color 0.2s',
        }}>
          <img
            src={project.img} alt={project.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.55s ease',
            }}
          />
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            color: '#0A0000', background: '#FF9A3C', borderRadius: 100, padding: '4px 11px',
          }}>LOGO DESIGN</span>
        </div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em' }}>
          {project.name}
        </p>
      </div>
      {open && (
        <Lightbox
          src={project.img} label={project.name} onClose={() => setOpen(false)}
          hasPrev={false} hasNext={false} onPrev={() => {}} onNext={() => {}}
        />
      )}
    </>
  )
}

// ── Brand Identity card ───────────────────────────────────────────────────────
function BrandCard({
  brand,
  onOpen,
}: {
  brand: typeof BRAND_IDENTITY_PROJECTS[0]
  onOpen: () => void
}) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer',
        border: hov ? '1px solid rgba(255,154,60,0.4)' : '1px solid transparent',
        borderRadius: 14, padding: 6, transition: 'border-color 0.2s',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', borderRadius: 10 }}>
        <img
          src={brand.thumbnail}
          alt={brand.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* PDF badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: '#0A0000', background: '#FF9A3C',
          borderRadius: 100, padding: '4px 11px',
        }}>BRAND IDENTITY</span>
        {/* hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          opacity: hov ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexDirection: 'column',
        }}>
          <span style={{ fontSize: 28 }}>📄</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>View Full PDF</span>
        </div>
      </div>
      <div style={{ padding: '0 4px 4px' }}>
        <p style={{
          margin: '0 0 6px', fontSize: 14, fontWeight: 700,
          color: hov ? '#FF9A3C' : 'rgba(255,255,255,0.85)',
          letterSpacing: '-0.01em', transition: 'color 0.2s',
        }}>{brand.name}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {brand.tags.map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100, padding: '2px 9px',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Brand Identity full section ───────────────────────────────────────────────
function BrandIdentitySection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: '#FF9A3C', background: 'rgba(255,154,60,0.1)',
          border: '1px solid rgba(255,154,60,0.25)', borderRadius: 100, padding: '4px 14px',
        }}>BRAND IDENTITY</span>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          Full Branding Showcases
        </h3>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {BRAND_IDENTITY_PROJECTS.length} projects · click to view PDF
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, margin: '0 auto' }}>
        {BRAND_IDENTITY_PROJECTS.map((brand, i) => (
          <BrandFullCard key={brand.name} brand={brand} onOpen={() => setOpenIdx(i)} />
        ))}
      </div>

      {openIdx !== null && (
        <PDFModal brand={BRAND_IDENTITY_PROJECTS[openIdx]} onClose={() => setOpenIdx(null)} />
      )}
    </div>
  )
}

function BrandFullCard({ brand, onOpen }: { brand: typeof BRAND_IDENTITY_PROJECTS[0]; onOpen: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${hov ? 'rgba(255,154,60,0.4)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.25s',
        background: 'rgba(255,255,255,0.02)',
        position: 'relative',
      }}
    >
      <img
        src={brand.thumbnail}
        alt={brand.name}
        style={{
          width: '100%', height: 'auto', display: 'block',
          transform: hov ? 'scale(1.01)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }}
      />
      {/* hover overlay with PDF hint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hov ? 'rgba(0,0,0,0.4)' : 'transparent',
        transition: 'background 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {hov && (
          <span style={{
            fontSize: 13, fontWeight: 700, color: '#0A0000',
            background: '#FF9A3C', borderRadius: 100, padding: '10px 26px',
            letterSpacing: '-0.01em',
          }}>View Full PDF ↗</span>
        )}
      </div>
    </div>
  )
}

function UIUXSection() {
  const works = ALL_WORKS.filter(w => w.category === 'UI / UX Design')
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: '#FF9A3C', background: 'rgba(255,154,60,0.1)',
          border: '1px solid rgba(255,154,60,0.25)', borderRadius: 100, padding: '4px 14px',
        }}>UI / UX DESIGN</span>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          Design Projects
        </h3>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {works.length} projects · 2025
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, margin: '0 auto' }}>
        {works.map((work, i) => (
          <UIUXCard key={i} work={work} />
        ))}
      </div>
    </div>
  )
}

function UIUXCard({ work }: { work: typeof ALL_WORKS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: 'hidden',
        border: `1px solid ${hov ? 'rgba(255,154,60,0.4)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.25s',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <img
        src={work.img}
        alt={work.title}
        style={{
          width: '100%', height: 'auto', display: 'block',
          transform: hov ? 'scale(1.01)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }}
      />
    </div>
  )
}

// ── YouTube components ───────────────────────────────────────────────────────
function YTCard({ id, title, type, aspect }: { id: string; title: string; type: string; aspect: '16/9' | '9/16' }) {
  const [playing, setPlaying] = useState(false)
  const [hov, setHov] = useState(false)
  const pb = aspect === '16/9' ? '56.25%' : '177.78%'

  return (
    <div style={{
      position: 'relative', borderRadius: 14, overflow: 'hidden',
      paddingBottom: pb, height: 0, width: '100%',
      background: '#111',
      border: `1px solid ${hov && !playing ? 'rgba(255,154,60,0.5)' : 'rgba(255,255,255,0.07)'}`,
      transition: 'border-color 0.2s',
    }}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <div
          onClick={() => setPlaying(true)}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
        >
          <img
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: hov ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)',
            transition: 'background 0.3s',
          }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: aspect === '16/9' ? 72 : 52, height: aspect === '16/9' ? 72 : 52,
              borderRadius: '50%', background: '#FF9A3C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hov ? '0 0 0 18px rgba(255,154,60,0.15)' : '0 0 0 10px rgba(255,154,60,0.1)',
              transform: hov ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.25s',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A0000" style={{ marginLeft: 3 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '4px 12px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9A3C', display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.07em' }}>{type.toUpperCase()}</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 12, left: 14,
            fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)',
            opacity: hov ? 1 : 0, transition: 'opacity 0.2s',
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>{title}</div>
        </div>
      )}
    </div>
  )
}

function VideoEditingSection() {
  return (
    <div>
      {/* section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: '#FF9A3C', background: 'rgba(255,154,60,0.1)',
          border: '1px solid rgba(255,154,60,0.25)',
          borderRadius: 100, padding: '4px 14px',
        }}>VIDEO EDITING</span>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          YouTube Projects
        </h3>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {VIDEO_COUNT} videos · 2025
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Video Edit', 'YouTube Shorts', 'Reels'].map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100, padding: '3px 12px',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* main video */}
      <div style={{ marginBottom: 16 }}>
        <YTCard
          id={VIDEO_PROJECTS.main.id}
          title={VIDEO_PROJECTS.main.title}
          type={VIDEO_PROJECTS.main.type}
          aspect="16/9"
        />
      </div>

      {/* shorts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {VIDEO_PROJECTS.shorts.map(s => (
          <YTCard key={s.id} id={s.id} title={s.title} type={s.type} aspect="9/16" />
        ))}
      </div>
    </div>
  )
}

// ── Lightbox (for graphic design images) ────────────────────────────────────
function Lightbox({ src, label, onClose, onPrev, onNext, hasPrev, hasNext }: {
  src: string; label: string; onClose: () => void
  onPrev: () => void; onNext: () => void; hasPrev: boolean; hasNext: boolean
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', borderRadius: '50%', width: 40, height: 40,
          fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,154,60,0.25)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >✕</button>

      {hasPrev && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', borderRadius: '50%', width: 48, height: 48,
            fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,154,60,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >‹</button>
      )}

      {hasNext && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', borderRadius: '50%', width: 48, height: 48,
            fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,154,60,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >›</button>
      )}

      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
      >
        <img
          src={src}
          alt={label}
          style={{
            maxWidth: '100%', maxHeight: '80vh',
            objectFit: 'contain', borderRadius: 12,
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          }}
        />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
          {label}
        </span>
      </div>
    </div>
  )
}

// ── Graphic Design components ────────────────────────────────────────────────
function WorkCard({ work }: { work: typeof ALL_WORKS[0] }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'default' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', borderRadius: 12 }}>
        <img
          src={work.img}
          alt={work.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: '#0A0000', background: '#FF9A3C',
          borderRadius: 100, padding: '4px 11px',
        }}>{work.category.toUpperCase()}</span>
      </div>
      <p style={{
        margin: 0, fontSize: 14, fontWeight: 600,
        color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{work.title}</p>
    </div>
  )
}

function GraphicAllCard({ sub }: { sub: typeof GRAPHIC_SUBCATEGORIES[0] }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'default' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', borderRadius: 12 }}>
        <img
          src={sub.thumbnail}
          alt={sub.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: '#0A0000', background: '#FF9A3C',
          borderRadius: 100, padding: '4px 11px',
        }}>GRAPHIC DESIGN</span>
        <span style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.55)',
          borderRadius: 100, padding: '4px 11px',
          backdropFilter: 'blur(8px)',
        }}>{sub.images.length + 1} designs</span>
      </div>
      <p style={{
        margin: 0, fontSize: 14, fontWeight: 600,
        color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em',
      }}>{sub.name}</p>
    </div>
  )
}

function GraphicSubSection({ sub }: { sub: typeof GRAPHIC_SUBCATEGORIES[0] }) {
  const [hovThumb, setHovThumb] = useState(false)
  const [hovIdx, setHovIdx] = useState<number | null>(null)
  const allImages = [sub.thumbnail, ...sub.images]
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  return (
    <div style={{ marginBottom: 72 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: '#FF9A3C', background: 'rgba(255,154,60,0.1)',
          border: '1px solid rgba(255,154,60,0.25)',
          borderRadius: 100, padding: '4px 14px',
        }}>GRAPHIC DESIGN</span>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          {sub.name}
        </h3>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {sub.images.length + 1} designs · {sub.year}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {sub.tags.map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100, padding: '3px 12px',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* thumbnail */}
      <div
        onMouseEnter={() => setHovThumb(true)}
        onMouseLeave={() => setHovThumb(false)}
        onClick={() => setLightboxIdx(0)}
        style={{
          position: 'relative', overflow: 'hidden', borderRadius: 14, marginBottom: 16,
          cursor: 'zoom-in', maxWidth: 560,
        }}
      >
        <img
          src={sub.thumbnail}
          alt={sub.name}
          style={{
            width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block',
            transform: hovThumb ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,0,0,0.65) 0%, transparent 55%)',
          opacity: hovThumb ? 1 : 0, transition: 'opacity 0.35s ease',
        }} />
        <div style={{
          position: 'absolute', bottom: 14, left: 16, display: 'flex', alignItems: 'center', gap: 8,
          opacity: hovThumb ? 1 : 0, transition: 'opacity 0.25s ease',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>click to expand</span>
        </div>
      </div>

      {/* row — additional images */}
      <div style={{
        display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 10,
        scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,154,60,0.3) transparent',
      }}>
        {sub.images.map((src, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            onClick={() => setLightboxIdx(i + 1)}
            style={{
              flex: '0 0 auto',
              width: 'clamp(260px, 28vw, 380px)',
              aspectRatio: '16/9',
              borderRadius: 12, overflow: 'hidden', position: 'relative',
              cursor: 'zoom-in',
              border: hovIdx === i ? '1px solid rgba(255,154,60,0.5)' : '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
          >
            <img
              src={src}
              alt={sub.name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transform: hovIdx === i ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.45s ease',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
              opacity: hovIdx === i ? 1 : 0, transition: 'opacity 0.25s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 22, color: '#fff' }}>⊕</span>
            </div>
            <span style={{
              position: 'absolute', bottom: 8, left: 12,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.9)',
              opacity: hovIdx === i ? 1 : 0, transition: 'opacity 0.2s ease',
              textShadow: '0 1px 6px rgba(0,0,0,0.9)',
            }}></span>
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          src={allImages[lightboxIdx]}
          label={sub.name}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(l => Math.max(0, (l ?? 0) - 1))}
          onNext={() => setLightboxIdx(l => Math.min(allImages.length - 1, (l ?? 0) + 1))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < allImages.length - 1}
        />
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function WorksPage() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category')
  const validInitial = CATEGORIES.includes(initialCategory ?? '') ? initialCategory! : 'All'
  const [active, setActive] = useState(validInitial)
  const visible = usePageEnter()

  const filteredWorks = active === 'All'
    ? ALL_WORKS
    : active === 'UI / UX & Web Design'
      ? ALL_WORKS.filter(w => w.category === 'UI / UX Design' || w.category === 'Web Design')
      : active === 'Packaging Design'
        ? ALL_WORKS.filter(w => w.category === 'Packaging')
        : ALL_WORKS.filter(w => w.category === active)

  const showBrand = active === 'All' || active === 'Brand Identity'
  const showGraphic = active === 'Graphic Design'
  const showLogo = active === 'Logo Design'

  const counts: Record<string, number> = {}
  CATEGORIES.forEach(c => {
    if (c === 'All') counts[c] = TOTAL_COUNT
    else if (c === 'Logo Design') counts[c] = LOGO_PROJECTS.length
    else if (c === 'Brand Identity') counts[c] = BRAND_IDENTITY_PROJECTS.length
    else if (c === 'Graphic Design') counts[c] = GRAPHIC_SUBCATEGORIES.reduce((acc, s) => acc + 1 + s.images.length, 0)
    else if (c === 'Video Editing') counts[c] = VIDEO_COUNT
    else if (c === 'UI / UX & Web Design') counts[c] = ALL_WORKS.filter(w => w.category === 'UI / UX Design' || w.category === 'Web Design').length
    else if (c === 'Packaging Design') counts[c] = ALL_WORKS.filter(w => w.category === 'Packaging').length
    else counts[c] = ALL_WORKS.filter(w => w.category === c).length
  })

  return (
    <div style={{ background: '#0A0000', minHeight: '100vh', position: 'relative' }}>
      <GlassBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SharedNav />

        {/* ── Hero ── */}
        <div style={{
          paddingTop: 'clamp(120px,16vw,180px)',
          paddingBottom: 'clamp(48px,6vw,80px)',
          paddingLeft: 'clamp(20px,4vw,60px)',
          paddingRight: 'clamp(20px,4vw,60px)',
          maxWidth: 1400, margin: '0 auto',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
                padding: '6px 16px', fontSize: 12, fontWeight: 500,
                color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: 24,
              }}>✦ Our Portfolio</span>
              <h1 style={{
                fontSize: 'clamp(48px,7vw,96px)', fontWeight: 900,
                letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, color: '#fff',
              }}>
                Selected<br />
                <span style={{
                  fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                  fontWeight: 400, color: '#FF9A3C',
                }}>Works</span>
              </h1>
            </div>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)',
              maxWidth: 340, margin: 0,
            }}>
              {TOTAL_COUNT} projects across {CATEGORIES.length - 1} disciplines — from brand identities and digital products to editorial design and film.
            </p>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div style={{
          position: 'sticky', top: 68, zIndex: 90,
          background: 'rgba(10,0,0,0.90)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '0 clamp(20px,4vw,60px)',
          overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', gap: 2, maxWidth: 1400, margin: '0 auto', padding: '12px 0' }}>
            {CATEGORIES.map(cat => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '8px 16px', borderRadius: 100, border: 'none',
                    background: isActive ? '#FF9A3C' : 'transparent',
                    color: isActive ? '#0A0000' : 'rgba(255,255,255,0.45)',
                    fontSize: 13, fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {cat}
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: isActive ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.08)',
                    borderRadius: 100, padding: '1px 7px',
                    color: isActive ? '#0A0000' : 'rgba(255,255,255,0.35)',
                  }}>{counts[cat]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{
          padding: 'clamp(40px,5vw,72px) clamp(20px,4vw,60px)',
          maxWidth: 1400, margin: '0 auto',
        }}>

          {/* Logo Design full section */}
          {showLogo && <LogoSection />}

          {/* Brand Identity full section */}
          {active === 'Brand Identity' && <BrandIdentitySection />}

          {/* UI / UX & Web Design full section */}
          {active === 'UI / UX & Web Design' && <UIUXSection />}

          {/* Graphic Design full section */}
          {showGraphic && (
            <div>
              {GRAPHIC_SUBCATEGORIES.map(sub => (
                <GraphicSubSection key={sub.name} sub={sub} />
              ))}
            </div>
          )}

          {/* Video Editing full section */}
          {active === 'Video Editing' && <VideoEditingSection />}

          {/* All other categories + summary cards in All view */}
          {active !== 'Logo Design' && active !== 'Brand Identity' && active !== 'UI / UX & Web Design' && active !== 'Graphic Design' && active !== 'Video Editing' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}>
              {active === 'All' && LOGO_PROJECTS.map((p, i) => (
                <LogoAllCard key={i} project={p} />
              ))}
              {filteredWorks.map((work, i) => (
                <WorkCard key={`${work.title}-${i}`} work={work} />
              ))}
              {active === 'All' && BRAND_IDENTITY_PROJECTS.map(brand => (
                <BrandAllCard key={brand.name} brand={brand} />
              ))}
              {active === 'All' && GRAPHIC_SUBCATEGORIES.map(sub => (
                <GraphicAllCard key={sub.name} sub={sub} />
              ))}
              {active === 'All' && (
                <VideoAllCard />
              )}
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(80px,10vw,120px) clamp(20px,4vw,60px)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 20 }}>
            READY TO START?
          </p>
          <h2 style={{
            fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 36px', color: '#fff',
          }}>
            Your project could<br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#FF9A3C' }}>
              be next.
            </span>
          </h2>
          <Link to="/#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 15, fontWeight: 700, color: '#0A0000',
            background: '#FF9A3C', borderRadius: 100, padding: '16px 40px',
            textDecoration: 'none',
          }}>Book a free call ↗</Link>
        </div>
        <SharedFooter />
      </div>
    </div>
  )
}

// summary card used in "All" view for brand identity
function VideoAllCard() {
  const [playing, setPlaying] = useState(false)
  const [hov, setHov] = useState(false)
  const { id, title } = VIDEO_PROJECTS.main

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        position: 'relative', paddingBottom: '56.25%', height: 0,
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${hov && !playing ? 'rgba(255,154,60,0.5)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.2s', background: '#111',
      }}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <div
            onClick={() => setPlaying(true)}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
          >
            <img
              src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
              alt={title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.55s ease',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)', transition: 'background 0.3s' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', background: '#FF9A3C',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: hov ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s',
                boxShadow: hov ? '0 0 0 16px rgba(255,154,60,0.15)' : '0 0 0 10px rgba(255,154,60,0.1)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0000" style={{ marginLeft: 3 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span style={{
              position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.08em', color: '#0A0000', background: '#FF9A3C',
              borderRadius: 100, padding: '4px 11px',
            }}>VIDEO EDITING</span>
            <span style={{
              position: 'absolute', top: 12, right: 12, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.06em', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.55)',
              borderRadius: 100, padding: '4px 11px', backdropFilter: 'blur(8px)',
            }}>{VIDEO_COUNT} videos</span>
          </div>
        )}
      </div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em' }}>
        Video Editing — {VIDEO_COUNT} Projects
      </p>
    </div>
  )
}

function BrandAllCard({ brand }: { brand: typeof BRAND_IDENTITY_PROJECTS[0] }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'default' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', borderRadius: 12 }}>
        <img
          src={brand.thumbnail}
          alt={brand.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: '#0A0000', background: '#FF9A3C',
          borderRadius: 100, padding: '4px 11px',
        }}>BRAND IDENTITY</span>
        <span style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.55)',
          borderRadius: 100, padding: '4px 11px',
          backdropFilter: 'blur(8px)',
        }}>PDF</span>
      </div>
      <p style={{
        margin: 0, fontSize: 14, fontWeight: 600,
        color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em',
      }}>{brand.name}</p>
    </div>
  )
}
