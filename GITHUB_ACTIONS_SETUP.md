# GitHub Actions Deployment Setup

## Overview
This guide explains how to deploy your Next.js portfolio to GitHub Pages using GitHub Actions with EmailJS credentials stored as repository secrets.

## Prerequisites
1. GitHub repository for your portfolio
2. EmailJS account with Service ID, Template ID, and Public Key
3. GitHub Pages enabled in repository settings

## Step 1: Configure EmailJS
Follow the instructions in `EMAILJS_SETUP.md` to get your credentials:
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

## Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add three secrets:

### Secret 1: EMAILJS_SERVICE_ID
- Name: `EMAILJS_SERVICE_ID`
- Value: Your EmailJS service ID (e.g., `service_abc123`)

### Secret 2: EMAILJS_TEMPLATE_ID
- Name: `EMAILJS_TEMPLATE_ID`
- Value: Your EmailJS template ID (e.g., `template_xyz789`)

### Secret 3: EMAILJS_PUBLIC_KEY
- Name: `EMAILJS_PUBLIC_KEY`
- Value: Your EmailJS public key (e.g., `A1B2C3D4E5F6G7H8`)

## Step 3: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## Step 4: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git remote add origin https://github.com/abadAfonsoJaime/portfolio.git
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git push -u origin main
```

## Step 5: Deploy

The workflow (`.github/workflows/deploy.yml`) will automatically:
1. Trigger on every push to `main` branch
2. Install dependencies
3. Create `.env.local` file with secrets
4. Build the Next.js static site
5. Deploy to GitHub Pages

### Manual Deployment
You can also trigger deployment manually:
1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Step 5: Verify Deployment

After successful deployment:
1. Your site will be available at: `https://abadAfonsoJaime.github.io/portfolio/`
2. Check the **Actions** tab for build status
3. Test the contact form to ensure EmailJS works

## Workflow File Structure

```yaml
.github/
└── workflows/
    └── deploy.yml  # GitHub Actions workflow
```

The workflow:
- Runs on Node.js 20
- Uses npm ci for clean install
- Injects secrets as environment variables during build
- Uploads static export to GitHub Pages
- Deploys automatically

## Environment Variables in Build

During the build process, GitHub Actions creates `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=[from GitHub secret]
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=[from GitHub secret]
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=[from GitHub secret]
```

These variables are available to Next.js during build and bundled into the static output.

## Troubleshooting

### Build Fails
- Check **Actions** tab for error logs
- Verify all three secrets are added correctly
- Ensure secret names match exactly: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`

### Contact Form Not Working
- Verify EmailJS credentials are correct
- Check browser console for errors
- Test EmailJS credentials locally first with `.env.local`

### 404 on GitHub Pages
- Ensure GitHub Pages source is set to **GitHub Actions**
- Check that `next.config.js` has `output: 'export'`
- Verify the workflow completed successfully

## Local Development

For local development:
1. Copy `.env.local.example` to `.env.local`
2. Add your actual EmailJS credentials
3. Run `npm run dev`

**Important:** Never commit `.env.local` to git (it's in `.gitignore`)

## Next.js Configuration

Your `next.config.js` is already configured for static export:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

This configuration is required for GitHub Pages deployment.

## Security Notes

✅ **Good practices:**
- EmailJS credentials stored as GitHub Secrets (encrypted)
- `.env.local` in `.gitignore` (not committed)
- Secrets only available during build process
- `NEXT_PUBLIC_*` prefix makes variables available to browser (safe for client-side email service)

⚠️ **Important:**
- Never commit actual credentials to repository
- EmailJS public key is safe to expose (it's client-side)
- Service ID and Template ID are also client-side values

## Additional Resources

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

## Summary

✅ Secrets stored securely in GitHub  
✅ Automatic deployment on push to main  
✅ EmailJS credentials injected at build time  
✅ Static site deployed to GitHub Pages  
✅ Contact form functional with encrypted credentials  

Your portfolio is now configured for automated CI/CD deployment! 🚀
