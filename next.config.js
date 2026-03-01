/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vinjs-jm',
  // Ensure static assets are served from the repo subpath when deployed to GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vinjs-jm' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [
      require('path').join(__dirname, 'assets', 'styles'),
      require('path').join(__dirname, 'node_modules'),
    ],
  },
};

module.exports = nextConfig;
