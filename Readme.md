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
│   ├── STYLE_REFRENCE.md
│   ├── EMAILJS_SETUP.md
│   └── GITHUB_ACTIONS_SETUP.md
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

## Integrations

### Google Analytics 4
- **Configuration**: Environment variable `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- **Tracking**: Page views, custom events, user interactions
- **Privacy**: GDPR-compliant with user consent management
- **Dashboard**: Real-time analytics and conversion tracking

### Supabase
- **Purpose**: Visitor analytics, contact form submissions, data storage
- **Setup**: SSR-compatible client with middleware for session management
- **Database**: PostgreSQL with real-time capabilities
- **Security**: Row Level Security (RLS) and API key management

### Contentful CMS (Planned)
- **Content Management**: Projects, blog posts, and dynamic content
- **API**: REST API with CDN caching
- **Integration**: Static site generation with content updates
- **Workflow**: Editorial workflow with content scheduling

### EmailJS
- **Contact Forms**: Client-side email sending without backend
- **Configuration**: Service ID, template ID, and public key
- **Security**: Public key exposure acceptable for client-side operations

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

### Local validation

```bash
npm run test
```

### CI Validation

The GitHub Actions workflow now:
- creates `.env.local` from repo secrets
- validates GA4, Supabase, and EmailJS configuration before build
- builds the static site
- deploys to GitHub Pages
- runs a post-deploy validation job using repo secrets again

### Preview Production Build

```bash
npx serve out
```

## Service Capabilities

With the current integrations (Google Analytics 4, Supabase, EmailJS, and planned Contentful), you can achieve:

### Analytics & Tracking
- **User Behavior Analysis**: Track page views, user journeys, and engagement metrics
- **Conversion Tracking**: Monitor CV downloads, contact form submissions, and project clicks
- **Real-time Insights**: Live user activity and traffic analysis
- **GDPR Compliance**: Consent-based tracking with data retention policies

### Data Management
- **Visitor Analytics**: Store session data, user interactions, and demographic information
- **Contact Form Handling**: Secure storage of form submissions with backup
- **Content Management**: Dynamic project portfolios and blog posts via CMS
- **Real-time Updates**: Live content updates without redeployment

### User Interaction
- **Contact Forms**: Professional contact handling with email notifications
- **File Downloads**: Trackable CV downloads with analytics
- **Social Integration**: LinkedIn, GitHub, and other professional profiles
- **Interactive Elements**: Animated hero sections and responsive navigation

### Business Intelligence
- **Performance Metrics**: Site performance, user engagement, and conversion rates
- **Content Analytics**: Popular projects, blog post engagement, and user preferences
- **Lead Generation**: Contact form submissions with follow-up capabilities
- **SEO Optimization**: Content optimization based on analytics data

## Implementation Guide

This guide frames portfolio development through the lens of software development lifecycle (SDLC), best practices, implementation criteria, and CI/CD quality gates.

### Purpose

The implementation guide is not just a technical recipe. It is a reference for:

- Architecture decisions
- Quality criteria
- Testing and deployment strategy
- Documentation alignment
- Design and implementation consistency

### Core Principles

#### 1. Maintainability

- Use BEM for CSS class structure
- Keep UI and styles separated
- Avoid inline styling for reusable components
- Keep `app/page.tsx` readable and section-focused

#### 2. Consistency

- Follow the color palette defined in `docs/STYLE_REFRENCE.md`
- Use the same spacing, typography, and interaction patterns
- Keep repeated UI patterns consistent across sections

#### 3. Simplicity

- Prefer static assets in `public/`
- Use simple download links for CV files
- Avoid unnecessary JS or runtime dependencies

#### 4. Testability

- Ensure the build passes with `npm run build`
- Validate GitHub Pages base path behavior
- Confirm asset loading in production output
- Preserve the contact form flow through smoke tests

### SDLC for Portfolio Enhancements

#### Phase 1: Requirements

- Define the user journey for hero, about, projects, blog, and contact
- Confirm which features are mandatory: CV downloads, contact form, responsive layout
- Identify deployment constraints: GitHub Pages subdirectory, static export

#### Phase 2: Design

- Map sections to BEM blocks and elements
- Define the color palette and interactive styles
- Ensure the layout works on desktop and mobile
- Documented in `docs/STYLE_REFRENCE.md`

#### Phase 3: Development

- Implement UI in `app/page.tsx`
- Implement styling in `app/globals.css`
- Store static assets in `public/`
- Keep documentation current in `docs/`

#### Phase 4: Testing

- Local build test: `npm run build`
- Browser validation of built output
- GitHub Pages deployed path checking
- Download link validation on deployed site
- Contact form behavior verification in staging or preview

#### Phase 5: Deployment

- Run GitHub Actions workflow from `docs/GITHUB_ACTIONS_SETUP.md`
- Use secrets securely in GitHub Actions
- Avoid committing `.env.local`

#### Phase 6: Monitoring

- Review GitHub Actions logs
- Validate the live site on deployment
- Update documentation with any discovered issues

### Implementation Criteria

#### Feature readiness

- The portfolio should be visually complete and responsive
- All sections should render correctly in the static build
- Navigation should work with anchor links and page reloads
- Download links must be functional on deployed site

#### Quality gates

- All markdown docs should be available from `docs/`
- CSS should be loaded and animations should function in production
- The `basePath` configuration must be correct for GitHub Pages
- Accessibility and contrast should meet basic WCAG AA standards

#### Acceptance criteria

- `npm run build` succeeds with no errors
- Deployed site loads CSS and images correctly
- Form submission uses a safe, documented integration path
- CV file downloads work via the public asset links

### CI/CD Testing Strategy

The CI/CD pipeline should validate both generic static site behavior and feature-specific cases.

#### Static site tests

- Build completion
- Output generation in `out/`
- No broken links or missing assets
- Correct `basePath` behavior on GitHub Pages

#### Feature tests

- CV download links should be accessible in the static output
- Hero, project, blog, and contact sections should display properly
- Contact form route or service endpoint should be reachable
- Social and external links should resolve correctly

#### Deployment validation

- Live site should be reachable at `https://abadAfonsoJaime.github.io/portfolio/`
- Styles should apply after deployment
- Image assets should be loaded under `/portfolio/`

### Best Practices

#### Documentation-first development

- Keep notes and decision rationale in `docs/`
- Use `docs/Style_Reference.md` for implementation guidance
- Update docs whenever design or behavior changes

#### GitHub Pages readiness

- Use `basePath: '/portfolio'` in `next.config.js`
- Verify that paths in `app/page.tsx` reference `/portfolio/` for deployed assets
- Confirm the site works when refreshed on nested routes

#### Security

- Keep secrets in GitHub Actions only
- Do not commit `.env.local`
- Use public-friendly EmailJS IDs only if needed

### Implementation Paths

#### Contact form options

1. **Web3Forms** — Fastest no-backend option
2. **Formspree** — Email forwarding without server code
3. **EmailJS** — Client-side email service with a public key
4. **Serverless API** — Custom backend route if deeper control is required

#### CV download options

1. **Static PDF / DOCX** in `public/`
2. **External cloud link** (Drive/Dropbox)
3. **Event-tracked download** with analytics

### Annex References

- `docs/STYLE_REFRENCE.md` — BEM conversion rules, color palette, and section structure
- `docs/EMAILJS_SETUP.md` — EmailJS client integration and credential setup
- `docs/GITHUB_ACTIONS_SETUP.md` — GitHub Actions deployment workflow for GitHub Pages

### Notes on Existing Implementation

The current implementation includes multiple CV formats, EmailJS integration guidance, and a GitHub Actions deployment workflow. Reference service-specific setup only after the core static site and CI/CD testing criteria are satisfied.

### Appendix: Common Implementation Patterns

#### Static CV download

```html
<a href="/JaimeAbad_CV_2026.pdf" download="JaimeAbad_CV_2026.pdf" class="button-group__btn button-group__btn--active">
  Download CV
</a>
```

#### Static site build check

```bash
npm run build
```

#### GitHub Pages production URL check

- `https://abadAfonsoJaime.github.io/portfolio/`
- `https://abadAfonsoJaime.github.io/portfolio/#contact`

---

## Quick Commands

```bash
npm install
npm run dev
npm run build
```

## License

This project is open source and available under the MIT License.
