import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader
          eyebrow="projects"
          heading="Things I've built"
          description="Each one is an excuse to get hands-on with a different layer of the AI + full-stack stack — from retrieval systems to adversarial networks to production UIs."
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
