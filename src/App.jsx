import { useState, useEffect, useRef } from 'react'
import './index.css'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'

// ── ReactBits: BlurText ──
const BlurText = ({ text, delay = 0 }) => (
  <motion.span initial={{ filter: 'blur(12px)', opacity: 0 }} animate={{ filter: 'blur(0px)', opacity: 1 }} transition={{ duration: 1, delay }} style={{ display: 'inline-block' }}>
    {text}
  </motion.span>
)

// ── ReactBits: SplitText ──
const SplitText = ({ text, className = '' }) => (
  <span className={className}>
    {text.split('').map((ch, i) => (
      <motion.span key={i} initial={{ opacity: 0, y: 20, rotateX: -40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }} style={{ display: 'inline-block' }}>
        {ch === ' ' ? '\u00A0' : ch}
      </motion.span>
    ))}
  </span>
)

// ── ReactBits: TextReveal (scroll-triggered) ──
const TextReveal = ({ children }) => {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

// ── ReactBits: ScrollFloat (scroll progress) ──
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="scroll-bar" style={{ scaleX, transformOrigin: '0%' }} />
}

// ── SVGs for the Journey ──
const SvgRegistration = () => (
  <svg viewBox="0 0 200 150" width="100%" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="20" width="100" height="110" rx="8" fill="#1e3a5f" stroke="#d4a853" strokeWidth="4"/>
    <rect x="70" y="40" width="60" height="8" rx="4" fill="#8b95a5"/>
    <rect x="70" y="60" width="40" height="8" rx="4" fill="#8b95a5"/>
    <rect x="70" y="80" width="50" height="8" rx="4" fill="#8b95a5"/>
    <circle cx="120" cy="100" r="15" fill="#f59e0b" opacity="0.8"/>
    <path d="M113 100l5 5 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SvgCampaign = () => (
  <svg viewBox="0 0 200 150" width="100%" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 100 L100 40 L140 100 Z" fill="#1e3a5f" stroke="#d4a853" strokeWidth="4"/>
    <circle cx="100" cy="70" r="10" fill="#f59e0b"/>
    <rect x="80" y="100" width="40" height="30" fill="#1e3a5f" stroke="#d4a853" strokeWidth="4"/>
    <path d="M30 60 Q60 30 100 40 Q140 30 170 60" stroke="#0d9488" strokeWidth="3" strokeDasharray="5 5" fill="none"/>
  </svg>
)

const SvgEVM = () => (
  <svg viewBox="0 0 200 150" width="100%" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="30" width="80" height="90" rx="6" fill="#1e3a5f" stroke="#0d9488" strokeWidth="4"/>
    <circle cx="95" cy="50" r="6" fill="#ef4444"/>
    <circle cx="95" cy="75" r="6" fill="#ef4444"/>
    <circle cx="95" cy="100" r="6" fill="#ef4444"/>
    <rect x="55" y="45" width="20" height="10" rx="2" fill="#d4a853"/>
    <rect x="55" y="70" width="20" height="10" rx="2" fill="#8b95a5"/>
    <rect x="55" y="95" width="20" height="10" rx="2" fill="#8b95a5"/>
    
    <rect x="130" y="40" width="40" height="80" rx="4" fill="#1e3a5f" stroke="#d4a853" strokeWidth="4"/>
    <rect x="140" y="50" width="20" height="30" fill="#f59e0b" opacity="0.8"/>
  </svg>
)

const SvgCounting = () => (
  <svg viewBox="0 0 200 150" width="100%" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="80" width="30" height="50" fill="#0d9488"/>
    <rect x="85" y="50" width="30" height="80" fill="#d4a853"/>
    <rect x="130" y="20" width="30" height="110" fill="#f59e0b"/>
    <path d="M40 70 L85 40 L130 10" stroke="#e8eaed" strokeWidth="4" fill="none"/>
    <circle cx="40" cy="70" r="4" fill="#fff"/>
    <circle cx="85" cy="40" r="4" fill="#fff"/>
    <circle cx="130" cy="10" r="4" fill="#fff"/>
  </svg>
)

const SvgResults = () => (
  <svg viewBox="0 0 200 150" width="100%" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 120 L70 120 L70 140 L130 140 L130 120 Z" fill="#1e3a5f" stroke="#d4a853" strokeWidth="3"/>
    <path d="M100 20 L50 60 L70 120 L130 120 L150 60 Z" fill="#f59e0b" stroke="#d4a853" strokeWidth="3"/>
    <circle cx="100" cy="70" r="20" fill="#1e3a5f"/>
    <path d="M95 70 L100 75 L110 65" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

// ── Interactive Journey Data ──
const JOURNEY_STEPS = [
  {
    id: 'register',
    title: 'Voter Registration',
    icon: '🪪',
    desc: 'Before you can cast your vote, you must be enrolled in the electoral register. You need a valid photo ID and must be 18 or older. Without this, you cannot enter the polling booth.',
    stats: { label: 'Min. Age', val: '18 Years' },
    stats2: { label: 'Doc Required', val: 'Form 6' },
    dyk: 'You can check your name on the electoral roll online via the NVSP portal from the comfort of your home.',
    Illustration: SvgRegistration
  },
  {
    id: 'campaign',
    title: 'Campaign Season',
    icon: '🎤',
    desc: 'Candidates and political parties share their vision, manifestos, and promises with the public. This period is strictly regulated by the Model Code of Conduct to ensure fairness.',
    stats: { label: 'Silence Period', val: '48 Hours' },
    stats2: { label: 'Regulator', val: 'Election Commission' },
    dyk: 'Campaigning must completely stop 48 hours before polling begins to give voters time to reflect peacefully.',
    Illustration: SvgCampaign
  },
  {
    id: 'vote',
    title: 'Polling Day & EVMs',
    icon: '🗳️',
    desc: 'The big day! You walk into the booth, verify your identity, and cast your vote on the Electronic Voting Machine (EVM). It is standalone, tamper-proof, and secure.',
    stats: { label: 'Time', val: '7 AM - 6 PM' },
    stats2: { label: 'Verification', val: 'VVPAT Slip' },
    dyk: 'When you press the button, the EVM records your vote, and the VVPAT machine prints a slip that is visible for 7 seconds so you can verify your choice.',
    Illustration: SvgEVM
  },
  {
    id: 'counting',
    title: 'Counting the Votes',
    icon: '🔢',
    desc: 'After polling, EVMs are sealed and stored in highly secure strong rooms guarded by central forces. On counting day, they are opened in the presence of candidates.',
    stats: { label: 'Security', val: '3-Tier' },
    stats2: { label: 'Cross-check', val: 'VVPAT Matching' },
    dyk: 'A randomly selected percentage of EVMs have their electronic results manually cross-checked against their printed VVPAT slips to ensure absolute accuracy.',
    Illustration: SvgCounting
  },
  {
    id: 'results',
    title: 'Declaration & Formation',
    icon: '🏆',
    desc: 'The candidate with the most valid votes in the constituency is declared the winner. The party or coalition with a majority forms the government.',
    stats: { label: 'System', val: 'First-Past-The-Post' },
    stats2: { label: 'Outcome', val: 'Democracy Wins' },
    dyk: 'Even if the "NOTA" (None of the Above) option gets the highest number of votes, the candidate with the next highest votes is declared the winner.',
    Illustration: SvgResults
  }
]

// ── Interactive Journey Component ──
const InteractiveJourney = () => {
  const [step, setStep] = useState(0)
  const current = JOURNEY_STEPS[step]
  
  return (
    <div className="journey">
      {/* Progress Bar */}
      <div className="journey-progress">
        {JOURNEY_STEPS.map((s, i) => (
          <div key={s.id} className="jp-step">
            <div className={`jp-dot ${i < step ? 'done' : i === step ? 'active' : ''}`} onClick={() => setStep(i)}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < JOURNEY_STEPS.length - 1 && (
              <div className={`jp-line ${i < step ? 'done' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Card Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          className="journey-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="jc-top">
            <div className="jc-phase">Step {step + 1} of {JOURNEY_STEPS.length}</div>
            <div className="jc-title">
              <div className="jc-icon">{current.icon}</div>
              <h3>{current.title}</h3>
            </div>
            <p className="jc-desc">{current.desc}</p>
            
            <div className="jc-details">
              <div className="jc-detail">
                <div className="jc-detail-label">{current.stats.label}</div>
                <div className="jc-detail-val">{current.stats.val}</div>
              </div>
              <div className="jc-detail">
                <div className="jc-detail-label">{current.stats2.label}</div>
                <div className="jc-detail-val gold">{current.stats2.val}</div>
              </div>
            </div>

            <div className="dyk">
              <div className="dyk-icon">💡</div>
              <p><strong>Did you know?</strong> {current.dyk}</p>
            </div>
          </div>
          
          <div className="jc-illustration">
            <current.Illustration />
          </div>

          <div className="jc-nav">
            <button 
              className="btn btn-ghost" 
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              style={{ opacity: step === 0 ? 0.3 : 1, cursor: step === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Previous
            </button>
            <button 
              className="btn btn-teal" 
              onClick={() => setStep(s => Math.min(JOURNEY_STEPS.length - 1, s + 1))}
              disabled={step === JOURNEY_STEPS.length - 1}
              style={{ opacity: step === JOURNEY_STEPS.length - 1 ? 0.3 : 1, cursor: step === JOURNEY_STEPS.length - 1 ? 'not-allowed' : 'pointer' }}
            >
              Next Step →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Chatbot ──
const BOT_RESPONSES = {
  'register': 'To register as a voter: visit the NVSP portal (nvsp.in) online, or submit Form 6 at your local Electoral Registration Office. You must be 18+ on the qualifying date. 📋',
  'evm': 'EVMs (Electronic Voting Machines) are standalone devices with NO network connection, making them tamper-resistant. Each vote is also recorded on a VVPAT slip for physical verification. 🖥️',
  'nota': 'NOTA = "None Of The Above" — it lets you officially reject ALL candidates. However, even if NOTA gets the most votes, the candidate with the next highest votes still wins. ⚠️',
  'id': 'On polling day you can use: Voter ID (EPIC), Aadhaar Card, Passport, Driving Licence, PAN Card, or any government-issued photo ID. Your name must be on the voter list! 🪪',
  'secret': 'Absolutely! Your vote is 100% secret. The EVM records votes in encrypted memory with no link to any voter. The VVPAT is immediately sealed. 🔒',
  'default': 'Great question! 🤔 I can help you with: voter registration, EVM technology, election phases, NOTA, ID requirements, and vote secrecy. Try asking something specific! 🗳️'
}

const getResponse = (msg) => {
  const m = msg.toLowerCase()
  if (m.includes('register') || m.includes('registration')) return BOT_RESPONSES.register
  if (m.includes('evm') || m.includes('electronic') || m.includes('machine')) return BOT_RESPONSES.evm
  if (m.includes('nota')) return BOT_RESPONSES.nota
  if (m.includes('id') || m.includes('document') || m.includes('card')) return BOT_RESPONSES.id
  if (m.includes('secret') || m.includes('anonymous') || m.includes('private')) return BOT_RESPONSES.secret
  return BOT_RESPONSES.default
}

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ role: 'bot', text: '👋 Hi! I\'m your ElectIQ assistant. Ask me anything about the election process!' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const sugs = ['How to register?', 'What is EVM?', 'What is NOTA?']

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMsgs(m => [...m, { role: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setMsgs(m => [...m, { role: 'bot', text: getResponse(msg) }])
      setTyping(false)
    }, 700)
  }

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  return (
    <>
      <motion.button className="chat-btn" onClick={() => setOpen(o => !o)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Toggle election assistant">
        {open ? '✕' : '💬'}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="chat-panel" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.25 }}>
            <div className="chat-hd">
              <div className="bot-av">🤖</div>
              <div><h4>ElectIQ Assistant</h4><p>Ask me about elections</p></div>
              <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="chat-msgs">
              {msgs.map((m, i) => <div key={i} className={`msg ${m.role}`} style={{ whiteSpace: 'pre-line' }}>{m.text}</div>)}
              {typing && <div className="typing-indicator">ElectIQ is typing…</div>}
              <div ref={bottomRef} />
            </div>
            <div className="chat-sugs">
              {sugs.map(s => <button key={s} className="sug-btn" onClick={() => send(s)}>{s}</button>)}
            </div>
            <div className="chat-input-row">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about elections…" />
              <button className="send-btn" onClick={() => send()}>➤</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Simulation ──
const Simulation = () => {
  return (
    <div className="sim-container">
      <div className="sim-zone zone-queue">
        <div className="zone-title">1. Queue</div>
      </div>
      <div className="sim-zone zone-booth">
        <div className="zone-title">2. Voting Booth</div>
      </div>
      <div className="sim-zone zone-count">
        <div className="zone-title">3. EVM Storage</div>
      </div>
      
      <div className="sim-floor" />
      <div className="sim-evm" />
      <div className="sim-box" />
      
      <div className="voter v-1" />
      <div className="voter v-2" />
      <div className="voter v-3" />
      <div className="voter v-4" />
      <div className="voter v-5" />
    </div>
  )
}

// ── Main App ──
export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('hero')

  useEffect(() => {
    const handler = () => {
      const secs = ['hero','journey','faq']
      for (const id of secs) {
        const el = document.getElementById(id)
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 120 && r.bottom > 120) { setActiveNav(id); break } }
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setNavOpen(false)
  }

  return (
    <>
      <ScrollProgress />
      <div className="mesh" aria-hidden>
        <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      </div>

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo">🏛️ ElectIQ</span>
        <button className="hamburger" onClick={() => setNavOpen(o => !o)} aria-label="Menu">☰</button>
        <div className={`nav-links${navOpen ? ' open' : ''}`}>
          {['hero','journey','faq'].map(id => (
            <button key={id} className={`nav-link${activeNav===id?' active':''}`} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <motion.div className="hero-badge" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
          <span className="badge-dot" /><span className="shiny">Interactive Civic Guide</span>
        </motion.div>
        <h1>
          <SplitText text="Master the" /><br />
          <span className="gradient-text">Election Process</span><br />
          <BlurText text="Step by Step" delay={0.5} />
        </h1>
        <motion.p className="hero-sub" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.7, duration:.7 }}>
          Democracy is not a spectator sport. Follow the journey from voter registration to the formation of the government in our interactive guide.
        </motion.p>
        <motion.div className="hero-btns" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.9, duration:.7 }}>
          <button className="btn btn-primary" onClick={() => scrollTo('journey')}>🗺️ Start the Journey</button>
        </motion.div>
      </section>

      <div className="marquee-wrap" aria-hidden>
        <div className="marquee-track">
          {['📢 Election Announcement', '📝 Nomination Filing', '🎤 Campaign Season', '🗳️ Polling Day', '🔢 Vote Counting', '🏆 Results Declaration', '🤝 Government Formation', '📋 Model Code of Conduct', '🔒 Secure Voting', '⚖️ Fair Elections', '📢 Election Announcement', '📝 Nomination Filing', '🎤 Campaign Season', '🗳️ Polling Day'].map((item, i) => (
            <div key={i} className="marquee-item"><span>✦</span>{item}</div>
          ))}
        </div>
      </div>

      {/* SIMULATION SECTION */}
      <section className="section" id="simulation">
        <div className="container">
          <TextReveal>
            <div className="sec-head">
              <h2>Election <span className="gradient-text">Simulation</span></h2>
              <p>Watch how a vote securely travels from the voter to the EVM strong room.</p>
            </div>
          </TextReveal>
          <TextReveal>
            <Simulation />
          </TextReveal>
        </div>
      </section>

      {/* INTERACTIVE JOURNEY */}
      <section className="section" id="journey">
        <div className="container">
          <TextReveal>
            <div className="sec-head">
              <h2>Your Path to the <span className="gradient-text">Ballot Box</span></h2>
              <p>Walk through the exact steps of how a democratic election unfolds.</p>
            </div>
          </TextReveal>
          
          <TextReveal>
            <InteractiveJourney />
          </TextReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <TextReveal>
            <div className="sec-head">
              <h2>Civic <span className="gradient-text">FAQ</span></h2>
              <p>Clear answers to common questions.</p>
            </div>
          </TextReveal>
          <div className="faq-list">
            {[
              { q: 'Who is eligible to vote?', a: 'Any citizen 18+ on the qualifying date, of sound mind, and not legally disqualified is eligible. You must be registered on the electoral roll of your constituency.' },
              { q: 'What documents do I need on polling day?', a: 'A valid photo ID: Voter ID (EPIC), Aadhaar, Passport, Driving License, PAN Card, or any government-issued photo ID. Your name must appear on the voter list.' },
              { q: 'Is my vote truly secret?', a: 'Yes! EVMs are designed so no one can link a vote to a voter. The ballot unit is in a closed compartment. Secrecy of ballot is constitutionally guaranteed.' },
            ].map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q"><span>{f.q}</span></div>
                <div className="faq-inner" style={{paddingTop: 10}}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Built for Civic Duty &mdash; <a href="#">ElectIQ</a></p>
      </footer>

      <Chatbot />
    </>
  )
}
