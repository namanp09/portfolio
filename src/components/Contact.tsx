import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { profile } from '../data/resumeData'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (form.message.trim().length < 10) errs.message = 'Message should be at least 10 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // Opens the user's mail client pre-filled — works with zero backend.
    // Swap this for a real API call (e.g. Formspree, Resend) when deploying.
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 600)
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader
          eyebrow="contact"
          heading="Let's build something"
          description="Open to full-time roles, internships, and interesting AI/full-stack collaborations."
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal delay={0.1}>
          <div className="space-y-4">
            <a href={`mailto:${profile.email}`} className="glass-card flex items-center gap-4 p-5 hover:border-purple/50">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/15 text-purple-soft">
                <FiMail />
              </span>
              <div>
                <p className="text-xs text-faint">Email</p>
                <p className="font-mono text-sm text-ink">{profile.email}</p>
              </div>
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center gap-4 p-5 hover:border-cyan/50">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
                <FiGithub />
              </span>
              <div>
                <p className="text-xs text-faint">GitHub</p>
                <p className="font-mono text-sm text-ink">View repositories</p>
              </div>
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center gap-4 p-5 hover:border-purple/50">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/15 text-purple-soft">
                <FiLinkedin />
              </span>
              <div>
                <p className="text-xs text-faint">LinkedIn</p>
                <p className="font-mono text-sm text-ink">Connect with me</p>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} noValidate className="glass-card space-y-5 p-6 sm:p-8">
            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-ink outline-none transition-colors focus:border-cyan"
                placeholder="Your name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-ink outline-none transition-colors focus:border-cyan"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-ink outline-none transition-colors focus:border-cyan"
                placeholder="Tell me about the role or project..."
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={status === 'sending'}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {status === 'sent' ? (
                <>
                  <FiCheck /> Opened in mail client
                </>
              ) : (
                <>
                  <FiSend /> Send message
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
