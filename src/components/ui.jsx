import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Moon, Sun, X } from 'lucide-react'

export const spring = { type: 'spring', stiffness: 420, damping: 36 }
export const softSpring = { type: 'spring', stiffness: 260, damping: 30 }

/* Fades content up as it scrolls into view. */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </Tag>
  )
}

/* iOS segmented control with a sliding thumb. */
export function Segmented({ options, value, onChange, label }) {
  const id = useId()
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((opt) => {
        const v = typeof opt === 'string' ? opt : opt.value
        const text = typeof opt === 'string' ? opt : opt.label
        const active = v === value
        return (
          <button key={v} type="button" aria-pressed={active} onClick={() => onChange(v)}>
            {active && <motion.span layoutId={`thumb-${id}`} className="thumb" transition={spring} />}
            {text}
          </button>
        )
      })}
    </div>
  )
}

/* iOS toggle switch. */
export function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="switch"
      onClick={() => onChange(!checked)}
    >
      <motion.span className="knob" animate={{ x: checked ? 20 : 0 }} transition={spring} />
    </button>
  )
}

/* Bottom sheet on phones, centred card on larger screens. */
export function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const wide = typeof window !== 'undefined' && window.matchMedia('(min-width: 720px)').matches

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={wide ? { opacity: 0, scale: 0.94, x: '-50%', y: '-46%' } : { y: '100%', x: '-50%' }}
            animate={wide ? { opacity: 1, scale: 1, x: '-50%', y: '-50%' } : { y: 0, x: '-50%' }}
            exit={wide ? { opacity: 0, scale: 0.96, x: '-50%', y: '-48%' } : { y: '100%', x: '-50%' }}
            transition={softSpring}
          >
            <div className="grabber" />
            <div className="sheet-head">
              <h2 className="t-title2">{title}</h2>
              <button className="icon-btn" onClick={onClose} aria-label="Close">
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* Dynamic-Island style confirmation toast. */
export function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [message, onDone])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast glass-strong"
          role="status"
          initial={{ opacity: 0, y: -30, x: '-50%', scale: 0.8 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -30, x: '-50%', scale: 0.8 }}
          transition={spring}
        >
          <span className="dot">
            <Check size={16} strokeWidth={3} />
          </span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function readTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

/* Follows the system appearance until the visitor picks one. */
export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = readTheme()
    if (saved) return saved
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    if (readTheme()) document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'grid' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/* Floating Liquid Glass navigation capsule. */
export function NavBar({ brand, icon, links, action }) {
  return (
    <motion.header
      className="navbar glass"
      initial={{ y: -40, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ ...softSpring, delay: 0.1 }}
    >
      <a href="#top" className="brand">
        <span className="brand-mark">{icon}</span>
        {brand}
      </a>
      <nav className="links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
      {action}
    </motion.header>
  )
}
