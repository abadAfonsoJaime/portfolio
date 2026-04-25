# Portfolio Site - Jaime Abad

Professional responsive portfolio built with Next.js static site generation (SSG), React 19, TypeScript, and BEM CSS methodology. Designed for zero-runtime deployment with optimized performance, SEO, and GitHub Pages compatibility.

## Project Structure

```
/portfolio
├── app/
│   ├── layout.tsx    # Root layout with metadata & Font Awesome CDN
│   ├── page.tsx      # Home page - client component with React state
│   └── globals.css   # BEM methodology styles (all sections)
├── public/           # Static assets (images, CV, etc.)
│   ├── paella_20190420.jpg
│   ├── JaimeAbad_CV_2026.pdf
│   └── JaimeAbad_CV_2026.docx
├── docs/             # Documentation and implementation references
│   ├── Style_Reference.md
│   ├── EMAILJS_SETUP.md
│   ├── GITHUB_ACTIONS_SETUP.md
│   └── IMPLEMENTATION_GUIDE.md
├── out/              # Static export output (after build)
├── .github/
│   └── copilot-instructions.md  # AI agent guidance
├── next.config.js    # Static export configuration
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── Readme.md         # This file
```

## Tech Stack

- **Next.js 16**: App Router with static export (`output: 'export'`)
- **React 19**: Client components for interactivity
- **TypeScript**: Type-safe development with strict mode enabled
- **BEM CSS**: Block Element Modifier methodology for maintainable styles
- **CDN Libraries**:
  - Font Awesome 6.0 (icons)
  - Typed.js 2.0.10 (hero typing animation)

## Why This Approach

- **Linux-friendly**: No runtime server required
- **Static-ready**: Works on GitHub Pages, Netlify, S3, and any CDN
- **SEO-friendly**: Pre-rendered static markup
- **Maintainable**: Clear separation of UI, styles, assets, and docs
- **Documentation-first**: All implementation references are centralized in `docs/`

## Documentation Organization

This repository now has a dedicated documentation folder for markdown references.

- [docs/STYLE_REFRENCE.md](docs/STYLE_REFRENCE.md) — BEM methodology, color palette, and sections implementation
- [docs/EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md) — EmailJS form deployment configuration
- [docs/GITHUB_ACTIONS_SETUP.md](docs/GITHUB_ACTIONS_SETUP.md) — GitHub Pages CI/CD workflow
- [docs/IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md) — Best practices, SDLC, testing, and implementation criteria

## Configuration

```js
// next.config.js
const nextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  basePath: '/portfolio',     // Required for GitHub Pages subdirectory
  trailingSlash: true,        // Add trailing slashes to URLs
  images: {
    unoptimized: true,        // Required for static export
  },
}

module.exports = nextConfig
```

> `basePath: '/portfolio'` is required for GitHub Pages deployment at `https://abadAfonsoJaime.github.io/portfolio/`. If you move to a custom domain or root URL, remove this setting.

## Build & Deploy

### Local Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npx serve out
```

## SDLC & Implementation Guidance

Before diving into `EMAILJS_SETUP.md` or `GITHUB_ACTIONS_SETUP.md`, the implementation should be governed by a sound SDLC and CI/CD testing plan.

### Recommended workflow

1. **Plan**
   - Define goals for contact form, CV download, and project showcase
   - Identify deployment targets and GitHub Pages constraints

2. **Design**
   - Use BEM for CSS structure and maintainable class naming
   - Apply the color palette consistently across sections
   - Verify responsive breakpoints and visual hierarchy

3. **Develop**
   - Keep code modular and document feature scope
   - Use `public/` for static assets and `docs/` for reference material
   - Avoid hard-coded paths by using the correct GitHub Pages base path

4. **Test**
   - Build locally with `npm run build`
   - Validate that CSS, animations, and downloads work in the built output
   - Confirm GitHub Pages deployment path and asset URLs
   - Add CI/CD smoke tests for static export and form flows

5. **Deploy**
   - Use GitHub Actions for automated deployment
   - Keep secrets in GitHub Actions only
   - Verify site functionality after each deployment

6. **Monitor**
   - Review build logs and GitHub Actions results
   - Inspect live site for asset load issues and form behavior
   - Update docs as needed whenever the implementation changes

### CI/CD Testing Criteria

CI/CD should cover these scenarios before service-specific setup:

- Static export succeeds without errors
- Asset paths resolve to `/portfolio/` on GitHub Pages
- CSS and animation resources load correctly in production
- Download links resolve to static files in `public/`
- Navigation and route refresh work on deployed site
- Form submission path is available and returns expected status

For GitHub Pages, test cases should include:

- `https://abadAfonsoJaime.github.io/portfolio/`
- Page refresh on nested routes
- Asset loading under `/portfolio/`
- Download links from deployed origin

## Annex

The following annex files contain detailed reference material:

- `docs/BEM_CONVERSION_GUIDE.md` — BEM methodology and conversion patterns
- `docs/COLOR_PALETTE.md` — Theme color system and accessibility checks

## Additional Documentation

- `docs/EMAILJS_SETUP.md` — EmailJS client integration and credential setup
- `docs/GITHUB_ACTIONS_SETUP.md` — GitHub Actions deployment workflow for GitHub Pages
- `docs/IMPLEMENTATION_GUIDE.md` — Implementation practices, testing, and SDLC guidance
- `docs/PERSONALIZATION_COMPLETE.md` — Personalization summary from CV data
- `docs/SECTIONS_GUIDE.md` — Section structure and nav flow reference

---

## Quick Commands

```bash
npm install
npm run dev
npm run build
```

## License

This project is open source and available under the MIT License.
