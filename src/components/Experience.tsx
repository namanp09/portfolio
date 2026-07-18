import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown, FiMapPin } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { experience } from '../data/resumeData'

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader
          eyebrow="experience"
          heading="Where I've been building"
          description="Currently shipping AI agents into production healthcare software."
        />
      </Reveal>

      <div className="mt-14 space-y-6">
        {experience.map((exp, i) => {
          const isOpen = openIndex === i
          return (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-cyan font-display text-sm font-bold text-base sm:flex">
                      {exp.company.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-semibold text-ink">{exp.role}</h3>
                        {exp.current && (
                          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan">
                            current
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-purple-soft">{exp.company}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-faint">
                        <span>{exp.period}</span>
                        <span className="flex items-center gap-1">
                          <FiMapPin size={12} /> {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-muted flex-shrink-0">
                    <FiChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 pt-5">
                        <p className="text-muted">{exp.summary}</p>
                        <ul className="mt-4 space-y-3">
                          {exp.points.map((pt, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-muted">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.stack.map((s) => (
                            <span key={s} className="chip">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
