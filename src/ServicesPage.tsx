import { useState } from 'react'
import { Link } from 'react-router'
import { PageShell, usePageEnter } from './SharedLayout'

const SERVICES_DETAIL = [
  {
    id: 'brand',
    icon: '✦',
    title: 'Brand Identity',
    subtitle: 'Make your brand impossible to forget.',
    worksCategory: 'Brand Identity',
    color: 'rgba(212,147,10,0.12)',
    border: 'rgba(212,147,10,0.25)',
    desc: 'A brand is more than a logo. It is the total impression a business leaves on the world — every touchpoint, every word, every colour choice. We build complete identity systems that scale with your ambition.',
    includes: [
      'Logomark + logotype + symbol variants',
      'Full colour system (primary, secondary, neutrals)',
      'Typography hierarchy and custom font selection',
      'Brand voice and tone guidelines',
      'Business card, letterhead, and stationery',
      'Social media templates (12 formats)',
      'Brand book (40–80 pages)',
      'Brand motion principles',
    ],
    ideal: 'Startups raising a seed round, established companies repositioning, or new product lines that need their own identity.',
    timeline: '2–3 weeks',
    deliverable: 'Production-ready files + Brand book PDF',
    stat: '84% avg brand recall lift',
  },
  {
    id: 'uiux',
    icon: '◈',
    title: 'UI / UX Design',
    subtitle: 'Interfaces users actually want to use.',
    worksCategory: 'UI / UX Design',
    color: 'rgba(146,69,15,0.10)',
    border: 'rgba(146,69,15,0.22)',
    desc: 'Product design that balances beauty and function. We combine rigorous user research with pixel-perfect craft — delivering designs that reduce churn, increase retention, and make engineers proud to build.',
    includes: [
      'UX audit and heuristic evaluation',
      'User research and journey mapping',
      'Information architecture',
      'Wireframes and low-fi flows',
      'High-fidelity UI screens (all states)',
      'Interactive Figma prototype',
      'Design system + component library',
      'Developer handoff documentation',
    ],
    ideal: 'SaaS products, mobile apps, dashboards, and any digital product that needs to convert better and retain longer.',
    timeline: '3–5 weeks',
    deliverable: 'Figma design system + clickable prototype',
    stat: '+36% avg user retention',
  },
  {
    id: 'graphic',
    icon: '▣',
    title: 'Graphic Design',
    subtitle: 'Print and digital that converts.',
    worksCategory: 'Graphic Design',
    color: 'rgba(180,130,40,0.10)',
    border: 'rgba(180,130,40,0.22)',
    desc: 'From editorial layouts and pitch decks to campaign posters and annual reports — graphic design is how brands communicate at scale. We bring the same strategic thinking to print that we bring to digital.',
    includes: [
      'Campaign identity and art direction',
      'Annual report / editorial layout',
      'Pitch deck design (up to 40 slides)',
      'Poster and outdoor advertising',
      'Brochures, lookbooks, catalogues',
      'Digital banner sets (all sizes)',
      'Email template design',
      'Print-production-ready files',
    ],
    ideal: 'Agencies, publishers, event companies, and brands running campaigns that need to look as good in print as on screen.',
    timeline: '1–2 weeks',
    deliverable: 'Print-ready + web-optimised files',
    stat: '+220% avg CTR on campaigns',
  },
  {
    id: 'video',
    icon: '▶',
    title: 'Video Editing',
    subtitle: 'Films that move people, then markets.',
    worksCategory: 'Video Editing',
    color: 'rgba(100,58,6,0.14)',
    border: 'rgba(146,69,15,0.20)',
    desc: 'Raw footage is just raw potential. We shape it into stories — cinematic brand films, snappy social reels, product explainers, and documentary-style content that earns attention rather than demanding it.',
    includes: [
      'Offline edit and story structure',
      'Cinematic colour grading',
      'Motion graphics and lower thirds',
      'Sound design and audio mix',
      'Original score (selected projects)',
      'Subtitles and accessibility captions',
      'Multi-format export (web, social, broadcast)',
      'Up to 2 revision rounds',
    ],
    ideal: 'Brands launching campaigns, startups building awareness, creators who need professional post-production.',
    timeline: '1–3 weeks per project',
    deliverable: 'Master file + platform-optimised exports',
    stat: '2.4M avg views on brand films',
  },
  {
    id: 'social',
    icon: '◉',
    title: 'Social Media Design',
    subtitle: 'Content that stops the scroll.',
    worksCategory: 'Graphic Design',
    color: 'rgba(180,80,200,0.08)',
    border: 'rgba(180,80,200,0.20)',
    desc: 'Social media is the most competitive real estate on the planet — every post competes with thousands of others for a fraction of a second of attention. We design ads, posts, and creative sets that earn that fraction, then convert it.',
    includes: [
      'Instagram feed posts & carousels',
      'Instagram & Facebook ads (all placements)',
      'LinkedIn posts, banners & sponsored content',
      'X (Twitter) creative cards & headers',
      'YouTube thumbnails & channel art',
      'Reels & Shorts cover frames',
      'Story and highlight cover sets',
      'Campaign-consistent creative system',
    ],
    ideal: 'Brands running paid social campaigns, content creators scaling output, and businesses that want their social presence to look as polished as their product.',
    timeline: '3–7 days per batch',
    deliverable: 'Platform-ready files + editable templates',
    stat: '+3.2× avg engagement rate',
  },
  {
    id: 'packaging',
    icon: '◎',
    title: 'Packaging Design',
    subtitle: 'The shelf is the first sales pitch.',
    worksCategory: 'Packaging',
    color: 'rgba(232,192,107,0.08)',
    border: 'rgba(232,192,107,0.18)',
    desc: 'Packaging is the only medium that reaches the customer at the exact moment of purchase. We design structural and surface packaging that stops shoppers, communicates value instantly, and survives production.',
    includes: [
      'Structural dieline design and engineering',
      'Surface artwork and typography',
      'Material and finish specification',
      'Unboxing experience design',
      'Range coherence across multiple SKUs',
      'Sustainability material guidance',
      'Print-production liaison',
      '3D mockups for presentation',
    ],
    ideal: 'D2C brands, FMCG companies, artisan producers, and any product that lives on a shelf — physical or digital.',
    timeline: '2–4 weeks',
    deliverable: 'Dielines + print-ready artwork + 3D mockups',
    stat: '+58% avg sales uplift post-redesign',
  },
  {
    id: 'web',
    icon: '⬡',
    title: 'Web Design',
    subtitle: 'Sites that earn trust in the first scroll.',
    worksCategory: 'Web Design',
    color: 'rgba(212,147,10,0.08)',
    border: 'rgba(212,147,10,0.18)',
    desc: 'A website is your best salesperson — working 24/7, never off-message, always on brand. We design marketing sites, portfolio sites, and landing pages that convert visitors into customers.',
    includes: [
      'Sitemap and content architecture',
      'Desktop + mobile design (all pages)',
      'Interaction and scroll animation design',
      'CMS integration (Webflow, Framer, or Figma handoff)',
      'Performance and accessibility review',
      'SEO-ready page structure',
      'Launch-ready export or build handoff',
      '30-day post-launch support',
    ],
    ideal: 'Startups, agencies, and established businesses that need a site worthy of the company they\'ve become.',
    timeline: '2–4 weeks',
    deliverable: 'Live site or developer-ready Figma file',
    stat: '+2.8× avg lead conversion rate',
  },
]

function ServiceSection({ s, index }: { s: typeof SERVICES_DETAIL[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const isEven = index % 2 === 0

  return (
    <section style={{
      padding: 'clamp(60px,7vw,100px) clamp(20px,4vw,60px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: isEven ? 'transparent' : 'rgba(0,0,0,0.18)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'start',
        }}>
          {/* Left: header + meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{
                width: 48, height: 48, borderRadius: 12,
                background: s.color, border: `1px solid ${s.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: '#D4930A', flexShrink: 0,
              }}>{s.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 10px', lineHeight: 1.1 }}>
              {s.title}
            </h2>
            <p style={{ fontSize: 16, color: '#D4930A', fontWeight: 600, margin: '0 0 24px' }}>{s.subtitle}</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', margin: '0 0 32px' }}>{s.desc}</p>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { label: 'Timeline', value: s.timeline },
                { label: 'Deliverable', value: s.deliverable },
              ].map(m => (
                <div key={m.label} style={{ borderLeft: '2px solid rgba(212,147,10,0.35)', paddingLeft: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', marginBottom: 4 }}>{m.label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={`/works?category=${encodeURIComponent(s.worksCategory)}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 700, color: '#0D0A02',
                background: '#D4930A', borderRadius: 100, padding: '10px 22px',
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >See {s.title} work →</Link>
              <Link to="/pricing" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '10px 22px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,147,10,0.3)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >View pricing</Link>
            </div>
          </div>

          {/* Right: what's included + ideal for */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${s.border}`,
              borderRadius: 16, overflow: 'hidden',
            }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>WHAT'S INCLUDED</div>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {s.includes.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4930A', flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', marginBottom: 8 }}>IDEAL FOR</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>{s.ideal}</p>
                </div>
              </div>
              <div style={{
                padding: '14px 24px',
                background: 'rgba(212,147,10,0.08)',
                borderTop: '1px solid rgba(212,147,10,0.15)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 14 }}>✦</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#D4930A' }}>{s.stat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const visible = usePageEnter()

  return (
    <PageShell>
      {/* Hero */}
      <section style={{
        paddingTop: 'clamp(130px,16vw,200px)',
        paddingBottom: 'clamp(60px,8vw,90px)',
        paddingLeft: 'clamp(20px,4vw,60px)',
        paddingRight: 'clamp(20px,4vw,60px)',
        maxWidth: 1400, margin: '0 auto',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.6s, transform 0.6s',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
          padding: '6px 16px', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: 28,
        }}>✦ What We Do</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'end' }}>
          <h1 style={{
            fontSize: 'clamp(48px,7.5vw,100px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0,
          }}>
            Six ways<br />we{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#D4930A' }}>
              build.
            </em>
          </h1>
          <div>
            <p style={{ fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', margin: '0 0 32px' }}>
              Every service we offer exists because a client needed it and the market's existing options weren't good enough. We don't offer services we can't do exceptionally well.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {SERVICES_DETAIL.map(s => (
                <a key={s.id} href={`#${s.id}`} style={{
                  fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100,
                  padding: '6px 14px', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#D4930A'; e.currentTarget.style.borderColor = 'rgba(212,147,10,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                >{s.icon} {s.title}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service sections */}
      {SERVICES_DETAIL.map((s, i) => (
        <div key={s.id} id={s.id}>
          <ServiceSection s={s} index={i} />
        </div>
      ))}

      {/* CTA */}
      <section style={{
        padding: 'clamp(80px,10vw,120px) clamp(20px,4vw,60px)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>NOT SURE WHERE TO START?</p>
        <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 12px' }}>
          Tell us what you need.
        </h2>
        <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 400, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#D4930A', letterSpacing: '-0.03em', margin: '0 0 36px' }}>
          We'll figure it out together.
        </h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 15, fontWeight: 700, color: '#0D0A02',
            background: '#D4930A', borderRadius: 100, padding: '16px 40px',
            textDecoration: 'none',
          }}>Book a free call ↗</Link>
          <Link to="/pricing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '16px 40px',
            textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,147,10,0.4)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >See pricing →</Link>
        </div>
      </section>
    </PageShell>
  )
}
