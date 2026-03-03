/** @type {import('next').NextConfig} */
const nextConfig = {
  // For static export compatibility with older `next export` behavior
  // Next 14 uses `output: 'export'` to produce an `out/` static folder on build.
  output: 'export',
  basePath: '',
  // Ensure static assets are served from root when deployed to production
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  images: {
    // When deploying static `out/` the Next.js optimizer is unavailable.
    // For static export (gh-pages) set this to true to avoid optimizer expectations.
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
