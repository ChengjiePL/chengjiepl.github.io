"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  GitFork,
  Eye,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the repo type based on the GitHub API response
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
}

interface ProjectsProps {
  username: string;
  initialRepos?: Repo[]; // Optional prop for SSR
}

export default function Projects({
  username,
  initialRepos = [],
}: ProjectsProps) {
  const [repos, setRepos] = useState<Repo[]>(initialRepos);
  const [loading, setLoading] = useState(initialRepos.length === 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch repos on component mount
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        );
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (initialRepos.length === 0) {
      fetchRepos();
    }
  }, [username, initialRepos]);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || repos.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Math.max(1, repos.length - 2),
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [autoScroll, repos.length]);

  // Pause auto-scroll when hovering over carousel
  const handleMouseEnter = () => setAutoScroll(false);
  const handleMouseLeave = () => setAutoScroll(true);

  // Manual navigation
  const scrollPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, repos.length - 3) : prevIndex - 1,
    );
  };

  const scrollNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.max(1, repos.length - 2),
    );
  };

  return (
    <section id="projects" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Browse through my GitHub projects. Hover over the carousel to pause
          the automatic scrolling.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 rounded-full p-2 shadow-md hover:bg-background"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 rounded-full p-2 shadow-md hover:bg-background"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Carousel container */}
            <div ref={carouselRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
              >
                {repos.map((repo) => (
                  <Card
                    key={repo.id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2 flex flex-col h-full transition-all hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span className="truncate">{repo.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="h-4 w-4 mr-1" />
                          <span>{repo.forks_count}</span>
                        </div>
                        {repo.watchers_count > 0 && (
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{repo.watchers_count}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.language && (
                          <Badge variant="secondary">{repo.language}</Badge>
                        )}
                        {repo.topics &&
                          repo.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} variant="outline">
                              {topic}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                          className="flex-1"
                        >
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        {repo.homepage && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.max(1, repos.length - 2) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentIndex === index
                        ? "bg-primary w-4"
                        : "bg-primary/30",
                    )}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ),
              )}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Repositories
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
