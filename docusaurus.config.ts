import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Docusaurus supports custom navbar item types at runtime, but its TS config
// types don't include them yet.
const techNotesNavbarItem = {
  type: "custom-tech-notes",
  sidebarId: "tutorialSidebar",
  position: "left",
  label: "Apuntes técnicos",
} as any;

const config: Config = {
  title: "Código & Pasta",
  tagline: "Reflexiones sobre desarrollo de software, producto y negocio.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: "https://antoniohumanes.com",
  baseUrl: "/",
  trailingSlash: false,
  organizationName: "ToniHumanes",
  projectName: "code-and-pasta",

  onBrokenLinks: "throw",

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/inter-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  scripts: [
    {
      src: "https://cloud.umami.is/script.js",
      defer: true,
      "data-website-id": "453a55cb-15ac-4100-a7c1-d4c6f90676ec",
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          versions: {
            current: {
              noIndex: true,
            },
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/ToniHumanes/code-and-pasta/tree/main",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/ToniHumanes/code-and-pasta/tree/main/blog/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          ignorePatterns: ["/docs", "/docs/**"],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/fallback-post-image.webp",
    metadata: [
      {
        name: "author",
        content: "Antonio Humanes",
      },
      {
        name: "keywords",
        content:
          "desarrollo de software, frontend, React, TypeScript, producto, negocio, arquitectura",
      },
      {
        property: "og:site_name",
        content: "Código & Pasta",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Código & Pasta",
      items: [
        techNotesNavbarItem,
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/about-me", label: "¿Quién soy?", position: "left" },
        { to: "/roadmap", label: "Roadmap", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Contacto",
          items: [
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/antoniohumanes/",
            },
            {
              label: "Email",
              href: "mailto:antoniohumanespacheco@gmail.com",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/ToniHumanes/",
            },
            {
              label: "Codepen",
              href: "https://codepen.io/Antoniofront",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Antonio Humanes Pacheco.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
