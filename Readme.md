# Portfolio Site - Jaime Abad

Professional responsive portfolio built with Next.js 16 static site generation (SSG), React 19, TypeScript, and BEM CSS methodology. Features AI-powered content management through Contentful CMS, visitor analytics with Supabase, and integrated contact forms with EmailJS. Designed for zero-runtime deployment with optimized performance, SEO, and GitHub Pages compatibility.

## Features

- ✅ **Static Site Generation** — Next.js with zero-runtime deployment
- ✅ **Headless CMS** — Contentful integration for blog posts and projects
- ✅ **AI-Powered Management** — Agents can manage both code and content
- ✅ **Analytics** — Google Analytics 4 and Supabase visitor tracking
- ✅ **Contact Forms** — EmailJS integration for secure form submissions
- ✅ **Responsive Design** — Mobile-first BEM CSS methodology
- ✅ **CI/CD Pipeline** — GitHub Actions with automated validation
- ✅ **TypeScript** — Type-safe development with strict mode

## Project Structure

```
/portfolio
├── app/
│   ├── layout.tsx              # Root layout with metadata & CDN scripts
│   ├── page.tsx                # Home page - client component with state
│   └── globals.css             # BEM CSS methodology (all sections)
├── lib/
│   ├── contentful.ts           # Content Delivery API (read)
│   ├── contentful-management.ts    # Management API client (write)
│   ├── contentful-blog-management.ts    # Blog post CRUD
│   ├── contentful-projects-management.ts # Project CRUD
│   ├── supabase.ts             # Supabase client & analytics
│   ├── analytics.ts            # GA4 tracking functions
│   └── emailjs.ts              # EmailJS form handler
├── scripts/
│   └── contentful-cli.ts       # CLI for agent-driven content management
├── public/
│   ├── paella_20190420.jpg
│   ├── JaimeAbad_CV_2026.pdf
│   └── JaimeAbad_CV_2026.docx
├── test/
│   └── connections.js          # Pre-deployment validation
├── docs/
│   ├── DEPLOYMENT_GUIDE.md         # Complete deployment walkthrough
│   ├── CONTENTFUL_INTEGRATION.md   # CMS setup and content models
│   ├── CONTENTFUL_MANAGEMENT_API.md # Agent CLI reference
│   ├── AGENT_QUICK_REFERENCE.md    # One-page agent cheatsheet
│   ├── GITHUB_ACTIONS_SETUP.md     # CI/CD configuration
│   ├── EMAILJS_SETUP.md            # Contact form integration
│   ├── STYLE_REFRENCE.md           # BEM CSS and design system
│   ├── MAINTENANCE_OPERATIONS.md   # Operational procedures
│   └── SCALABILITY_GUIDE.md        # Performance optimization
├── .github/
│   ├── copilot-instructions.md     # Agent task guidance
│   ├── AGENT_INSTRUCTIONS.md       # Agent capabilities overview
│   └── workflows/
│       ├── deploy.yml              # Main CI/CD pipeline
│       └── contentful-sync.yml     # Content management workflow
├── next.config.js              # Static export configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── Readme.md                   # This file
```

## Tech Stack

- **Next.js 16**: App Router with static export (`output: 'export'`)
- **React 19**: Client components for interactivity  
- **TypeScript**: Type-safe development with strict mode
- **BEM CSS**: Block Element Modifier methodology for maintainable styles
- **CDN Libraries**:
  - Font Awesome 6.0 (icons)
  - Typed.js 2.0.10 (hero typing animation)

## Integrations

### Google Analytics 4
- Real-time tracking of page views and user interactions
- GDPR-compliant consent management
- Dashboard: https://analytics.google.com
- **Environment Variable**: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

### Supabase (PostgreSQL)
- Visitor session tracking and analytics
- Contact form submission storage  
- Real-time database capabilities
- SSR-compatible client with middleware
- **Environment Variables**: 
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Contentful CMS (Headless)
- Blog posts with metadata (title, slug, excerpt, content, category, tags, featured flag)
- Project entries with details (title, slug, description, technologies, type, demo/GitHub links)
- Content Delivery API (CDN-cached reads)
- **Management API** with agent-driven CRUD operations
- **Environment Variables**:
  - `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
  - `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
  - `CONTENTFUL_MANAGEMENT_TOKEN` (GitHub Secrets only)

### EmailJS
- Client-side contact form handling
- No backend server required
- Secure template-based email delivery
- **Environment Variables**:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Getting Started

### Prerequisites
- Node.js 20+ and npm
- Git
- (Optional) Accounts for Contentful, Supabase, Google Analytics 4, and EmailJS

### Local Development

```bash
# Clone and install
git clone https://github.com/abadAfonsoJaime/portfolio.git
cd portfolio
npm install

# Copy environment template
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Start dev server (with hot reload)
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
# Build static site (generates /out directory)
npm run build

# Validate configuration before deployment
npm run test

# Preview production build locally
npx serve out
```

## AI Agent Integration

The portfolio now supports AI agents that can manage both code and content:

### Agent Capabilities

Agents can:
- **Create/update blog posts** in Contentful
- **Create/update projects** in Contentful
- **List existing content** to prevent duplicates
- **Modify code** to reference new content
- **Execute unified workflows** (content + code in one task)

### Agent Commands

```bash
# List and create blog posts
npm run script -- contentful:list-blogs
npm run script -- contentful:create-blog --title "Post" --slug "post-slug" --category "Engineering" --excerpt "Summary" --content "Markdown content"
npm run script -- contentful:update-blog --id "entry-id" --title "Updated Title"

# List and create projects
npm run script -- contentful:list-projects
npm run script -- contentful:create-project --title "Project" --slug "project-slug" --description "Overview" --technologies "React, TypeScript" --type "Open Source"
npm run script -- contentful:update-project --id "entry-id" --title "Updated Title"
```

**Agent Documentation**: See [.github/copilot-instructions.md](.github/copilot-instructions.md) and [docs/AGENT_QUICK_REFERENCE.md](docs/AGENT_QUICK_REFERENCE.md)

## Configuration

### Next.js Configuration
```js
// next.config.js
const nextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  basePath: '/portfolio',     // GitHub Pages subdirectory
  trailingSlash: true,        // Add trailing slashes
  images: {
    unoptimized: true,        // Required for static export
  },
}
module.exports = nextConfig
```

> **Note**: `basePath: '/portfolio'` is required for GitHub Pages deployment at `https://abadAfonsoJaime.github.io/portfolio/`. Remove for custom domains or root URLs.

### Environment Setup

**Local Development** (`.env.local`):
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-key
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your-space-id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your-token
# CONTENTFUL_MANAGEMENT_TOKEN not needed locally
```

**GitHub Secrets** (for CI/CD):
- `GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
- `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_MANAGEMENT_TOKEN` (for agent write operations)

**Setup Guide**: See [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for detailed API key retrieval instructions.

## CI/CD Pipeline

GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. **Build** — Compile Next.js with static export
2. **Test** — Validate GA4, Supabase, EmailJS, and Contentful credentials
3. **Deploy** — Upload static assets to GitHub Pages
4. **Validate** — Post-deploy smoke tests

**Manual Workflows**:
- `.github/workflows/contentful-sync.yml` — Manual content management operations (list-blogs, list-projects, deploy)

Trigger deployments via:
```bash
git push main  # Automatic
# or GitHub UI > Actions > Run workflow
```

## Implementation Guide

### Maintainability
- Use BEM for CSS class structure (`.block__element--modifier`)
- Keep UI and styles separated
- Avoid inline styling
- Keep components focused and readable

### Consistency
- Follow color palette: `#007ced` (primary), `#222` (dark), `#e5e5e5` (light)
- Use consistent spacing and typography
- Maintain interaction patterns across sections

### Simplicity
- Prefer static assets in `public/`
- Use simple download links
- Avoid unnecessary JavaScript dependencies

### Testability
- Ensure `npm run build` passes
- Validate asset loading on deployed site
- Test form submissions and analytics tracking

## Documentation

Key references for implementation and deployment:

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) | Complete setup walkthrough for all integrations |
| [CONTENTFUL_INTEGRATION.md](docs/CONTENTFUL_INTEGRATION.md) | CMS content models and API usage |
| [CONTENTFUL_MANAGEMENT_API.md](docs/CONTENTFUL_MANAGEMENT_API.md) | Agent CLI reference and workflows |
| [AGENT_QUICK_REFERENCE.md](docs/AGENT_QUICK_REFERENCE.md) | One-page cheatsheet for agents |
| [GITHUB_ACTIONS_SETUP.md](docs/GITHUB_ACTIONS_SETUP.md) | CI/CD workflow configuration |
| [STYLE_REFRENCE.md](docs/STYLE_REFRENCE.md) | BEM CSS and design system reference |
| [EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md) | Contact form integration details |
| [MAINTENANCE_OPERATIONS.md](docs/MAINTENANCE_OPERATIONS.md) | Regular operational tasks |
| [SCALABILITY_GUIDE.md](docs/SCALABILITY_GUIDE.md) | Performance optimization strategies |

## Why This Architecture

- **Linux-friendly** — No Node.js runtime required
- **Static-ready** — Works on GitHub Pages, Netlify, S3, and any CDN
- **SEO-optimized** — Pre-rendered static markup for search engines
- **Maintainable** — Clear separation of concerns (UI, styles, assets, docs)
- **Secure** — Sensitive tokens stored in GitHub Secrets only
- **Agent-ready** — Structured for AI-powered content and code management

## Development Workflow

### Adding a New Section
1. Create BEM classes in `app/globals.css` (`.section-name`, `.section-name__element`)
2. Add React component to `app/page.tsx`
3. Apply color palette from `docs/STYLE_REFRENCE.md`
4. Test with `npm run build`
5. Update docs if design changes

### Adding Blog Posts
1. Use the Contentful UI or CLI:
   ```bash
   npm run script -- contentful:create-blog \
     --title "Your Post" \
     --slug "your-post" \
     --category "Engineering" \
     --excerpt "Summary" \
     --content "Markdown content"
   ```
2. Site auto-updates on next build

### Adding Projects
1. Use Contentful UI or CLI:
   ```bash
   npm run script -- contentful:create-project \
     --title "Project Name" \
     --slug "project-slug" \
     --description "Overview" \
     --technologies "React,TypeScript" \
     --type "Open Source"
   ```
2. Project appears on portfolio next build

## Performance & Security

- **Static Export** — Pre-rendered content with no server overhead
- **CDN-Ready** — All assets are static and cacheable
- **Secrets Management** — API keys stored in GitHub Secrets, never committed
- **Analytics Privacy** — GDPR-compliant tracking with consent
- **Type Safety** — TypeScript prevents runtime errors

## Future Enhancements

- Dark mode toggle with CSS custom properties
- Blog post search and filtering
- Project category filtering
- Newsletter subscription integration
- Advanced analytics dashboards


## Troubleshooting

### Build fails with missing modules
```bash
npm install
npm run build
```

### Environment variables not loading
- Ensure `.env.local` exists in project root
- Check variable names match documentation
- Restart `npm run dev` after editing `.env.local`

### GitHub Pages shows 404
- Verify `basePath: '/portfolio'` in `next.config.js`
- Clear browser cache
- Check deployment in GitHub Pages settings

### Contentful commands fail
- Ensure `CONTENTFUL_MANAGEMENT_TOKEN` is in GitHub Secrets (not `.env.local`)
- Run `npm install` to ensure `contentful-management` package is installed
- Check token hasn't expired in Contentful dashboard

### Contact form not working
- Verify EmailJS credentials in GitHub Secrets
- Test with `npm run test`
- Check browser console for errors

## License

ISC

## Author

Jaime Abad — 2026


#### GitHub Pages readiness

- Use `basePath: '/portfolio'` in `next.config.js`
- Verify that paths in `app/page.tsx` reference `/portfolio/` for deployed assets
- Confirm the site works when refreshed on nested routes

#### Security

- Keep secrets in GitHub Actions only
- Do not commit `.env.local`
- Use public-friendly EmailJS IDs only if needed

### Implementation Paths

1. **Static PDF / DOCX** in `public/`
2. **External cloud link** (Drive/Dropbox)
3. **Event-tracked download** with analytics

The current implementation includes multiple CV formats, EmailJS integration guidance, and a GitHub Actions deployment workflow. Reference service-specific setup only after the core static site and CI/CD testing criteria are satisfied.

### Static CV download

```html
<a href="/JaimeAbad_CV_2026.pdf" download="JaimeAbad_CV_2026.pdf" class="button-group__btn button-group__btn--active">
  Download CV
</a>
```

### Annex References

- `docs/STYLE_REFRENCE.md` — BEM conversion rules, color palette, and section structure
- `docs/EMAILJS_SETUP.md` — EmailJS client integration and credential setup
- `docs/GITHUB_ACTIONS_SETUP.md` — GitHub Actions deployment workflow for GitHub Pages


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
