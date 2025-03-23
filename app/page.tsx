import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

// Static metadata for better SEO
export const metadata = {
  title: "GitHub Portfolio | ChengjiePL",
  description:
    "Personal portfolio website showcasing projects and skills from GitHub",
};

export default function Home() {
  // Username is hardcoded to avoid unnecessary prop drilling
  const username = "ChengjiePL";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero section doesn't need suspense as it's the first thing users see */}
      <Hero username={username} />

      {/* Load sections as they become visible */}
      <About username={username} />
      <Projects username={username} />
      <Skills />
      <Contact username={username} />
      <Footer username={username} />
    </main>
  );
}
