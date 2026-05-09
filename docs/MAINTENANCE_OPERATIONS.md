# Portfolio Maintenance & Operations Manual

## Overview
This manual covers maintenance, deployment, monitoring, and operational procedures for the portfolio site.

## 🏗️ Architecture Overview

- **Framework**: Next.js 16 with App Router
- **Deployment**: Static export to GitHub Pages (`/portfolio` subdirectory)
- **Analytics**: Google Analytics 4 + Supabase visitor tracking
- **Content**: Contentful CMS for projects and blog posts
- **Contact**: EmailJS for form submissions
- **CI/CD**: GitHub Actions automated deployment

## 📊 Monitoring & Analytics

### Google Analytics 4 Dashboard
**Access**: [Google Analytics](https://analytics.google.com)
- **Real-time users**: Monitor live traffic
- **Top pages**: Track most visited sections
- **Events**: CV downloads, social clicks, contact submissions
- **Conversions**: Form submissions and CV downloads

### Supabase Analytics Database
**Access**: [Supabase Dashboard](https://supabase.com/dashboard)
- **Visitor sessions**: Track unique visitors
- **Interaction events**: Click analytics and user behavior
- **Contact submissions**: Form data archive
- **GDPR compliance**: 90-day data retention

### GitHub Actions Monitoring
**Access**: Repository → Actions tab
- **Build status**: Check deployment success
- **Error logs**: Review build failures
- **Deployment history**: Track release timeline

## 🔧 Maintenance Procedures

### Weekly Tasks
1. **Check analytics data**
   - Review GA4 traffic trends
   - Monitor Supabase data growth
   - Check for unusual error patterns

2. **Content updates**
   - Review Contentful for new content
   - Update project statuses if needed
   - Check blog post publication dates

3. **Performance monitoring**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor bundle size

### Monthly Tasks
1. **Security updates**
   - Update dependencies: `npm audit fix`
   - Review GitHub security alerts
   - Update Node.js version if needed

2. **Content audit**
   - Review and update project descriptions
   - Archive old blog posts
   - Update contact information

3. **SEO optimization**
   - Check Google Search Console
   - Review meta descriptions
   - Update sitemap if needed

### Development Tools Setup
1. **Agent Skills Installation (Optional)**
   - Install Supabase Agent Skills for enhanced AI coding assistance
   - Run: `npx skills add supabase/agent-skills`
   - This provides ready-made instructions and resources for working with Supabase

## 🚀 Deployment Procedures

### Automated Deployment (Recommended)
```bash
# Push to main branch triggers automatic deployment
git add .
git commit -m "Update content"
git push origin main
```

**GitHub Actions will:**
- Install dependencies
- Run build process
- Deploy to GitHub Pages
- Send deployment notification

### Manual Deployment
```bash
# Local build and test
npm run build
npm run start  # Test locally on port 3000

# Deploy to GitHub Pages
npm run build
npx gh-pages -d out -b gh-pages
```

### Rollback Procedure
```bash
# Revert to previous commit
git log --oneline -10  # Find previous commit
git revert <commit-hash>
git push origin main
```

## 📝 Content Management

### Adding Projects (Contentful)
1. **Access Contentful**: [Contentful Dashboard](https://app.contentful.com)
2. **Create new entry**: Content → Projects
3. **Fill fields**:
   - Title, description, technologies
   - Type: Private or Open Source
   - Links: GitHub, demo URL
   - Featured image
   - Pricing information
4. **Publish**: Save and publish
5. **Trigger rebuild**: Push empty commit or wait for webhook

### Writing Blog Posts (Contentful)
1. **Create new entry**: Content → Blog Posts
2. **Rich text editor**: Write content with formatting
3. **Add metadata**: Category, reading time, tags
4. **Upload images**: Use Contentful media library
5. **Schedule publication**: Set publish date
6. **Publish**: Make live

### Updating Personal Information
1. **Edit layout.tsx**: Update metadata and structured data
2. **Update page.tsx**: Modify hero content and about section
3. **Update social links**: Change URLs if needed
4. **Deploy changes**: Push to trigger rebuild

## 🔍 Troubleshooting Guide

### Build Failures
**Symptom**: GitHub Actions build fails
**Solutions**:
1. Check build logs in Actions tab
2. Verify environment variables
3. Test locally: `npm run build`
4. Check for TypeScript errors
5. Verify Contentful API access

### Content Not Updating
**Symptom**: New content not appearing on site
**Solutions**:
1. Check Contentful entry is published
2. Verify API keys in environment
3. Trigger manual rebuild: `git commit --allow-empty -m "trigger rebuild"`
4. Check Contentful webhook configuration
5. Wait 5-10 minutes for CDN cache

### Analytics Not Working
**Symptom**: No data in GA4 or Supabase
**Solutions**:
1. Check GA4 measurement ID in environment
2. Verify Supabase credentials
3. Check browser console for errors
4. Test tracking events manually
5. Verify GDPR consent is working

### Slow Loading
**Symptom**: Site loads slowly
**Solutions**:
1. Check image optimization
2. Review bundle size: `npm run build`
3. Test on different networks
4. Check Contentful API response times
5. Optimize font loading

## 🔒 Security Procedures

### Environment Variables
**Never commit secrets to git**:
- GA4 measurement ID (public, but track usage)
- Supabase keys (keep private)
- Contentful access token (keep private)
- EmailJS credentials (keep private)

### Access Control
- **GitHub repository**: Private or public as needed
- **Contentful space**: Invite collaborators as needed
- **Supabase project**: Restrict to necessary team members
- **GA4 property**: Grant access to analytics users

### Data Privacy
- **GDPR compliance**: 90-day data retention in Supabase
- **User consent**: Analytics tracking requires consent
- **Data deletion**: Users can request data removal
- **Cookie policy**: Document tracking practices

## 📈 Performance Optimization

### Image Optimization
- Use WebP format in Contentful
- Implement lazy loading
- Optimize image sizes
- Use CDN for static assets

### Bundle Optimization
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
npm run build:analyze
```

### Caching Strategy
- Contentful CDN for content
- Browser caching for static assets
- Service worker for offline capability (future)

## 📞 Support & Escalation

### Emergency Contacts
- **GitHub Pages outage**: Check [GitHub Status](https://www.githubstatus.com)
- **Contentful issues**: [Contentful Support](https://www.contentful.com/support/)
- **Supabase issues**: [Supabase Support](https://supabase.com/support)
- **GA4 issues**: [Google Analytics Help](https://support.google.com/analytics)

### Escalation Path
1. **Self-service**: Check documentation and logs
2. **Community**: GitHub issues, Stack Overflow
3. **Vendor support**: Contentful/Supabase support tickets
4. **Professional help**: Hire developer for complex issues

## 📋 Checklist Templates

### Pre-Deployment Checklist
- [ ] Environment variables configured
- [ ] Contentful entries published
- [ ] Local build successful
- [ ] Analytics tracking tested
- [ ] Contact form tested
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags updated

### Post-Deployment Checklist
- [ ] Site loads correctly
- [ ] Analytics events firing
- [ ] Content appears as expected
- [ ] Contact form submissions working
- [ ] Social links functional
- [ ] CV downloads working
- [ ] Mobile layout correct

### Monthly Maintenance Checklist
- [ ] Dependencies updated
- [ ] Security vulnerabilities patched
- [ ] Analytics data reviewed
- [ ] Content freshness checked
- [ ] Performance metrics monitored
- [ ] Backup procedures verified

## 📚 Additional Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Contentful Guides**: [contentful.com/developers/docs](https://www.contentful.com/developers/docs/)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **GA4 Help**: [support.google.com/analytics](https://support.google.com/analytics)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)