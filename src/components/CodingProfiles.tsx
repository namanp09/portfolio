import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi'
import Reveal from './Reveal'
import { codingProfiles } from '../data/resumeData'

const ICONS: Record<string, JSX.Element> = {
  github: <FiGithub size={22} />,
  leetcode: <FiCode size={22} />,
  linkedin: <FiLinkedin size={22} />,
  mail: <FiMail size={22} />,
}

export default function CodingProfiles() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {codingProfiles.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.5)' }}
              className="glass-card flex flex-col items-center gap-2 p-5 text-center"
            >
              <span className="text-cyan">{ICONS[p.icon]}</span>
              <span className="font-display text-sm font-semibold text-ink">{p.name}</span>
              <span className="truncate w-full font-mono text-[11px] text-faint">{p.handle}</span>
            </motion.a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
