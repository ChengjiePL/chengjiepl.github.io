import { Github, Gmail, Linkedin } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  username: string;
}

export default function Footer({ username }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Chengjie Peng Lin. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="mailto:chengjiepeng90@gmail.com" aria-label="Email">
              <Gmail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/chengjie-peng/"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
