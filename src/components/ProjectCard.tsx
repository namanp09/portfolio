import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Project } from '../data/projects'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = project.accent === 'purple' ? 'from-purple to-purple-soft' : 'from-cyan to-cyan-soft'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass-card group flex h-full flex-col overflow-hidden"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-xs text-faint">0{index + 1}</span>
          <div className="flex gap-3 opacity-70 transition-opacity group-hover:opacity-100">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className="text-muted hover:text-cyan"
            >
              <FiGithub size={18} />
            </a>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live demo`}
                className="text-muted hover:text-cyan"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 text-sm text-purple-soft">{project.tagline}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && <span className="chip">+{project.stack.length - 6}</span>}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="link-underline mt-6 inline-flex items-center gap-2 self-start font-mono text-sm font-medium text-cyan"
        >
          Case Study <FiArrowRight />
        </Link>
      </div>
    </motion.div>
  )
}
