import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Achievements from '../components/Achievements'
import CodingProfiles from '../components/CodingProfiles'
import AskNamanAI from '../components/AskNamanAI'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <AskNamanAI />
      <Skills />
      <Achievements />
      <CodingProfiles />
      <Contact />
    </>
  )
}
