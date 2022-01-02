// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Vinnytsia JS',
  // siteUrl: 'http://vinnytsiajs.org',
  // pathPrefix: '/tmp',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/conf/**/*.md',
        typeName: 'Conf',
        resolveAbsolutePaths: true,
        remark: {}
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/conf/speakersData/**/*.md',
        typeName: 'Speakersdata',
        resolveAbsolutePaths: true,
        remark: {}
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/policy/**/*.md',
        typeName: 'Policy',
        resolveAbsolutePaths: true,
        remark: {}
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/nav/**/*.md',
        typeName: 'Nav',
        resolveAbsolutePaths: true,
        remark: {}
      }
    }
  ],
  transformers: {
    remark: {
      // global remark options
    }
  }
}
