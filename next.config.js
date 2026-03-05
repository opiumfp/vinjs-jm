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
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '0',
  },
  sassOptions: {
    includePaths: [
      require('path').join(__dirname, 'assets', 'styles'),
      require('path').join(__dirname, 'node_modules'),
    ],
  },
};

module.exports = nextConfig;
