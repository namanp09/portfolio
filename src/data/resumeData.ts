// All content here is sourced directly from Naman's resume.
// Replace links (GitHub/LinkedIn/LeetCode) with real URLs before deploying.

export const profile = {
  name: 'Naman Padiyar',
  roles: ['Software Engineer', 'AI Engineer', 'RAG Developer', 'Agentic AI Developer'],
  email: 'naman.padiyar09@gmail.com',
  phone: '+91 7453030070',
  location: 'Delhi NCR, India',
  links: {
    github: 'https://github.com/namanp09',
    linkedin: 'https://linkedin.com/',
    leetcode: 'https://leetcode.com/u/naman_padiyar/',
    resume: '/Naman_Padiyar_Resume.pdf',
  },
  tagline:
    'I build AI-native systems — from LLM agents that read enterprise documents, to full-stack platforms that ship them to production.',
  bio: [
    "I'm a final-year Computer Science student at Delhi Technological University, currently working as a Software Development Engineer Intern at Innovaccer, where I build AI-native enterprise platforms for healthcare deal desks.",
    'My focus sits at the intersection of applied AI and full-stack engineering — LLM agents, retrieval-augmented generation, and the production infrastructure required to make them reliable, observable, and fast.',
    "Outside of coursework and internship work, I've built a hybrid RAG platform from scratch, a GAN-based steganography system with a published research angle, and an AI-powered job matching portal — each one an excuse to get hands-on with a different layer of the AI stack.",
  ],
  interests: ['LLMs & Agentic Systems', 'Retrieval-Augmented Generation', 'System Design', 'Full-Stack Engineering'],
}

export const education = [
  {
    institution: 'Delhi Technological University',
    degree: 'Bachelor of Technology, Computer Science',
    period: 'Nov 2022 – May 2026',
    detail: '9.00 GPA',
  },
  {
    institution: 'Adarsh J Dharmic Shiksha Sadan',
    degree: 'CBSE Class XII (Science)',
    period: 'Apr 2021 – Jul 2022',
    detail: '92.8%',
  },
  {
    institution: 'Parvati Radhakishan Fomra School',
    degree: 'CBSE Class X',
    period: 'Apr 2019 – Jul 2020',
    detail: '94.33%',
  },
]

export const experience = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Innovaccer',
    location: 'Noida, India',
    period: 'Jan 2026 – Present',
    current: true,
    summary:
      'Building an AI-native Deal Desk platform spanning 5 healthcare product brands — translating product requirements into production Discovery, Pricing, and Margin workflows.',
    points: [
      'Built an end-to-end AI-native Deal Desk platform spanning 5 healthcare product brands, translating product requirements into production Discovery, Pricing, and Margin workflows for Deal Desk teams.',
      'Engineered an LLM-driven Discovery agent that auto-answers an 83-question deal discovery framework with cited evidence from emails, call notes, and legal docs via MCP tool-use — cutting a multi-hour manual review into a ~60-second automated run.',
      'Collaborated cross-functionally with engineers and product teams to integrate AI agents into existing enterprise systems, reducing manual intervention in compliance workflows and improving deal-cycle operational efficiency.',
      'Used AI coding assistants (Claude, GitHub Copilot) to accelerate development, testing, and iteration on document processing pipelines, while maintaining code review and engineering standards.',
    ],
    stack: ['LLM Agents', 'MCP Tool-Use', 'Python', 'Document Processing', 'Claude', 'GitHub Copilot'],
  },
]

export const skills = {
  Frontend: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'REST API Integration', 'Responsive UI', 'Client-side Validation'],
  Languages: ['C++', 'C', 'Python', 'SQL'],
  Fundamentals: ['OOP', 'DSA', 'Data Structures', 'Operating Systems', 'Computer Networks', 'DBMS'],
  'AI / ML': ['LangChain', 'LangGraph', 'Claude', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
  'Tools & Infra': ['Git', 'AWS S3', 'FastAPI', 'Docker', 'MongoDB', 'Redis', 'Salesforce'],
}

export const achievements = [
  { label: 'CGPA at DTU', value: 9.0, suffix: '/10', description: 'B.Tech Computer Science' },
  { label: 'Coding Problems Solved', value: 800, suffix: '+', description: 'Across LeetCode & CodeChef' },
  { label: 'JEE Mains Percentile', value: 99.33, suffix: '%', description: 'AIR 6172, among 1M+ candidates' },
  { label: 'LeetCode Knight Rank', value: 1800, suffix: '+', description: 'Rating for complex data structures' },
]

export const honors = [
  {
    title: 'Research Paper — Adversarial GAN-based Steganography',
    detail:
      'Authored a research paper on adversarial GAN-based steganography with spatio-temporal modeling for multi-modal secret data embedding across image, audio, and video.',
  },
  {
    title: 'JEE Mains & Advanced 2022',
    detail: 'AIR 6172 (99.33 percentile) in JEE Mains and AIR 6417 in JEE Advanced, among 1M+ candidates.',
  },
  {
    title: 'Competitive Programming',
    detail: 'Solved 800+ coding challenges on LeetCode and CodeChef, earning Knight rank (1800+ rating).',
  },
]

export const codingProfiles = [
  { name: 'GitHub', handle: 'View repositories', url: profile.links.github, icon: 'github' },
  { name: 'LeetCode', handle: 'Knight · 1800+ rating', url: profile.links.leetcode, icon: 'leetcode' },
  { name: 'LinkedIn', handle: 'Connect with me', url: profile.links.linkedin, icon: 'linkedin' },
  { name: 'Email', handle: profile.email, url: `mailto:${profile.email}`, icon: 'mail' },
]
