# Contentful Agent Quick Reference

One-page reference for AI agents managing your portfolio via Contentful.

## Setup Checklist

- [x] `CONTENTFUL_MANAGEMENT_TOKEN` in GitHub Secrets
- [x] `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` in GitHub Secrets
- [x] `npm install contentful-management` (done)
- [x] `lib/contentful-management.ts` created
- [x] `lib/contentful-blog-management.ts` created
- [x] `lib/contentful-projects-management.ts` created
- [x] `scripts/contentful-cli.ts` created
- [x] `package.json` updated with `"script": "tsx scripts/contentful-cli.ts"`
- [x] `.github/workflows/contentful-sync.yml` created

## Common Tasks

### 1️⃣ Check for Duplicates
```bash
npm run script -- contentful:list-blogs
npm run script -- contentful:list-projects
```
**Before** creating new content, always run these to check slug uniqueness.

### 2️⃣ Create Blog Post
```bash
npm run script -- contentful:create-blog \
  --title "Post Title" \
  --slug "post-slug" \
  --category "Engineering" \
  --excerpt "Summary here" \
  --content "# Main\n\nContent in markdown"
```
**Required**: title, slug, category, excerpt, content  
**Auto**: publishedDate (now), featured (false)

### 3️⃣ Update Blog Post
```bash
npm run script -- contentful:update-blog \
  --id "<id-from-list>" \
  --title "New Title" \
  --content "Updated content"
```
**Tip**: Get ID from `contentful:list-blogs` output

### 4️⃣ Create Project
```bash
npm run script -- contentful:create-project \
  --title "Project Name" \
  --slug "project-slug" \
  --description "Overview" \
  --technologies "React, TypeScript" \
  --type "Open Source" \
  --featured true \
  --githubUrl "https://github.com/..." \
  --demoUrl "https://demo.com"
```
**Required**: title, slug, description, technologies, type  
**Types**: Private, Open Source, Freelance, Archived

### 5️⃣ Combined: Blog + Code
```bash
# 1. Create content
npm run script -- contentful:create-blog \
  --title "New Feature" \
  --slug "new-feature" \
  --category "Engineering" \
  --excerpt "Released new feature" \
  --content "## Overview\n..."

# 2. Update code (edit file)
# (Update src/components/Features.tsx to reference blog post)

# 3. Commit & Push
git add .
git commit -m "docs: add blog post about new feature"
git push origin main

# 4. GitHub Actions auto-deploys ✅
```

## Field Reference

### Blog Post
| Field | Required | Example |
|-------|----------|---------|
| title | ✅ | "React Performance Tips" |
| slug | ✅ | "react-performance-tips" |
| excerpt | ✅ | "5 techniques to improve React app speed..." |
| content | ✅ | "## Introduction\n\nReact is fast..." |
| category | ✅ | "Engineering" |
| tags | ❌ | "react,performance,optimization" |
| publishedDate | ✅ | Auto-set to now |
| featured | ❌ | "true" or "false" |
| author | ❌ | "Jaime Abad" |

### Project
| Field | Required | Example |
|-------|----------|---------|
| title | ✅ | "Analytics Dashboard" |
| slug | ✅ | "analytics-dashboard" |
| description | ✅ | "Real-time analytics with React" |
| technologies | ✅ | "React, TypeScript, PostgreSQL" |
| projectType | ✅ | "Open Source" |
| featured | ❌ | "true" |
| demoUrl | ❌ | "https://demo.com" |
| githubUrl | ❌ | "https://github.com/..." |

## SEO Tips

**Title** (50-60 chars):
- ✅ "Building Scalable Node.js APIs"
- ❌ "My post" (too short/generic)

**Slug** (Unique, lowercase, hyphens):
- ✅ `scalable-nodejs-apis`
- ❌ `My Post` (wrong format)

**Excerpt** (150-160 chars):
- ✅ "Learn best practices for building scalable Node.js APIs, including error handling, validation, and performance optimization."
- ❌ "This is about Node" (too vague)

## Error Codes & Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| `Slug already exists` | Duplicate | Add `-v2` suffix |
| `Missing required field` | Empty field | Provide all ✅ fields |
| `API rate limit` | Too many requests | Wait 1 minute, retry |
| `Entry not found` | Wrong ID | Verify ID from `list` command |
| `401 Unauthorized` | Bad token | Check `CONTENTFUL_MANAGEMENT_TOKEN` |

## Validation Rules

Before submitting to agent, ensure:

1. **Slug is unique**
   ```bash
   npm run script -- contentful:list-blogs  # Check existing slugs
   ```

2. **Slug format** (lowercase, hyphens only):
   - ✅ `my-awesome-post`
   - ❌ `My Awesome Post`
   - ❌ `my_awesome_post`

3. **Content is markdown**:
   - ✅ `# Heading\n\nParagraph\n\n\`\`\`typescript\ncode\n\`\`\``
   - ❌ `<h1>Heading</h1><p>...</p>`

4. **URLs are absolute**:
   - ✅ `https://github.com/user/repo`
   - ❌ `/github.com/user/repo`

5. **Fields are non-empty**:
   - ✅ `--title "Real Title"`
   - ❌ `--title ""`

## Environment Variables

```bash
# Your setup already has:
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=<space-id>
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=<read-only-token>

# Add this for agent management:
CONTENTFUL_MANAGEMENT_TOKEN=<management-token>

# Get management token from:
# Contentful → Account → Personal tokens → Create
```

## Response Format

Agent operations respond with:

```bash
✅ Blog post created: 
- ID: 5jKhL8mNpQ2rS3tUvWxYz0
- Title: Your Post Title
- Slug: your-post-slug
- Published: true

📝 Post is live at: https://yourusername.github.io/portfolio/blog/your-post-slug
```

## Workflow Examples

### 📝 Blog Post Workflow
```
1. User: "Write a blog post about TypeScript"
2. Agent:
   - npm run script -- contentful:list-blogs (check duplicates)
   - npm run script -- contentful:create-blog --title "..." (create)
   - Report success + link
3. User reviews post on site
```

### 🚀 Project Addition
```
1. User: "Add my new SaaS project"
2. Agent:
   - npm run script -- contentful:list-projects (check)
   - npm run script -- contentful:create-project --title "..." (create)
   - Report success + details
3. Project appears on portfolio
```

### 📝 Combined Workflow
```
1. User: "Document new API feature + update portfolio"
2. Agent:
   - Create Contentful blog post
   - Update code documentation
   - Update feature component reference
   - git commit & git push
   - GitHub Actions deploys
3. Everything live + synchronized
```

## Do's & Don'ts

### ✅ DO
- List content before creating (avoid duplicates)
- Use provided CLI commands exactly
- Ask for clarification on ambiguous requests
- Validate slug uniqueness
- Report success with link to content

### ❌ DON'T
- Create without checking for duplicates
- Modify ID/slug after creation without deleting old
- Use HTML instead of markdown
- Share API tokens in output
- Bypass validation requirements

## Testing

Verify setup works:
```bash
# 1. Check token exists
echo $CONTENTFUL_MANAGEMENT_TOKEN

# 2. List existing content (should not error)
npm run script -- contentful:list-blogs

# 3. If both work, ready to manage content!
```

## Support

For issues, check:
1. **Token invalid?** → Regenerate in Contentful dashboard
2. **Command not found?** → Verify `package.json` has `"script"` entry
3. **Slug exists?** → Add `-v2` or date suffix
4. **Content not live?** → Check `featured` field, might need rebuild

---

## TL;DR

```bash
# Check what exists
npm run script -- contentful:list-blogs

# Create new blog post
npm run script -- contentful:create-blog \
  --title "Title" --slug "slug" --category "Category" \
  --excerpt "Excerpt" --content "Content"

# Create new project
npm run script -- contentful:create-project \
  --title "Title" --slug "slug" --description "Desc" \
  --technologies "Tech1,Tech2" --type "Open Source"
```

**That's it! Ready to manage content via Contentful.** ✅
