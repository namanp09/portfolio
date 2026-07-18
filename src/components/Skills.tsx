import { motion } from 'framer-motion'
import { FiCode, FiTerminal, FiCpu, FiLayers, FiDatabase, FiTool } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { skills } from '../data/resumeData'

const ICONS: Record<string, JSX.Element> = {
  Frontend: <FiLayers />,
  Languages: <FiTerminal />,
  Fundamentals: <FiCpu />,
  'AI / ML': <FiCode />,
  'Tools & Infra': <FiTool />,
}

export default function Skills() {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader eyebrow="skills" heading="What I work with" />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -5, borderColor: 'rgba(139,92,246,0.5)' }}
              className="glass-card h-full p-6 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple/20 to-cyan/20 text-cyan">
                  {ICONS[category] ?? <FiDatabase />}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{category}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
