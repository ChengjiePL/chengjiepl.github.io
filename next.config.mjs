/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for GitHub Pages
  output: 'export',
  
  // Configure image optimization
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
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

