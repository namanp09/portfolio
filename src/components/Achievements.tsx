import { useEffect, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { achievements, honors } from '../data/resumeData'
import { FiAward } from 'react-icons/fi'

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const isFloat = value % 1 !== 0

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(isFloat ? Number((value * eased).toFixed(2)) : Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-ink sm:text-5xl">
      {display}
      <span className="bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">{suffix}</span>
    </span>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader eyebrow="achievements" heading="Numbers &amp; recognition" />
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.label} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4 }} className="glass-card h-full p-6 text-center">
              <AnimatedNumber value={a.value} suffix={a.suffix} />
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-cyan">{a.label}</p>
              <p className="mt-1 text-xs text-faint">{a.description}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {honors.map((h, i) => (
          <Reveal key={h.title} delay={0.1 + i * 0.08}>
            <div className="glass-card h-full p-6">
              <FiAward className="text-purple-soft" size={20} />
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
