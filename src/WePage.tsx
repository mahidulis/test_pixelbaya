import { useState } from 'react'
import { Link } from 'react-router'
import { PageShell, usePageEnter } from './SharedLayout'
import imgMahidul from './imports/Mahidul.jpg'
import imgSafi from './imports/Safi.jpg'
import imgAraf from './imports/Araf.jpg'
import imgProtik from './imports/Protik.jpg'
import imgTahsin from './imports/Tahsin.jpg'
import imgToufiq from './imports/Toufiq.jpg'

const TEAM = [
  {
    name: 'Mohammad Mahidul Islam',
    role: 'Creative & Brand Designer',
    bio: "Named after the baya weaver's golden crown — Mahidul leads with instinct, precision, and an eye no brief can fully capture. 5 years shaping brands across Asia and Europe.",
    img: imgMahidul,
    tag: 'Founder',
  },
  {
    name: 'Shafayet Hasan Safi',
    role: 'Managing Director',
    bio: 'Safi turns ambiguity into clarity — he architects the thinking that makes our work last.',
    img: imgSafi,
    tag: 'Strategy',
  },
  {
    name: 'Akber Ahmed Araf',
    role: 'Head of UI / UX',
    bio: "Araf designs systems that feel inevitable — bringing product discipline to every interface we ship.",
    img: imgAraf,
    tag: 'Product',
  },
  {
    name: 'Protik Halder',
    role: 'Motion & Video Director',
    bio: 'Protik approaches every frame as a painting — bringing narrative weight to brand films and motion work.',
    img: imgProtik,
    tag: 'Film',
  },
  {
    name: 'Tahsin Ahsan',
    role: 'Video Editor',
    bio: 'Tahsin treats editing as a storytelling art form, shaping raw footage with rhythmic precision and emotional clarity.',
    img: imgTahsin,
    tag: 'Film',
  },
  {
    name: 'Tufiqul Islam',
    role: 'Graphic Designer',
    bio: 'Tufiqul brings visual rigour to every graphic asset — from campaign artwork to editorial illustration.',
    img: imgToufiq,
    tag: 'Design',
  },
]

const VALUES = [
  {
    icon: '◎',
    title: 'Obsessive craft',
    desc: 'We care about the things most people don\'t see — the kerning, the frame transition, the weight of a paper stock. Craft is non-negotiable.',
  },
  {
    icon: '◈',
    title: 'Strategic first',
    desc: 'Beautiful isn\'t enough. Every design decision traces back to a business outcome. We think before we make.',
  },
  {
    icon: '▶',
    title: 'Radical speed',
    desc: 'We move faster than agencies our size should. Not by cutting corners — by eliminating meetings, alignment theatre, and anything that doesn\'t serve the work.',
  },
  {
    icon: '✦',
    title: 'Long-term partners',
    desc: 'We measure success in years, not invoices. Our best clients have been with us since year one.',
  },
]

const CULTURE_STATS = [
  { value: '94%', label: 'of clients return for a second project' },
  { value: '5yrs', label: 'average team tenure' },
  { value: '3', label: 'time zones, one studio culture' },
  { value: '0', label: 'hierarchy — everyone talks to everyone' },
]

const OPEN_ROLES = [
  { title: 'Senior Brand Designer', type: 'Full-time · Remote', dept: 'Design' },
  { title: 'Motion Designer', type: 'Contract · Remote', dept: 'Film' },
  { title: 'UX Researcher', type: 'Full-time · Singapore', dept: 'Product' },
]

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: 'hidden',
        background: hov ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov ? 'rgba(255,154,60,0.30)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.35s',
        transform: hov ? 'translateY(-4px)' : 'none',
        cursor: 'default',
        opacity: 1,
        animation: `fadeUp 0.6s ${index * 0.08}s both`,
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
        <img src={member.img} alt={member.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.55s ease',
          filter: 'grayscale(20%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(10,0,0,0.85) 100%)',
        }} />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: '#0A0000', background: '#FF9A3C',
          borderRadius: 100, padding: '3px 10px',
        }}>{member.tag.toUpperCase()}</span>
      </div>
      <div style={{ padding: '20px 22px 24px' }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 3 }}>{member.name}</div>
        <div style={{ fontSize: 12, color: '#FF9A3C', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 12 }}>{member.role}</div>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{member.bio}</p>
      </div>
    </div>
  )
}

export default function WePage() {
  const visible = usePageEnter()

  return (
    <PageShell>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
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
        }}>✦ The Studio</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'end' }}>
          <h1 style={{
            fontSize: 'clamp(52px,8vw,104px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0,
          }}>
            We are<br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>
              builders.
            </span>
          </h1>
          <div>
            <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>
              Like the baya weaver — nature's most meticulous architect — we build things that last. Pixel by pixel, straw by straw. A team of six obsessives who believe great design changes how businesses are perceived, and how people feel.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {CULTURE_STATS.slice(0, 2).map(s => (
                <div key={s.value}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#FF9A3C', letterSpacing: '-0.03em' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
              The{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>six</em>
              {' '}of us
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', maxWidth: 320, margin: 0 }}>
              Small by design. Every person here is someone you'd actually work with — no account managers, no layers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.24)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              What we{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>believe</em>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 440, margin: '0 auto' }}>
              The principles that shape every decision, hire, and client relationship.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{
                padding: '36px 32px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'background 0.3s',
              }}>
                <div style={{ fontSize: 24, color: '#FF9A3C', marginBottom: 18 }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: '#fff' }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture stats ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {CULTURE_STATS.map((s, i) => (
            <div key={i} style={{ borderLeft: '2px solid rgba(255,154,60,0.4)', paddingLeft: 24 }}>
              <div style={{ fontSize: 'clamp(36px,4vw,52px)', fontWeight: 900, color: '#FF9A3C', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open roles ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,60px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
              Join{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>the nest</em>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', maxWidth: 300, margin: 0 }}>
              We hire rarely and deliberately. When we do, it's for keeps.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {OPEN_ROLES.map((role, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
                padding: '24px 28px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: i === 0 ? '12px 12px 0 0' : i === OPEN_ROLES.length - 1 ? '0 0 12px 12px' : '0',
                transition: 'background 0.2s, border-color 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,154,60,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,154,60,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{role.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{role.type}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: '#FF9A3C', background: 'rgba(255,154,60,0.12)', borderRadius: 100, padding: '4px 12px' }}>{role.dept}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>→</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
            Don't see your role? <Link to="/#contact" style={{ color: '#FF9A3C', textDecoration: 'none' }}>Send us your work anyway.</Link>
          </p>
        </div>
      </section>
    </PageShell>
  )
}
