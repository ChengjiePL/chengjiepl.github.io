import { fetchGitHubUser } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail, Twitter, Linkedin, Globe } from "lucide-react";
import { SiGmail } from "react-icons/si";

interface ContactProps {
  username: string;
}

export default async function Contact({ username }: ContactProps) {
  const user = await fetchGitHubUser(username);

  // Extract social links from user data
  const email = user.email;
  const twitter = user.twitter_username
    ? `https://twitter.com/${user.twitter_username}`
    : null;
  const linkedin = null; // GitHub API doesn't provide LinkedIn
  const website = user.blog;

  return (
    <section id="contact" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Feel free to reach out to me for collaborations, opportunities, or
          just to say hello!
        </p>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                  <p className="text-muted-foreground">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your vision.
                  </p>

                  <div className="space-y-3 mt-6">
                    {email && (
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <a
                          href={`mailto:${email}`}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {email}
                        </a>
                      </div>
                    )}

                    {/* {website && ( */}
                    {/*   <div className="flex items-center gap-3"> */}
                    {/*     <div className="bg-primary/10 p-2 rounded-full"> */}
                    {/*       <Globe className="h-5 w-5 text-primary" /> */}
                    {/*     </div> */}
                    {/*     <a */}
                    {/*       href={ */}
                    {/*         website.startsWith("http") */}
                    {/*           ? website */}
                    {/*           : `https://${website}` */}
                    {/*       } */}
                    {/*       target="_blank" */}
                    {/*       rel="noopener noreferrer" */}
                    {/*       className="text-foreground hover:text-primary transition-colors" */}
                    {/*     > */}
                    {/*       {website} */}
                    {/*     </a> */}
                    {/*   </div> */}
                    {/* )} */}

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <SiGmail className="h-5 w-5 text-primary" />
                      </div>
                      <a
                        href={`mailto:chengjiepeng90@gmail.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        Chengjie
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Connect With Me</h3>
                  <p className="text-muted-foreground">
                    Follow me on social media to stay updated with my latest
                    projects and activities.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </a>
                    </Button>

                    {twitter && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        <a
                          href={twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-5 w-5" />
                          <span>Twitter</span>
                        </a>
                      </Button>
                    )}

                    {linkedin && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        <a
                          href={linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span>LinkedIn</span>
                        </a>
                      </Button>
                    )}

                    {email && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        <a href={`mailto:${email}`}>
                          <Mail className="h-5 w-5" />
                          <span>Email</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
