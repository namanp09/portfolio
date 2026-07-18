import { FiBookOpen } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { profile, education } from '../data/resumeData'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader eyebrow="about" heading="A little about my approach" />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2">
        <div className="space-y-5">
          {profile.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-muted">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <FiBookOpen className="text-cyan" />
              <h3 className="font-display text-xl font-semibold text-ink">Education</h3>
            </div>
            <ol className="relative space-y-8 border-l border-border pl-6">
              {education.map((ed, i) => (
                <li key={ed.institution} className="relative">
                  <span
                    className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ${
                      i === 0 ? 'bg-cyan shadow-glow-cyan' : 'bg-purple-dim'
                    }`}
                  />
                  <p className="font-mono text-xs text-faint">{ed.period}</p>
                  <p className="mt-1 font-display text-base font-semibold text-ink">{ed.institution}</p>
                  <p className="text-sm text-muted">{ed.degree}</p>
                  <p className="mt-1 font-mono text-sm text-cyan">{ed.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
