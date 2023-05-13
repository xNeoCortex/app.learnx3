/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [{
      source: '/:any*',
      destination: '/',
    }, ];
  },

}

module.exports = nextConfig