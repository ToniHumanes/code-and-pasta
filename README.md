# Código & Pasta

Personal website and technical blog by Antonio Humanes. The project brings
together articles, technical notes, interactive demos, and personal pages built
with Docusaurus.

## Stack

- [Docusaurus](https://docusaurus.io/) as the static site generator.
- React and TypeScript for pages, components, and demos.
- MDX for documentation and blog posts.
- CSS Modules and custom CSS for styling.
- Vercel as the deployment platform.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

Starts the Docusaurus development server with hot reloading.

## Validation

```bash
npm run typecheck
npm run optimize-images:check
npm run build
```

`npm run build` generates the static site in the `build` directory.

To preview the production build locally:

```bash
npm run serve
```

## Images

The repository includes a check to ensure images are optimized:

```bash
npm run optimize-images:check
```

To optimize them automatically:

```bash
npm run optimize-images
```

## Deployment

Deployment runs automatically on Vercel from the `main` branch.

Expected Vercel configuration:

- Build command: `npm run build`
- Output directory: `build`
- Install command: `npm ci`

GitHub Actions remains as CI: it validates pull requests and pushes to `main`,
but it does not publish the site.
