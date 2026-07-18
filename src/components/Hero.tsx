import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'
import { profile } from '../data/resumeData'

function useTypingRotation(words: string[], typingSpeed = 55, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout: number

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = window.setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
        },
        deleting ? typingSpeed / 2 : typingSpeed
      )
    }
    return () => window.clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingSpeed, pause])

  return text
}

export default function Hero() {
  const typed = useTypingRotation(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            welcome
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl md:text-6xl"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-purple via-purple-soft to-cyan bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex h-9 items-center font-mono text-lg text-cyan sm:text-xl"
          >
            <span aria-live="polite">{typed}</span>
            <span className="ml-1 inline-block h-6 w-[2px] animate-caret-blink bg-cyan" aria-hidden />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FiDownload aria-hidden /> Resume
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FiGithub aria-hidden /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FiLinkedin aria-hidden /> LinkedIn
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              <FiMail aria-hidden /> Contact
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="glass-card w-full max-w-md justify-self-center p-0 shadow-card"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-mono text-xs text-faint">whoami.sh</span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed text-muted">
            <p><span className="text-purple-soft">$</span> whoami</p>
            <p className="text-ink">{profile.name}</p>
            <p className="mt-3"><span className="text-purple-soft">$</span> cat role.txt</p>
            <p className="text-ink">SDE Intern @ Innovaccer</p>
            <p className="mt-3"><span className="text-purple-soft">$</span> cat focus.txt</p>
            {profile.interests.map((i) => (
              <p key={i} className="text-cyan">→ {i}</p>
            ))}
            <p className="mt-3"><span className="text-purple-soft">$</span> echo $STATUS</p>
            <p className="text-ink">
              open to opportunities <span className="animate-caret-blink">_</span>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint hover:text-cyan"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-label="Scroll to About section"
      >
        <FiArrowDown size={22} />
      </motion.button>
    </section>
  )
}
