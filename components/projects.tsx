"use client";

import { useState, useEffect } from "react";
import { fetchGitHubRepos } from "@/lib/github";
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

interface ProjectsProps {
  username: string;
}

export default function Projects({ username }: ProjectsProps) {
  const [repos, setRepos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const visibleProjects = 3; // Number of visible projects at once (on desktop)

  useEffect(() => {
    const getRepos = async () => {
      setIsLoading(true);
      try {
        // Fetch more repos to have a better carousel effect
        const data = await fetchGitHubRepos(username, 10);
        // Sort repos by stars
        const sortedData = [...data].sort(
          (a, b) => b.stargazers_count - a.stargazers_count,
        );
        setRepos(sortedData);
      } catch (error) {
        console.error("Error fetching repos", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRepos();
  }, [username]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= repos.length ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? repos.length - 1 : prevIndex - 1,
    );
  };

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [repos.length]);

  // Function to get visible repos with wrap-around
  const getVisibleRepos = () => {
    if (repos.length === 0) return [];

    const result = [];
    for (let i = 0; i < visibleProjects; i++) {
      const index = (currentIndex + i) % repos.length;
      result.push(repos[index]);
    }
    return result;
  };

  return (
    <section id="projects" className="py-20 bg-accent/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Here are some of my public GitHub repositories. These projects
          showcase my skills.
        </p>

        {isLoading ? (
          <div className="text-center">Loading projects...</div>
        ) : (
          <div className="relative">
            <div className="flex justify-between items-center absolute top-1/2 w-full -translate-y-1/2 z-10 px-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(${-currentIndex * (100 / visibleProjects)}%)`,
                }}
              >
                {repos.map((repo) => (
                  <Card
                    key={repo.id}
                    className="flex-shrink-0 flex flex-col w-full md:w-[calc(100%/3-1rem)] transition-all 
                               hover:shadow-lg hover:-translate-y-1"
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
