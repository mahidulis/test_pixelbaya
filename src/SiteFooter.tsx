import { useState } from 'react'

const SOCIAL_ICONS = [
  { label: 'Dribbble', href: 'https://dribbble.com/pixelbaya', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 4.7a8.25 8.25 0 0 1 1.89 5.12c-.28-.06-3.06-.62-5.86-.27-.06-.15-.12-.31-.19-.46-.18-.43-.38-.86-.59-1.28 3.06-1.25 4.46-3.04 4.75-3.11zm-1.1-1.1c-.24.31-1.51 1.97-4.44 3.07C11.5 6.67 10.06 5.05 9.84 4.8A8.27 8.27 0 0 1 12 4.5c1.97 0 3.78.71 5.26 1.87v.23zm-8.56-.53c.24.28 1.65 1.9 2.95 3.82-3.72.99-7 .97-7.36.97a8.3 8.3 0 0 1 4.41-4.79zM3.75 12c0-.1 0-.2.01-.3.34.01 4.25.06 8.26-1.14.23.45.45.91.65 1.37-.1.03-.21.06-.31.09-4.15 1.34-6.35 5-6.51 5.27A8.22 8.22 0 0 1 3.75 12zm8.25 8.25c-1.83 0-3.52-.6-4.88-1.61.13-.27 1.97-3.36 6.52-4.95.02-.01.04-.01.06-.02a27.24 27.24 0 0 1 1.73 6.16 8.19 8.19 0 0 1-3.43.42zm4.94-1.36a29.03 29.03 0 0 0-1.6-5.76c2.61-.42 4.9.27 5.18.36a8.27 8.27 0 0 1-3.58 5.4z"/></svg> },
  { label: 'Behance', href: 'https://www.behance.net/pixelbaya', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 11.25c.83 0 1.5-.67 1.5-1.5S8.33 8.25 7.5 8.25H4.5v3h3zm.38 1.5H4.5V16.5h3.5c.97 0 1.75-.78 1.75-1.75s-.78-1.75-1.87-1.75zM2.25 6.75h5.5C10.18 6.75 12 8.13 12 10.13c0 1.24-.67 2.07-1.68 2.62 1.38.46 2.18 1.5 2.18 2.88 0 2.25-1.88 3.62-4.5 3.62H2.25V6.75zm14.37 10.13c1.13 0 2-.5 2.38-1.5h2.25c-.5 2-2.13 3.25-4.63 3.25-3.12 0-5.12-2-5.12-5 0-2.87 2.12-5 5-5 2.88 0 5 2.25 5 5 0 .25 0 .5-.06.75h-7.56c.13 1.38.94 2.5 2.74 2.5zm2.19-4.13c-.13-1.25-1-2-2.19-2-1.25 0-2.13.75-2.38 2h4.57zm-4.06-5.5h5.5v1.25h-5.5V7.25z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/pixelbaya', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pixelbaya', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Facebook', href: 'https://www.facebook.com/pixelbaya', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: 'X', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Telegram', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: 'YouTube', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
]

const LOCATIONS = [
  { city: 'United States', address: '16 Cove Road, Mount Arlington, NJ 07856' },
  { city: 'Australia', address: '155 Bennett Rd, St Clair NSW 2759' },
  { city: 'South Africa', address: '55 Mons Rd, Bellevue East, Johannesburg, 2198' },
  { city: 'Singapore', address: '6 Raffles Blvd, Marina Square' },
  { city: 'Italy', address: 'Via Bari, 9, 03043 Cassino, FR' },
  { city: 'Dubai', address: 'AlFattan Downtown - 32d St - Al Satwa' },
  { city: 'Cyprus', address: 'Estias 5, Strovolos 2001' },
  { city: 'Bangladesh', address: 'Ventura Iconia, Plot 37 Road No. 11, Banani, Dhaka 1213' },
]

const FOOTER_COLS = [
  {
    title: 'Important Links',
    links: ['Contact Us', 'About Us', 'Our Work', 'Pricing', 'Blogs'],
  },
  {
    title: 'Services',
    links: ['UI/UX Design', 'Graphic Design', 'Logo & Branding', 'Video Editing', 'Packaging Design'],
  },
  {
    title: 'Specialized Industry',
    links: ['Fintech Industry', 'Healthcare & Fitness', 'Edtech Industry', 'Cybersecurity Industry', 'E-Commerce'],
  },
  {
    title: 'Compare',
    links: ['Vs Agencies', 'Vs Freelancers', 'Vs In-house'],
  },
]

const PARTNERS = [
  { name: 'Framer', sub: 'Professional Partner', color: '#0099FF' },
  { name: 'Webflow', sub: 'Professional Partner', color: '#4353FF' },
  { name: 'Behance', sub: 'Top Team On Behance', color: '#1769FF' },
  { name: 'Dribbble', sub: 'Top Team On Dribbble', color: '#EA4C89' },
  { name: 'Clutch', sub: 'Reviewed On', stars: true, color: '#fff' },
  { name: 'Google', sub: 'Reviewed On', stars: true, color: '#4285F4' },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section style={{ background: '#f5f5f0', padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(14px,1.4vw,17px)', color: '#444', lineHeight: 1.75, marginBottom: 36, fontWeight: 400 }}>
          Say goodbye to outdated design agencies and welcome the smarter one. We lead you from brand to product innovation to shape your path from idea to success.
        </p>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {SOCIAL_ICONS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
              width: 40, height: 40, borderRadius: 10,
              border: '1px solid rgba(0,0,0,0.1)',
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#444', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C842'; e.currentTarget.style.color = '#F5C842' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#444' }}
            >
              {s.svg}
            </a>
          ))}
        </div>

        {/* Email subscribe */}
        {done ? (
          <div style={{ fontSize: 15, color: '#333', fontWeight: 600 }}>✓ You're subscribed!</div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}
            style={{ display: 'flex', gap: 0, maxWidth: 480, margin: '0 auto', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.12)', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16, color: '#aaa' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <input
              type="email" placeholder="Your email here" value={email}
              onChange={e => setEmail(e.target.value)} required
              style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 16px', fontSize: 14, color: '#333', background: 'transparent', fontFamily: 'Inter, sans-serif' }}
            />
            <button type="submit" style={{
              background: '#7C3AED', color: '#fff', border: 'none', cursor: 'pointer',
              padding: '14px 24px', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif',
              display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#6D28D9')}
              onMouseLeave={e => (e.currentTarget.style.background = '#7C3AED')}
            >
              Subscribe →
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Globe() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
      {/* Earth image */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=900&fit=crop&auto=format"
        alt="Earth from space"
        style={{ width: '100%', height: 'clamp(500px,70vw,800px)', objectFit: 'cover', objectPosition: 'center 30%', display: 'block', opacity: 0.85 }}
      />

      {/* Dark overlay at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, #0C0C0C, transparent)', pointerEvents: 'none' }} />

      {/* Location cards grid over the image */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(20px,4vw,60px)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 860, width: '100%' }} className="globe-grid">
          {LOCATIONS.map((loc, i) => (
            <div key={i} style={{
              background: 'rgba(10,10,16,0.72)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
              padding: '18px 20px', textAlign: 'center',
              gridColumn: i === 6 || i === 7 ? undefined : undefined,
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>{loc.city}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontWeight: 400 }}>{loc.address}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) { .globe-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .globe-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default function SiteFooter() {
  return (
    <>
      <Newsletter />

      <footer style={{ background: '#0C0C0C' }}>

        {/* Links grid */}
        <div style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px) 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }} className="footer-link-grid">
              {FOOTER_COLS.map(col => (
                <div key={col.title}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.01em' }}>{col.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    {col.links.map(l => (
                      <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: 400, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                      >{l}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social platforms */}
        <div style={{ padding: '28px clamp(20px,4vw,60px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'LinkedIn', color: '#0A66C2', href: 'https://www.linkedin.com/company/pixelbaya', icon: SOCIAL_ICONS[3].svg },
              { label: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/pixelbaya', icon: SOCIAL_ICONS[2].svg },
              { label: 'Behance', color: '#1769FF', href: 'https://www.behance.net/pixelbaya', icon: SOCIAL_ICONS[1].svg },
              { label: 'Dribbble', color: '#EA4C89', href: 'https://dribbble.com/pixelbaya', icon: SOCIAL_ICONS[0].svg },
              { label: 'Clutch', color: '#FF4646', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0 3a5 5 0 1 0 4.33 7.5H13.5a2.5 2.5 0 1 1 0-5h2.83A5 5 0 0 0 12 7z"/></svg> },
              { label: 'Google', color: '#4285F4', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
            ].map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 18px', borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = `${p.color}18` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                <span style={{ color: p.color, display: 'flex', alignItems: 'center' }}>{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{ padding: '20px clamp(20px,4vw,60px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <a href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >Terms & Conditions</a>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            © 2026, Pixelbaya. All Rights Reserved.
          </div>
          <a href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >Privacy Policy</a>
        </div>

        {/* Large watermark */}
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', height: 'clamp(80px,14vw,160px)' }}>
          <div style={{
            position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
            fontSize: 'clamp(80px,14vw,160px)', fontWeight: 900, letterSpacing: '-0.04em',
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            whiteSpace: 'nowrap', userSelect: 'none', lineHeight: 1,
            fontFamily: 'Inter, sans-serif',
          }}>
            formstudio
          </div>
        </div>

      </footer>

      <style>{`
        @media (max-width: 860px) { .footer-link-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-link-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
