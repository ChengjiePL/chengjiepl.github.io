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
import { Star, GitFork, Eye, ExternalLink, Github } from "lucide-react";

interface ProjectsProps {
  username: string;
}

export default async function Projects({ username }: ProjectsProps) {
  // Only fetch 6 repos to improve performance
  const repos = await fetchGitHubRepos(username, 6);

  // Sort repos by stars
  const sortedRepos = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );

  return (
    <section id="projects" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Here are some of my public GitHub repositories. These projects
          showcase my skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRepos.map((repo) => (
            <Card
              key={repo.id}
              className="flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1"
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
