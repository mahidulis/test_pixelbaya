import { useState, useEffect, useRef } from 'react'

const REVIEWS = [
  {
    quote: "Fantastic experience working with Pixel Baya. They did more homework than I expected and actually studied details related to a whole new industry. Super professional, sleek, and fresh design output.",
    name: 'Rifah Tasfia',
    role: 'Product Consultant @ Carbobon',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "Amazing experience! The Pixel Baya team is experienced, diligent, and follows a solid process from research to delivery. They handled our redesign perfectly. Truly a standout agency globally.",
    name: 'Erfanul Hoque',
    role: 'Founder @ Renergy Technologies',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "I've worked with Pixel Baya on three websites and they've been nothing but exceptional. Design is top-notch, communication is always smooth. A true 10/10 partner for all things design.",
    name: 'Austin Reed',
    role: 'CEO @ Clarity LLC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "Working with Pixel Baya was an excellent experience. They were patient, attentive to feedback, and delivered clean, consistent, high-quality work. We're proud of the results.",
    name: 'Sofia Gouveia',
    role: 'Design Director @ Esdiac',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "They go the extra mile to make sure we get the best outcome. Incredible at addressing any challenge. I wholeheartedly recommend them to anyone serious about design.",
    name: 'Ted Nash',
    role: 'Founder & CTO @ Stackline',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "Pixel Baya completely transformed how we think about our brand. Within days they delivered concepts that felt exactly right — strategic, refined, and ready to scale. Best design investment we've made.",
    name: 'Priya Mehta',
    role: 'CMO @ Luma Health',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "The attention to detail in every screen and every edge case was remarkable. We shipped on time, on budget, and our users noticed immediately. A partner you can trust.",
    name: 'Marcus Obi',
    role: 'CPO @ Vela Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "We came to Pixel Baya with a vague brief and walked away with a brand identity that felt inevitable. The process was structured, collaborative, and fast. Our investors noticed before we told them.",
    name: 'Leila Osman',
    role: 'Co-founder @ Arc Ventures',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "The best creative team we've worked with. They pushed back on our bad ideas respectfully, brought their own vision, and the outcome is something we genuinely love showing off.",
    name: 'James Kato',
    role: 'Head of Brand @ Raycast',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "Pixel Baya's branding work gave us confidence walking into investor meetings. The visual identity communicated credibility and vision before we even said a word. Exceptional work.",
    name: 'Dana Hu',
    role: 'CEO @ Northlight AI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "Quick, reliable, and genuinely talented. Tight deadline for our product launch and Pixel Baya delivered everything on time without cutting corners. The output quality was outstanding.",
    name: 'Ryan Mercer',
    role: 'Product Lead @ Linear',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&auto=format',
  },
  {
    quote: "They took our chaotic brand and turned it into something cohesive, modern, and instantly recognisable. The guidelines they delivered are so thorough our whole team uses them without questions.",
    name: 'Amara Singh',
    role: 'Brand Manager @ Framer',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&auto=format',
  },
]

const ROW_A = [...REVIEWS.slice(0, 4), ...REVIEWS.slice(0, 4)]
const ROW_B = [...REVIEWS.slice(4, 8), ...REVIEWS.slice(4, 8)]
const ROW_C = [...REVIEWS.slice(8, 12), ...REVIEWS.slice(8, 12)]

type R = typeof REVIEWS[0]

function Card({ r }: { r: R }) {
  return (
    <div style={{
      minWidth: 340, maxWidth: 340, flexShrink: 0,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16, padding: '24px 24px 20px',
      userSelect: 'text',
    }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
        {[0,1,2,3,4].map(i => <span key={i} style={{ color: '#D4930A', fontSize: 12 }}>★</span>)}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', fontWeight: 400, margin: '0 0 20px' }}>
        "{r.quote}"
      </p>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 18 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <img src={r.avatar} alt={r.name}
          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{r.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{r.role}</div>
        </div>
      </div>
    </div>
  )
}

function Row({ cards, animName, duration, paused, onClick }: {
  cards: R[]
  animName: string
  duration: number
  paused: boolean
  onClick: () => void
}) {
  const doubled = [...cards, ...cards]
  return (
    <div onClick={onClick} style={{ position: 'relative', cursor: 'pointer' }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 16, width: 'max-content', padding: '8px 0',
          animationName: animName,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}>
          {doubled.map((r, i) => <Card key={i} r={r} />)}
        </div>
      </div>
    </div>
  )
}

export default function TrustedBy() {
  const [paused, setPaused] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const click = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setPaused(p => {
      if (p === i) {
        return null
      }
      timerRef.current = setTimeout(() => setPaused(null), 30000)
      return i
    })
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.28)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
            padding: '6px 16px', fontSize: 12, fontWeight: 500,
            color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', marginBottom: 28,
          }}>✦ Referral From People</span>
          <h2 style={{ fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>
            Trusted by People
          </h2>
          <h2 style={{ fontSize: 'clamp(36px,6vw,80px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.05, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#D4930A', margin: '4px 0 0' }}>
            Chosen By Brands
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Row cards={ROW_A} animName="row-left" duration={60} paused={paused === 0} onClick={() => click(0)} />
          <Row cards={ROW_B} animName="row-right" duration={72} paused={paused === 1} onClick={() => click(1)} />
          <Row cards={ROW_C} animName="row-left" duration={66} paused={paused === 2} onClick={() => click(2)} />
        </div>
      </div>

      <style>{`
        @keyframes row-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes row-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  )
}
