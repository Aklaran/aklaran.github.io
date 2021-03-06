module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `Bo Tembunkiart`,
    description: `Is it cool if I have no idea what I'm doing? Cool.`,
    author: `@aklaran`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/md`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bo Tembunkiart`,
        short_name: `Aklaran`,
        start_url: `/`,
        background_color: `#932354`,
        theme_color: `#932354`,
        display: `minimal-ui`,
        icon: `src/images/akla_wolf.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/js/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/images/svg`,
        },
      },
    },
  ],
}
