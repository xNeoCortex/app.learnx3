/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  reactStrictMode: true,
  async rewrites() {
    return [{
      source: '/:any*',
      destination: '/',
    }, ];
  },

}

module.exports = nextConfig