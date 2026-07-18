import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle, FiTarget, FiLayers, FiTrendingUp, FiCompass } from 'react-icons/fi'
import { getProjectBySlug, projects } from '../data/projects'
import Reveal from '../components/Reveal'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2)

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <Link to="/#projects" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-cyan">
        <FiArrowLeft /> Back to portfolio
      </Link>

      <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8">
        <p className="eyebrow">case study</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-purple-soft">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <FiGithub /> View on GitHub
          </a>
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </motion.header>

      <div className="mt-14 h-56 w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-purple/20 via-surface to-cyan/10 sm:h-72">
        <div className="flex h-full items-center justify-center">
          <span className="font-mono text-xs text-faint">// architecture preview — add screenshots in /public/projects/{project.slug}/</span>
        </div>
      </div>

      <Reveal>
        <section className="mt-14">
          <SectionTitle icon={<FiCompass />} title="Overview" />
          <p className="mt-4 leading-relaxed text-muted">{project.overview}</p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12">
          <SectionTitle icon={<FiTarget />} title="Problem Statement" />
          <p className="mt-4 leading-relaxed text-muted">{project.problemStatement}</p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12">
          <SectionTitle icon={<FiLayers />} title="Architecture" />
          <ol className="mt-5 space-y-4">
            {project.architecture.map((step, i) => (
              <li key={i} className="glass-card flex gap-4 p-4">
                <span className="font-mono text-sm text-cyan">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12">
          <SectionTitle icon={<FiCheckCircle />} title="Challenges &amp; Solutions" />
          <div className="mt-5 space-y-4">
            {project.challenges.map((c, i) => (
              <div key={i} className="glass-card p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-purple-soft">Challenge</p>
                <p className="mt-1 text-sm text-ink">{c.challenge}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-wide text-cyan">Solution</p>
                <p className="mt-1 text-sm text-muted">{c.solution}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12">
          <SectionTitle icon={<FiCompass />} title="Engineering Decisions" />
          <ul className="mt-5 space-y-3">
            {project.engineeringDecisions.map((d, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-soft" />
                {d}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12">
          <SectionTitle icon={<FiTrendingUp />} title="Performance Metrics" />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass-card p-5">
                <p className="font-mono text-xs text-faint">{m.label}</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">{m.value}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12">
          <SectionTitle icon={<FiCompass />} title="Future Improvements" />
          <ul className="mt-5 space-y-3">
            {project.futureImprovements.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan" />
                {f}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <div className="mt-20 border-t border-border pt-10">
        <p className="eyebrow">more projects</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {otherProjects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="glass-card p-5 transition-colors hover:border-cyan/50">
              <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-cyan">{icon}</span>
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
    </div>
  )
}
