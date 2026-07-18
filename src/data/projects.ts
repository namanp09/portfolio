export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  stack: string[]
  github: string
  liveDemo?: string
  featured: boolean
  overview: string
  problemStatement: string
  architecture: string[]
  challenges: { challenge: string; solution: string }[]
  engineeringDecisions: string[]
  metrics: ProjectMetric[]
  futureImprovements: string[]
  accent: 'purple' | 'cyan'
}

export const projects: Project[] = [
  {
    slug: 'enterprise-knowledgehub-ai',
    name: 'Enterprise KnowledgeHub AI',
    tagline: 'A hybrid RAG platform with citation-backed Q&A and agentic fallback reasoning.',
    description:
      'A full-stack Hybrid RAG platform combining FAISS + BM25 retrieval, RRF fusion, and cross-encoder reranking, orchestrated through an 8-node LangGraph agent with live web-search fallback and full-trace observability.',
    stack: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'FAISS', 'BM25', 'LangGraph', 'LangSmith', 'Redis', 'OCR'],
    github: 'https://github.com/namanp09',
    featured: true,
    accent: 'purple',
    overview:
      'Enterprise KnowledgeHub AI is a hybrid retrieval-augmented generation platform built to answer questions over large, messy document corpora — with every answer traceable back to its source. It pairs dense vector search with classical keyword search, fuses the results, and re-ranks them with a cross-encoder before an agentic LangGraph pipeline decides whether the retrieved context is strong enough to answer, or whether it should fall back to a live web search.',
    problemStatement:
      'Pure vector search struggles with exact terms, acronyms, and rare entities common in enterprise documents, while pure keyword search misses semantic paraphrases. Most RAG demos also treat retrieval as a single, unobserved step — making it hard to know why an answer was wrong. The goal was to build a retrieval pipeline that is both more accurate than either method alone, and fully observable, with a graceful fallback when the internal knowledge base simply does not contain the answer.',
    architecture: [
      'Ingestion: documents pass through an async pipeline (Redis-backed queue) for chunking, OCR on scanned pages, and image captioning before embedding.',
      'Retrieval: queries run in parallel against a FAISS dense index (384-dim embeddings) and a BM25 sparse index.',
      'Fusion: candidate results are merged via Reciprocal Rank Fusion (RRF), then re-scored with a cross-encoder reranker for precision at the top of the list.',
      'Orchestration: an 8-node LangGraph pipeline routes the query through retrieval, confidence gating, answer synthesis, and — when confidence is low — a Tavily-powered live web-search fallback node.',
      'Observability: every node execution, tool call, and decision is traced end-to-end in LangSmith for debugging and evaluation.',
      'Caching: a Redis layer caches repeat queries and intermediate retrieval results to cut latency on hot paths.',
    ],
    challenges: [
      {
        challenge: 'Dense retrieval alone missed exact-match queries (IDs, acronyms, rare terms) common in enterprise docs.',
        solution:
          'Combined FAISS dense retrieval with BM25 sparse retrieval and merged results using Reciprocal Rank Fusion, then applied a cross-encoder reranker to restore precision at the top of the ranked list.',
      },
      {
        challenge: 'Naive single-shot RAG produced confident answers even when retrieved context was irrelevant.',
        solution:
          'Introduced a confidence-gating node in the LangGraph pipeline that routes low-confidence retrievals to a live Tavily web-search fallback instead of forcing an answer from weak context.',
      },
      {
        challenge: 'Repeat and near-duplicate queries were re-computing the full retrieval + rerank pipeline, adding latency.',
        solution:
          'Added a Redis-backed caching layer for query and retrieval results, cutting repeat-search latency from 4.1s to 0.08s — roughly a 50x improvement.',
      },
      {
        challenge: 'Document ingestion for scanned PDFs and image-heavy files blocked the main pipeline.',
        solution:
          'Moved ingestion (OCR + image captioning) onto an async, Redis-backed job queue so uploads no longer blocked query serving.',
      },
    ],
    engineeringDecisions: [
      'Chose hybrid (dense + sparse) retrieval over a pure vector-store approach to cover both semantic and exact-match queries.',
      'Used LangGraph instead of a linear chain so retrieval, confidence-gating, and fallback search could be modeled as explicit, inspectable graph nodes rather than implicit prompt logic.',
      'Instrumented the entire pipeline with LangSmith tracing from day one, treating observability as a first-class requirement rather than an afterthought.',
      'Kept ingestion fully async and queue-backed so the system degrades gracefully under document-processing load instead of blocking user queries.',
    ],
    metrics: [
      { label: 'Repeat-query latency', value: '4.1s → 0.08s (50x)' },
      { label: 'Retrieval architecture', value: 'Hybrid: FAISS + BM25 + RRF' },
      { label: 'Pipeline depth', value: '8-node LangGraph agent' },
      { label: 'Production bugs fixed via E2E testing', value: '2' },
    ],
    futureImprovements: [
      'Add multi-hop retrieval for questions that require synthesizing across multiple documents.',
      'Introduce user feedback loops to fine-tune the reranker on real query/answer pairs.',
      'Expand structured evaluation with LangSmith datasets to track regression across pipeline changes.',
    ],
  },
  {
    slug: 'gan-steganography',
    name: 'GAN-Based Steganography System',
    tagline: 'Hiding secret data imperceptibly inside images, audio, and video using adversarial networks.',
    description:
      'A multi-modal GAN-based system for imperceptibly embedding secret data within image, audio, and video files, deployed as a containerized FastAPI service with AES-256-GCM encryption and deep-learning-based payload compression.',
    stack: ['PyTorch', 'FastAPI', 'Docker', 'AES-256-GCM', 'GANs', 'OpenCV'],
    github: 'https://github.com/namanp09',
    featured: true,
    accent: 'cyan',
    overview:
      'This project explores adversarial steganography — using a GAN architecture to embed secret payloads into cover media (images, audio, and video) such that the resulting file is statistically and visually indistinguishable from the original, while remaining recoverable by a matching decoder network.',
    problemStatement:
      'Classical steganography techniques (LSB substitution, spread-spectrum methods) are often detectable by modern steganalysis tools and have limited payload capacity. The goal was to design a learned, adversarially-trained embedding scheme that increases both imperceptibility and payload capacity across multiple media types, while keeping the whole system deployable as a real service.',
    architecture: [
      'Generator/encoder network embeds a compressed, encrypted payload into cover media (image, audio, or video frames).',
      'Discriminator network is trained adversarially to distinguish stego media from clean cover media, pushing the encoder toward higher imperceptibility.',
      'Decoder network recovers the embedded payload from stego media independently of the discriminator.',
      'A deep-learning-based text compression module reduces payload size by 40–60% before embedding, increasing effective capacity.',
      'AES-256-GCM encrypts the payload prior to embedding, so even a successfully extracted payload remains unreadable without the key.',
      'The full pipeline is exposed via a containerized FastAPI service for encode/decode requests.',
    ],
    challenges: [
      {
        challenge: 'Balancing imperceptibility (low distortion to cover media) against payload capacity and recovery accuracy.',
        solution:
          'Used an adversarial training loop where the discriminator continuously pressures the encoder toward imperceptibility, while a dedicated decoder loss term enforces payload recoverability.',
      },
      {
        challenge: 'Large payloads reduced embedding quality across all three media types.',
        solution:
          'Built a deep-learning-based text compression module that reduced payload size by 40–60% prior to embedding, benchmarked against classical compression methods.',
      },
      {
        challenge: 'Extending a single-modality approach to work across image, audio, and video without three separate systems.',
        solution:
          'Designed the encoder/decoder architecture with modality-specific front-ends feeding into a shared adversarial training framework, and used spatio-temporal modeling to handle video specifically.',
      },
    ],
    engineeringDecisions: [
      'Layered AES-256-GCM encryption underneath the learned embedding so security does not depend solely on steganographic secrecy.',
      'Evaluated the system with standard quality metrics rather than visual inspection alone, to get reproducible, comparable results.',
      'Containerized the service with Docker so the model pipeline could be deployed and reproduced independently of the training environment.',
    ],
    metrics: [
      { label: 'Payload size reduction', value: '40–60% via learned compression' },
      { label: 'Media types supported', value: 'Image, Audio, Video' },
      { label: 'Encryption', value: 'AES-256-GCM' },
      { label: 'Deployment', value: 'Containerized FastAPI service' },
    ],
    futureImprovements: [
      'Benchmark against modern steganalysis detectors to quantify robustness more rigorously.',
      'Explore real-time video steganography for streaming use cases.',
      'Publish a full write-up of the spatio-temporal modeling approach used for video embedding.',
    ],
  },
  {
    slug: 'ai-job-portal',
    name: 'AI-Powered Job Portal',
    tagline: 'Gemini-powered resume-to-JD semantic matching with real-time ranked results.',
    description:
      'A responsive web interface for a Gemini AI-powered resume-JD semantic matching engine, presenting NLP-based candidate scoring and ranking across 50+ job applications through a clean, filterable UI.',
    stack: ['React', 'Gemini API', 'Node.js', 'MongoDB', 'Vercel', 'Sentry'],
    github: 'https://github.com/namanp09',
    featured: true,
    accent: 'purple',
    overview:
      'An AI-powered job portal that goes beyond keyword matching — using the Gemini API to semantically compare resumes against job descriptions, then presenting recruiters and candidates with ranked, explainable matches through a clean, filterable interface.',
    problemStatement:
      'Traditional keyword-based ATS filtering rejects strong candidates whose resumes use different phrasing than the job description, and gives recruiters little insight into why a candidate was ranked the way they were. The goal was to build a semantic matching layer with a transparent, real-time UI on top of it.',
    architecture: [
      'Resume upload flow accepts candidate documents and extracts structured fields for matching.',
      'Gemini API performs semantic comparison between resume content and job description, producing an NLP-based match score.',
      'Ranked results are rendered in a filterable, sortable UI so recruiters can scan top candidates quickly.',
      'Backend persists applications and scores in MongoDB for retrieval across 50+ job postings.',
      'Deployed on Vercel with Sentry wired in for real-time error tracking and UI reliability monitoring in production.',
    ],
    challenges: [
      {
        challenge: 'Keyword-based matching produced poor recall for candidates using different terminology than the job post.',
        solution:
          'Replaced keyword filtering with Gemini-based semantic scoring, comparing meaning rather than exact text overlap between resume and job description.',
      },
      {
        challenge: 'Recruiters needed to evaluate ranked results quickly across many applications without a cluttered UI.',
        solution:
          'Designed a clean, filterable candidate ranking interface focused on scan-ability, tested against 50+ real job applications.',
      },
      {
        challenge: 'Production UI issues were hard to catch before users reported them.',
        solution:
          'Integrated Sentry for real-time error tracking post-deployment, closing the loop between production issues and fixes.',
      },
    ],
    engineeringDecisions: [
      'Chose the Gemini API for semantic scoring to avoid maintaining a custom embedding/matching model for an MVP-stage product.',
      'Deployed on Vercel for fast iteration and zero-config CI/CD on every push.',
      'Added Sentry from the start rather than retrofitting observability after a production incident.',
    ],
    metrics: [
      { label: 'Applications processed', value: '50+ job applications' },
      { label: 'Matching approach', value: 'NLP-based semantic scoring (Gemini)' },
      { label: 'Deployment', value: 'Vercel + Sentry monitoring' },
    ],
    futureImprovements: [
      'Add explainability to match scores — surfacing which resume sections drove the ranking.',
      'Support bulk resume upload and batch scoring for recruiters.',
      'Introduce a feedback loop where recruiter decisions retrain the ranking heuristics.',
    ],
  },
]

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
