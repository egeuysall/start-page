/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats.hackclub.dev",
      },
    ],
  },
};

module.exports = nextConfig;
