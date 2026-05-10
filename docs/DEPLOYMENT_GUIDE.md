# Portfolio Deployment Guide

## Overview
Step-by-step instructions for deploying the portfolio site to GitHub Pages with automated CI/CD.

## 📋 Prerequisites

### Required Accounts
- **GitHub Account**: Repository hosting and Pages deployment
- **Google Analytics 4**: Analytics tracking
- **Supabase Account**: Database for visitor tracking
- **Contentful Account**: Content management system
- **EmailJS Account**: Contact form handling

### Local Development Setup
```bash
# Clone repository
git clone https://github.com/abadAfonsoJaime/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

## 🔧 Environment Configuration

### Required Environment Variables
Create `.env.local` file in project root:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key

# Contentful Configuration (optional)
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your-space-id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your-access-token
```

### Obtaining API Keys

#### Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property or use existing
3. Get Measurement ID: Admin → Property → Data Streams → Web → Measurement ID

#### Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project
3. Get URL and anon key from Settings → API
4. Get service role key (keep secret)

#### Contentful
1. Go to [Contentful Dashboard](https://app.contentful.com)
2. Create new space or use existing
3. Get Space ID from Settings → General settings
4. Create Personal Access Token: Settings → API keys

#### EmailJS
1. Go to [EmailJS Dashboard](https://www.emailjs.com)
2. Create account and service
3. Get Service ID, Template ID, and Public Key

## 🗄️ Database Setup (Supabase)

### Create Tables
Run these SQL commands in Supabase SQL Editor:

```sql
-- Visitor sessions table
CREATE TABLE visitor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  landing_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visitor interactions table
CREATE TABLE visitor_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES visitor_sessions(session_id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES visitor_sessions(session_id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_visitor_sessions_session_id ON visitor_sessions(session_id);
CREATE INDEX idx_visitor_interactions_session_id ON visitor_interactions(session_id);
CREATE INDEX idx_visitor_interactions_event_type ON visitor_interactions(event_type);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for data access
CREATE POLICY "Allow insert on visitor_sessions" ON visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select on visitor_sessions" ON visitor_sessions FOR SELECT USING (true);
CREATE POLICY "Allow insert on visitor_interactions" ON visitor_interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select on visitor_interactions" ON visitor_interactions FOR SELECT USING (true);
CREATE POLICY "Allow insert on contact_submissions" ON visitor_interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select on contact_submissions" ON contact_submissions FOR SELECT USING (true);
```

### Test Database Connection
```bash
# Test connection (optional)
npm run db:test
```

## 📝 Content Setup (Contentful)

### Create Content Models

#### Projects Model
1. **Content model name**: Project
2. **API identifier**: project
3. **Fields**:
   - `title` (Short text) - Required
   - `slug` (Short text) - Required, unique
   - `description` (Long text) - Required
   - `technologies` (Short text, list) - Required
   - `projectType` (Dropdown: Private, Open Source) - Required
   - `githubUrl` (Short text)
   - `demoUrl` (Short text)
   - `featuredImage` (Media)
   - `pricing` (Short text)
   - `featured` (Boolean)

#### Blog Posts Model
1. **Content model name**: BlogPost
2. **API identifier**: blogPost
3. **Fields**:
   - `title` (Short text) - Required
   - `slug` (Short text) - Required, unique
   - `content` (Rich text) - Required
   - `excerpt` (Long text) - Required
   - `category` (Short text) - Required
   - `tags` (Short text, list)
   - `readingTime` (Integer)
   - `featuredImage` (Media)
   - `publishedDate` (Date & time) - Required
   - `featured` (Boolean)

### Add Sample Content
1. Create 3-5 sample projects
2. Create 2-3 sample blog posts
3. Upload relevant images
4. Publish all content

## 🚀 Deployment Configuration

### GitHub Repository Setup
1. **Create repository**: `portfolio` (or your preferred name)
2. **Clone locally** and copy project files
3. **Push initial commit**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

### GitHub Pages Configuration
1. **Go to repository Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` / `root`
4. **Save**

### GitHub Actions Setup
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Create .env.local with secrets
        run: |
          cat > .env.local <<'EOF'
NEXT_PUBLIC_GA4_MEASUREMENT_ID=${{ secrets.GA4_MEASUREMENT_ID }}
NEXT_PUBLIC_SUPABASE_URL=${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=${{ secrets.NEXT_PUBLIC_CONTENTFUL_SPACE_ID }}
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=${{ secrets.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN }}
NEXT_PUBLIC_EMAILJS_SERVICE_ID=${{ secrets.EMAILJS_SERVICE_ID }}
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${{ secrets.EMAILJS_TEMPLATE_ID }}
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${{ secrets.EMAILJS_PUBLIC_KEY }}
EOF

      - name: Validate repository secrets
        run: npm test

      - name: Build Next.js
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

  post-deploy-validation:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Create .env.local with secrets
        run: |
          cat > .env.local <<'EOF'
NEXT_PUBLIC_GA4_MEASUREMENT_ID=${{ secrets.GA4_MEASUREMENT_ID }}
NEXT_PUBLIC_SUPABASE_URL=${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=${{ secrets.NEXT_PUBLIC_CONTENTFUL_SPACE_ID }}
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=${{ secrets.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN }}
NEXT_PUBLIC_EMAILJS_SERVICE_ID=${{ secrets.EMAILJS_SERVICE_ID }}
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${{ secrets.EMAILJS_TEMPLATE_ID }}
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${{ secrets.EMAILJS_PUBLIC_KEY }}
EOF
      - name: Validate repository secrets
        run: npm test

### Environment Secrets Setup
**Repository Settings → Secrets and variables → Actions**

Add these secrets:
- `GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
- `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

## 🧪 Testing Deployment

### Local Testing
```bash
# Build for production
npm run build

# Test static export locally
npx serve out

# Open http://localhost:3000 to test
```

### Pre-deployment Checklist
- [ ] Environment variables configured in GitHub secrets
- [ ] Database tables created in Supabase
- [ ] Content models and sample content in Contentful
- [ ] GitHub Actions workflow file committed
- [ ] GitHub Pages enabled in repository settings
- [ ] Custom domain configured (optional)

### Deploy and Verify
```bash
# Push to trigger deployment
git add .
git commit -m "Deploy: Configure production environment"
git push origin main
```

**Monitor deployment**:
1. Go to repository → Actions tab
2. Watch build progress
3. Check deployment status
4. Visit live site: `https://yourusername.github.io/portfolio`

## 🔄 Contentful Webhook Setup (Optional)

### Configure Webhook for Auto-rebuild
1. **Contentful Settings → Webhooks**
2. **Create webhook**:
   - Name: Portfolio Deploy
   - URL: `https://api.github.com/repos/yourusername/portfolio/dispatches`
   - HTTP Method: POST
   - Headers: `Authorization: token YOUR_GITHUB_TOKEN`
   - Payload: `{"event_type": "contentful_update"}`

3. **GitHub Actions workflow** for webhook:
   ```yaml
   name: Rebuild on Contentful Update

   on:
     repository_dispatch:
       types: [contentful_update]

   jobs:
     rebuild:
       runs-on: ubuntu-latest
       steps:
       - name: Trigger rebuild
         run: echo "Rebuilding triggered by Contentful update"
   ```

## 🌐 Custom Domain Setup (Optional)

### GitHub Pages Custom Domain
1. **Repository Settings → Pages**
2. **Custom domain**: Enter your domain
3. **Save**

### DNS Configuration
Add these records to your DNS provider:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### SSL Certificate
GitHub Pages automatically provides SSL certificates for custom domains.

## 📊 Post-Deployment Verification

### Functional Testing
- [ ] Site loads correctly
- [ ] Navigation works
- [ ] Contact form submits
- [ ] CV download works
- [ ] Social links functional
- [ ] Analytics tracking active
- [ ] Content displays properly

### Performance Testing
- [ ] Lighthouse audit score > 90
- [ ] Page load time < 3 seconds
- [ ] Mobile responsive
- [ ] SEO meta tags present

### Monitoring Setup
- [ ] Google Analytics receiving data
- [ ] Supabase logging interactions
- [ ] GitHub Actions successful
- [ ] Error monitoring active

## 🆘 Troubleshooting

### Common Issues

#### Build Fails
**Symptom**: GitHub Actions build fails
**Solutions**:
1. Check build logs for errors
2. Verify environment secrets are set
3. Test build locally: `npm run build`
4. Check Node.js version compatibility

#### Content Not Loading
**Symptom**: Projects/blog posts not showing
**Solutions**:
1. Verify Contentful API keys
2. Check content is published
3. Test API endpoints locally
4. Check Contentful space configuration

#### Analytics Not Working
**Symptom**: No data in GA4
**Solutions**:
1. Verify GA4 measurement ID
2. Check GA4 property configuration
3. Test tracking in browser console
4. Verify GDPR consent implementation

#### Contact Form Issues
**Symptom**: Form submissions failing
**Solutions**:
1. Check EmailJS credentials
2. Verify template configuration
3. Test EmailJS service
4. Check spam folder

### Getting Help
- **GitHub Issues**: Report bugs in repository
- **Next.js Discord**: Community support
- **Contentful Community**: CMS-specific help
- **Supabase Discord**: Database support

## 📚 Next Steps

After successful deployment:
1. **Add more content** to Contentful
2. **Monitor analytics** regularly
3. **Optimize performance** based on metrics
4. **Plan scalability** improvements
5. **Set up monitoring** alerts

## 🔄 Update Process

### Content Updates
```bash
# Update content in Contentful
# Changes auto-deploy via webhook (if configured)
# Or manually trigger rebuild
git commit --allow-empty -m "trigger rebuild"
git push origin main
```

### Code Updates
```bash
# Make code changes
git add .
git commit -m "Update feature"
git push origin main
# GitHub Actions handles deployment automatically
```

### Dependency Updates
```bash
# Update dependencies
npm update
npm run build  # Test build
git add .
git commit -m "Update dependencies"
git push origin main
```