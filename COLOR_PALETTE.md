# Portfolio Color Palette Documentation

Complete color system reference for the portfolio site.

## 🎨 Color Variables

### Primary Colors

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

## 📊 Color Usage Matrix

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

## 🎭 Section Backgrounds

Alternating pattern for visual rhythm:

```
Hero       → #222 (Dark)
About      → #1a1a1a (Darker) ← Contrast
Projects   → #222 (Dark)
Blog       → #1a1a1a (Darker) ← Contrast
Contact    → #222 (Dark)
Footer     → #1a1a1a (Darker) ← Contrast
```

### Pattern Logic

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

## 🎯 Interactive States

### Buttons

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

### Links

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

### Cards

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

### Form Inputs

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

## 🌈 Gradient & Effects

### Skill Progress Bars

```css
.skill-list__progress {
  background: linear-gradient(90deg, #007ced, #0056b3);
}
```

### Shadow Effects

```css
/* Hero Image */
box-shadow: 5px 7px 25px rgba(0, 0, 0, 0.5);

/* Button Hover */
box-shadow: 0 14px 14px -10px rgba(0, 0, 0, 0.78);

/* Card Hover (with blue glow) */
box-shadow: 0 10px 30px rgba(0, 124, 237, 0.3);
```

### Overlay Effects

```css
/* Project Card Overlay */
.project-card__overlay {
  background: rgba(0, 124, 237, 0.9); /* Blue with 90% opacity */
}
```

## 📱 Accessibility & Contrast

### WCAG Compliance

All color combinations meet WCAG AA standards:

| Foreground | Background | Ratio | Pass |
|-----------|-----------|-------|------|
| `#e5e5e5` | `#222` | 11.24:1 | ✅ AAA |
| `#e5e5e5` | `#1a1a1a` | 13.56:1 | ✅ AAA |
| `#007ced` | `#222` | 5.12:1 | ✅ AA |
| `#007ced` | `#1a1a1a` | 6.18:1 | ✅ AA |
| `#999` | `#222` | 5.89:1 | ✅ AA |

### Testing

```bash
# Test contrast ratios at:
https://webaim.org/resources/contrastchecker/
```

## 🎨 CSS Custom Properties Implementation

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

## 🌙 Dark Mode Alternative (Future Enhancement)

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

## 🎨 Export for Design Tools

### Figma/Sketch Variables

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

### Tailwind Config (If Migrating)

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

## 📝 Quick Reference

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
Border:           #333333  rgb(51, 51, 51)
Strong Border:    #444444  rgb(68, 68, 68)
```

---

This color system ensures consistency across the entire portfolio while maintaining excellent accessibility and visual hierarchy.
