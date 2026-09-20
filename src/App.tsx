import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import TrustedBy from './TrustedBy'
import SiteFooter from './SiteFooter'
import { SharedNav } from './SharedLayout'

// ─── Data ───────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '◉', title: 'Logo Design', desc: 'Distinctive marks and wordmarks that define who you are at a glance.', worksCategory: 'Logo Design' },
  { icon: '✦', title: 'Brand Identity', desc: 'Logos, visual systems, brand guidelines that make you unforgettable.', worksCategory: 'Brand Identity' },
  { icon: '◈', title: 'UI / UX & Web Design', desc: 'Intuitive interfaces and pixel-perfect websites that convert.', worksCategory: 'UI / UX & Web Design' },
  { icon: '▶', title: 'Video Editing', desc: 'Brand films, reels, motion graphics with narrative precision.', worksCategory: 'Video Editing' },
  { icon: '▣', title: 'Graphic Design', desc: 'Print, digital, editorial — design that communicates and converts.', worksCategory: 'Graphic Design' },
  { icon: '⊡', title: 'Social Media Design', desc: 'Ads, posts, and creatives for Instagram, LinkedIn, X, and beyond.', worksCategory: 'Graphic Design' },
  { icon: '◎', title: 'Packaging Design', desc: 'Shelf-stopping structural and surface packaging that sells itself.', worksCategory: 'Packaging Design' },
]

const CLIENTS = [
  'Accenture', 'Stripe', 'Notion', 'Figma', 'Vercel', 'Linear',
  'Loom', 'Framer', 'Webflow', 'Arc', 'Raycast', 'Clerk',
]

const PROJECTS = [
  // Logo Design — 4 designs
  { title: 'LogoFolio', category: 'Logo Design', img: new URL('./imports/01-LogoFolio-1.jpg', import.meta.url).href, link: '/works?category=Logo+Design' },
  { title: 'LogoFolio', category: 'Logo Design', img: new URL('./imports/01-LogoFolio-2.jpg', import.meta.url).href, link: '/works?category=Logo+Design' },
  { title: 'LogoFolio', category: 'Logo Design', img: new URL('./imports/01-LogoFolio-3.jpg', import.meta.url).href, link: '/works?category=Logo+Design' },
  { title: 'LogoFolio', category: 'Logo Design', img: new URL('./imports/01-LogoFolio-4.jpg', import.meta.url).href, link: '/works?category=Logo+Design' },
  // Brand Identity — all 5 designs
  { title: 'Nao Branding', category: 'Brand Identity', img: new URL('./imports/Nao_Branding.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: "Nita's Branding", category: 'Brand Identity', img: new URL('./imports/nitas-Brandin.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: 'OPUS Branding', category: 'Brand Identity', img: new URL('./imports/OPUS-branding.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: 'Velrion Branding', category: 'Brand Identity', img: new URL('./imports/Velrion_Branding.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: 'Brand Identity', category: 'Brand Identity', img: new URL('./imports/02-Brand-Identity-1.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  // Social Media Campaign — all 9 designs
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social_Media-1-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-02-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-03-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-04-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-05-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-06-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-07-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-08-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Social Media Campaign', category: 'Graphic Design', img: new URL('./imports/03-Social-Media-09-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  // YouTube Creatives — all 9 designs
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-1-1.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-3.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-4.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-5.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-6.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-7.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-8.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', img: new URL('./imports/04-Youtube-Creatives-9.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  // Jersey Design — all 4 designs
  { title: 'Jersey Design', category: 'Graphic Design', img: new URL('./imports/05-Jersey-Design-1.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Jersey Design', category: 'Graphic Design', img: new URL('./imports/05-Jersey-Design-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Jersey Design', category: 'Graphic Design', img: new URL('./imports/05-Jersey-Design-3.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Jersey Design', category: 'Graphic Design', img: new URL('./imports/05-Jersey-Design-4-1.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
]

// Curated cards for the "Selected Stories" section
const FEATURED_WORKS = [
  { title: 'Nao Branding', category: 'Brand Identity', label: 'Full Brand System', img: new URL('./imports/Nao_Branding.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: "Nita's Branding", category: 'Brand Identity', label: 'Identity & Guidelines', img: new URL('./imports/nitas-Brandin.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: 'OPUS Branding', category: 'Brand Identity', label: 'Logo & Brand Book', img: new URL('./imports/OPUS-branding.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: 'Velrion Branding', category: 'Brand Identity', label: 'Full Brand Identity', img: new URL('./imports/Velrion_Branding.jpg', import.meta.url).href, link: '/works?category=Brand+Identity' },
  { title: 'Social Media Campaign', category: 'Graphic Design', label: '9-piece Content Series', img: new URL('./imports/03-Social-Media-05-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'YouTube Creatives', category: 'Graphic Design', label: 'Thumbnails & Banners', img: new URL('./imports/04-Youtube-Creatives-4.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
  { title: 'Jersey Design', category: 'Graphic Design', label: 'Sports Apparel Design', img: new URL('./imports/05-Jersey-Design-2.jpg', import.meta.url).href, link: '/works?category=Graphic+Design' },
]

const TESTIMONIALS = [
  {
    quote: "Pixel Baya didn't just redesign our brand — they gave us a reason to believe in it again. Every touchpoint feels intentional.",
    name: 'Sarah Chen',
    role: 'CEO, Kova Studio',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&auto=format',
    stars: 5,
  },
  {
    quote: "The UI work transformed our product. User feedback went from confused to delighted within two weeks of launch.",
    name: 'Marcus Obi',
    role: 'CPO, Ōra Health',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format',
    stars: 5,
  },
  {
    quote: "Insanely fast, ridiculously good. They understood our vision better than we did. The brand film got 2.4M views.",
    name: 'Priya Sharma',
    role: 'Marketing Director, Vanta',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&auto=format',
    stars: 5,
  },
  {
    quote: "We've worked with three other agencies. Pixel Baya is in a different league — strategic, fast, and obsessively detailed.",
    name: 'Jake Thornton',
    role: 'Founder, Fenwick',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&auto=format',
    stars: 5,
  },
  {
    quote: "Packaging redesign led to a 58% sales lift in the first quarter. The ROI on this engagement was extraordinary.",
    name: 'Aisha Mwangi',
    role: 'Brand Lead, Mira Cosmetics',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&auto=format',
    stars: 5,
  },
]

const PROCESS = [
  { n: '01', title: 'Discovery', desc: 'Deep dive into your brand, audience, goals, and competitive landscape.' },
  { n: '02', title: 'Strategy', desc: 'Positioning, narrative, and visual direction aligned to business outcomes.' },
  { n: '03', title: 'Design', desc: 'Rapid iteration with structured feedback loops — no endless revision cycles.' },
  { n: '04', title: 'Deliver', desc: 'Production-ready assets with full documentation and onboarding support.' },
]

const PLANS = {
  monthly: [
    { name: 'Starter', price: 599, desc: 'Perfect for focused campaigns and early-stage brands.', features: ['2 active requests', '48h turnaround', 'Unlimited revisions', 'Slack communication', 'Pause anytime'] },
    { name: 'Growth', price: 999, popular: true, desc: 'For growing brands that need consistent design output.', features: ['4 active requests', '24h turnaround', 'Unlimited revisions', 'Dedicated designer', 'Brand strategy session', 'Slack + video calls'] },
    { name: 'Scale', price: 1499, desc: 'Full creative partnership for ambitious teams.', features: ['8 active requests', 'Same-day turnaround', 'Unlimited revisions', 'Senior design team', 'Weekly strategy calls', 'Custom contracts'] },
  ],
  quarterly: [
    { name: 'Starter', price: 509, desc: 'Perfect for focused campaigns and early-stage brands.', features: ['2 active requests', '48h turnaround', 'Unlimited revisions', 'Slack communication', 'Pause anytime'] },
    { name: 'Growth', price: 849, popular: true, desc: 'For growing brands that need consistent design output.', features: ['4 active requests', '24h turnaround', 'Unlimited revisions', 'Dedicated designer', 'Brand strategy session', 'Slack + video calls'] },
    { name: 'Scale', price: 1274, desc: 'Full creative partnership for ambitious teams.', features: ['8 active requests', 'Same-day turnaround', 'Unlimited revisions', 'Senior design team', 'Weekly strategy calls', 'Custom contracts'] },
  ],
  annually: [
    { name: 'Starter', price: 449, desc: 'Perfect for focused campaigns and early-stage brands.', features: ['2 active requests', '48h turnaround', 'Unlimited revisions', 'Slack communication', 'Pause anytime'] },
    { name: 'Growth', price: 749, popular: true, desc: 'For growing brands that need consistent design output.', features: ['4 active requests', '24h turnaround', 'Unlimited revisions', 'Dedicated designer', 'Brand strategy session', 'Slack + video calls'] },
    { name: 'Scale', price: 1124, desc: 'Full creative partnership for ambitious teams.', features: ['8 active requests', 'Same-day turnaround', 'Unlimited revisions', 'Senior design team', 'Weekly strategy calls', 'Custom contracts'] },
  ],
}

// ─── Mesh background ─────────────────────────────────────────────────────────

// Pre-compute contour ring shapes (stable across renders)
const CONTOUR_RINGS = Array.from({ length: 22 }, (_, i) => {
  const s = Math.sin
  const c = Math.cos
  const r = [
    48 + s(i * 1.31) * 16, 52 - s(i * 0.87) * 13,
    50 + c(i * 1.09) * 18, 46 + c(i * 0.73) * 11,
    53 + s(i * 0.82) * 13, 47 - c(i * 1.17) * 15,
    51 + s(i * 0.61) * 11, 49 - s(i * 1.43) * 17,
  ]
  const peak = 11
  const dist = Math.abs(i - peak)
  return {
    sizePct: 8 + i * 4.5,
    borderRadius: `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`,
    opacity: Math.max(0.03, 0.22 - dist * 0.013),
    strokeW: i === peak ? 1.5 : 1,
    dur: `${13 + (i % 7) * 2.5}s`,
    delay: `${(i * -1.8).toFixed(1)}s`,
  }
})

function GlassBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', background: '#0A0000' }}>

      {/* ── Topographic nest rings — 22 organic contours centered below mid ── */}
      {CONTOUR_RINGS.map((ring, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${ring.sizePct}vmax`, height: `${ring.sizePct * 0.72}vmax`,
          top: '58%', left: '50%',
          border: `${ring.strokeW}px solid rgba(255,154,60,${ring.opacity})`,
          borderRadius: ring.borderRadius,
          animation: `contour-breathe ${ring.dur} ease-in-out infinite`,
          animationDelay: ring.delay,
        }} />
      ))}

      {/* ── Central amber glow — the nest interior light ── */}
      <div style={{
        position: 'absolute', width: '50vmax', height: '32vmax',
        top: '58%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse at center, rgba(255,154,60,0.22) 0%, rgba(180,110,10,0.10) 45%, transparent 70%)',
        filter: 'blur(55px)',
        animation: 'mesh-a 34s ease-in-out infinite',
      }} />

      {/* ── Floor warmth — golden heat rising from below ── */}
      <div style={{
        position: 'absolute', width: '120vw', height: '50vh',
        bottom: '-25vh', left: '50%', transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(220,130,20,0.42) 0%, rgba(120,75,5,0.18) 55%, transparent 75%)',
        filter: 'blur(80px)',
        animation: 'mesh-b 28s ease-in-out infinite',
      }} />

      {/* ── Sienna left drift ── */}
      <div style={{
        position: 'absolute', width: '55vmax', height: '55vmax',
        bottom: '0', left: '-15vmax', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,110,10,0.40) 0%, transparent 65%)',
        filter: 'blur(90px)',
        animation: 'mesh-c 38s ease-in-out infinite reverse',
      }} />

      {/* ── Straw right echo ── */}
      <div style={{
        position: 'absolute', width: '45vmax', height: '45vmax',
        bottom: '5%', right: '-12vmax', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,192,107,0.30) 0%, transparent 65%)',
        filter: 'blur(100px)',
        animation: 'mesh-a 42s ease-in-out infinite reverse',
      }} />

      {/* ── Film grain — organic woven-straw depth ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
        opacity: 0.10, mixBlendMode: 'overlay',
      }} />
    </div>
  )
}

// ─── Atoms ──────────────────────────────────────────────────────────────────

const Stars = ({ count = 5, size = 14 }: { count?: number; size?: number }) => (
  <span style={{ display: 'inline-flex', gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: '#FF9A3C', fontSize: size }}>★</span>
    ))}
  </span>
)

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 100, padding: '5px 14px',
    fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.04em',
  }}>
    {children}
  </span>
)

const SectionLabel = ({ children }: { children: string }) => (
  <Tag><span style={{ color: '#FF9A3C' }}>✦</span> {children}</Tag>
)

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px clamp(20px, 4vw, 60px) 0', position: 'relative', overflow: 'hidden' }}>

      {/* Glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(255,154,60,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', textAlign: 'center', position: 'relative' }}>

        {/* Rating badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '8px 18px', marginBottom: 40 }}>
          <Stars count={5} size={13} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>5</span>
          <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Rated by 45+ clients worldwide</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(44px, 8vw, 108px)', fontWeight: 900,
          lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff',
          marginBottom: 28,
        }}>
          Design that makes{' '}
          <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>every</em>
          <br />
          industry{' '}
          <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>speak.</em>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 48px', fontWeight: 400 }}>
          We're a boutique design agency helping ambitious brands stand out through strategic design — from branding to UI/UX, video, and beyond.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 700, color: '#fff',
            background: '#FF9A3C', borderRadius: 100, padding: '14px 32px',
            textDecoration: 'none', letterSpacing: '-0.01em',
            animation: 'pulse-gold 3s ease-in-out infinite',
          }}>
            Book a free call ↗
          </a>
          <a href="#work" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 600, color: '#fff',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 100, padding: '14px 32px', textDecoration: 'none',
          }}>
            View our work
          </a>
        </div>

        {/* Avatar cluster */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 36 }}>
          <div style={{ display: 'flex' }}>
            {['photo-1494790108755-2616b612b786', 'photo-1507003211169-0a1dd7228f2d', 'photo-1438761681033-6461ffad8d80', 'photo-1472099645785-5658abf4ff4e'].map((id, i) => (
              <img key={id} src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&auto=format`} alt="client"
                style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #0A0000', marginLeft: i === 0 ? 0 : -10, objectFit: 'cover' }} />
            ))}
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>Join 55+ happy clients</span>
        </div>
      </div>

      {/* Scrolling project strip */}
      <div style={{ marginTop: 72, overflow: 'hidden' }}>
        <ProjectStrip direction="left" />
      </div>
    </section>
  )
}

function ProjectStrip({ direction }: { direction: 'left' | 'right' }) {
  const items = [...PROJECTS, ...PROJECTS]
  const duration = direction === 'left' ? '180s' : '216s'
  return (
    <div style={{ display: 'flex', gap: 24, width: 'max-content', animation: `${direction === 'left' ? 'marquee' : 'marquee-reverse'} ${duration} linear infinite`, padding: '16px 0' }}>
      {items.map((p, i) => (
        <Link
          key={i}
          to={p.link}
          style={{
            width: 460, height: 259, borderRadius: 16, overflow: 'hidden', flexShrink: 0, position: 'relative',
            background: '#111', border: '1px solid rgba(255,255,255,0.06)',
            display: 'block', textDecoration: 'none', cursor: 'pointer',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,154,60,0.5)'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
            <div style={{ fontSize: 10, color: '#FF9A3C', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>{p.category.toUpperCase()}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{p.title}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ─── Clients ─────────────────────────────────────────────────────────────────

function Clients() {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', background: 'transparent' }}>
      <div style={{ display: 'flex', gap: 60, width: 'max-content', animation: 'marquee 20s linear infinite', alignItems: 'center' }}>
        {doubled.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ color: '#FF9A3C', fontSize: 10 }}>✦</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{c}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Stats ───────────────────────────────────────────────────────────────────

const STATS = [
  { value: 5, suffix: '+', label: 'Years of Experience', sub: 'Since 2020' },
  { value: 175, suffix: '+', label: 'Projects Delivered', sub: 'Across 30+ industries' },
  { value: 100, suffix: '%', label: 'Success Rate', sub: 'Client satisfaction score' },
  { value: 55, suffix: '+', label: 'Happy Clients', sub: 'Worldwide partners' },
]

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function StatCard({ value, suffix, label, sub, active }: typeof STATS[0] & { active: boolean }) {
  const count = useCountUp(value, 1800, active)
  return (
    <div style={{
      flex: '1 1 200px', textAlign: 'center', padding: '48px 32px',
      position: 'relative',
    }}>
      <div style={{
        fontSize: 'clamp(52px,6vw,84px)', fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1,
        background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.55) 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 14, letterSpacing: '-0.01em' }}>{label}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 6, fontWeight: 500 }}>{sub}</div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 1, top: '20%', background: 'rgba(255,255,255,0.08)' }} />
    </div>
  )
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <section ref={ref} style={{ background: 'rgba(0,0,0,0.28)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,154,60,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} active={active} />
        ))}
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'transparent' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <SectionLabel>What we offer</SectionLabel>
          <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20, lineHeight: 1.05 }}>
            Creative services for{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>every</em>
            <br />ambitious brand
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: '16px auto 0', fontWeight: 400 }}>
            From early-stage startups to scaling enterprises — we bring the same obsession to every project.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '36px 32px',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        borderColor: hovered ? 'rgba(255,154,60,0.2)' : 'rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 20, color: hovered ? '#FF9A3C' : 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }}>{service.icon}</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>{service.title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 400 }}>{service.desc}</p>
      <Link
        to={`/works?category=${encodeURIComponent(service.worksCategory)}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
          color: '#FF9A3C', textDecoration: 'none', marginTop: 24,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.25s, transform 0.25s',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >LEARN MORE →</Link>
    </div>
  )
}

// ─── Work ────────────────────────────────────────────────────────────────────

function Work() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="work" style={{ padding: 'clamp(80px,10vw,140px) 0', background: 'rgba(0,0,0,0.28)' }}>
      <div style={{ padding: '0 clamp(20px,4vw,60px)', maxWidth: 1200, margin: '0 auto', marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <SectionLabel>Our work</SectionLabel>
            <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20, lineHeight: 1.05 }}>
              Selected{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>stories</em>
            </h2>
          </div>
          <Link to="/works" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', paddingBottom: 2, borderBottom: '1px solid rgba(255,255,255,0.15)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF9A3C')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >View all projects →</Link>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div ref={scrollRef} style={{ display: 'flex', gap: 20, overflowX: 'auto', padding: '0 clamp(20px,4vw,60px) 20px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {FEATURED_WORKS.map((p, i) => (
          <WorkCard key={i} project={p} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({ project }: { project: typeof FEATURED_WORKS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={project.link}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        minWidth: 340, maxWidth: 340, borderRadius: 16, overflow: 'hidden',
        background: '#111', border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
        cursor: 'pointer', textDecoration: 'none', display: 'block',
        transition: 'transform 0.3s ease, border-color 0.3s',
        transform: hov ? 'translateY(-6px)' : 'none',
        borderColor: hov ? 'rgba(255,154,60,0.35)' : 'rgba(255,255,255,0.07)',
        boxShadow: hov ? '0 20px 60px rgba(255,154,60,0.08)' : 'none',
      }}
    >
      <div style={{ height: 230, overflow: 'hidden', position: 'relative' }}>
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.6s ease',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)', opacity: hov ? 1 : 0, transition: 'opacity 0.3s' }} />
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0A0000', background: '#FF9A3C', borderRadius: 100, padding: '4px 12px', letterSpacing: '0.04em' }}>
            {project.category.toUpperCase()}
          </span>
        </div>
      </div>
      <div style={{ padding: '20px 22px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, color: '#fff' }}>{project.title}</h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,154,60,0.1)', border: '1px solid rgba(255,154,60,0.2)', borderRadius: 100, padding: '4px 12px' }}>
              <span style={{ color: '#FF9A3C', fontSize: 10 }}>✦</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#FF9A3C' }}>{project.label}</span>
            </div>
          </div>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
            background: hov ? '#FF9A3C' : 'rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, color: hov ? '#0A0000' : 'rgba(255,255,255,0.3)',
            transition: 'all 0.2s',
          }}>→</div>
        </div>
      </div>
    </Link>
  )
}

// ─── Process ─────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'transparent' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <SectionLabel>How we work</SectionLabel>
          <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20, lineHeight: 1.05 }}>
            A process built for{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>results</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1 }}>
          {PROCESS.map((step, i) => (
            <div key={i} style={{ padding: '40px 32px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: 'rgba(255,255,255,0.04)', position: 'absolute', top: -10, right: 16, letterSpacing: '-0.04em', lineHeight: 1 }}>{step.n}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#FF9A3C', letterSpacing: '0.1em', marginBottom: 20 }}>{step.n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 400 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WhyPixelBaya ──────────────────────────────────────────────────────────────────

const COMPARE_ROWS = [
  { label: 'Turnaround time',    form: '24–48h',        agency: '2–4 weeks',         freelancer: 'Unpredictable' },
  { label: 'Pricing model',      form: 'Flat monthly',  agency: '$15k+ per project', freelancer: 'Variable' },
  { label: 'Design seniority',   form: 'Senior always', agency: 'Mixed levels',      freelancer: 'Unknown' },
  { label: 'Revisions',          form: 'Unlimited',     agency: 'Scoped & billed',   freelancer: 'Scoped & billed' },
  { label: 'Brand strategy',     form: '✓ Included',    agency: '$ Extra',           freelancer: '✗ Rarely' },
  { label: 'Dedicated Slack',    form: '✓ Always',      agency: '✗ Account mgr',     freelancer: '✗ Email only' },
  { label: 'Pause or cancel',    form: '✓ Anytime',     agency: '✗ Long contracts',  freelancer: '↕ Depends' },
  { label: 'Multiple services',  form: '✓ All-in-one',  agency: '✓ Usually',         freelancer: '✗ One skill' },
  { label: 'Response time',      form: '< 2 hours',     agency: '24–48h',            freelancer: 'Unknown' },
  { label: 'Scalable capacity',  form: '✓ Instantly',   agency: '↕ Slow to scale',   freelancer: '✗ One person' },
]

const EXTRA_REASONS = [
  { icon: '🎯', title: 'Results-obsessed',      desc: 'We track outcomes, not just outputs. Every project ships with measurable success criteria.' },
  { icon: '🔒', title: 'NDA & IP protection',   desc: 'Full IP transfer on delivery. Your brand assets are yours, always.' },
  { icon: '🌍', title: 'Globally distributed',  desc: 'Teams across 3 time zones — we cover your working hours no matter where you are.' },
  { icon: '⚙️', title: 'Tool-agnostic delivery',desc: 'Figma, Adobe, Sketch, Webflow — we deliver in whatever format your team actually uses.' },
  { icon: '📈', title: 'Growth partner mindset', desc: 'We think like co-founders, not vendors. Your growth is our north star, not just the brief.' },
  { icon: '🤝', title: 'Transparent by default', desc: 'Live project boards, weekly check-ins, no surprises. You always know exactly where things stand.' },
]

function WhyPixelBaya() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'transparent' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <SectionLabel>Why Pixel Baya</SectionLabel>
          <h2 style={{ fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', marginTop: 20, lineHeight: 1 }}>
            The smarter way to{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>get design done.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '16px auto 0', lineHeight: 1.7, fontWeight: 400 }}>
            We built Pixel Baya to fix everything broken about how agencies, freelancers, and in-house teams work. Here's the proof.
          </p>
        </div>

        {/* Comparison table — desktop */}
        <div className="compare-desktop" style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', marginBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', background: '#161616', padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>WHAT YOU GET</div>
            {[{ label: 'Pixel Baya ✦', gold: true }, { label: 'Agency', gold: false }, { label: 'Freelancer', gold: false }].map(h => (
              <div key={h.label} style={{ textAlign: 'center' }}>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: h.gold ? '#0A0000' : 'rgba(255,255,255,0.3)', background: h.gold ? '#FF9A3C' : 'transparent', padding: h.gold ? '4px 14px' : '0', borderRadius: h.gold ? 100 : 0 }}>
                  {h.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          {COMPARE_ROWS.map((row, i) => (
            <div key={i}
              style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', padding: '16px 28px', alignItems: 'center', borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,154,60,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)')}
            >
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{row.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FF9A3C', textAlign: 'center' }}>{row.form}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>{row.agency}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>{row.freelancer}</div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', padding: '20px 28px', background: 'rgba(255,154,60,0.05)', borderTop: '1px solid rgba(255,154,60,0.15)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Overall value</div>
            <div style={{ textAlign: 'center' }}><span style={{ background: '#FF9A3C', color: '#0A0000', fontSize: 12, fontWeight: 800, borderRadius: 100, padding: '4px 14px' }}>★★★★★</span></div>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>★★★☆☆</div>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>★★☆☆☆</div>
          </div>
        </div>

        {/* Comparison table — mobile cards */}
        <div className="compare-mobile" style={{ marginBottom: 80, flexDirection: 'column', gap: 12 }}>
          {COMPARE_ROWS.map((row, i) => (
            <div key={i} style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: '#161616', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
                {row.label.toUpperCase()}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                {([
                  { heading: 'Pixel Baya', value: row.form, gold: true },
                  { heading: 'Agency', value: row.agency, gold: false },
                  { heading: 'Freelancer', value: row.freelancer, gold: false },
                ] as const).map((col) => (
                  <div key={col.heading} style={{ padding: '14px 12px', borderRight: col.heading !== 'Freelancer' ? '1px solid rgba(255,255,255,0.06)' : 'none', background: col.gold ? 'rgba(255,154,60,0.04)' : 'transparent', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: col.gold ? '#FF9A3C' : 'rgba(255,255,255,0.25)', letterSpacing: '0.07em', marginBottom: 6 }}>{col.heading.toUpperCase()}</div>
                    <div style={{ fontSize: 12, fontWeight: col.gold ? 700 : 400, color: col.gold ? '#FF9A3C' : 'rgba(255,255,255,0.35)' }}>{col.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderRadius: 14, border: '1px solid rgba(255,154,60,0.2)', background: 'rgba(255,154,60,0.05)', padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Overall</div>
            <div style={{ textAlign: 'center' }}><span style={{ background: '#FF9A3C', color: '#0A0000', fontSize: 11, fontWeight: 800, borderRadius: 100, padding: '3px 10px' }}>★★★★★</span></div>
            <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>★★☆☆☆</div>
          </div>
        </div>

        {/* Extra reasons */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h3 style={{ fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            And{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>six more</em>
            {' '}reasons
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }} className="why-form-grid">
          {EXTRA_REASONS.map((r, i) => (
            <div key={i}
              style={{ padding: '32px 28px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', transition: 'border-color 0.3s, background 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,154,60,0.2)'; e.currentTarget.style.background = 'rgba(255,154,60,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{r.icon}</div>
              <h4 style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>{r.title}</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 400 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <a href="#contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, color: '#0A0000', background: '#FF9A3C', borderRadius: 100, padding: '16px 40px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ready to work with us? Let's talk ↗
          </a>
          <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>No commitment required · Free 30-min discovery call</div>
        </div>
      </div>

      <style>{`
        .compare-mobile { display: none; }
        @media (max-width: 700px) {
          .compare-desktop { display: none; }
          .compare-mobile { display: flex; }
        }
        @media (max-width: 860px) { .why-form-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .why-form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) 0', background: 'transparent', overflow: 'hidden' }}>
      <div style={{ padding: '0 clamp(20px,4vw,60px)', maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: 60 }}>
        <SectionLabel>Client love</SectionLabel>
        <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20 }}>
          Don't take our{' '}
          <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>word</em>
          {' '}for it
        </h2>
      </div>

      {/* Marquee row */}
      <div style={{ display: 'flex', gap: 20, width: 'max-content', animation: 'marquee 40s linear infinite' }}>
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{
      width: 340, flexShrink: 0, background: '#161616', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '28px 28px 24px',
    }}>
      <Stars count={t.stars} size={13} />
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '16px 0 24px', fontWeight: 400 }}>"{t.quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

// ─── SkillsMarquee ───────────────────────────────────────────────────────────

const WORDS_ROW1 = ['Branding', 'Photoshop', 'Mobile App', 'Website', 'Figma', 'Illustrator', 'Logo', 'Video Editing', 'Creative', 'Social Media', 'Product', 'Motion']
const WORDS_ROW2 = ['UI / UX', 'After Effects', 'Packaging', 'Typography', 'Reels', 'Wireframes', 'Identity', 'Color Grading', 'Campaigns', 'Print', 'Animation', 'Strategy']

const MOCKUPS = [
  { img: new URL('./imports/Nao_Branding.jpg', import.meta.url).href, label: 'Brand Identity' },
  { img: new URL('./imports/03-Social_Media-1-2.jpg', import.meta.url).href, label: 'Social Media' },
  { img: new URL('./imports/04-Youtube-Creatives-1-1.jpg', import.meta.url).href, label: 'YouTube' },
  { img: new URL('./imports/OPUS-branding.jpg', import.meta.url).href, label: 'Brand Identity' },
  { img: new URL('./imports/03-Social-Media-04-2.jpg', import.meta.url).href, label: 'Social Media' },
  { img: new URL('./imports/05-Jersey-Design-1.jpg', import.meta.url).href, label: 'Jersey Design' },
  { img: new URL('./imports/nitas-Brandin.jpg', import.meta.url).href, label: 'Brand Identity' },
  { img: new URL('./imports/04-Youtube-Creatives-3.jpg', import.meta.url).href, label: 'YouTube' },
  { img: new URL('./imports/03-Social-Media-07-2.jpg', import.meta.url).href, label: 'Social Media' },
  { img: new URL('./imports/Velrion_Branding.jpg', import.meta.url).href, label: 'Brand Identity' },
  { img: new URL('./imports/05-Jersey-Design-3.jpg', import.meta.url).href, label: 'Jersey Design' },
  { img: new URL('./imports/04-Youtube-Creatives-6.jpg', import.meta.url).href, label: 'YouTube' },
  { img: new URL('./imports/03-Social-Media-02-2.jpg', import.meta.url).href, label: 'Social Media' },
  { img: new URL('./imports/02-Brand-Identity-1.jpg', import.meta.url).href, label: 'Brand Identity' },
  { img: new URL('./imports/05-Jersey-Design-4-1.jpg', import.meta.url).href, label: 'Jersey Design' },
]

const WORD_STYLES = [
  { style: 'outline' },
  { style: 'filled' },
  { style: 'gold' },
  { style: 'outline' },
  { style: 'filled' },
  { style: 'gold' },
  { style: 'outline' },
  { style: 'filled' },
  { style: 'gold' },
  { style: 'outline' },
  { style: 'filled' },
  { style: 'gold' },
]

function WordPill({ word, idx }: { word: string; idx: number }) {
  const s = WORD_STYLES[idx % WORD_STYLES.length].style
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '10px 24px', borderRadius: 100, flexShrink: 0,
      fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: s === 'filled' ? 700 : 600,
      letterSpacing: s === 'gold' ? '-0.01em' : '0.01em',
      whiteSpace: 'nowrap',
      background: s === 'gold' ? '#FF9A3C' : s === 'filled' ? 'rgba(255,255,255,0.07)' : 'transparent',
      color: s === 'gold' ? '#0A0000' : '#fff',
      border: s === 'outline' ? '1px solid rgba(255,255,255,0.15)' : 'none',
    }}>
      {s === 'gold' && <span style={{ fontSize: 10 }}>✦</span>}
      {word}
    </span>
  )
}

function SkillsMarquee() {
  const row1 = [...WORDS_ROW1, ...WORDS_ROW1]
  const row2 = [...WORDS_ROW2, ...WORDS_ROW2]

  return (
    <section style={{ background: 'transparent', padding: '0', overflow: 'hidden', position: 'relative', pointerEvents: 'none', userSelect: 'none' }}>

      {/* Top fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, #0A0000, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, #0A0000, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Row 1 — left to right */}
      <div style={{ padding: '48px 0 0', display: 'flex', gap: 14, width: 'max-content', animation: 'marquee-reverse 28s linear infinite' }}>
        {row1.map((w, i) => <WordPill key={i} word={w} idx={i} />)}
      </div>

      {/* Mockup strip — slow left-to-right drift */}
      <div style={{ position: 'relative', margin: '32px 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 24, width: 'max-content',
          animation: 'mockup-drift 180s linear infinite',
          alignItems: 'center',
        }}>
          {[...MOCKUPS, ...MOCKUPS, ...MOCKUPS].map((m, i) => (
            <div key={i} style={{
              width: 280, flexShrink: 0, borderRadius: 12, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.09)',
              background: '#161616',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              transform: i % 2 === 0 ? 'rotate(-1deg)' : 'rotate(0.8deg)',
              pointerEvents: 'none',
            }}
            >
              <div style={{ height: 158, overflow: 'hidden' }}>
                <img src={m.img} alt={m.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div style={{ paddingBottom: 48, display: 'flex', gap: 14, width: 'max-content', animation: 'marquee 32s linear infinite' }}>
        {row2.map((w, i) => <WordPill key={i} word={w} idx={i + 4} />)}
      </div>

      <style>{`
        @keyframes mockup-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

type BillingKey = 'monthly' | 'quarterly' | 'annually'

function Pricing() {
  const [billing, setBilling] = useState<BillingKey>('monthly')
  const plans = PLANS[billing]

  return (
    <section id="pricing" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.28)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel>Pricing</SectionLabel>
          <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20 }}>
            Simple,{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>transparent</em>
            {' '}pricing
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, marginTop: 12, fontWeight: 400 }}>Pause or cancel anytime. No lock-ins, no hidden fees.</p>

          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 100, padding: 4, marginTop: 32, gap: 2 }}>
            {(['monthly', 'quarterly', 'annually'] as BillingKey[]).map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{
                fontSize: 13, fontWeight: 600, padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
                background: billing === b ? '#FF9A3C' : 'transparent',
                color: billing === b ? '#0A0000' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
              }}>
                {b.charAt(0).toUpperCase() + b.slice(1)}
                {b !== 'monthly' && <span style={{ marginLeft: 6, fontSize: 10, color: billing === b ? '#0A0000' : '#FF9A3C', fontWeight: 700 }}>
                  {b === 'quarterly' ? 'Save 15%' : 'Save 25%'}
                </span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ))}
        </div>

        {/* View more */}
        <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            Looking for per-project pricing across Brand, Video, Packaging, UI/UX & Web?
          </p>
          <Link to="/pricing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 14, fontWeight: 700, color: '#0A0000',
            background: '#FF9A3C', borderRadius: 100, padding: '13px 32px',
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >View all pricing options ↗</Link>
        </div>
      </div>
    </section>
  )
}

const PLAN_NEON = 'rgba(255,154,60,0.6) 0 0 0 1px, rgba(255,154,60,0.28) 0 0 28px, rgba(255,154,60,0.10) 0 0 80px'
const PLAN_NEON_POP = 'rgba(255,154,60,0.8) 0 0 0 1px, rgba(255,154,60,0.40) 0 0 40px, rgba(255,154,60,0.15) 0 0 100px'

function PlanCard({ plan, billing }: { plan: typeof PLANS['monthly'][0]; billing: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${hov || plan.popular ? 'rgba(255,154,60,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: plan.popular ? 'rgba(255,154,60,0.07)' : 'rgba(255,255,255,0.02)',
        boxShadow: hov ? (plan.popular ? PLAN_NEON_POP : PLAN_NEON) : plan.popular ? 'rgba(255,154,60,0.18) 0 0 40px' : 'none',
        transition: 'box-shadow 0.35s ease, border-color 0.3s ease, transform 0.3s ease',
        transform: hov ? 'translateY(-5px)' : 'none',
        position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
      }}
    >
      {plan.popular && (
        <div style={{ position: 'absolute', top: -1, right: 24, background: '#FF9A3C', color: '#0A0000', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: '0 0 8px 8px', letterSpacing: '0.06em' }}>
          MOST POPULAR
        </div>
      )}
      {/* Header */}
      <div style={{ padding: '32px 32px 0', minHeight: 180 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: plan.popular ? '#FF9A3C' : 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', marginBottom: 12 }}>{plan.name.toUpperCase()}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>${plan.price.toLocaleString()}</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/mo</span>
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>{plan.desc}</p>
      </div>
      {/* Features */}
      <div style={{ padding: '20px 32px', flex: 1 }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plan.features.map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
              <span style={{ color: '#FF9A3C', fontSize: 12, flexShrink: 0 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      {/* CTA */}
      <div style={{ padding: '0 32px 32px' }}>
        <a href="#contact" style={{
          display: 'block', textAlign: 'center', padding: '13px', borderRadius: 10,
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
          background: plan.popular ? '#FF9A3C' : 'rgba(255,255,255,0.07)',
          color: plan.popular ? '#0A0000' : '#fff',
          border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >Get started →</a>
      </div>
    </div>
  )
}

// ─── TrustedBy ───────────────────────────────────────────────────────────────

// ─── Contact ─────────────────────────────────────────────────────────────────

// ─── Home FAQ ────────────────────────────────────────────────────────────────

const HOME_FAQS = [
  { q: 'What services do you offer?', a: 'We offer Brand Identity, UI/UX Design, Graphic Design, Social Media Design, Video Editing, Packaging Design, and Web Design — both as one-time projects and monthly subscriptions.' },
  { q: 'How does your subscription model work?', a: 'You subscribe to a plan (Starter, Growth, or Scale), submit design requests anytime, and we work through them one or two at a time with a fast turnaround. Pause or cancel whenever you need.' },
  { q: 'How fast do you deliver?', a: 'Most requests are delivered within 24–48 hours on Growth and Scale plans. Starter plan targets 48–72 hours. Complex projects like brand identities are scoped with a fixed timeline upfront.' },
  { q: 'Do you offer custom project quotes?', a: 'Yes — our per-project pricing is a starting point. For larger scopes, bespoke timelines, or bundled services, book a free call and we\'ll scope it together with no obligation.' },
  { q: 'Who will be working on my project?', a: 'A dedicated senior designer owns your work — not a junior rotated in after sign-up. For larger projects we bring in the full team while keeping one point of contact for you.' },
  { q: 'What if I\'m not happy with the output?', a: 'We offer unlimited revisions within the agreed scope. If something genuinely misses the mark after two rounds, we\'ll restart that request from scratch at no extra cost.' },
]

function HomeFAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
        padding: '22px 0', textAlign: 'left', fontFamily: 'Inter, sans-serif',
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{q}</span>
        <span style={{
          fontSize: 20, color: '#FF9A3C', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.25s',
          display: 'inline-block',
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: '0 0 24px', paddingRight: 40 }}>{a}</p>
      </div>
    </div>
  )
}

function HomeFAQ() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.22)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel>FAQs</SectionLabel>
          <h2 style={{ fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20, lineHeight: 1.05 }}>
            Common{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>questions</em>
          </h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {HOME_FAQS.map((faq, i) => <HomeFAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100,
            padding: '11px 28px', textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF9A3C'; e.currentTarget.style.color = '#FF9A3C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >Still have questions? Ask us ↗</a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await import('@emailjs/browser').then(({ default: emailjs }) =>
        emailjs.send(
          'service_pixelbaya',
          'template_pixelbaya',
          {
            from_name: form.name,
            from_email: form.email,
            company: form.company,
            service: form.service,
            budget: form.budget,
            message: form.message,
            to_email: 'pixelbaya@gmail.com',
          },
          'YOUR_EMAILJS_PUBLIC_KEY',
        )
      )
      setSent(true)
    } catch {
      setError('Failed to send. Please email us directly at pixelbaya@gmail.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'transparent' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <SectionLabel>Get in touch</SectionLabel>
          <h2 style={{ fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900, letterSpacing: '-0.04em', marginTop: 20, lineHeight: 1 }}>
            Let's build something{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>great</em>
            {' '}together
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, lineHeight: 1.7, maxWidth: 440, margin: '16px auto 0' }}>
            Tell us about your project. We'll get back to you within 24 hours.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
            <a href="mailto:pixelbaya@gmail.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100, padding: '10px 20px', textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,154,60,0.5)'; e.currentTarget.style.color = '#FF9A3C' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >✉ Email: pixelbaya@gmail.com</a>
            <a href="https://wa.me/8801787244491" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100, padding: '10px 20px', textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.5)'; e.currentTarget.style.color = '#25D366' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >💬 WhatsApp: +8801787244491</a>
          </div>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '80px 40px', background: 'rgba(255,154,60,0.05)', border: '1px solid rgba(255,154,60,0.2)', borderRadius: 20 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>✦</div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: '#FF9A3C', marginBottom: 12 }}>Message received!</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            {/* Row 1: name | email */}
            {[
              { id: 'name',  label: 'Your name',     placeholder: 'Alex Johnson',      type: 'text'  },
              { id: 'email', label: 'Email address',  placeholder: 'alex@company.com',  type: 'email' },
            ].map(f => (
              <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>{f.label.toUpperCase()}</label>
                <input type={f.type} placeholder={f.placeholder} required
                  value={(form as any)[f.id]}
                  onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 16px', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,154,60,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>
            ))}

            {/* Row 2: company | service */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>COMPANY</label>
              <input type="text" placeholder="Acme Inc."
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 16px', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(255,154,60,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>SERVICE</label>
              <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: form.service ? '#fff' : 'rgba(255,255,255,0.3)', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 16px', outline: 'none', appearance: 'none', width: '100%', boxSizing: 'border-box' }}>
                <option value="" disabled>Select a service...</option>
                {SERVICES.map(s => <option key={s.title} value={s.title} style={{ background: '#161616' }}>{s.title}</option>)}
              </select>
            </div>

            {/* Row 3: budget full-width */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>MONTHLY BUDGET</label>
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: form.budget ? '#fff' : 'rgba(255,255,255,0.3)', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 16px', outline: 'none', appearance: 'none', width: '100%', boxSizing: 'border-box' }}>
                <option value="" disabled>Select budget...</option>
                {['Under $2,000', '$2,000–$5,000', '$5,000–$10,000', '$10,000+'].map(b => <option key={b} value={b} style={{ background: '#161616' }}>{b}</option>)}
              </select>
            </div>

            {/* Row 4: message full-width */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>TELL US ABOUT YOUR PROJECT</label>
              <textarea placeholder="What are you building? What's the challenge?" rows={5} required
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 16px', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(255,154,60,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            {/* Row 5: submit */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button type="submit" disabled={sending}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#0A0000', background: '#FF9A3C', border: 'none', borderRadius: 100, padding: '15px 40px', cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.7 : 1, transition: 'opacity 0.2s', width: '100%' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.opacity = '1' }}>
                {sending ? 'Sending…' : 'Send message ↗'}
              </button>
              {error && <p style={{ fontSize: 13, color: '#ff6b6b', margin: 0 }}>{error}</p>}
            </div>
          </form>
        )}
      </div>

      <style>{`
        .contact-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .contact-form {
            grid-template-columns: 1fr;
          }
          .contact-form > div[style*="1 / -1"] {
            grid-column: 1 !important;
          }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#0A0000', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px clamp(20px,4vw,60px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 40, marginBottom: 60 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
              form<span style={{ color: '#FF9A3C' }}>.</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 200 }}>
              A boutique creative agency for ambitious brands.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                { label: 'IG', href: 'https://www.instagram.com/pixelbaya' },
                { label: 'DR', href: 'https://dribbble.com/pixelbaya' },
                { label: 'LI', href: 'https://www.linkedin.com/company/pixelbaya' },
                { label: 'BE', href: 'https://www.behance.net/pixelbaya' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF9A3C'; e.currentTarget.style.color = '#FF9A3C' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {[
            { title: 'Services', links: ['Brand Identity', 'UI / UX Design', 'Graphic Design', 'Video Editing', 'Packaging'] },
            { title: 'Company', links: ['About us', 'Our work', 'Pricing', 'Blog', 'Careers'] },
            { title: 'Contact', links: ['pixelbaya@gmail.com', 'Brahmanbaria, Bangladesh', 'Remote worldwide'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 20 }}>{col.title.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontWeight: 400, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>© 2026, Pixelbaya. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── VideoShowcase ────────────────────────────────────────────────────────────

const MAIN_VIDEO = { id: 'jMQKxVwsaH0', title: 'Video Edit' }
const SHORTS = [
  { id: 'z6lmOjpH4Fo', title: 'Reel #1' },
  { id: '5K_TYT9x4eU', title: 'Reel #2' },
  { id: 'dYUZihZN4Bo', title: 'Reel #3' },
]

function InlineYT({ id, aspect, label }: { id: string; aspect: '16/9' | '9/16'; label: string }) {
  const [playing, setPlaying] = useState(false)
  const [hov, setHov] = useState(false)
  const pb = aspect === '16/9' ? '56.25%' : '177.78%'

  return (
    <div style={{
      position: 'relative', borderRadius: 16, overflow: 'hidden',
      paddingBottom: pb, height: 0, width: '100%',
      background: '#111',
      border: `1px solid ${hov && !playing ? 'rgba(255,154,60,0.45)' : 'rgba(255,255,255,0.07)'}`,
      transition: 'border-color 0.2s',
    }}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
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
            alt={label}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: hov ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.25)',
            transition: 'background 0.3s',
          }} />
          {/* play button */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: aspect === '16/9' ? 80 : 56,
              height: aspect === '16/9' ? 80 : 56,
              borderRadius: '50%', background: '#FF9A3C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hov ? '0 0 0 20px rgba(255,154,60,0.18)' : '0 0 0 12px rgba(255,154,60,0.1)',
              transform: hov ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.2s',
            }}>
              <svg width={aspect === '16/9' ? 28 : 20} height={aspect === '16/9' ? 28 : 20} viewBox="0 0 24 24" fill="#0A0000" style={{ marginLeft: 3 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '5px 13px',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF9A3C', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>
              {aspect === '9/16' ? 'REEL' : 'VIDEO'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function VideoShowcase() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'transparent' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
          <div>
            <SectionLabel>Showreel</SectionLabel>
            <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20, lineHeight: 1.05 }}>
              Watch our work{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>in motion</em>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 340, fontWeight: 400 }}>
            From brand films to scroll-stopping social content — we tell stories that people actually watch.
          </p>
        </div>

        {/* Main video */}
        <InlineYT id={MAIN_VIDEO.id} aspect="16/9" label={MAIN_VIDEO.title} />

        {/* Shorts row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
          {SHORTS.map(s => (
            <InlineYT key={s.id} id={s.id} aspect="9/16" label={s.title} />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── WhatWeDo ────────────────────────────────────────────────────────────────

const WHAT_WE_DO = [
  {
    id: 'logo',
    label: 'Logo Design',
    icon: '◉',
    headline: 'Marks that mean something',
    desc: 'Distinctive logos and wordmarks built from scratch — rooted in brand strategy and refined until every curve and weight feels inevitable.',
    tags: ['Logo Design', 'Wordmarks', 'Symbol Design', 'Brand Marks'],
    worksLink: '/works?category=Logo+Design',
    works: [
      { title: 'LogoFolio', type: 'Logo Collection', img: new URL('./imports/01-LogoFolio-1.jpg', import.meta.url).href },
      { title: 'LogoFolio', type: 'Logo Collection', img: new URL('./imports/01-LogoFolio-2.jpg', import.meta.url).href },
      { title: 'LogoFolio', type: 'Logo Collection', img: new URL('./imports/01-LogoFolio-3.jpg', import.meta.url).href },
      { title: 'LogoFolio', type: 'Logo Collection', img: new URL('./imports/01-LogoFolio-4.jpg', import.meta.url).href },
    ],
  },
  {
    id: 'branding',
    label: 'Brand Identity',
    icon: '✦',
    headline: 'Identity that outlasts trends',
    desc: 'We build complete brand identities — from the core mark to the full visual language — grounded in strategy and executed with craft that holds up at every size and surface.',
    tags: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Typography'],
    worksLink: '/works?category=Brand+Identity',
    works: [
      { title: 'Nao Branding', type: 'Full Brand System', img: new URL('./imports/Nao_Branding.jpg', import.meta.url).href },
      { title: "Nita's Branding", type: 'Identity & Guidelines', img: new URL('./imports/nitas-Brandin.jpg', import.meta.url).href },
      { title: 'OPUS Branding', type: 'Logo & Brand Book', img: new URL('./imports/OPUS-branding.jpg', import.meta.url).href },
      { title: 'Velrion Branding', type: 'Full Brand Identity', img: new URL('./imports/Velrion_Branding.jpg', import.meta.url).href },
    ],
  },
  {
    id: 'uiux',
    label: 'UI / UX & Web Design',
    icon: '◈',
    headline: 'Interfaces people love to use',
    desc: 'Intuitive digital products and pixel-perfect websites — from wireframes and user research through to polished, developer-ready UI systems.',
    tags: ['Product Design', 'Design Systems', 'Web Design', 'Prototyping'],
    worksLink: '/works?category=UI+%2F+UX+%26+Web+Design',
    works: [
      { title: 'UI / UX Design', type: 'Web Design', img: new URL('./imports/Frame-01.jpg', import.meta.url).href },
      { title: 'UI / UX Design', type: 'Web Design', img: new URL('./imports/Frame-02.jpg', import.meta.url).href },
      { title: 'UI / UX Design', type: 'Web Design', img: new URL('./imports/Frame-03.jpg', import.meta.url).href },
      { title: 'UI / UX Design', type: 'Web Design', img: new URL('./imports/Frame-04.jpg', import.meta.url).href },
    ],
  },
  {
    id: 'video',
    label: 'Video Editing',
    icon: '▶',
    headline: 'Motion with meaning',
    desc: 'Brand films and short-form social reels edited with narrative intent — colour, pacing, and motion graphics working together to tell your story.',
    tags: ['Brand Films', 'Social Reels', 'YouTube', 'Color Grading'],
    worksLink: '/works?category=Video+Editing',
    works: [
      { title: 'Video Edit', type: 'Full Video', img: `https://img.youtube.com/vi/jMQKxVwsaH0/maxresdefault.jpg` },
      { title: 'Reel #1', type: 'YouTube Short', img: `https://img.youtube.com/vi/z6lmOjpH4Fo/maxresdefault.jpg` },
      { title: 'Reel #2', type: 'YouTube Short', img: `https://img.youtube.com/vi/5K_TYT9x4eU/maxresdefault.jpg` },
      { title: 'Reel #3', type: 'YouTube Short', img: `https://img.youtube.com/vi/dYUZihZN4Bo/maxresdefault.jpg` },
    ],
  },
  {
    id: 'graphic',
    label: 'Graphic Design',
    icon: '▣',
    headline: 'Print and digital, done right',
    desc: 'Social content, YouTube creatives, sports apparel and more — we design across every medium with the same obsession, whether it lives on paper or a screen.',
    tags: ['Social Media', 'YouTube Creatives', 'Jersey Design', 'Content Design'],
    worksLink: '/works?category=Graphic+Design',
    works: [
      { title: 'Social Media Campaign', type: 'Content Design', img: new URL('./imports/03-Social_Media-1-2.jpg', import.meta.url).href },
      { title: 'YouTube Creatives', type: 'Thumbnails & Banners', img: new URL('./imports/04-Youtube-Creatives-1-1.jpg', import.meta.url).href },
      { title: 'Jersey Design', type: 'Sports Apparel', img: new URL('./imports/05-Jersey-Design-1.jpg', import.meta.url).href },
      { title: 'Social Media Series', type: 'Campaign Design', img: new URL('./imports/03-Social-Media-03-2.jpg', import.meta.url).href },
    ],
  },
  {
    id: 'packaging',
    label: 'Packaging Design',
    icon: '◎',
    headline: 'Packaging that sells itself',
    desc: 'Shelf presence is everything. Structural thinking meets surface craft — from concept through print-ready files that look as good in hand as on screen.',
    tags: ['Structural Design', 'Label Design', 'Print Production', 'Retail Packaging'],
    worksLink: '/works?category=Packaging+Design',
    works: [
      { title: 'Packaging Design', type: 'Beauty Packaging', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=420&fit=crop&auto=format' },
      { title: 'Packaging Design', type: 'Food & Beverage', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=420&fit=crop&auto=format' },
      { title: 'Packaging Design', type: 'Luxury Packaging', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=420&fit=crop&auto=format' },
      { title: 'Packaging Design', type: 'Health & Wellness', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&h=420&fit=crop&auto=format' },
    ],
  },
]

function WhatWeDo() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const tab = WHAT_WE_DO[active]

  const switchTab = (i: number) => {
    if (i === active) return
    setActive(i)
    setAnimKey(k => k + 1)
  }

  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.28)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel>What we do</SectionLabel>
          <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', marginTop: 20, lineHeight: 1.05 }}>
            Every service,{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>obsessively</em>
            {' '}crafted
          </h2>
        </div>

        {/* Tab strip */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56, padding: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 }}>
          {WHAT_WE_DO.map((t, i) => (
            <button
              key={t.id}
              onClick={() => switchTab(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                background: active === i ? '#FF9A3C' : 'transparent',
                color: active === i ? '#fff' : 'rgba(255,255,255,0.45)',
                transition: 'all 0.22s ease',
                letterSpacing: active === i ? '-0.01em' : '0',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          key={animKey}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48,
            alignItems: 'start',
            animation: 'fadeSlideIn 0.35s ease',
          }}
          className="whatwedo-grid"
        >
          {/* Left: description */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ fontSize: 36, marginBottom: 20, color: '#FF9A3C' }}>{tab.icon}</div>
            <h3 style={{ fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
              {tab.headline}
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 28, fontWeight: 400 }}>
              {tab.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {tab.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100,
                  padding: '5px 14px',
                }}>{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={tab.worksLink} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 700, color: '#0A0000',
                background: '#FF9A3C', borderRadius: 100,
                padding: '12px 24px', textDecoration: 'none',
              }}>
                View all {tab.label} ↗
              </Link>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
                padding: '12px 24px', textDecoration: 'none',
              }}>
                Start a project
              </a>
            </div>
          </div>

          {/* Right: work grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {tab.works.map((w, i) => (
              <WorkItem key={i} work={w} link={tab.worksLink} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 860px) {
          .whatwedo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function WorkItem({ work, link, index }: { work: { title: string; type: string; img: string }; link: string; index: number }) {
  const [hov, setHov] = useState(false)

  return (
    <Link
      to={link}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${hov ? 'rgba(255,154,60,0.35)' : 'rgba(255,255,255,0.07)'}`,
        cursor: 'pointer', position: 'relative',
        background: '#111',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'transform 0.3s ease, border-color 0.25s',
        animationDelay: `${index * 60}ms`,
        animation: 'fadeSlideIn 0.4s ease both',
        display: 'block', textDecoration: 'none',
      }}
    >
      {/* Image */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img
          src={work.img}
          alt={work.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s ease, filter 0.3s',
            transform: hov ? 'scale(1.07)' : 'scale(1)',
            filter: hov ? 'brightness(0.5)' : 'brightness(0.8)',
          }}
        />
        {/* Type pill */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 100, padding: '4px 12px',
          fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em',
        }}>
          {work.type.toUpperCase()}
        </div>
        {/* View icon on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hov ? 1 : 0, transition: 'opacity 0.25s',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#FF9A3C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#0A0000', fontWeight: 700,
          }}>↗</div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{work.title}</div>
        <span style={{ fontSize: 11, color: hov ? '#FF9A3C' : 'rgba(255,255,255,0.3)', transition: 'color 0.2s', fontWeight: 600 }}>View →</span>
      </div>
    </Link>
  )
}

// ─── WhyChooseUs ─────────────────────────────────────────────────────────────

const WHY_REASONS = [
  {
    icon: '⚡',
    title: '24–48h turnaround',
    desc: 'No waiting weeks for a first draft. We move at the speed of your business — fast iterations, real momentum.',
    metric: '48h',
    metricLabel: 'avg. first draft',
  },
  {
    icon: '∞',
    title: 'Unlimited revisions',
    desc: "We don't stop until it's right. No revision caps, no passive-aggressive extra charges — just honest iteration.",
    metric: '∞',
    metricLabel: 'revision rounds',
  },
  {
    icon: '◎',
    title: 'Expertise, always',
    desc: 'Your work never gets handed to a junior. Every brief is handled by experienced, senior-level creative talent.',
    metric: '5+',
    metricLabel: 'yrs avg. experience',
  },
  {
    icon: '✦',
    title: 'Strategy-first thinking',
    desc: "Pretty doesn't cut it. We root every design decision in brand strategy and business outcomes, not just aesthetics.",
    metric: '100%',
    metricLabel: 'strategy-backed',
  },
  {
    icon: '◈',
    title: 'Dedicated Slack channel',
    desc: 'Direct access to your design team — no account managers, no ticketing systems, no delays. Just fast answers.',
    metric: '<2h',
    metricLabel: 'avg. response time',
  },
  {
    icon: '▶',
    title: 'Pause or cancel anytime',
    desc: "Life changes. So can your plan. Pause when you're quiet, cancel when you're done — no questions, no penalties.",
    metric: '0',
    metricLabel: 'lock-in contracts',
  },
]

function WhyChooseUs() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'transparent', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(255,154,60,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 72 }} className="why-header">
          <div>
            <SectionLabel>Why choose us</SectionLabel>
            <h2 style={{ fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginTop: 20 }}>
              The agency that{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>actually</em>
              <br />delivers.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontWeight: 400, marginBottom: 28 }}>
              We've been chosen over bigger agencies, cheaper freelancers, and in-house hires — not by accident, but because we've built a model that removes every excuse for bad design.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex' }}>
                {['photo-1494790108755-2616b612b786', 'photo-1507003211169-0a1dd7228f2d', 'photo-1438761681033-6461ffad8d80'].map((id, i) => (
                  <img key={id} src={`https://images.unsplash.com/${id}?w=48&h=48&fit=crop&auto=format`} alt=""
                    style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #0A0000', marginLeft: i === 0 ? 0 : -10, objectFit: 'cover' }} />
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 3 }}><Stars count={5} size={12} /></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>4.9 from 140+ clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reasons grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }} className="why-grid">
          {WHY_REASONS.map((r, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: '40px 36px',
                border: '1px solid',
                borderColor: hoveredIdx === i ? 'rgba(255,154,60,0.25)' : 'rgba(255,255,255,0.06)',
                background: hoveredIdx === i ? 'rgba(255,154,60,0.04)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost metric */}
              <div style={{
                position: 'absolute', bottom: -12, right: 16,
                fontSize: 72, fontWeight: 900, letterSpacing: '-0.05em',
                color: hoveredIdx === i ? 'rgba(255,154,60,0.07)' : 'rgba(255,255,255,0.03)',
                lineHeight: 1, userSelect: 'none', transition: 'color 0.3s',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {r.metric}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: 22, marginBottom: 20,
                color: hoveredIdx === i ? '#FF9A3C' : 'rgba(255,255,255,0.25)',
                transition: 'color 0.3s',
              }}>{r.icon}</div>

              {/* Metric badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'baseline', gap: 6, marginBottom: 16,
                background: hoveredIdx === i ? 'rgba(255,154,60,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hoveredIdx === i ? 'rgba(255,154,60,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 100, padding: '5px 14px',
                transition: 'all 0.3s',
              }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: hoveredIdx === i ? '#FF9A3C' : 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em' }}>{r.metric}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{r.metricLabel}</span>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 400 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div style={{
          marginTop: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
          background: '#FF9A3C',
          padding: '32px 40px',
          borderRadius: '0 0 16px 16px',
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>
              Still deciding? Let's talk.
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.55)', fontWeight: 400 }}>
              Book a free 30-minute discovery call — no pitch, just honest conversation.
            </div>
          </div>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 700, color: '#FF9A3C',
            background: 'transparent', borderRadius: 100,
            padding: '13px 28px', textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Book a free call ↗
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: 'transparent', position: 'relative' }}>
      <GlassBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <SharedNav />
      <Hero />
      <Clients />
      <Stats />
      <Services />
      <Work />
      <VideoShowcase />
      <WhatWeDo />
      <WhyChooseUs />
      <Testimonials />
      <SkillsMarquee />
      <Pricing />
      <WhyPixelBaya />
      <TrustedBy />
      <HomeFAQ />
      <Contact />
      <SiteFooter />
      </div>
    </div>
  )
}
