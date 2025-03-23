import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

// Static metadata for better SEO
export const metadata = {
  title: "GitHub Portfolio | ChengjiePL",
  description: "Personal portfolio website showcasing projects and skills from GitHub",
}

export default function Home() {
  // Username is hardcoded to avoid unnecessary prop drilling
  const username = "ChengjiePL"

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero section doesn't need suspense as it's the first thing users see */}
      <Hero username={username} />

      {/* Separate suspense boundaries for each section to improve loading experience */}
      <Suspense fallback={<Loading section="about" />}>
        <About username={username} />
      </Suspense>

      <Suspense fallback={<Loading section="projects" />}>
        <Projects username={username} />
      </Suspense>

      {/* Skills section doesn't need suspense as it's client-side only */}
      <Skills />

      <Suspense fallback={<Loading section="contact" />}>
        <Contact username={username} />
      </Suspense>

      <Footer username={username} />
    </main>
  )
}

