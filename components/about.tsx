import { fetchGitHubUser } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Calendar, LinkIcon } from "lucide-react";

interface AboutProps {
  username: string;
}

export default async function About({ username }: AboutProps) {
  const user = await fetchGitHubUser(username);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Who I Am</h3>
            <p className="text-muted-foreground leading-relaxed">
              {user.bio ||
                `I am a Computer Engineering and DevOps Engineer, dedicated to building secure, automated, and scalable environments.
                  My profile sits at the intersection of Infrastructure, Security, and Development, with a focus on modern software practices.
                `}
            </p>
              On the DevOps side, I specialize in automating infrastructure, architecting efficient CI/CD pipelines, and containerizing applications to ensure seamless and reliable deployments.
            <p className="text-muted-foreground leading-relaxed">
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.location && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                        <p className="font-medium">{user.location}</p>
                      </div>
                    </div>
                  )}

                  {user.followers !== undefined && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Followers
                        </p>
                        <p className="font-medium">{user.followers}</p>
                      </div>
                    </div>
                  )}

                  {user.created_at && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p className="font-medium">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {user.blog && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <LinkIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a
                          href={
                            user.blog.startsWith("http")
                              ? user.blog
                              : `https://${user.blog}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {user.blog}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">GitHub Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">
                      {user.public_repos || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Repositories
                    </p>
                  </div>
                  <div className="bg-accent/50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">
                      {user.public_gists || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Gists</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
