/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  // Ensure static assets are served from root when deployed to production
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
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
