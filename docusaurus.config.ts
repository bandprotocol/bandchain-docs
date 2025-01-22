import type { Config } from '@docusaurus/types'

const { themes } = require('prism-react-renderer')
const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const config: Config = {
  title: 'Band Protocol',
  tagline:
    'Band Protocol is a cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.bandchain.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bandprotocol', // Usually your GitHub org/user name.
  projectName: 'bandchain-docs-v2', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  // themes: ['@docusaurus/theme-search-algolia'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // gtag: {
        //   trackingID: 'G-DCFFR6X15E',
        //   anonymizeIP: true,
        // },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    // only enabled on production
    // [
    // '@docusaurus/plugin-google-gtag',
    // {
    //   trackingID: 'G-DCFFR6X15E',
    //   anonymizeIP: true,
    // },
    // ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/products/band-standard-dataset/using-band-standard-dataset/contract',
            from: ['/band-standard-dataset/using-band-dataset/using-band-dataset-evm.html'],
          },
          {
            to: '/products/band-standard-dataset/using-band-standard-dataset/client',
            from: ['/band-standard-dataset/using-band-dataset/using-band-dataset-web.html'],
          },
          {
            to: '/products/pricefeed-module/introduction',
            from: ['/integration-tools/pricefeed-module/introduction.html'],
          },
          {
            to: '/products/vrf/supported-blockchains',
            from: ['/vrf/supported-blockchains.html'],
          },
          {
            to: '/node-validators/run-node/joining-testnet/getting-started',
            from: ['/joining-networks/joining-testnet.html'],
          },
          {
            to: '/node-validators/run-node/joining-mainnet/getting-started',
            from: ['/joining-networks/joining-mainnet.html'],
          },
        ],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: 'img/Thumbnail_Doc.png',
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Band Protocol',
        logo: {
          alt: 'Band Protocol Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          // type: 'docSidebar',
          // sidebarId: 'tutorialSidebar',
          // position: 'left',
          // label: 'Tutorial',
          // },
          {
            href: 'https://github.com/bandprotocol/chain',
            position: 'right',
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="github-icon">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.300049C5.4 0.300049 0 5.70005 0 12.3001C0 17.6001 3.4 22.1001 8.2 23.7001C8.8 23.8001 9 23.4001 9 23.1001C9 22.8001 9 22.1001 9 21.1001C5.7 21.8001 5 19.5001 5 19.5001C4.5 18.1001 3.7 17.7001 3.7 17.7001C2.5 17.0001 3.7 17.0001 3.7 17.0001C4.9 17.1001 5.5 18.2001 5.5 18.2001C6.6 20.0001 8.3 19.5001 9 19.2001C9.1 18.4001 9.4 17.9001 9.8 17.6001C7.1 17.3001 4.3 16.3001 4.3 11.7001C4.3 10.4001 4.8 9.30005 5.5 8.50005C5.5 8.10005 5 6.90005 5.7 5.30005C5.7 5.30005 6.7 5.00005 9 6.50005C10 6.20005 11 6.10005 12 6.10005C13 6.10005 14 6.20005 15 6.50005C17.3 4.90005 18.3 5.30005 18.3 5.30005C19 7.00005 18.5 8.20005 18.4 8.50005C19.2 9.30005 19.6 10.4001 19.6 11.7001C19.6 16.3001 16.8 17.3001 14.1 17.6001C14.5 18.0001 14.9 18.7001 14.9 19.8001C14.9 21.4001 14.9 22.7001 14.9 23.1001C14.9 23.4001 15.1 23.8001 15.7 23.7001C20.5 22.1001 23.9 17.6001 23.9 12.3001C24 5.70005 18.6 0.300049 12 0.300049Z" fill="currentColor"/>
            </svg>
            `,
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            items: [
              {
                html: `<a href="https://bandprotocol.com"><img src="/img/logo-full-dark.svg" alt="Band Protocol logo" width="180"  class="logo-dark" /><img src="/img/logo-full-light.svg" alt="Band Protocol logo" width="180" class="logo-light"/></a>`,
              },
            ],
          },
          {
            title: 'Explore',
            items: [
              {
                label: 'About Us',
                to: 'https://bandprotocol.com',
              },
              {
                label: 'Cosmoscan',
                to: 'https://cosmoscan.io',
              },
              {
                label: 'Band Standard Dataset',
                to: 'https://data.bandprotocol.com',
              },
              {
                label: 'Band Bootcamp',
                to: 'https://bootcamp.bandprotocol.com',
              },
              {
                label: 'Band Builder',
                to: 'https://builder.bandprotocol.com',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Band Partners',
                href: 'https://www.bandpartners.io/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/BandProtocol',
              },
              {
                label: 'Discord',
                href: 'https://discord.bandprotocol.com',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/bandprotocol',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/bandprotocol',
              },
              {
                label: 'Forum',
                href: 'https://forum.bandprotocol.com',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.bandprotocol.com',
              },
              {
                label: 'CoinMarketCap',
                href: 'https://coinmarketcap.com/currencies/band-protocol',
              },
              {
                label: 'CoinGecko',
                href: 'https://www.coingecko.com/en/coins/band-protocol',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Band Protocol. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['rust', 'solidity', 'python', 'bash'],
      },
      algolia: {
        appId: 'TVYAB9F349',
        apiKey: 'fb64695755dbc69a009bc2d47a832fb0',
        indexName: 'bandchain',
        contextualSearch: false,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        },
      },
    },
}

module.exports = config
