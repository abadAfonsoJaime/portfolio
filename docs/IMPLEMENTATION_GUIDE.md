# Implementation Guide

This guide frames portfolio development through the lens of software development lifecycle (SDLC), best practices, implementation criteria, and CI/CD quality gates.

## Purpose

The implementation guide is not just a technical recipe. It is a reference for:

- Architecture decisions
- Quality criteria
- Testing and deployment strategy
- Documentation alignment
- Design and implementation consistency

## Core Principles

### 1. Maintainability

- Use BEM for CSS class structure
- Keep UI and styles separated
- Avoid inline styling for reusable components
- Keep `app/page.tsx` readable and section-focused

### 2. Consistency

- Follow the palette defined in `docs/COLOR_PALETTE.md`
- Use the same spacing, typography, and interaction patterns
- Keep repeated UI patterns consistent across sections

### 3. Simplicity

- Prefer static assets in `public/`
- Use simple download links for CV files
- Avoid unnecessary JS or runtime dependencies

### 4. Testability

- Ensure the build passes with `npm run build`
- Validate GitHub Pages base path behavior
- Confirm asset loading in production output
- Preserve the contact form flow through smoke tests

## SDLC for Portfolio Enhancements

### Phase 1: Requirements

- Define the user journey for hero, about, projects, blog, and contact
- Confirm which features are mandatory: CV downloads, contact form, responsive layout
- Identify deployment constraints: GitHub Pages subdirectory, static export

### Phase 2: Design

- Map sections to BEM blocks and elements
- Define the color palette and interactive styles
- Ensure the layout works on desktop and mobile
- Document structure in `docs/SECTIONS_GUIDE.md`

### Phase 3: Development

- Implement UI in `app/page.tsx`
- Implement styling in `app/globals.css`
- Store static assets in `public/`
- Keep documentation current in `docs/`

### Phase 4: Testing

- Local build test: `npm run build`
- Browser validation of built output
- GitHub Pages deployed path checking
- Download link validation on deployed site
- Contact form behavior verification in staging or preview

### Phase 5: Deployment

- Run GitHub Actions workflow from `docs/GITHUB_ACTIONS_SETUP.md`
- Use secrets securely in GitHub Actions
- Avoid committing `.env.local`

### Phase 6: Monitoring

- Review GitHub Actions logs
- Validate the live site on deployment
- Update documentation with any discovered issues

## Implementation Criteria

### Feature readiness

- The portfolio should be visually complete and responsive
- All sections should render correctly in the static build
- Navigation should work with anchor links and page reloads
- Download links must be functional on deployed site

### Quality gates

- All markdown docs should be available from `docs/`
- CSS should be loaded and animations should function in production
- The `basePath` configuration must be correct for GitHub Pages
- Accessibility and contrast should meet basic WCAG AA standards

### Acceptance criteria

- `npm run build` succeeds with no errors
- Deployed site loads CSS and images correctly
- Form submission uses a safe, documented integration path
- CV file downloads work via the public asset links

## CI/CD Testing Strategy

The CI/CD pipeline should validate both generic static site behavior and feature-specific cases.

### Static site tests

- Build completion
- Output generation in `out/`
- No broken links or missing assets
- Correct `basePath` behavior on GitHub Pages

### Feature tests

- CV download links should be accessible in the static output
- Hero, project, blog, and contact sections should display properly
- Contact form route or service endpoint should be reachable
- Social and external links should resolve correctly

### Deployment validation

- Live site should be reachable at `https://abadAfonsoJaime.github.io/portfolio/`
- Styles should apply after deployment
- Image assets should be loaded under `/portfolio/`

## Best Practices

### Documentation-first development

- Keep notes and decision rationale in `docs/`
- Use `docs/BEM_CONVERSION_GUIDE.md` and `docs/COLOR_PALETTE.md` for implementation guidance
- Update docs whenever design or behavior changes

### GitHub Pages readiness

- Use `basePath: '/portfolio'` in `next.config.js`
- Verify that paths in `app/page.tsx` reference `/portfolio/` for deployed assets
- Confirm the site works when refreshed on nested routes

### Security

- Keep secrets in GitHub Actions only
- Do not commit `.env.local`
- Use public-friendly EmailJS IDs only if needed

## Implementation Paths

### Contact form options

1. **Web3Forms** — Fastest no-backend option
2. **Formspree** — Email forwarding without server code
3. **EmailJS** — Client-side email service with a public key
4. **Serverless API** — Custom backend route if deeper control is required

### CV download options

1. **Static PDF / DOCX** in `public/`
2. **External cloud link** (Drive/Dropbox)
3. **Event-tracked download** with analytics

## Annex References

- `docs/BEM_CONVERSION_GUIDE.md` — BEM conversion rules and examples
- `docs/COLOR_PALETTE.md` — Theme colors, system variables, and contrast checks

## Notes on Existing Implementation

The current implementation includes multiple CV formats, EmailJS integration guidance, and a GitHub Actions deployment workflow. Reference service-specific setup only after the core static site and CI/CD testing criteria are satisfied.

## Appendix: Common Implementation Patterns

### Static CV download

```html
<a href="/JaimeAbad_CV_2026.pdf" download="JaimeAbad_CV_2026.pdf" class="button-group__btn button-group__btn--active">
  Download CV
</a>
```

### Static site build check

```bash
npm run build
```

### GitHub Pages production URL check

- `https://abadAfonsoJaime.github.io/portfolio/`
- `https://abadAfonsoJaime.github.io/portfolio/#contact`
```
