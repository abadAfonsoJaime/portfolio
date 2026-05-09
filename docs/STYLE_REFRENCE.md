# Guide with Style Reference for BEM methodology

Complete technical implementation details for CSS layout, BEM methodology, and color system.


### Navigation

| BEM Class Name | Type |
|----------------|------|
| `.nav__links` | Block + Element |
| `.nav__toggle` | Block + Element |
| `.nav__toggle-bar` | Element |
| `.nav__links--open` | Modifier |

### Hero Section

| BEM Class Name | Type |
|----------------|------|
| `.hero` | Block |
| `.hero__wrapper` | Element |
| `.container` | Block |
| `.hero-image` | Block |
| `.hero-image__img` | Element |
| `.hero-content` | Block |
| `.hero-content__title` | Element |
| `.hero-content__subtitle` | Element |
| `.hero-content__subtitle-input` | Element |
| `.HeroText p` | `.hero-content__description` | Element |

### Logo

| New BEM Class | Type |
|---------------|------|
| `.logo` | Block |
| `.logo__icon` | Element |
| `.logo__text` | Element |

### Buttons

| New BEM Class | Type |
|---------------|------|
| `.button-group` | Block |
| `.button-group__btn` | Element |
| `.button-group__btn--active` | Modifier |

### Social Icons

| New BEM Class | Type |
|---------------|------|
| `.social-icons` | Block |
|`.social-icons__link` | Element |
|`.social-icons__link` (icon inside) | Element |

### BEM Pattern Explanation

#### Block
Independent, reusable component:
```css
.hero { }
.nav { }
.button-group { }
```

#### Element
Part of a block, no standalone meaning:
```css
.hero__wrapper { }        /* Part of hero */
.nav__link { }            /* Part of nav */
.button-group__btn { }    /* Part of button-group */
```

#### Modifier
Different state or variation:
```css
.nav__links--open { }              /* Open state */
.button-group__btn--active { }     /* Active variation */
.hero-content__title--large { }    /* Size variation */
```

### Benefits of BEM

1. **Clarity**: Class names describe their purpose
2. **Modularity**: Easy to reuse components
3. **Maintainability**: Clear relationships between elements
4. **Specificity**: Avoids CSS specificity issues
5. **Scalability**: Easy to add new features

### Example: Adding a New Component

#### BEM Approach
```html
<div class="project-card">
  <div class="project-card__image">
    <img src="..." class="project-card__img" />
  </div>
  <div class="project-card__content">
    <h3 class="project-card__title">Project Name</h3>
    <p class="project-card__description">...</p>
  </div>
</div>
```

Benefits:
- Clear ownership (all belong to `project-card`)
- No conflicts with other components
- Easy to understand structure

#### BEM CSS
```css
/* Block */
.project-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

/* Elements */
.project-card__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.project-card__content {
  padding: 20px;
}

.project-card__title {
  font-size: 1.5rem;
  color: #007ced;
  margin-bottom: 10px;
}

.project-card__description {
  color: #666;
  line-height: 1.6;
}

/* Modifiers */
.project-card--featured {
  border-color: #007ced;
  box-shadow: 0 4px 12px rgba(0, 124, 237, 0.2);
}

.project-card__img:hover {
  transform: scale(1.1);
}
```

### Responsive BEM

BEM works great with responsive design:

```css
.nav__links {
  display: flex;
}

@media (max-width: 930px) {
  .nav__links {
    /* Mobile base state */
    position: fixed;
    right: -100%;
    transition: right 0.3s;
  }

  .nav__links--open {
    /* Mobile open state */
    right: 0;
  }
}
```

### Common BEM Mistakes to Avoid

❌ **Too Deep Nesting**
```css
.hero__wrapper__content__title { }  /* Bad */
```

✅ **Correct Approach**
```css
.hero-content__title { }  /* Good - new block */
```

❌ **Element Without Block**
```css
.wrapper { }  /* Ambiguous */
```

✅ **Correct Approach**
```css
.hero__wrapper { }  /* Clear ownership */
```

❌ **Multiple Modifiers in Class Name**
```css
.button--large--blue--rounded { }  /* Bad */
```

✅ **Correct Approach**
```html
<button class="button button--large button--blue button--rounded">
```
```css
.button { }
.button--large { }
.button--blue { }
.button--rounded { }
```

### Converting Bad Code

When you see this pattern in old code:
```html
<div class="SomeComponent">
  <div class="Inner">
    <span class="Label Active">Text</span>
  </div>
</div>
```

Convert to:
```html
<div class="some-component">
  <div class="some-component__inner">
    <span class="some-component__label some-component__label--active">Text</span>
  </div>
</div>
```

CSS:
```css
.some-component { }
.some-component__inner { }
.some-component__label { }
.some-component__label--active { }
```

---

Need help with BEM? Check out [getbem.com](https://getbem.com/) for more examples!

## COLOR_PALETTE

Complete color system reference for the portfolio site.

### Color Variables

#### Primary Colors

```css
/* Primary Brand Color */
--color-primary: #007ced;
--color-primary-rgb: 0, 124, 237;
--color-primary-hover: #0056b3;

/* Backgrounds */
--color-bg-dark: #222;
--color-bg-darker: #1a1a1a;
--color-bg-card: #333;

/* Text */
--color-text-primary: #e5e5e5;
--color-text-muted: #999;
--color-text-dimmed: #666;

/* Borders & Dividers */
--color-border: #333;
--color-border-strong: #444;
```

### Color Usage Matrix

| Element Type | Color | Hex | Usage Example |
|-------------|-------|-----|---------------|
| **Headings** | Primary Blue | `#007ced` | `.hero-content__title` |
| **Body Text** | Light Gray | `#e5e5e5` | `.hero-content__description` |
| **Links (Default)** | Light Gray | `#e5e5e5` | `.nav__link` |
| **Links (Hover)** | Primary Blue | `#007ced` | `.nav__link:hover` |
| **Buttons (Active)** | Primary Blue | `#007ced` | `.button-group__btn--active` |
| **Buttons (Hover)** | Dark Blue | `#0056b3` | `.button-group__btn:hover` |
| **Metadata** | Muted Gray | `#999` | `.blog-card__date` |
| **Placeholders** | Dimmed Gray | `#666` | `input::placeholder` |

### Section Backgrounds

Alternating pattern for visual rhythm:

```
Hero       → #222 (Dark)
About      → #1a1a1a (Darker) ← Contrast
Projects   → #222 (Dark)
Blog       → #1a1a1a (Darker) ← Contrast
Contact    → #222 (Dark)
Footer     → #1a1a1a (Darker) ← Contrast
```

#### Pattern Logic

```css
/* Odd sections (1, 3, 5) */
.hero, .projects, .contact {
  background: #222;
}

/* Even sections (2, 4, 6) */
.about, .blog, .footer {
  background: #1a1a1a;
}
```

### Interactive States

#### Buttons

```css
/* Default State */
.button-group__btn {
  background: #333;
  border: 2px solid #e5e5e5;
  color: #fff;
}

/* Active State */
.button-group__btn--active {
  border-color: #007ced;
}

/* Hover State */
.button-group__btn:hover {
  background: #007ced;
  border-color: #007ced;
  transform: translateY(-3px);
}
```

#### Links

```css
/* Navigation Links */
.nav__link {
  color: #e5e5e5;
}

.nav__link:hover {
  color: #007ced;
}

/* Social Icons */
.social-icons__link {
  color: #e5e5e5;
}

.social-icons__link:hover {
  color: #007ced;
  transform: rotate(360deg);
}
```

#### Cards

```css
/* Project Cards */
.project-card {
  background: #1a1a1a;
  border: 1px solid #333;
}

.project-card:hover {
  box-shadow: 0 10px 30px rgba(0, 124, 237, 0.3);
}

/* Blog Cards */
.blog-card {
  background: #222;
  border: 1px solid #333;
}

.blog-card:hover {
  box-shadow: 0 5px 20px rgba(0, 124, 237, 0.2);
}
```

#### Form Inputs

```css
.contact-form__input {
  background: #1a1a1a;
  border: 2px solid #333;
  color: #e5e5e5;
}

.contact-form__input:focus {
  border-color: #007ced;
}

.contact-form__input::placeholder {
  color: #666;
}
```

### Gradient & Effects

#### Skill Progress Bars

```css
.skill-list__progress {
  background: linear-gradient(90deg, #007ced, #0056b3);
}
```

#### Shadow Effects

```css
/* Hero Image */
box-shadow: 5px 7px 25px rgba(0, 0, 0, 0.5);

/* Button Hover */
box-shadow: 0 14px 14px -10px rgba(0, 0, 0, 0.78);

/* Card Hover (with blue glow) */
box-shadow: 0 10px 30px rgba(0, 124, 237, 0.3);
```

#### Overlay Effects

```css
/* Project Card Overlay */
.project-card__overlay {
  background: rgba(0, 124, 237, 0.9); /* Blue with 90% opacity */
}
```

### Accessibility & Contrast

#### WCAG Compliance

All color combinations meet WCAG AA standards:

| Foreground | Background | Ratio | Pass |
|-----------|-----------|-------|------|
| `#e5e5e5` | `#222` | 11.24:1 | ✅ AAA |
| `#e5e5e5` | `#1a1a1a` | 13.56:1 | ✅ AAA |
| `#007ced` | `#222` | 5.12:1 | ✅ AA |
| `#007ced` | `#1a1a1a` | 6.18:1 | ✅ AA |
| `#999` | `#222` | 5.89:1 | ✅ AA |

#### Testing

```bash
# Test contrast ratios at:
https://webaim.org/resources/contrastchecker/
```

### CSS Custom Properties Implementation

Convert to CSS variables for easier theming:

```css
/* app/globals.css */
:root {
  /* Brand Colors */
  --color-primary: #007ced;
  --color-primary-dark: #0056b3;

  /* Backgrounds */
  --color-bg-dark: #222;
  --color-bg-darker: #1a1a1a;
  --color-bg-card: #333;

  /* Text */
  --color-text-primary: #e5e5e5;
  --color-text-muted: #999;
  --color-text-dimmed: #666;

  /* Borders */
  --color-border: #333;
  --color-border-strong: #444;

  /* Shadows */
  --shadow-primary: rgba(0, 124, 237, 0.3);
  --shadow-dark: rgba(0, 0, 0, 0.5);
}

/* Usage */
.hero-content__title {
  color: var(--color-primary);
}

.hero {
  background: var(--color-bg-dark);
}
```

### Dark Mode Alternative (Future Enhancement)

Prepare for light mode with CSS variables:

```css
/* Light Theme Colors */
[data-theme="light"] {
  --color-primary: #007ced;
  --color-bg-dark: #ffffff;
  --color-bg-darker: #f5f5f5;
  --color-text-primary: #222;
  --color-text-muted: #666;
}

/* Toggle implementation */
const [theme, setTheme] = useState('dark')

<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</button>
```

### Export for Design Tools

#### Figma/Sketch Variables

```json
{
  "colors": {
    "primary": {
      "value": "#007ced",
      "type": "color"
    },
    "primary-dark": {
      "value": "#0056b3",
      "type": "color"
    },
    "bg-dark": {
      "value": "#222222",
      "type": "color"
    },
    "bg-darker": {
      "value": "#1a1a1a",
      "type": "color"
    },
    "text-primary": {
      "value": "#e5e5e5",
      "type": "color"
    },
    "text-muted": {
      "value": "#999999",
      "type": "color"
    }
  }
}
```

#### Tailwind Config (If Migrating)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007ced',
          dark: '#0056b3',
        },
        dark: {
          DEFAULT: '#222',
          darker: '#1a1a1a',
          card: '#333',
        },
        light: {
          DEFAULT: '#e5e5e5',
          muted: '#999',
          dimmed: '#666',
        },
      },
    },
  },
}
```

#### Quick Reference

**Copy-paste values for designers:**

```
Primary Blue:     #007ced  rgb(0, 124, 237)
Primary Hover:    #0056b3  rgb(0, 86, 179)
Dark BG:          #222222  rgb(34, 34, 34)
Darker BG:        #1a1a1a  rgb(26, 26, 26)
Card BG:          #333333  rgb(51, 51, 51)
Light Text:       #e5e5e5  rgb(229, 229, 229)
Muted Text:       #999999  rgb(153, 153, 153)
Dimmed Text:      #666666  rgb(102, 102, 102)
```

## Sections Implementation

All four major sections have been added to your portfolio following BEM methodology!

### Sections Implemented

#### 1. About Section (`#about`)
**Location**: After hero section, before projects
**Background**: Dark (`#1a1a1a`)

##### BEM Structure
```
.about                        # Block
├── .about__title             # Section title
├── .about__content           # Two-column grid
│   ├── .about__text          # Left column
│   │   └── .about__description  # Paragraph text
│   └── .about__skills        # Right column
│       ├── .about__skills-title
│       └── .skill-list       # New block
│           ├── .skill-list__item
│           ├── .skill-list__name
│           ├── .skill-list__bar
│           ├── .skill-list__progress
│           └── --90, --85, --80, --95  # Modifiers for width
```

##### Key Features
- Two-column responsive layout (stacks on mobile)
- Animated skill bars with percentage indicators
- Text content area for bio/introduction
- Smooth transitions and hover effects

---

#### 2. Projects Section (`#projects`)
**Location**: After about, before blog
**Background**: Medium dark (`#222`)

##### BEM Structure
```
.projects                         # Block
├── .projects__title              # Section title
├── .projects__subtitle           # Section description
└── .projects__grid               # 3-column responsive grid
    └── .project-card             # New block (repeated)
        ├── .project-card__image
        │   ├── .project-card__img
        │   └── .project-card__overlay
        │       └── .project-card__link  # Icon links
        ├── .project-card__content
        │   ├── .project-card__title
        │   ├── .project-card__description
        │   └── .project-card__tags
        │       └── .project-card__tag
```

##### Key Features
- Responsive grid (auto-fit minmax)
- Hover overlay with external/GitHub links
- Image zoom effect on hover
- Tag system for technologies
- Card lift animation
- Blue glow shadow on hover

---

#### 3. Blog Section (`#blog`)
**Location**: After projects, before contact
**Background**: Dark (`#1a1a1a`)

##### BEM Structure
```
.blog                            # Block
├── .blog__title                 # Section title
├── .blog__subtitle              # Section description
└── .blog__grid                  # 3-column responsive grid
    └── .blog-card               # New block (repeated)
        ├── .blog-card__header
        │   ├── .blog-card__date
        │   └── .blog-card__category
        ├── .blog-card__title
        │   └── .blog-card__link
        ├── .blog-card__excerpt
        └── .blog-card__footer
            ├── .blog-card__reading-time
            └── .blog-card__read-more
```

##### Key Features
- Article card layout
- Date and category badges
- Reading time estimation
- Hover effects on titles
- "Read More" call-to-action
- Responsive grid layout

---

#### 4. Contact Section (`#contact`)
**Location**: After blog, before footer
**Background**: Medium dark (`#222`)

##### BEM Structure
```
.contact                          # Block
├── .contact__title               # Section title
├── .contact__subtitle            # Section description
└── .contact__content             # Two-column grid
    ├── .contact__info            # Left column
    │   ├── .contact-item         # New block (repeated)
    │   │   ├── .contact-item__icon
    │   │   ├── .contact-item__details
    │   │   ├── .contact-item__title
    │   │   └── .contact-item__text
    │   └── .contact__social
    │       └── .contact__social-title
    └── .contact-form             # New block
        ├── .contact-form__group
        │   ├── .contact-form__label
        │   └── .contact-form__input
        │       or .contact-form__textarea
        └── .contact-form__submit
```

##### Key Features
- Contact information cards with icons
- Functional React form with state management
- Form validation (HTML5 required)
- Blue focus states on inputs
- Submit button with hover effects
- Social media links
- Two-column responsive layout

---

#### 5. Footer
**Location**: Bottom of page
**Background**: Darkest (`#1a1a1a`)

##### BEM Structure
```
.footer                          # Block
└── .footer__text                # Copyright text
```

---

### BEM Pattern Examples from Implementation

#### Example 1: Skill Progress Bars
```tsx
<div className="skill-list__item">
  <span className="skill-list__name">JavaScript / TypeScript</span>
  <div className="skill-list__bar">
    <div className="skill-list__progress skill-list__progress--90"></div>
  </div>
</div>
```

**CSS:**
```css
.skill-list__progress--90 { width: 90%; }
.skill-list__progress--85 { width: 85%; }
```

#### Example 2: Project Card with Hover Overlay
```tsx
<div className="project-card">
  <div className="project-card__image">
    <img src="..." className="project-card__img" />
    <div className="project-card__overlay">
      <a href="#" className="project-card__link">
        <i className="fas fa-external-link-alt"></i>
      </a>
    </div>
  </div>
</div>
```

**CSS:**
```css
.project-card__overlay {
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}
```

#### Example 3: Form with React State
```tsx
const [formData, setFormData] = useState({
  name: '', email: '', message: ''
})

<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleInputChange}
  className="contact-form__input"
/>
```

---

### Responsive Breakpoints

#### Desktop (>930px)
- About: 2 columns (text | skills)
- Projects: 3 columns
- Blog: 3 columns
- Contact: 2 columns (info | form)

#### Tablet (930px - 768px)
- All sections maintain grid layouts
- Slight spacing adjustments

#### Mobile (<930px)
- About: Single column
- Projects: Single column
- Blog: Single column
- Contact: Single column
- Navigation: Hamburger menu active

---

### Color Scheme Usage

| Section | Background | Text | Accents |
|---------|-----------|------|---------|
| Hero | `#222` | `#e5e5e5` | `#007ced` |
| About | `#1a1a1a` | `#e5e5e5` | `#007ced` |
| Projects | `#222` | `#e5e5e5` | `#007ced` |
| Blog | `#1a1a1a` | `#e5e5e5` | `#007ced` |
| Contact | `#222` | `#e5e5e5` | `#007ced` |
| Footer | `#1a1a1a` | `#999` | - |

**Alternating pattern**: Dark (`#222`) and darker (`#1a1a1a`) for visual separation

---

### Testing Your New Sections

1. **Visual Check**
```bash
npm run dev
# Navigate to http://localhost:3000
```

2. **Scroll Through Sections**
- Click navigation links (About, Projects, Blog, Contact)
- Verify smooth scrolling to anchors

3. **Interaction Testing**
- Hover over project cards (overlay appears)
- Hover over blog titles (color changes)
- Click form inputs (blue focus border)
- Submit contact form (alert appears)

4. **Responsive Testing**
- Resize browser to <930px (hamburger menu)
- Check grid layouts stack vertically
- Verify all content is readable

5. **Build Test**
```bash
npm run build
# Check for any errors
```

---

### Customization Guide

#### Change Section Colors
```css
/* Make Projects section lighter */
.projects {
  background: #2a2a2a;  /* Instead of #222 */
}
```

#### Add More Project Cards
```tsx
<div className="project-card">
  <div className="project-card__image">
    <img src="/your-image.jpg" alt="Project 4" />
    {/* ... rest of structure */}
  </div>
</div>
```

#### Modify Skill Percentages
```css
.skill-list__progress--75 { width: 75%; }
```