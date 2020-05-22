const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Covid Countdown - Esta pandemia tem os dias contados`,
    description: `Um contador para o fim do distanciamento social, que todos dias recalcula a data do fim das medidas, com base em diversas fontes de dados oficiais. Todos os dias teremos uma nova previsão de quanto tempo falta para podermos voltar a vibrar num estádio de futebol, gritar num concerto ou dançar numa discoteca.`,
    author: `COMON Group`,
    siteUrl: `https://covidcountdown.today/`,
    siteImg: `https://covidcountdown.today/images/share_img.jpeg`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-29763534-8',
        head: true,
      },
    },
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.gray['400'],
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    // `gatsby-plugin-offline`,
  ],
};
