import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { PageShell, usePageEnter } from './SharedLayout'

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    duration: '1–2 days',
    desc: 'We start by listening — to you, your competitors, your customers, and your market. No assumptions, only evidence. This phase ends when we can articulate your challenge better than you can.',
    deliverables: ['Brand audit', 'Competitor mapping', 'Discovery session', 'Challenge statement'],
  },
  {
    num: '02',
    title: 'Strategy',
    duration: '2–3 days',
    desc: 'Strategy is the brief that designers execute from. We define positioning, voice, audience, and the one thing your brand needs to be known for. Every creative decision that follows is tested against this.',
    deliverables: ['Brand positioning', 'Audience personas', 'Creative direction', 'Moodboard'],
  },
  {
    num: '03',
    title: 'Design',
    duration: '5–10 days',
    desc: 'This is where craft lives. Iterative, rigorous, and always tied back to strategy. We work in focused sprints and share progress early — no "big reveal" surprises after three weeks of silence.',
    deliverables: ['Concepts (×3)', 'Refinement rounds', 'Motion principles', 'Production files'],
  },
  {
    num: '04',
    title: 'Deliver',
    duration: '1–2 days',
    desc: 'We hand over work that can actually be used — organised files, clear guidelines, and a handoff session so your team knows exactly what they have and how to use it.',
    deliverables: ['Brand guidelines', 'Asset library', 'Handoff session', '30-day support'],
  },
]

const TIMELINE = [
  { year: '2020', event: 'Studio founded in Brahmanbaria by Mohammad Mahidul Islam with three freelance projects and a rented desk.' },
  { year: '2021', event: 'First international client — a Sydney-based BuildHub startup. Remote-first by necessity, permanent by choice.' },
  { year: '2022', event: 'Team grows to five. Move into a shared studio space. Launch the Packaging Design practice.' },
  { year: '2023', event: 'Crossed 100 completed projects. Featured in It\'s Nice That and Communication Arts.' },
  { year: '2024', event: 'Added Video and Motion to core offerings. 94% client retention rate.' },
  { year: '2025', event: 'Rebrand to Pixelbaya — named after the baya weaver, the bird that inspired it all.' },
]

const AWARDS = [
  { name: 'Communication Arts', year: '2023', category: 'Design Annual — Brand Identity' },
  { name: 'D&AD', year: '2023', category: 'Wood Pencil — Digital Design' },
  { name: "It's Nice That", year: '2022', category: 'Studio Spotlight' },
  { name: 'Awwwards', year: '2024', category: 'Site of the Day × 3' },
  { name: 'The Drum', year: '2023', category: 'Best Branding Agency — APAC' },
]

const PRINCIPLES = [
  { title: 'Design is a business tool', body: 'Aesthetics without strategy is decoration. We create work that drives measurable outcomes — brand recall, conversion rates, user retention.' },
  { title: 'Speed is a craft skill', body: 'Moving fast isn\'t cutting corners. It\'s eliminating the waste that slows most agencies down — endless meetings, over-managed approvals, bloated teams.' },
  { title: 'Small is a superpower', body: 'When you work with us, you work with us. Not a junior who reports to a senior who reports to a director. Six people, full accountability.' },
  { title: 'Honesty over comfort', body: 'We\'ll tell you when a brief is wrong. We\'ll push back on a direction we don\'t believe in. That\'s not arrogance — it\'s what you\'re paying us for.' },
]

function ProcessStep({ step, index }: { step: typeof PROCESS_STEPS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 24,
          padding: '28px 0', textAlign: 'left',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,154,60,0.6)', letterSpacing: '0.08em', minWidth: 28 }}>{step.num}</span>
        <span style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', flex: 1 }}>{step.title}</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginRight: 24 }}>{step.duration}</span>
        <span style={{ fontSize: 18, color: '#FF9A3C', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', display: 'block' }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{ paddingBottom: 32, paddingLeft: 52, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{step.desc}</p>
          <div style={{ minWidth: 200 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>DELIVERABLES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {step.deliverables.map(d => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF9A3C', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const visible = usePageEnter()

  return (
    <PageShell>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        paddingTop: 'clamp(130px,16vw,200px)',
        paddingBottom: 'clamp(60px,8vw,100px)',
        paddingLeft: 'clamp(20px,4vw,60px)',
        paddingRight: 'clamp(20px,4vw,60px)',
        maxWidth: 1400, margin: '0 auto',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s, transform 0.7s',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
          padding: '6px 16px', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: 28,
        }}>✦ Our Story</span>
        <div style={{ maxWidth: 800 }}>
          <h1 style={{
            fontSize: 'clamp(48px,7.5vw,100px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 36px',
          }}>
            Design built{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>
              to last.
            </em>
          </h1>
          <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 640, margin: 0 }}>
            Pixelbaya was founded with one conviction: that most design agencies are optimising for the wrong things. We optimise for outcomes, not output. For client trust, not client management. For work that's still relevant in ten years.
          </p>
        </div>
      </section>

      {/* ── Principles ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.22)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 52px' }}>
            How we{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>think</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ animation: `fadeUp 0.6s ${i * 0.1}s both` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,154,60,0.6)', letterSpacing: '0.08em', marginBottom: 14 }}>0{i + 1}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
              Our{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>process</em>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', maxWidth: 300, margin: 0, textAlign: 'right' }}>
              From brief to handoff in 2–3 weeks. Every time.
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.22)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 52px' }}>
            Since{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>2020</em>
          </h2>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 1, background: 'rgba(255,154,60,0.25)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', animation: `fadeUp 0.5s ${i * 0.08}s both` }}>
                  <div style={{ position: 'absolute', left: -5, width: 10, height: 10, borderRadius: '50%', background: i === TIMELINE.length - 1 ? '#FF9A3C' : 'rgba(255,154,60,0.4)', marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FF9A3C', letterSpacing: '0.04em', marginBottom: 6 }}>{t.year}</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recognition ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 40px' }}>
            Recognition
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {AWARDS.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
                padding: '20px 28px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: i === 0 ? '12px 12px 0 0' : i === AWARDS.length - 1 ? '0 0 12px 12px' : 0,
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,154,60,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{a.name}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{a.category}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,154,60,0.7)', letterSpacing: '0.04em' }}>{a.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(80px,10vw,120px) clamp(20px,4vw,60px)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>READY?</p>
        <h2 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 12px' }}>
          Let's build something
        </h2>
        <h2 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 36px', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#FF9A3C' }}>
          worth remembering.
        </h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 15, fontWeight: 700, color: '#0A0000',
            background: '#FF9A3C', borderRadius: 100, padding: '16px 40px',
            textDecoration: 'none',
          }}>Book a free call ↗</Link>
          <Link to="/works" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '16px 40px',
            textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,154,60,0.4)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >See our work →</Link>
        </div>
      </section>
    </PageShell>
  )
}
