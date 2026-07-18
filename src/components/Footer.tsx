import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { profile } from '../data/resumeData'

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}. Built with React &amp; Tailwind.
        </p>

        <div className="flex items-center gap-5">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-cyan">
            <FiGithub size={18} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-cyan">
            <FiLinkedin size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-muted hover:text-cyan">
            <FiMail size={18} />
          </a>
        </div>
      </div>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ y: -3 }}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-ink shadow-card backdrop-blur hover:border-cyan/50 hover:text-cyan"
      >
        <FiArrowUp />
      </motion.button>
    </footer>
  )
}
