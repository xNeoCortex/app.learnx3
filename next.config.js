/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  async rewrites() {
    return [{
      source: '/:any*',
      destination: '/',
    }, ];
  },

}

module.exports = nextConfig