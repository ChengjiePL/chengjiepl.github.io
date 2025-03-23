// GitHub API types
export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  topics: string[]
  visibility: string
}

// Default mock data to use when API fails or for initial loading
export const defaultUser: Partial<GitHubUser> = {
  login: "ChengjiePL",
  name: "Chengjie",
  avatar_url: "/placeholder.svg?height=400&width=400",
  bio: "Software Developer & GitHub Enthusiast",
  public_repos: 10,
  followers: 5,
  html_url: "https://github.com/ChengjiePL",
}

export const defaultRepos: Partial<GitHubRepo>[] = Array(6)
  .fill(0)
  .map((_, i) => ({
    id: i,
    name: `Project ${i + 1}`,
    description: "Project description will appear here once loaded.",
    html_url: "https://github.com/ChengjiePL",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    topics: [],
  }))

// Improved fetch function with better caching and error handling
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  // Use Next.js cache for better performance
  const response = await fetch(`https://api.github.com/users/${username}`, {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: [`github-user-${username}`],
    },
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  }).catch((error) => {
    console.error("Error fetching GitHub user:", error)
    return new Response(JSON.stringify(defaultUser), { status: 200 })
  })

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status}`)
    return defaultUser as GitHubUser
  }

  try {
    return await response.json()
  } catch (error) {
    console.error("Error parsing GitHub user data:", error)
    return defaultUser as GitHubUser
  }
}

// Optimized repo fetching with limit parameter
export async function fetchGitHubRepos(username: string, limit = 6): Promise<GitHubRepo[]> {
  // Only fetch what we need to display
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`, {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: [`github-repos-${username}`],
    },
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  }).catch((error) => {
    console.error("Error fetching GitHub repos:", error)
    return new Response(JSON.stringify(defaultRepos), { status: 200 })
  })

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status}`)
    return defaultRepos as GitHubRepo[]
  }

  try {
    return await response.json()
  } catch (error) {
    console.error("Error parsing GitHub repos data:", error)
    return defaultRepos as GitHubRepo[]
  }
}

