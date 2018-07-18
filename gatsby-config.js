const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `Pavel Demyanenko\`s Programming Blog`,
    author: `Pavel Demyanenko`,
    description: `Blog about Full-stack Software Development. Clean code, Design patterns, Java, Spring, Javascript, Angular, React and more.`,
    siteUrl: `https://www.paveldemyanenko.com/blog`,
  },
  pathPrefix: `/`,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-copy-linked-files`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 540,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-58342253-1`,
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [`/preview/**`, `/do-not-track/me/too/`],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
          siteUrl: `https://www.paveldemyanenko.com/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: path.resolve(__dirname, `src/blog`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
          name: `Pavel Demyanenko\`s Programming Blog`,
          short_name: `Pavel Demyanenko\`s Programming Blog`,
          start_url: `https://www.paveldemyanenko.com/blog`,
          background_color: `#fff`,
          theme_color: `#007acc`,
          display: `minimal-ui`,
          icons: [
              {
                  src: `/favicons/favicon.png`,
                  sizes: `64x64`,
                  type: `image/png`,
              },
              {
                  src: `/favicons/640x640.png`,
                  sizes: `640x640`,
                  type: `image/png`,
              }
          ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
  ],
}
