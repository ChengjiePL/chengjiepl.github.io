/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Add these two lines - replace REPO_NAME with your actual repository name
  basePath: "/portfolio",
  assetPrefix: "/portfolio",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Disable unnecessary features for static sites
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
