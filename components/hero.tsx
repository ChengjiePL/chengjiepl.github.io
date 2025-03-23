"use client"

import { fetchGitHubUser, defaultUser } from "@/lib/github"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

interface HeroProps {
  username: string
}

export default async function Hero({ username }: HeroProps) {
  // Fetch data with a timeout to prevent blocking rendering
  const userPromise = fetchGitHubUser(username)
  const user = (await Promise.race([
    userPromise,
    new Promise((resolve) => setTimeout(() => resolve(defaultUser), 1000)),
  ])) as Awaited<ReturnType<typeof fetchGitHubUser>>

  // Continue fetching in the background if we used the fallback
  if (user === defaultUser) {
    userPromise
      .then(() => {
        // Data will be available for subsequent requests
      })
      .catch((e) => console.error("Background fetch error:", e))
  }

  return (
    <section className="relative pt-20 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-primary">{user.name || username}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{user.bio || "Software Developer & GitHub Enthusiast"}</p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View Projects
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src={user.avatar_url || "/placeholder.svg?height=320&width=320"}
                alt={`${user.name || username}'s profile`}
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

