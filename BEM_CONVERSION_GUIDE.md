# BEM CSS Conversion Reference

Complete mapping from old PascalCase classes to new BEM methodology.

## Navigation

| Old Class | New BEM Class | Type |
|-----------|---------------|------|
| `.NavigationLinks` | `.nav__links` | Block + Element |
| `.ToogleButton` | `.nav__toggle` | Block + Element |
| `.ToogleButton span` | `.nav__toggle-bar` | Element |
| `.NavigationLinks.open` | `.nav__links--open` | Modifier |

## Hero Section

| Old Class | New BEM Class | Type |
|-----------|---------------|------|
| `.HeroHeader` | `.hero` | Block |
| `.Wrapper` | `.hero__wrapper` | Element |
| `.Container` | `.container` | Block |
| `.HeroEpic` | `.hero-image` | Block |
| `.HeroEpic img` | `.hero-image__img` | Element |
| `.HeroText` | `.hero-content` | Block |
| `.HeroText h1` | `.hero-content__title` | Element |
| `.HeroText h5` | `.hero-content__subtitle` | Element |
| `.HeroText h5 span` | `.hero-content__subtitle-input` | Element |
| `.HeroText p` | `.hero-content__description` | Element |

## Logo

| Old Class | New BEM Class | Type |
|-----------|---------------|------|
| `.Logo` | `.logo` | Block |
| `.Logo i` | `.logo__icon` | Element |
| `.LogoText` | `.logo__text` | Element |

## Buttons

| Old Class | New BEM Class | Type |
|-----------|---------------|------|
| `.ButtonGroup` | `.button-group` | Block |
| `.Button` | `.button-group__btn` | Element |
| `.Button.Active` | `.button-group__btn--active` | Modifier |

## Social Icons

| Old Class | New BEM Class | Type |
|-----------|---------------|------|
| `.SocialIcons` | `.social-icons` | Block |
| `.SocialIcons a` | `.social-icons__link` | Element |
| `.SocialIcons .fab` | `.social-icons__link` (icon inside) | Element |

## BEM Pattern Explanation

### Block
Independent, reusable component:
```css
.hero { }
.nav { }
.button-group { }
```

### Element
Part of a block, no standalone meaning:
```css
.hero__wrapper { }        /* Part of hero */
.nav__link { }            /* Part of nav */
.button-group__btn { }    /* Part of button-group */
```

### Modifier
Different state or variation:
```css
.nav__links--open { }              /* Open state */
.button-group__btn--active { }     /* Active variation */
.hero-content__title--large { }    /* Size variation */
```

## Benefits of BEM

1. **Clarity**: Class names describe their purpose
2. **Modularity**: Easy to reuse components
3. **Maintainability**: Clear relationships between elements
4. **Specificity**: Avoids CSS specificity issues
5. **Scalability**: Easy to add new features

## Example: Adding a New Component

### Old Approach (PascalCase)
```html
<div class="ProjectCard">
  <div class="ProjectImage">
    <img src="..." />
  </div>
  <div class="ProjectInfo">
    <h3 class="Title">Project Name</h3>
    <p class="Description">...</p>
  </div>
</div>
```

Problems:
- Generic class names (`.Title`, `.Description`)
- Unclear relationships
- High chance of conflicts

### BEM Approach
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

### BEM CSS
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

## Responsive BEM

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

## Common BEM Mistakes to Avoid

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

## Converting Your Old Code

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
