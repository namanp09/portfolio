import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCpu, FiUser, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { answerQuery, suggestedQuestions } from '../data/knowledgeBase'
import { getProjectBySlug } from '../data/projects'

interface Message {
  role: 'user' | 'ai'
  text: string
  projectSlug?: string
}

const INTRO: Message = {
  role: 'ai',
  text:
    "Hi, I'm a small AI layer trained on Naman's resume and project docs — ask me about his internship, projects, or stack. (Running on a JSON knowledge base today; roadmap is a real embeddings + vector DB + LLM pipeline.)",
}

export default function AskNamanAI() {
  const [messages, setMessages] = useState<Message[]>([INTRO])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Avoid scrolling on initial mount — only auto-scroll when there are
    // replies after the intro or when the assistant is thinking.
    if (messages.length > 1 || thinking) {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [messages, thinking])

  const ask = (question: string) => {
    if (!question.trim()) return
    setMessages((m) => [...m, { role: 'user', text: question }])
    setInput('')
    setThinking(true)

    setTimeout(() => {
      const match = answerQuery(question)
      const reply: Message = match
        ? { role: 'ai', text: match.entry.answer, projectSlug: match.entry.relatedProjectSlug }
        : {
            role: 'ai',
            text:
              "I don't have a specific answer for that yet in my knowledge base — try asking about his Innovaccer internship, the RAG project, his tech stack, or which project to look at first.",
          }
      setMessages((m) => [...m, reply])
      setThinking(false)
    }, 550)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <section id="ask-ai" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeader
          eyebrow="ask naman ai"
          heading="Skip the scrolling — just ask"
          description="A small retrieval layer over my resume and project docs. Try one of the prompts below, or type your own."
        />
      </Reveal>

      <Reveal delay={0.15}>
        <div className="glass-card mt-12 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple to-cyan text-[#0B0F19]">
              <FiCpu size={14} />
            </span>
            <span className="font-mono text-xs text-faint">ask-naman-ai · knowledge_base.json</span>
          </div>

          <div className="h-[380px] space-y-4 overflow-y-auto p-5 sm:h-[420px]">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      m.role === 'ai' ? 'bg-purple/20 text-purple-soft' : 'bg-cyan/20 text-cyan'
                    }`}
                  >
                    {m.role === 'ai' ? <FiCpu size={14} /> : <FiUser size={14} />}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'ai'
                        ? 'rounded-tl-sm bg-surface-2/90 text-muted'
                        : 'rounded-tr-sm bg-gradient-to-br from-purple/25 to-cyan/15 text-ink'
                    }`}
                  >
                    {m.text}
                    {m.projectSlug && (
                      <Link
                        to={`/projects/${m.projectSlug}`}
                        className="mt-2 flex items-center gap-1 font-mono text-xs text-cyan hover:underline"
                      >
                        View case study <FiArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple/20 text-purple-soft">
                    <FiCpu size={14} />
                  </span>
                  <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-surface-2/90 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-faint"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button key={q} onClick={() => ask(q)} className="chip">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, projects, or stack..."
                className="flex-1 rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cyan"
                aria-label="Ask a question about Naman"
              />
              <button type="submit" className="btn-primary !px-4" aria-label="Send question">
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
