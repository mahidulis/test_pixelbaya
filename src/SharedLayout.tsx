import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import pixelbayaLogo from './imports/Asset_6.png'

// Instantly jump to top on mount — disables smooth-scroll during navigation
export function usePageEnter() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    const t = setTimeout(() => {
      document.documentElement.style.scrollBehavior = prev
      setVisible(true)
    }, 40)
    return () => clearTimeout(t)
  }, [])
  return visible
}

// ── Topographic background (shared across all pages) ─────────────────────────

const CONTOUR_RINGS = Array.from({ length: 22 }, (_, i) => {
  const s = Math.sin, c = Math.cos
  const r = [
    48 + s(i * 1.31) * 16, 52 - s(i * 0.87) * 13,
    50 + c(i * 1.09) * 18, 46 + c(i * 0.73) * 11,
    53 + s(i * 0.82) * 13, 47 - c(i * 1.17) * 15,
    51 + s(i * 0.61) * 11, 49 - s(i * 1.43) * 17,
  ]
  const peak = 11
  return {
    sizePct: 8 + i * 4.5,
    borderRadius: `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`,
    opacity: Math.max(0.03, 0.22 - Math.abs(i - peak) * 0.013),
    dur: `${13 + (i % 7) * 2.5}s`,
    delay: `${(i * -1.8).toFixed(1)}s`,
  }
})

export function GlassBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', background: '#0A0000' }}>
      {CONTOUR_RINGS.map((ring, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${ring.sizePct}vmax`, height: `${ring.sizePct * 0.72}vmax`,
          top: '58%', left: '50%',
          border: `1px solid rgba(255,154,60,${ring.opacity})`,
          borderRadius: ring.borderRadius,
          animation: `contour-breathe ${ring.dur} ease-in-out infinite`,
          animationDelay: ring.delay,
        }} />
      ))}
      <div style={{
        position: 'absolute', width: '50vmax', height: '32vmax',
        top: '58%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse at center, rgba(255,154,60,0.22) 0%, rgba(180,110,10,0.10) 45%, transparent 70%)',
        filter: 'blur(55px)',
        animation: 'mesh-a 34s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '120vw', height: '50vh',
        bottom: '-25vh', left: '50%', transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(220,130,20,0.42) 0%, rgba(120,75,5,0.18) 55%, transparent 75%)',
        filter: 'blur(80px)',
        animation: 'mesh-b 28s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '55vmax', height: '55vmax',
        bottom: '0', left: '-15vmax', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,110,10,0.40) 0%, transparent 65%)',
        filter: 'blur(90px)',
        animation: 'mesh-c 38s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
        opacity: 0.10, mixBlendMode: 'overlay',
      }} />
    </div>
  )
}

// ── Shared Navigation ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Work', to: '/works' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'We', to: '/we' },
  { label: 'About', to: '/about' },
]

export function SharedNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBg = scrolled || menuOpen

  return (
    <>
      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }
        @media (min-width: 769px) { .nav-hamburger { display: none !important; } }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,4vw,60px)',
        background: navBg ? 'rgba(10,0,0,0.95)' : 'transparent',
        backdropFilter: navBg ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: navBg ? 'blur(20px)' : 'none',
        borderBottom: navBg ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        {/* Left — Logo */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', zIndex: 101 }}>
          <img src={pixelbayaLogo} alt="Pixelbaya" style={{ height: 26, width: 'auto', filter: 'invert(1)', objectFit: 'contain' }} />
        </Link>

        {/* Centre — Nav links (desktop only) */}
        <div className="nav-desktop" style={{ display: 'flex', gap: 32, alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {NAV_LINKS.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} style={{
                fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s',
                color: active ? '#FF9A3C' : 'rgba(255,255,255,0.55)',
                borderBottom: active ? '1px solid rgba(255,154,60,0.5)' : '1px solid transparent',
                paddingBottom: 2,
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
              >{label}</Link>
            )
          })}
        </div>

        {/* Right — CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/#contact" className="nav-desktop" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 600, color: '#0A0000',
            background: '#FF9A3C', borderRadius: 100, padding: '9px 22px',
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Start a Project ↗</Link>

          {/* Hamburger — mobile only, flush right */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',
              gap: 5, width: 40, height: 40, background: 'none', border: 'none', cursor: 'pointer',
              zIndex: 101, padding: '8px 0',
            }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 26, height: 2.5, background: '#ffffff', borderRadius: 3, transition: 'all 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 26, height: 2.5, background: '#ffffff', borderRadius: 3, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 26, height: 2.5, background: '#ffffff', borderRadius: 3, transition: 'all 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(10,0,0,0.98)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {NAV_LINKS.map(({ label, to }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} style={{
              fontSize: 'clamp(28px,6vw,40px)', fontWeight: 800, textDecoration: 'none',
              letterSpacing: '-0.03em',
              color: active ? '#FF9A3C' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.2s', padding: '8px 0',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
            >{label}</Link>
          )
        })}
        <div style={{ marginTop: 24 }}>
          <Link to="/#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 16, fontWeight: 700, color: '#0A0000',
            background: '#FF9A3C', borderRadius: 100, padding: '14px 36px',
            textDecoration: 'none',
          }}>Start a Project ↗</Link>
        </div>
      </div>
    </>
  )
}

// ── Shared Footer ─────────────────────────────────────────────────────────────

export function SharedFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,60px) 40px',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ marginBottom: 14 }}>
              <img src={pixelbayaLogo} alt="Pixelbaya" style={{ height: 24, width: 'auto', filter: 'invert(1)', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
              A design studio obsessed with craft, strategy, and outcomes that last.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            {[
              { heading: 'Pages', links: [{ label: 'Home', to: '/' }, { label: 'Work', to: '/works' }, { label: 'Services', to: '/services' }, { label: 'Pricing', to: '/pricing' }, { label: 'We', to: '/we' }, { label: 'About', to: '/about' }] },
              { heading: 'Services', links: [{ label: 'Brand Identity', to: '/works?category=Brand+Identity' }, { label: 'UI / UX Design', to: '/works?category=UI+%2F+UX+Design' }, { label: 'Graphic Design', to: '/works?category=Graphic+Design' }, { label: 'Video Editing', to: '/works?category=Video+Editing' }] },
              { heading: 'Connect', links: [{ label: 'pixelbaya@gmail.com', to: 'mailto:pixelbaya@gmail.com' }, { label: 'WhatsApp', to: 'https://wa.me/601787244491' }, { label: 'Instagram', to: 'https://www.instagram.com/pixelbaya' }, { label: 'Dribbble', to: 'https://dribbble.com/pixelbaya' }, { label: 'LinkedIn', to: 'https://www.linkedin.com/company/pixelbaya' }, { label: 'Behance', to: 'https://www.behance.net/pixelbaya' }, { label: 'Facebook', to: 'https://www.facebook.com/pixelbaya' }] },
            ].map(col => (
              <div key={col.heading}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>{col.heading.toUpperCase()}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => {
                    const isExternal = l.to.startsWith('http') || l.to.startsWith('mailto:') || l.to.startsWith('#')
                    const linkStyle: React.CSSProperties = { fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }
                    return isExternal ? (
                      <a key={l.label} href={l.to} target={l.to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={linkStyle}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FF9A3C')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                      >{l.label}</a>
                    ) : (
                      <Link key={l.label} to={l.to} style={linkStyle}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FF9A3C')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                      >{l.label}</Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026, Pixelbaya. All Rights Reserved.</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Inspired by the Baya Weaver — a builder by nature.</span>
        </div>
      </div>
    </footer>
  )
}

// ── Page wrapper ──────────────────────────────────────────────────────────────

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0A0000', minHeight: '100vh', position: 'relative' }}>
      <GlassBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SharedNav />
        {children}
        <SharedFooter />
      </div>
    </div>
  )
}
