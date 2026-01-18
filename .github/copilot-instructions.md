# Portfolio Site - AI Agent Instructions

## Project Overview
Next.js 16 static site generation (SSG) portfolio for Jaime Abad. Single-page responsive design with BEM CSS methodology, TypeScript, and React Server/Client Components. Configured for Linux deployment with zero runtime dependencies.

## Architecture & Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with Font Awesome CDN
│   ├── page.tsx            # Home page (client component)
│   └── globals.css         # BEM methodology styles
├── public/
│   └── paella_20190420.jpg # Hero image
├── next.config.js          # Static export config
├── package.json
└── tsconfig.json
```

**Stack**: Next.js 16 App Router, React 19, TypeScript, BEM CSS
**Key Pattern**: Static export (`output: 'export'`) for CDN/Linux deployment without Node.js runtime.

## Styling Conventions

### BEM Methodology
**Block Element Modifier** pattern throughout:
```css
/* Block */
.hero { }
.nav { }

/* Element */
.hero__wrapper { }
.nav__link { }

/* Modifier */
.button-group__btn--active { }
.nav__links--open { }
```

### Color Palette
- **Primary Blue**: `#007ced` (logo, buttons, hover states, accents)
- **Dark Background**: `#222` (hero, mobile nav)
- **Light Text**: `#e5e5e5` (body text, links)
- **Subtle Dark**: `#333` (button backgrounds), `#444` (borders)

**Key Rule**: All new CSS must follow BEM convention: `.block__element--modifier`

## Component Structure

### Navigation ([app/page.tsx](../app/page.tsx))
- Client component with React `useState` for toggle
- Desktop: inline horizontal links (`.nav__item`)
- Mobile (<930px): hamburger menu (`.nav__toggle`) reveals slide-in from right
- Toggle state: `.nav__links--open` modifier class

### Hero Section
- Two-column flexbox: `.hero-image` + `.hero-content`
- Typed.js loaded dynamically via `useEffect`
- Animates subtitle: "Engineer", "Tech Enthusiast", "Ready to work!"
- Responsive: columns stack vertically below 768px

### Buttons
- Base: `.button-group__btn` with white border
- Active modifier: `.button-group__btn--active` (blue `#007ced` border)
- Hover: blue background, `translateY(-3px)` lift effect

**CDN-loaded** (no npm packages for these):
- **Font Awesome 6**: Loaded in [layout.tsx](../app/layout.tsx) `<head>` - used for social icons (`.fab`)
- **Typed.js 2.0.10**: Dynamically loaded in [page.tsx](../app/page.tsx) `useEffect` for typing animation

**NPM Dependencies**:
- `next@^16.1.3` - Framework with App Router
- `react@^19.2.3` - UI library
- `react-dom@^19.2.3` - React renderer
- **Typed.js**: Animated typing effect in hero text
- **Google Fonts**: Commented out, currently using system fonts

## Development Workflow

**No build process required**:
```bash
# Development server (hot reload)
npm run dev          # http://localhost:3000

# Production build (static export to out/)
npm run build        # Creates out/ directory

# Preview production build
npx serve out
```

Navigation links point to sections not yet built:
- About section (`#about`)
- Projects showcase (`#projects`)
- Blog (`#blog`)
- Contact form (`#contact`)

When implementing, follow patterns:
- BEM classes: `.section`, `.section__element`, `.section__element--modifier`
- Wrap in `.hero__wrapper` (max-width: 95%)
- Maintain `#007ced` blue accent throughout
- Add responsive breakpoints as needed (930px, 768px)

Commented sections in [index.html](../index.html#L74-L95) show intended structure:
- About section
- Projects showcase
- Contact form

When implementing these, follow existing patterns:
- Use PascalCase class names
- Maintain `#007ced` blue accent throughout
- Add responsive breakpoints as needed
- Keep sections within `.Wrapper` for consistent max-width
Migration Notes

**Legacy files preserved**:
- `index.html` - Original vanilla HTML (reference)
- `myStyleSheet.css` - Original CSS (converted to BEM in `app/globals.css`)
- `images/` - Copied to `public/`

**Key changes from vanilla to Next.js**:
- PascalCase classes → BEM naming (`.HeroHeader` → `.hero`)
- Direct DOM manipulation → React state (`navOpen`)
- `<img src="images/.. in [app/page.tsx](../app/page.tsx):
```tsx
<section className="section-name">
  <div className="hero__wrapper">
    <h2 className="section-name__title">Title</h2>
    <p className="section-name__description">Content</p>
  </div>
</section>
```

**Adding BEM styles** in [app/globals.css](../app/globals.css):
```css
.section-name { }                          /* Block */
.section-name__title { }                   /* Element */
.section-name__description { }             /* Element */
.section-name__description--highlighted { } /* Modifier */
```

**TypeScript**: All new components should use `.tsx` with proper typing. Client components need `'use client'` directive at top
**Adding navigation link**:
```html
<li><a href="#section-name">Section</a></li>
```

**Color variables**: Consider converting hex values to CSS custom properties for easier theming.
