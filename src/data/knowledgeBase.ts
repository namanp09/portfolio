// Lightweight JSON knowledge base powering "Ask Naman AI".
// This is intentionally simple (keyword + scoring retrieval) so it works with
// zero backend and zero API cost. Swap `answerQuery` for a real embeddings +
// vector DB + LLM call later — the QA shape (question, answer, tags) is
// already structured for that migration.

export interface KBEntry {
  id: string
  questions: string[] // example phrasings this entry should match
  tags: string[] // keywords used for retrieval
  answer: string
  relatedProjectSlug?: string
}

export const knowledgeBase: KBEntry[] = [
  {
    id: 'innovaccer-internship',
    questions: ['Tell me about your Innovaccer internship', 'What do you do at Innovaccer', 'Current role'],
    tags: ['innovaccer', 'internship', 'intern', 'job', 'work', 'current', 'sde', 'deal desk'],
    answer:
      "I'm currently a Software Development Engineer Intern at Innovaccer (Jan 2026 – Present), building an AI-native Deal Desk platform across 5 healthcare product brands. The highlight is an LLM-driven Discovery agent I engineered that auto-answers an 83-question deal framework using cited evidence from emails, call notes, and legal docs via MCP tool-use — it turns a multi-hour manual review into a ~60-second automated run.",
  },
  {
    id: 'rag-project',
    questions: ['Explain your RAG project', 'Tell me about KnowledgeHub', 'What is your hybrid RAG platform'],
    tags: ['rag', 'knowledgehub', 'retrieval', 'langgraph', 'faiss', 'bm25', 'vector'],
    answer:
      'Enterprise KnowledgeHub AI is my hybrid RAG platform — it combines FAISS dense retrieval with BM25 sparse retrieval, fuses them with Reciprocal Rank Fusion, and reranks with a cross-encoder for citation-backed answers. An 8-node LangGraph pipeline handles confidence-gated retrieval with a live web-search fallback when the internal knowledge base comes up short, and Redis caching cut repeat-query latency from 4.1s to 0.08s.',
    relatedProjectSlug: 'enterprise-knowledgehub-ai',
  },
  {
    id: 'tech-stack',
    questions: ['What technologies do you know', 'What is your tech stack', 'What languages do you use'],
    tags: ['tech', 'stack', 'skills', 'languages', 'technologies', 'tools', 'know'],
    answer:
      'On the frontend: React, TypeScript, JavaScript, and REST API integration. Core languages: C++, C, Python, SQL. On the AI side: LangChain, LangGraph, PyTorch, Scikit-learn, and I use Claude and GitHub Copilot daily as AI coding assistants. Infra/tools: FastAPI, Docker, MongoDB, Redis, AWS S3, and Git.',
  },
  {
    id: 'which-project-first',
    questions: ['Which project should I look at first', 'What is your best project', 'Where should I start'],
    tags: ['best', 'first', 'recommend', 'start', 'top', 'favorite'],
    answer:
      "Start with Enterprise KnowledgeHub AI — it's the most complete showcase of how I think about AI systems: hybrid retrieval, agentic orchestration with LangGraph, and production concerns like observability and caching, not just a model wrapped in a chat UI.",
    relatedProjectSlug: 'enterprise-knowledgehub-ai',
  },
  {
    id: 'steganography-project',
    questions: ['Tell me about your GAN project', 'What is the steganography system'],
    tags: ['gan', 'steganography', 'stego', 'encryption', 'research'],
    answer:
      'It\'s a multi-modal GAN-based system that hides secret data inside images, audio, and video so imperceptibly it\'s statistically hard to detect. It\'s deployed as a containerized FastAPI service with AES-256-GCM encryption, and I built a deep-learning compression module that reduces payload size by 40–60%. I also authored a research paper on the spatio-temporal modeling behind the video embedding approach.',
    relatedProjectSlug: 'gan-steganography',
  },
  {
    id: 'job-portal-project',
    questions: ['Tell me about the job portal project', 'What is the AI job portal'],
    tags: ['job portal', 'gemini', 'resume', 'matching', 'ranking'],
    answer:
      'It\'s a job portal with a Gemini-powered semantic matching engine that compares resumes against job descriptions by meaning, not keywords, then ranks candidates in a clean, filterable UI. It processed 50+ real job applications, and I shipped it on Vercel with Sentry for production error tracking.',
    relatedProjectSlug: 'ai-job-portal',
  },
  {
    id: 'education',
    questions: ['Where did you study', 'What is your education', 'Which college'],
    tags: ['education', 'college', 'university', 'dtu', 'degree', 'cgpa', 'gpa'],
    answer:
      "I'm a final-year B.Tech Computer Science student at Delhi Technological University (Nov 2022 – May 2026) with a 9.00 GPA. Before that, I scored 92.8% in CBSE Class XII (Science) and 94.33% in CBSE Class X.",
  },
  {
    id: 'achievements',
    questions: ['What are your achievements', 'Tell me about your JEE rank', 'Competitive programming rank'],
    tags: ['achievement', 'jee', 'rank', 'leetcode', 'codechef', 'competitive'],
    answer:
      "A few I'm proud of: AIR 6172 (99.33 percentile) in JEE Mains 2022 and AIR 6417 in JEE Advanced among 1M+ candidates, Knight rank (1800+ rating) after solving 800+ problems on LeetCode and CodeChef, and a research paper I authored on adversarial GAN-based steganography.",
  },
  {
    id: 'contact',
    questions: ['How do I contact you', 'What is your email', 'Are you open to opportunities'],
    tags: ['contact', 'email', 'reach', 'hire', 'opportunity', 'available'],
    answer:
      "Best way is email at naman.padiyar09@gmail.com, or use the contact form on this site — I read every message. I'm always open to hearing about interesting AI/full-stack roles and internships.",
  },
  {
    id: 'ai-agents',
    questions: ['What do you know about AI agents', 'What is agentic AI', 'Experience with LLM agents'],
    tags: ['agent', 'agentic', 'llm', 'mcp', 'tool use', 'autonomous'],
    answer:
      "Agentic AI is a big focus for me. At Innovaccer I built an LLM-driven Discovery agent using MCP tool-use to auto-answer complex deal-discovery questions with cited evidence. In my KnowledgeHub project, I orchestrated an 8-node LangGraph pipeline with confidence-gated retrieval and a live web-search fallback — that's the kind of agentic reasoning I like building.",
  },
]

export interface KBMatch {
  entry: KBEntry
  score: number
}

/**
 * Very small scoring retriever: counts tag/question keyword overlaps
 * against the user's query. This is deliberately simple — it's the
 * "v1 knowledge base" mentioned in the roadmap, designed to be swapped
 * for real embedding similarity search later without changing the UI.
 */
export function answerQuery(query: string): KBMatch | null {
  const q = query.toLowerCase()
  let best: KBMatch | null = null

  for (const entry of knowledgeBase) {
    let score = 0
    for (const tag of entry.tags) {
      if (q.includes(tag)) score += 2
    }
    for (const sample of entry.questions) {
      const words = sample.toLowerCase().split(/\W+/).filter((w) => w.length > 3)
      for (const w of words) {
        if (q.includes(w)) score += 1
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score }
    }
  }

  return best
}

export const suggestedQuestions = [
  'Tell me about your Innovaccer internship',
  'Explain your RAG project',
  'What technologies do you know?',
  'Which project should I look at first?',
]
