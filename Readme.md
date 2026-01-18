# Portfolio Site - Jaime Abad

Professional responsive portfolio built with Next.js static site generation (SSG), React 19, TypeScript, and BEM CSS methodology. Designed for zero-runtime deployment with optimized performance and SEO.

## Why Next.js Static Export

- **Linux-friendly**: Zero runtime dependencies - just HTML, CSS, and JavaScript
- **Perfect for portfolios**: Fast load times, optimal SEO, and excellent user experience
- **Easy CI/CD**: Simple build process integrates with any deployment pipeline
- **CDN-ready**: Can be served from any static hosting or content delivery network
- **Cost-effective**: No server costs - deploy to free static hosting platforms

## Project Structure

```
/portfolio
├── app/
│   ├── layout.tsx    # Root layout with metadata & Font Awesome CDN
│   ├── page.tsx      # Home page - client component with React state
│   └── globals.css   # BEM methodology styles (all sections)
├── public/           # Static assets (images, CV, etc.)
│   └── paella_20190420.jpg
├── out/              # Static export output (after build)
├── .github/
│   └── copilot-instructions.md  # AI agent guidance
├── next.config.js    # Static export configuration
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Tech Stack

- **Next.js 16**: App Router with static export (`output: 'export'`)
- **React 19**: Client components for interactivity (navigation toggle, form state)
- **TypeScript**: Type-safe development with strict mode enabled
- **BEM CSS**: Block Element Modifier methodology for maintainable styles
- **CDN Libraries**: 
  - Font Awesome 6.0 (icons)
  - Typed.js 2.0.10 (hero typing animation)

## Color Palette

The portfolio uses a consistent dark theme with blue accents:

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Primary Blue** | `#007ced` | `rgb(0, 124, 237)` | Logo, buttons, titles, links, hover states, accents |
| **Dark Background** | `#222` | `rgb(34, 34, 34)` | Hero, Projects, Contact sections |
| **Darker Background** | `#1a1a1a` | `rgb(26, 26, 26)` | About, Blog, Footer sections |
| **Light Text** | `#e5e5e5` | `rgb(229, 229, 229)` | Body text, descriptions, navigation links |
| **Muted Text** | `#999` | `rgb(153, 153, 153)` | Dates, metadata, footer text |
| **Subtle Dark** | `#333` | `rgb(51, 51, 51)` | Button backgrounds, borders, cards |
| **Border Color** | `#444` | `rgb(68, 68, 68)` | Hero image border |

### Color Usage Guidelines

```css
/* Primary actions and emphasis */
.button-group__btn--active { border-color: #007ced; }
.hero-content__title { color: #007ced; }

/* Background alternation pattern */
.hero { background: #222; }          /* Dark */
.about { background: #1a1a1a; }      /* Darker */
.projects { background: #222; }      /* Dark */
.blog { background: #1a1a1a; }       /* Darker */
.contact { background: #222; }       /* Dark */
.footer { background: #1a1a1a; }     /* Darker */

/* Text hierarchy */
.hero-content__title { color: #007ced; }      /* Primary */
.hero-content__description { color: #e5e5e5; } /* Body */
.blog-card__date { color: #999; }              /* Metadata */
```

## Key Configuration

```js
// next.config.js
const nextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  trailingSlash: true,        // Add trailing slashes to URLs
  images: {
    unoptimized: true,        // Required for static export
  },
}
```

## Build & Deploy

### Local Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
# Opens at http://localhost:3000
# - Hot module replacement (HMR)
# - TypeScript type checking
# - Fast refresh on file changes

# Build for production
npm run build
# - Compiles TypeScript
# - Optimizes assets
# - Generates static files in out/
# - Validates all links and routes

# Preview production build locally
np**Responsive design** - Mobile-first approach with breakpoints at 768px and 930px
✅ **Animated typing effect** - Hero subtitle cycles through roles using Typed.js
✅ **Hamburger navigation** - Mobile menu with smooth slide-in animation
✅ **BEM CSS architecture** - Maintainable, scalable stylesheet organization
✅ **About section** - Bio text with animated skill progress bars
✅ **Projects showcase** - Grid layout with hover overlays and technology tags
✅ **Blog section** - Article cards with metadata and reading time
✅ **Contact form** - Functional form with React state management and validation
✅ **Footer** - Clean copyright and attribution section

## BEM Architecture

All styles follow Block Element Modifier methodology:

```css
/* Block - Standalone component */
.hero { }
.project-card { }

/* Element - Part of a block */
.hero__wrapper { }
.project-card__title { }

/* Modifier - Variation or state */
.nav__links--open { }
.button-group__btn--active { }
```

**Benefits:**
- Clear component boundaries
- No naming conflicts
- Easy to understand relationships
- Simple to add new features
- Highly maintainable

See [BEM_CONVERSION_GUIDE.md](BEM_CONVERSION_GUIDE.md) for detailed examples.

---

## Implementation Guides

### 1. Form Backend API

The contact form currently shows an alert on submission. Here's how to connect it to a backend:

#### Option A: Serverless API (Vercel Functions)

```bash
# Create API route
mkdir -p pages/api
```

```typescript
// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields required' })
  }

  try {
    // Option 1: Send email via SendGrid
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    await sgMail.send({
      to: 'your-email@example.com',
      from: 'noreply@yourdomain.com',
      subject: `Portfolio Contact: ${name}`,
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Option 2: Store in database (e.g., Supabase, Firebase)
    // const { createClient } = require('@supabase/supabase-js')
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    // await supabase.from('contacts').insert([{ name, email, message }])

    return res.status(200).json({ message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ message: 'Failed to send message' })
  }
}
```

**Update form in app/page.tsx:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    
    const data = await response.json()
    
    if (response.ok) {
      alert('Thank you! Your message has been sent.')
      setFormData({ name: '', email: '', message: '' })
    } else {
      alert(`Error: ${data.message}`)
    }
  } catch (error) {
    alert('Failed to send message. Please try again.')
  }
}
```

**Environment variables (.env.local):**
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
# Or for other services:
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
```

#### Option B: Third-Party Form Service

**Formspree:**
```typescript
// No backend needed - just update form action
<form 
  className="contact-form" 
  action="https://formspree.io/f/your-form-id"
  method="POST"
>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

**Netlify Forms:**
```typescript
// Add netlify attribute to form
<form 
  className="contact-form" 
  name="contact"
  method="POST"
  data-netlify="true"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  {/* ... rest of form */}
</form>
```

**Web3Forms (No Backend Required):**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: 'YOUR_ACCESS_KEY',
      ...formData
    })
  })
  
  if (response.ok) {
    alert('Message sent successfully!')
    setFormData({ name: '', email: '', message: '' })
  }
}
```

### 2. Download CV Button

The CV download button currently has a `#` placeholder. Here's how to implement it:

#### Option A: Static PDF File

```bash
# 1. Add your CV PDF to public folder
# public/Jaime_Abad_CV.pdf

# 2. Update button in app/page.tsx
```

```typescript
<a 
  href="/Jaime_Abad_CV.pdf" 
  download="Jaime_Abad_CV.pdf"
  className="button-group__btn button-group__btn--active"
>
  Download CV
</a>
```

#### Option B: Dynamic CV Generation

**Using react-pdf or jsPDF:**

```bash
npm install jspdf
```

```typescript
// app/page.tsx
import jsPDF from 'jspdf'

const handleDownloadCV = () => {
  const doc = new jsPDF()
  
  // Add content
  doc.setFontSize(20)
  doc.text('Jaime Abad', 20, 20)
  doc.setFontSize(12)
  doc.text('Full Stack Developer', 20, 30)
  
  // Add sections
  doc.text('Experience', 20, 50)
  doc.text('• Senior Developer at Company X (2022-Present)', 20, 60)
  
  // Save
  doc.save('Jaime_Abad_CV.pdf')
}

// In JSX
<button 
  onClick={handleDownloadCV}
  className="button-group__btn button-group__btn--active"
>
  Download CV
</button>
```

#### Option C: External Link

```typescript
// Link to Google Drive, Dropbox, or GitHub
<a 
  href="https://drive.google.com/file/d/YOUR_FILE_ID/view"
  target="_blank"
  rel="noopener noreferrer"
  className="button-group__btn button-group__btn--active"
>
  Download CV <i className="fas fa-external-link-alt"></i>
</a>
```

#### Option D: Track Downloads with Analytics

```typescript
const handleDownloadCV = () => {
  // Track with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'CV',
      event_label: 'Jaime_Abad_CV.pdf'
    })
  }
  
  // Trigger download
  window.location.href = '/Jaime_Abad_CV.pdf'
}
```

---

## Environment Variables

For production deployments with backend features:

```bash
# .env.local (for local development)
# .env.production (for production)

# Email Service (choose one)
SENDGRID_API_KEY=your_sendgrid_key
RESEND_API_KEY=your_resend_key

# Database (optional)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Form Service (optional)
WEB3FORMS_ACCESS_KEY=your_access_key
```

---

## Site Structure

### Sections

1. **Hero** (`#home`)
   - Profile image with hover effect
   - Animated typing subtitle
   - Call-to-action buttons
   - Social media links

2. **About** (`#about`)
   - Personal bio (2 paragraphs)
   - Technical skills with progress bars
   - Two-column responsive layout

3. **Projects** (`#projects`)
   - Three featured projects
   - Hover overlays with links
   - Technology tags
   - Responsive grid

4. **Blog** (`#blog`)
   - Three recent posts
   - Date, category, reading time
   - "Read More" links
   - Article cards

5. **Contact** (`#contact`)
   - Contact information cards
   - Functional form (Name, Email, Message)
   - Social media links
   - Two-column layout

6. **Footer**
   - Copyright notice
   - Built with attribution

### Navigation

- Desktop: Horizontal inline menu
- Mobile (<930px): Hamburger menu with slide-in panel
- Smooth scroll to section anchors

---

## Customization Guide

### Update Colors

```css
/* app/globals.css */
/* Find and replace color values */

/* Primary blue */
#007ced → your-color

/* Dark backgrounds */
#222 → your-background
#1a1a1a → your-alt-background
```

### Add New Section

```typescript
// 1. Add navigation link in app/page.tsx
<li className="nav__item">
  <a href="#services" className="nav__link">Services</a>
</li>

// 2. Add section markup
<section id="services" className="services">
  <div className="hero__wrapper">
    <h2 className="services__title">My Services</h2>
    {/* Content */}
  </div>
</section>

// 3. Add BEM styles in app/globals.css
.services {
  padding: 80px 0;
  background: #222;
}

.services__title {
  color: #007ced;
  font-size: 2.5rem;
}
```

### Replace Placeholder Content

```typescript
// Update in app/page.tsx

// 1. Hero description
<p className="hero-content__description">
  Your actual bio here...
</p>

// 2. Project cards
<h3 className="project-card__title">Your Project Name</h3>
<img src="/your-project-image.jpg" alt="Your Project" />

// 3. Blog posts
<span className="blog-card__date">Your Date</span>
<h3 className="blog-card__title">Your Article Title</h3>

// 4. Contact info
<p className="contact-item__text">your.email@example.com</p>
```

---

## Performance Metrics

Expected Lighthouse scores for production build:

- **Performance**: 95-100
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 95-100

### Optimization Tips

1. **Images**: Convert to WebP/AVIF format
2. **Fonts**: Use `font-display: swap` (already configured)
3. **CDN**: Serve Font Awesome locally instead of CDN
4. **Code Splitting**: Already optimized by Next.js
5. **Lazy Loading**: Add for below-fold images

---

## Troubleshooting

### Build fails

```bash
# Clear cache and reinstall
rm -rf .next out node_modules package-lock.json
npm install
npm run build
```

### TypeScript errors

```bash
# Check tsconfig.json is properly configured
# Ensure all dependencies are installed
npm install --save-dev typescript @types/react @types/node
```

### Styles not applying

```bash
# Verify CSS import in app/layout.tsx
# Check browser console for errors
# Clear browser cache (Ctrl+Shift+R)
```

### Form not working

```typescript
// Check React state is properly defined
const [formData, setFormData] = useState({
  name: '', email: '', message: ''
})

// Verify handleInputChange and handleSubmit are bound
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Support

For questions or issues:
- Create an issue in the GitHub repository
- Email: jaime.abad@example.com
- Documentation: See SECTIONS_GUIDE.md and BEM_CONVERSION_GUIDE.md

---
**Apache Setup:**
```bash
# Build the project
npm run build

# Copy to web server
sudo cp -r out/* /var/www/html/portfolio/

# Configure Apache virtual host
sudo nano /etc/apache2/sites-available/portfolio.conf
```

```apache
<VirtualHost *:80>
    ServerName portfolio.example.com
    DocumentRoot /var/www/html/portfolio
    
    <Directory /var/www/html/portfolio>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Handle Next.js trailing slashes
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^(.*)$ /$1.html [L]
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/portfolio_error.log
    CustomLog ${APACHE_LOG_DIR}/portfolio_access.log combined
</VirtualHost>
```

```bash
# Enable site and restart Apache
sudo a2ensite portfolio.conf
sudo systemctl restart apache2
```

**Nginx Setup:**
```bash
# Build the project
npm run build

# Copy to web server
sudo cp -r out/* /var/www/portfolio/

# Configure Nginx
sudo nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name portfolio.example.com;
    root /var/www/portfolio;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_comp_level 6;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle Next.js routing
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
    
    # Error pages
    error_page 404 /404.html;
}
```

```bash
# Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Option 2: Static Hosting Platforms

**Vercel (Recommended for Next.js):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Or connect your GitHub repo at vercel.com
# - Automatic deployments on git push
# - Preview deployments for branches
# - Built-in CDN and SSL
```

**Netlify:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=out

# Or use netlify.toml for automatic deployments
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**GitHub Pages:**
```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npx gh-pages -d out

# Configure repository settings:
# Settings → Pages → Source: gh-pages branch
```

**AWS S3 + CloudFront:**
```bash
# Install AWS CLI
# Configure: aws configure

# Build project
npm run build

# Sync to S3 bucket
aws s3 sync out/ s3://your-bucket-name/ --delete

# Create CloudFront distribution pointing to S3 bucket
# Enable HTTPS with ACM certificate
```

#### Option 3: Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t portfolio .
docker run -p 80:80 portfolio
```

#### CI/CD Pipeline Example (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Server
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: /var/www/portfolio/
          SOURCE: "out/"
```

### Performance Optimization

The static export is already optimized, but consider:

1. **Image Optimization**: Use next-gen formats (WebP, AVIF)
2. **CDN**: Serve assets from CDN for global performance
3. **Compression**: Enable Brotli/Gzip on server
4. **Caching**: Set appropriate cache headers for static assets
5. **Monitoring**: Use tools like Lighthouse, GTmetrix

---

## Tech Stack

- **Next.js 16**: App Router with static export
- **React 19**: Client components for interactivity
- **TypeScript**: Type-safe development
- **BEM CSS**: Block Element Modifier methodology
- **CDN Libraries**: Font Awesome, Typed.js

## Features

✅ Responsive design (mobile-first)
✅ Animated typing effect
✅ Hamburger navigation menu
✅ BEM CSS architecture
✅ About section with skills showcase
✅ Projects showcase with hover effects
✅ Blog section with article cards
✅ Contact form with validation

This site has:
- Zero backend coupling
- Can be moved to CDN with no code changes
- Static HTML output for maximum compatibility



