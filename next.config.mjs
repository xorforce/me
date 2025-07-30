/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Only use basePath and assetPrefix for GitHub Pages when not using a custom domain
  basePath: process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY?.includes('/') ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || ''}` : '',
  assetPrefix: process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY?.includes('/') ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || ''}` : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    loader: 'default',
    domains: [],
    remotePatterns: [],
  },
};

export default nextConfig;
