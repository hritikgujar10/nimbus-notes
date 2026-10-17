import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  AudioLines,
  Check,
  ChevronDown,
  Cloud,
  Globe,
  Lock,
  Play,
  Search,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { NavBar, Reveal, Segmented, Switch, Toast, spring } from './components/ui.jsx'
import { actions as initialActions, faqs, integrations, plans, summary, transcript } from './data.js'

function useTicker(length, ms) {
  const [n, setN] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v >= length + 2 ? 1 : v + 1)), ms)
    return () => clearInterval(t)
  }, [length, ms])
  return Math.min(n, length)
}

function Waveform({ bars = 5, color = 'currentColor' }) {
  return (
    <span className="wave" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{ background: color, animationDelay: `${i * 0.12}s` }} />
      ))}
    </span>
  )
}

function Phone() {
  const shown = useTicker(transcript.length, 1600)
  const [secs, setSecs] = useState(724)
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div className="phone" aria-label="Nimbus app transcribing a meeting live">
      <div className="island">
        <span className="island-dot" />
        <span className="num">
          {mm}:{ss}
        </span>
        <Waveform bars={4} color="var(--orange)" />
      </div>
      <div className="screen">
        <div className="status-bar">
          <span>9:41</span>
          <span className="status-icons">
            <span className="sig" /> <span className="batt" />
          </span>
        </div>
        <p className="screen-eyebrow">Live · Product sync</p>
        <h3 className="screen-title">Beta launch plan</h3>
        <div className="speakers">
          {['Maya', 'Dev', 'Sam'].map((n, i) => (
            <span key={n} className="speaker" style={{ background: ['var(--pink)', 'var(--blue)', 'var(--green)'][i] }}>
              {n[0]}
            </span>
          ))}
          <span className="t-foot muted">3 speakers</span>
        </div>
        <div className="lines">
          <AnimatePresence initial={false}>
            {transcript.slice(0, shown).map((l, i) => (
              <motion.div
                key={i}
                className="line"
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
              >
                <span className="line-who" style={{ color: l.color }}>
                  {l.who}
                </span>
                <span>{l.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="screen-bar glass">
          <Sparkles size={16} color="var(--indigo)" />
          <span className="grow">Ask about this meeting…</span>
          <span className="rec">
            <span />
          </span>
        </div>
      </div>
    </div>
  )
}

function Hero({ onCta }) {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.span className="badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Sparkles size={14} /> New: Live Activities on iOS 27
          </motion.span>
          <motion.h1
            className="t-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            Meetings in.
            <br />
            <span className="grad">Notes out.</span>
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Nimbus listens to your calls, writes the summary, assigns the follow-ups and files them where your team already works. No bots, no
            typing, no forgotten action items.
          </motion.p>
          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <button className="btn btn-filled" onClick={onCta}>
              Try Nimbus free <ArrowRight size={18} />
            </button>
            <a className="btn btn-gray" href="#demo">
              <Play size={16} fill="currentColor" /> See it work
            </a>
          </motion.div>
          <p className="t-foot muted hero-note">Free for 10 meetings a month · iPhone, iPad & Mac</p>
        </div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 60, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ ...spring, stiffness: 120, damping: 20, delay: 0.3 }}
        >
          <Phone />
          <motion.div
            className="float-card glass-strong"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, ...spring }}
          >
            <span className="list-icon" style={{ background: 'var(--green)' }}>
              <Check size={16} strokeWidth={3} />
            </span>
            <div>
              <p className="t-foot muted">Synced to Linear</p>
              <p className="t-sub" style={{ fontWeight: 600 }}>
                3 action items created
              </p>
            </div>
          </motion.div>
          <motion.div
            className="float-card glass-strong float-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, ...spring }}
          >
            <span className="list-icon" style={{ background: 'var(--indigo)' }}>
              <Sparkles size={16} />
            </span>
            <div>
              <p className="t-foot muted">Summary ready</p>
              <p className="t-sub" style={{ fontWeight: 600 }}>
                Saved you 24 minutes
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="marquee" aria-label="Works with">
        <div className="marquee-track">
          {[...integrations, ...integrations].map((n, i) => (
            <span key={i}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Demo() {
  const [tab, setTab] = useState('Summary')
  const [items, setItems] = useState(initialActions)
  const toggle = (id) => setItems((list) => list.map((a) => (a.id === id ? { ...a, done: !a.done } : a)))
  const left = items.filter((a) => !a.done).length

  return (
    <section className="section" id="demo">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="t-eyebrow">How it works</p>
          <h2 className="t-large">One meeting. Three things you actually need.</h2>
          <p className="lead">Tap through a real Nimbus note from a 32-minute product sync.</p>
        </Reveal>
        <Reveal className="demo card">
          <div className="demo-head">
            <div>
              <p className="t-foot muted">Today, 10:00 – 10:32 · Zoom</p>
              <h3 className="t-title2">Product sync: Beta launch plan</h3>
            </div>
            <Segmented options={['Summary', 'Action items', 'Transcript']} value={tab} onChange={setTab} label="Note view" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="demo-body"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {tab === 'Summary' && (
                <div className="summary">
                  <p className="t-headline">
                    <Sparkles size={16} color="var(--indigo)" style={{ verticalAlign: '-2px' }} /> Key decisions
                  </p>
                  <ul>
                    {summary.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="sentiment">
                    <div>
                      <span className="t-cap muted">TALK TIME</span>
                      <div className="talk">
                        <span style={{ width: '46%', background: 'var(--pink)' }} />
                        <span style={{ width: '34%', background: 'var(--blue)' }} />
                        <span style={{ width: '20%', background: 'var(--green)' }} />
                      </div>
                      <span className="t-foot muted">Maya 46% · Dev 34% · Sam 20%</span>
                    </div>
                    <div>
                      <span className="t-cap muted">MOOD</span>
                      <p className="t-headline">Focused, positive</p>
                    </div>
                  </div>
                </div>
              )}
              {tab === 'Action items' && (
                <div>
                  <p className="t-sub muted" style={{ marginBottom: 12 }}>
                    {left} of {items.length} remaining · tap to complete
                  </p>
                  <div className="list reminders">
                    {items.map((a) => (
                      <button key={a.id} className={`list-row plain todo ${a.done ? 'done' : ''}`} onClick={() => toggle(a.id)}>
                        <span className="check" aria-hidden>
                          <AnimatePresence>
                            {a.done && (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={spring}>
                                <Check size={13} strokeWidth={3.4} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                        <span className="grow todo-text">{a.text}</span>
                        <span className="badge">{a.owner}</span>
                        <span className="t-foot muted due">{a.due}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {tab === 'Transcript' && (
                <div className="transcript">
                  {transcript.map((l, i) => (
                    <div key={i} className="tx-line">
                      <span className="speaker" style={{ background: l.color }}>
                        {l.who[0]}
                      </span>
                      <div>
                        <p className="t-foot">
                          <strong>{l.who}</strong> <span className="muted num">10:{String(4 + i * 3).padStart(2, '0')}</span>
                        </p>
                        <p className="t-callout">{l.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

function Features() {
  const [onDevice, setOnDevice] = useState(true)
  const [autoDelete, setAutoDelete] = useState(true)
  const [redact, setRedact] = useState(false)

  return (
    <section className="section features" id="features">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="t-eyebrow">Features</p>
          <h2 className="t-large">Built like it came with your iPhone.</h2>
        </Reveal>
        <div className="bento">
          <Reveal className="tile tile-ask">
            <span className="list-icon" style={{ background: 'var(--indigo)' }}>
              <Search size={17} />
            </span>
            <h3 className="t-title2">Ask Nimbus</h3>
            <p className="t-callout muted">Search every meeting you have ever had in plain English.</p>
            <div className="ask">
              <div className="ask-q glass">What did we promise Acme about SSO?</div>
              <div className="ask-a">
                <Sparkles size={15} color="var(--indigo)" />
                <span>
                  In the <strong>Sep 28 Acme renewal</strong> call, Priya committed to SAML SSO by <strong>end of Q4</strong>, ahead of their
                  security review.
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal className="tile tile-live" delay={0.06}>
            <span className="list-icon" style={{ background: 'var(--orange)' }}>
              <AudioLines size={17} />
            </span>
            <h3 className="t-title2">Live Activities</h3>
            <p className="t-callout muted">Recording status and live captions on your Lock Screen and in the Dynamic Island.</p>
            <div className="lock-pill">
              <span className="island-dot" />
              <span className="grow">Design review</span>
              <span className="num">18:42</span>
              <Waveform color="var(--orange)" />
            </div>
          </Reveal>
          <Reveal className="tile tile-privacy" delay={0.1}>
            <span className="list-icon" style={{ background: 'var(--green)' }}>
              <Lock size={17} />
            </span>
            <h3 className="t-title2">Private by design</h3>
            <p className="t-callout muted">You decide what leaves your device.</p>
            <div className="list grouped">
              <label className="list-row plain">
                <span className="grow">On-device transcription</span>
                <Switch checked={onDevice} onChange={setOnDevice} label="On-device transcription" />
              </label>
              <label className="list-row plain">
                <span className="grow">Delete audio after 30 days</span>
                <Switch checked={autoDelete} onChange={setAutoDelete} label="Delete audio after 30 days" />
              </label>
              <label className="list-row plain">
                <span className="grow">Redact names & numbers</span>
                <Switch checked={redact} onChange={setRedact} label="Redact names and numbers" />
              </label>
            </div>
          </Reveal>
          <Reveal className="tile tile-small" delay={0.14}>
            <Users size={26} color="var(--blue)" />
            <h3 className="t-title3">Knows who said what</h3>
            <p className="t-sub muted">Speaker ID that learns voices after one meeting.</p>
          </Reveal>
          <Reveal className="tile tile-small" delay={0.18}>
            <Globe size={26} color="var(--teal)" />
            <h3 className="t-title3">40+ languages</h3>
            <p className="t-sub muted">Speak Hindi, get notes in English. Or the other way round.</p>
          </Reveal>
          <Reveal className="tile tile-small" delay={0.22}>
            <Zap size={26} color="var(--yellow)" />
            <h3 className="t-title3">Ready in 8 seconds</h3>
            <p className="t-sub muted">Summaries land before you have closed the call window.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Pricing({ onPick }) {
  const [cycle, setCycle] = useState('yearly')
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="t-eyebrow">Pricing</p>
          <h2 className="t-large">Pays for itself after one meeting.</h2>
          <Segmented
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'yearly', label: 'Yearly · save 30%' },
            ]}
            value={cycle}
            onChange={setCycle}
            label="Billing cycle"
          />
        </Reveal>
        <div className="plans">
          {plans.map((p, i) => {
            const price = p[cycle]
            return (
              <Reveal key={p.name} delay={i * 0.08} className={`plan ${p.featured ? 'featured' : ''}`}>
                {p.featured && <span className="badge plan-badge">Most popular</span>}
                <h3 className="t-title2">{p.name}</h3>
                <p className="t-sub muted">{p.blurb}</p>
                <p className="plan-price">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      className="num"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.2 }}
                    >
                      ${price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="t-sub muted"> / user / month</span>
                </p>
                <button className={`btn btn-block ${p.featured ? 'btn-filled' : 'btn-gray'}`} onClick={() => onPick(p.name)}>
                  {price === 0 ? 'Start free' : `Choose ${p.name}`}
                </button>
                <ul className="plan-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={2.8} color="var(--tint)" /> {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq-section" id="faq">
      <div className="wrap faq-wrap">
        <Reveal className="section-head">
          <p className="t-eyebrow">FAQ</p>
          <h2 className="t-large">Good questions.</h2>
        </Reveal>
        <div className="list faq">
          {faqs.map((f, i) => (
            <div key={f.q} className="list-row plain faq-item">
              <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="t-headline grow">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={spring} style={{ display: 'grid' }}>
                  <ChevronDown size={20} className="muted" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="t-callout muted faq-a">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [toast, setToast] = useState('')
  const clear = useCallback(() => setToast(''), [])
  const start = () => setToast('Invite sent. Check your inbox')

  return (
    <>
      <NavBar
        brand="Nimbus"
        icon={<Cloud size={16} strokeWidth={2.6} />}
        links={[
          { href: '#demo', label: 'How it works' },
          { href: '#features', label: 'Features' },
          { href: '#pricing', label: 'Pricing' },
          { href: '#faq', label: 'FAQ' },
        ]}
        action={
          <button className="btn btn-filled btn-sm" onClick={start}>
            Get Nimbus
          </button>
        }
      />
      <main>
        <Hero onCta={start} />
        <Demo />
        <Features />
        <Pricing onPick={(name) => setToast(`${name} plan selected`)} />
        <Faq />
        <section className="section">
          <div className="wrap">
            <Reveal className="cta">
              <span className="cta-icon">
                <Cloud size={34} strokeWidth={2.4} />
              </span>
              <h2 className="t-large">Your next meeting is already taking notes.</h2>
              <button className="btn btn-filled" onClick={start}>
                Try Nimbus free <ArrowRight size={18} />
              </button>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <span>© {new Date().getFullYear()} Nimbus Labs. A concept project designed & built by Hritik Gujar.</span>
          <span className="row">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#top">Back to top ↑</a>
          </span>
        </div>
      </footer>
      <Toast message={toast} onDone={clear} />
    </>
  )
}
