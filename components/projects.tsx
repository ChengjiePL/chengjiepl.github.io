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
import { Star, GitFork, Eye, ExternalLink, Github } from "lucide-react";
import { fetchGitHubRepos } from "@/lib/github";

interface ProjectsProps {
  username: string;
}

export default function Projects({ username }: ProjectsProps) {
  const [repos, setRepos] = useState([]);
  const [position, setPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch repos on component mount
  useEffect(() => {
    const getRepos = async () => {
      try {
        // Fetch more repos for the carousel
        const data = await fetchGitHubRepos(username, 10);
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    getRepos();
  }, [username]);

  // Auto-scroll effect
  useEffect(() => {
    if (repos.length === 0) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        // Calculate the new position
        const newPosition = prev + 1;
        // Reset to beginning if we've reached the end
        return newPosition >= repos.length ? 0 : newPosition;
      });
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [repos.length]);

  // If no repos yet, show loading
  if (repos.length === 0) {
    return (
      <section id="projects" className="py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Loading my projects...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Browse through my GitHub projects. The carousel automatically scrolls
          to showcase my work.
        </p>

        {/* Carousel container */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              width: `${repos.length * 100}%`,
              transform: `translateX(-${(position * 100) / repos.length}%)`,
            }}
          >
            {repos.map((repo: any) => (
              <div
                key={repo.id}
                className="w-full md:w-1/3 lg:w-1/3 flex-shrink-0 px-3"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
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
                        repo.topics.slice(0, 2).map((topic: string) => (
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
              </div>
            ))}
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-6 gap-2">
          {repos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${position === index ? "bg-primary" : "bg-primary/30"}`}
            />
          ))}
        </div>

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
