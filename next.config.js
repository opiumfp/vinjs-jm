/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vinjs-jm',
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
