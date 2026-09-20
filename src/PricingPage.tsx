import { useState } from 'react'
import { Link } from 'react-router'
import { PageShell, usePageEnter } from './SharedLayout'

type Tier = { name: string; price: string; note: string; popular?: boolean; features: string[] }
type Category = { id: string; label: string; icon: string; desc: string; tiers: Tier[] }

const PRICING: Category[] = [
  {
    id: 'brand',
    label: 'Brand Identity',
    icon: '✦',
    desc: 'From startup logo to full visual system — choose the scope that fits your stage.',
    tiers: [
      {
        name: 'Seed',
        price: '$349',
        note: 'Perfect for early-stage startups',
        features: [
          'Logomark + logotype (2 variants)',
          'Primary colour palette',
          'Typography guide (2 fonts)',
          'Business card design',
          'PDF brand one-pager',
          '5 social media templates',
          '1 revision round',
          'Files delivered in 7 days',
        ],
      },
      {
        name: 'Growth',
        price: '$699',
        note: 'Most popular for scaling brands',
        popular: true,
        features: [
          'Everything in Seed',
          'Full colour system + dark/light modes',
          'Custom typography selection',
          'Full stationery suite (6 items)',
          '20 social media templates',
          'Brand voice & tone guide',
          'Brand guidelines PDF (40 pages)',
          '3 revision rounds',
          'Files delivered in 14 days',
        ],
      },
      {
        name: 'Legacy',
        price: '$1,199',
        note: 'End-to-end brand overhaul',
        features: [
          'Everything in Growth',
          'Custom illustration or icon set',
          'Motion brand principles + 3 animations',
          'Photography art direction guide',
          'Packaging application design',
          'Brand book (80+ pages)',
          'Quarterly brand audit (1 year)',
          'Unlimited revisions during project',
          'Files delivered in 21 days',
        ],
      },
    ],
  },
  {
    id: 'uiux',
    label: 'UI / UX Design',
    icon: '◈',
    desc: 'Product design that drives retention, conversion, and user delight.',
    tiers: [
      {
        name: 'Audit',
        price: '$399',
        note: 'For products that need a second opinion',
        features: [
          'UX audit (up to 20 screens)',
          'Heuristic evaluation report',
          'Top-10 priority improvements',
          'Redesigned key screens (5)',
          'Annotated Figma file',
          '2 feedback sessions',
          'Delivered in 7 days',
        ],
      },
      {
        name: 'Build',
        price: '$799',
        note: 'Full product design from scratch',
        popular: true,
        features: [
          'User research (interviews + surveys)',
          'Journey mapping and IA',
          'Wireframes for all key flows',
          'High-fidelity UI (all screens + states)',
          'Interactive prototype',
          'Component library (50+ components)',
          'Design tokens (colour, spacing, type)',
          'Developer handoff in Figma',
          '3 revision rounds',
        ],
      },
      {
        name: 'Scale',
        price: '$1,299',
        note: 'End-to-end design system for growing teams',
        features: [
          'Everything in Build',
          'Full design system (200+ components)',
          'Accessibility audit (WCAG AA)',
          'Usability testing with real users',
          'Motion and animation guidelines',
          'Design ops documentation',
          'Team design workshop (2hrs)',
          'Monthly design review (3 months)',
          'Priority support channel',
        ],
      },
    ],
  },
  {
    id: 'video',
    label: 'Video Editing',
    icon: '▶',
    desc: 'Post-production for brands that want their content to earn attention.',
    tiers: [
      {
        name: 'Reel',
        price: '$299',
        note: 'Short-form and social content',
        features: [
          'Up to 60-second edit',
          'Basic colour grade',
          'Licensed music from library',
          'Subtitles / captions',
          'Social-format exports (3 sizes)',
          '1 revision round',
          'Delivered in 5 days',
        ],
      },
      {
        name: 'Film',
        price: '$549',
        note: 'Brand and campaign videos',
        popular: true,
        features: [
          '2–5 minute edit',
          'Cinematic colour grade',
          'Motion graphics and lower thirds',
          'Full sound design and audio mix',
          'Licensed music (premium library)',
          'Subtitles in 2 languages',
          'Multi-format exports (web + social)',
          '2 revision rounds',
          'Delivered in 10 days',
        ],
      },
      {
        name: 'Epic',
        price: '$899',
        note: 'Broadcast-quality production',
        features: [
          'Up to 20 minutes or multi-video series',
          'DI colour grading (broadcast standard)',
          'Custom motion graphics system',
          'Original score (commissioned)',
          'Full audio post-production',
          'Subtitle + translation (up to 5 languages)',
          'All formats including broadcast',
          'Unlimited revision rounds',
          'Production liaison + on-set support',
        ],
      },
    ],
  },
  {
    id: 'social',
    label: 'Social Media Design',
    icon: '◉',
    desc: 'Scroll-stopping creatives for every platform — ads, posts, stories, and full campaign sets.',
    tiers: [
      {
        name: 'Starter',
        price: '$249',
        note: 'Monthly content refresh',
        features: [
          '15 static post designs',
          '2 platforms (e.g. Instagram + LinkedIn)',
          'Feed posts & story variants',
          'Branded templates you can reuse',
          '1 concept direction',
          '2 revision rounds',
          'Delivered in 5 days',
        ],
      },
      {
        name: 'Campaign',
        price: '$449',
        note: 'Full paid social campaign',
        popular: true,
        features: [
          'Everything in Starter',
          '30 creatives across all formats',
          'All placements (feed, story, reel cover, ad)',
          'Up to 4 platforms',
          'A/B headline & visual variants',
          'Animated ad (GIF/MP4) — 2 versions',
          'Brand-consistent creative system',
          '5 revision rounds',
          'Delivered in 10 days',
        ],
      },
      {
        name: 'Retainer',
        price: '$699',
        note: 'Ongoing monthly creative partner',
        features: [
          'Everything in Campaign',
          '50+ creatives per month',
          'Unlimited platforms',
          'Weekly content batches',
          'Full ad creative strategy',
          'Monthly performance review & refresh',
          'Slack / WhatsApp direct access',
          'Unlimited revision rounds',
          'Priority 24hr turnaround',
        ],
      },
    ],
  },
  {
    id: 'packaging',
    label: 'Packaging Design',
    icon: '◎',
    desc: 'Packaging that turns first-time buyers into loyal customers.',
    tiers: [
      {
        name: 'Single',
        price: '$149',
        note: 'One product, done right',
        features: [
          'Single SKU packaging design',
          '2 concept directions',
          'Structural dieline (standard)',
          'Surface artwork + typography',
          'Material + finish recommendations',
          '3D mockup for presentation',
          '2 revision rounds',
          'Print-ready files in 10 days',
        ],
      },
      {
        name: 'Range',
        price: '$349',
        note: 'Cohesive range up to 6 SKUs',
        popular: true,
        features: [
          'Everything in Single',
          'Up to 6 SKU variations',
          'Range visual system and hierarchy',
          'Unboxing experience design',
          'Secondary packaging (outer box)',
          'Inserts and tissue paper design',
          'Sustainability material guidance',
          'Production liaison support',
          'Full print-ready file set',
        ],
      },
      {
        name: 'Empire',
        price: '$599',
        note: 'Full product line redesign',
        features: [
          'Everything in Range',
          'Unlimited SKUs',
          'Structural engineering consultation',
          'Retail shelf optimisation analysis',
          'Fragrance/flavour naming system',
          'Photography art direction',
          '12-month packaging system guide',
          'Print-run oversight',
          'Priority support (6 months)',
        ],
      },
    ],
  },
  {
    id: 'web',
    label: 'Web Design',
    icon: '⬡',
    desc: 'Websites that make your best pitch to every visitor, every time.',
    tiers: [
      {
        name: 'Launch',
        price: '$249',
        note: '5-page marketing site',
        features: [
          '5 page designs (desktop + mobile)',
          'Home, About, Services, Contact, +1',
          'Basic scroll animations',
          'Figma design file handoff',
          'SEO-ready page structure',
          '1 revision round',
          'Delivered in 10 days',
        ],
      },
      {
        name: 'Platform',
        price: '$549',
        note: 'Full marketing site with CMS',
        popular: true,
        features: [
          'Everything in Launch',
          'Up to 12 page designs',
          'CMS design (blog, case studies)',
          'Advanced interaction design',
          'Micro-animation library',
          'Webflow or Framer build included',
          'Contact form + integrations',
          '3 revision rounds',
          '30-day post-launch support',
        ],
      },
      {
        name: 'Empire',
        price: '$899',
        note: 'Enterprise site or web app',
        features: [
          'Everything in Platform',
          'Unlimited pages',
          'Custom web app or portal design',
          'Design system for dev team',
          'A/B testing layout variants',
          'Analytics dashboard design',
          'Multi-language design (up to 3)',
          'Performance + accessibility audit',
          '90-day ongoing design support',
        ],
      },
    ],
  },
]

type BillingKey = 'monthly' | 'quarterly' | 'annually'

const SUBSCRIPTION_PLANS: Record<BillingKey, { name: string; price: number; popular?: boolean; desc: string; features: string[] }[]> = {
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

const FAQS = [
  { q: 'Do you offer custom quotes?', a: "Yes — most of our projects are quoted individually based on scope, timeline, and complexity. The prices above are starting points. Book a call and we'll scope it together." },
  { q: "What's included in the revision rounds?", a: "Each revision round is a full feedback cycle — you share everything, we address it all at once. We don't charge per change within a round. Additional rounds can be added to any package." },
  { q: 'How does payment work?', a: "We take 50% upfront to begin, 50% on final delivery. For projects over $5,000 we offer milestone-based payment. We accept bank transfer, Wise, or Stripe." },
  { q: 'Can I start with a smaller package and upgrade?', a: 'Absolutely. Many clients start with a Seed brand package and upgrade to Growth six months later. We design everything to be extendable from the start.' },
  { q: 'What if I need multiple services?', a: 'We offer bundled pricing for multi-service projects. Brand Identity + Web Design together, for example, comes at a 15% reduction on combined price. Ask us about bundles.' },
  { q: 'Do you offer retainers?', a: 'Yes. Monthly retainers start at $2,500/month for up to 20 hours of design work across any service. Ideal for brands that need ongoing creative support without hiring in-house.' },
]

const sectionLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
  color: '#FF9A3C', textTransform: 'uppercase', marginBottom: 16,
}

const NEON = 'rgba(255,154,60,0.6) 0 0 0 1px, rgba(255,154,60,0.28) 0 0 28px, rgba(255,154,60,0.10) 0 0 80px'
const NEON_POP = 'rgba(255,154,60,0.8) 0 0 0 1px, rgba(255,154,60,0.40) 0 0 40px, rgba(255,154,60,0.15) 0 0 100px'

function TierCard({ tier }: { tier: Tier }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: 'hidden',
        background: tier.popular ? 'rgba(255,154,60,0.07)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov || tier.popular ? 'rgba(255,154,60,0.5)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hov ? (tier.popular ? NEON_POP : NEON) : tier.popular ? 'rgba(255,154,60,0.18) 0 0 40px' : 'none',
        transition: 'box-shadow 0.35s ease, border-color 0.3s ease, transform 0.3s ease',
        transform: hov ? 'translateY(-5px)' : 'none',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        height: '100%',
      }}
    >
      {tier.popular && (
        <div style={{
          position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
          background: '#FF9A3C', color: '#0A0000',
          fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
          padding: '4px 14px', borderRadius: '0 0 10px 10px', whiteSpace: 'nowrap',
        }}>MOST POPULAR</div>
      )}
      {/* ── Header block (fixed height) ── */}
      <div style={{ padding: '32px 24px 0', minHeight: 160 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#FF9A3C', letterSpacing: '0.1em', marginBottom: 12 }}>{tier.name.toUpperCase()}</div>
        <div style={{ fontSize: 'clamp(36px,4vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>
          {tier.price}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>starting from</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{tier.note}</div>
      </div>
      {/* ── CTA (always same vertical position) ── */}
      <div style={{ padding: '20px 24px' }}>
        <Link to="/#contact" style={{
          display: 'block', textAlign: 'center', padding: '13px',
          borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none',
          background: tier.popular ? '#FF9A3C' : 'rgba(255,255,255,0.07)',
          color: tier.popular ? '#0A0000' : '#fff',
          border: tier.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >Get started ↗</Link>
      </div>
      {/* ── Features (fills remaining height) ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px 28px', flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', marginBottom: 14 }}>INCLUDES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tier.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: '#FF9A3C', fontSize: 12, lineHeight: 1.6, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SubPlanCard({ plan, billing }: { plan: typeof SUBSCRIPTION_PLANS['monthly'][0]; billing: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${hov || plan.popular ? 'rgba(255,154,60,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: plan.popular ? 'rgba(255,154,60,0.07)' : 'rgba(255,255,255,0.02)',
        boxShadow: hov ? (plan.popular ? NEON_POP : NEON) : plan.popular ? 'rgba(255,154,60,0.18) 0 0 40px' : 'none',
        transition: 'box-shadow 0.35s ease, border-color 0.3s ease, transform 0.3s ease',
        transform: hov ? 'translateY(-5px)' : 'none',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        height: '100%',
      }}
    >
      {plan.popular && (
        <div style={{ position: 'absolute', top: -1, right: 24, background: '#FF9A3C', color: '#0A0000', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: '0 0 8px 8px', letterSpacing: '0.06em' }}>
          MOST POPULAR
        </div>
      )}
      {/* ── Header block (fixed height) ── */}
      <div style={{ padding: '32px 32px 0', minHeight: 180 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: plan.popular ? '#FF9A3C' : 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', marginBottom: 12 }}>{plan.name.toUpperCase()}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
          <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>${plan.price.toLocaleString()}</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/mo</span>
        </div>
        {billing !== 'monthly' && (
          <div style={{ fontSize: 12, color: '#FF9A3C', fontWeight: 600, marginBottom: 6 }}>
            Save {billing === 'quarterly' ? '15%' : '25%'} vs monthly
          </div>
        )}
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: '8px 0 0', fontWeight: 400 }}>{plan.desc}</p>
      </div>
      {/* ── Features (grows) ── */}
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
      {/* ── CTA pinned to bottom ── */}
      <div style={{ padding: '0 32px 32px' }}>
        <Link to="/#contact" style={{
          display: 'block', textAlign: 'center', padding: '13px', borderRadius: 10,
          fontSize: 13, fontWeight: 700, textDecoration: 'none',
          background: plan.popular ? '#FF9A3C' : 'rgba(255,255,255,0.07)',
          color: plan.popular ? '#0A0000' : '#fff',
          border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >Get started ↗</Link>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
        padding: '22px 0', textAlign: 'left', fontFamily: 'Inter, sans-serif',
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{q}</span>
        <span style={{ fontSize: 20, color: '#FF9A3C', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: '0 0 24px', paddingRight: 40 }}>{a}</p>
      </div>
    </div>
  )
}

const divider = (
  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 clamp(20px,4vw,60px)' }} />
)

export default function PricingPage() {
  const visible = usePageEnter()
  const [billing, setBilling] = useState<BillingKey>('monthly')
  const subPlans = SUBSCRIPTION_PLANS[billing]

  return (
    <PageShell>
      {/* Hero */}
      <section style={{
        paddingTop: 'clamp(130px,16vw,200px)',
        paddingBottom: 'clamp(40px,6vw,72px)',
        paddingLeft: 'clamp(20px,4vw,60px)',
        paddingRight: 'clamp(20px,4vw,60px)',
        textAlign: 'center',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.6s, transform 0.6s',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
          padding: '6px 16px', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: 28,
        }}>✦ Transparent Pricing</span>
        <h1 style={{
          fontSize: 'clamp(48px,8vw,100px)', fontWeight: 900,
          letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 24px',
        }}>
          Know what<br />
          <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>
            you'll pay.
          </em>
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          No surprises, no hourly creep. Pick a service, pick a tier, start building. Every package can be customised — book a call for a tailored quote.
        </p>
      </section>

      {/* ── Monthly subscription plans ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,60px)', background: 'rgba(0,0,0,0.22)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <p style={sectionLabel}>Subscription Plans</p>
              <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
                Simple,{' '}
                <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>transparent</em>
                {' '}pricing
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginTop: 10, marginBottom: 0 }}>Pause or cancel anytime. No lock-ins, no hidden fees.</p>
            </div>
            {/* Billing toggle */}
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 100, padding: 4, gap: 2 }}>
              {(['monthly', 'quarterly', 'annually'] as BillingKey[]).map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{
                  fontSize: 13, fontWeight: 600, padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
                  background: billing === b ? '#FF9A3C' : 'transparent',
                  color: billing === b ? '#0A0000' : 'rgba(255,255,255,0.4)',
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
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginLeft: 'clamp(-20px,-4vw,-60px)', marginRight: 'clamp(-20px,-4vw,-60px)', paddingLeft: 'clamp(20px,4vw,60px)', paddingRight: 'clamp(20px,4vw,60px)', paddingBottom: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(260px, 1fr))', gap: 16, alignItems: 'stretch', minWidth: 820 }}>
              {subPlans.map(plan => (
                <SubPlanCard key={plan.name} plan={plan} billing={billing} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Per-project categories ── */}
      {PRICING.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          style={{
            padding: 'clamp(56px,7vw,96px) clamp(20px,4vw,60px)',
            background: ci % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.18)',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <p style={sectionLabel}>{cat.icon} Per-project</p>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 10px' }}>
                {cat.label}
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{cat.desc}</p>
            </div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginLeft: 'clamp(-20px,-4vw,-60px)', marginRight: 'clamp(-20px,-4vw,-60px)', paddingLeft: 'clamp(20px,4vw,60px)', paddingRight: 'clamp(20px,4vw,60px)', paddingBottom: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(260px, 1fr))', gap: 20, alignItems: 'stretch', minWidth: 820 }}>
                {cat.tiers.map(tier => (
                  <TierCard key={tier.name} tier={tier} />
                ))}
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
              All prices in USD. Need something custom?{' '}
              <Link to="/#contact" style={{ color: '#FF9A3C', textDecoration: 'none' }}>Book a free scoping call.</Link>
            </p>
          </div>
        </section>
      ))}

      {divider}

      {/* Bundle callout */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,154,60,0.07)',
            border: '1px solid rgba(255,154,60,0.25)',
            borderRadius: 20, padding: 'clamp(32px,4vw,56px)',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#FF9A3C', letterSpacing: '0.1em', marginBottom: 12 }}>BUNDLE OFFER</div>
              <h3 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
                Need more than one service?
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.7, maxWidth: 500 }}>
                Combine Brand Identity + Web Design, or UI/UX + Video, or any two services and get <strong style={{ color: '#FF9A3C' }}>15% off the combined price</strong>. Multi-service projects also benefit from faster turnaround as we run streams in parallel.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Link to="/#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 14, fontWeight: 700, color: '#0A0000',
                background: '#FF9A3C', borderRadius: 100, padding: '14px 28px',
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}>Book a bundle call ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* FAQ */}
      <section style={{
        padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,60px)',
        background: 'rgba(0,0,0,0.18)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 48px' }}>
            Common{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#FF9A3C' }}>questions</em>
          </h2>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,4vw,60px)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 12px' }}>
          Still have questions?
        </h2>
        <h2 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#FF9A3C', letterSpacing: '-0.03em', margin: '0 0 36px' }}>
          Let's talk.
        </h2>
        <Link to="/#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: 15, fontWeight: 700, color: '#0A0000',
          background: '#FF9A3C', borderRadius: 100, padding: '16px 40px',
          textDecoration: 'none',
        }}>Book a free call ↗</Link>
      </section>
    </PageShell>
  )
}
