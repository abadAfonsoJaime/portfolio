# Agent Instructions for Dual GitHub & Contentful Management

AI agents can now manage both your **code** (GitHub) and **content** (Contentful CMS) in unified workflows.

## Agent Capabilities

Your portfolio now supports AI agents that can:

### 1. **Code Management (GitHub)**
- Create/edit files and components
- Update Next.js configurations
- Modify TypeScript code
- Create and merge pull requests
- Update documentation

### 2. **Content Management (Contentful)**
- Create blog posts with metadata
- Create/update projects
- Manage content publication
- List existing content
- Update published content

### 3. **Unified Workflows**
- Create blog post + update code references
- Launch feature + document in blog
- Update project info + add code examples
- Synchronize content across platforms

## When to Use Each

### Use GitHub-Only When:
- Updating code logic
- Creating components
- Modifying configurations
- Fixing bugs
- Updating styling

### Use Contentful-Only When:
- Adding blog post content
- Managing project information
- Publishing announcements
- Updating portfolio content
- No code changes needed

### Use Both (Unified) When:
- Launching new feature + documenting it
- Adding code examples to blog
- Updating project with code changes
- Major content + code updates
- Portfolio overhauls

## Example Agent Workflows

### Workflow 1: Create Blog Post About New Feature

```
User: "Write a blog post about the new dark mode feature implementation"

Agent Actions:
1. Create blog post in Contentful:
   - Title: "Implementing Dark Mode: A Technical Deep Dive"
   - Slug: "dark-mode-implementation"
   - Category: "Engineering"
   - Content: [Full markdown content]

2. Update code documentation (if needed)

3. Commit changes: "docs: add blog post about dark mode"

Result: ✅ Blog post live on site + code documented
```

### Workflow 2: Add Project to Portfolio

```
User: "Add my new SaaS project to the portfolio with links and technologies"

Agent Actions:
1. Create project in Contentful:
   - Title: "Analytics Dashboard"
   - Slug: "analytics-dashboard"
   - Technologies: "React, TypeScript, Next.js, PostgreSQL"
   - GitHub URL: [link]
   - Demo URL: [link]

2. Mark as featured

3. Commit reference in code if needed

Result: ✅ Project appears on portfolio homepage
```

### Workflow 3: Update Blog Post & Site Documentation

```
User: "Update the TypeScript guide blog post and add new best practices"

Agent Actions:
1. Update blog post in Contentful:
   - Fetch existing post by slug
   - Add new sections
   - Update metadata

2. Update site documentation:
   - Edit code comments
   - Update style guide references

3. Commit: "docs: update typescript guide with new practices"

Result: ✅ Blog updated + site docs synchronized
```

## Available Commands for Agents

### Blog Post Commands

```bash
# List all blog posts (check for duplicates before creating)
npm run script -- contentful:list-blogs

# Create new blog post
npm run script -- contentful:create-blog \
  --title "Your Post Title" \
  --slug "post-slug" \
  --category "Engineering|Design|Tutorial" \
  --excerpt "Brief summary (150 chars)" \
  --content "Full markdown content"

# Update existing post
npm run script -- contentful:update-blog \
  --id "entry-id-from-list" \
  --title "Updated Title" \
  --content "Updated content"

# Delete blog post
npm run script -- contentful:delete-blog --id "entry-id"
```

### Project Commands

```bash
# List all projects
npm run script -- contentful:list-projects

# Create new project
npm run script -- contentful:create-project \
  --title "Project Name" \
  --slug "project-slug" \
  --description "Project overview" \
  --technologies "TypeScript, React, Next.js" \
  --type "Private|Open Source|Freelance" \
  --featured true \
  --githubUrl "https://github.com/..." \
  --demoUrl "https://demo.com"

# Update project
npm run script -- contentful:update-project \
  --id "entry-id-from-list" \
  --title "New Title" \
  --featured true

# Delete project
npm run script -- contentful:delete-project --id "entry-id"
```

## Field Requirements & Formats

### Blog Post Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | Text | ✅ | 50-60 characters for SEO |
| `slug` | Text | ✅ | Lowercase, hyphenated, unique (check with list command) |
| `excerpt` | Text | ✅ | 150-160 characters, no HTML |
| `content` | Text | ✅ | Markdown format with proper syntax |
| `category` | Text | ✅ | Options: Engineering, Design, Tutorial, Case Study, News |
| `tags` | Text | ❌ | Comma-separated: `typescript,react,optimization` |
| `publishedDate` | Date | ✅ | ISO format: `2026-05-10T12:00:00Z` |
| `featured` | Boolean | ❌ | `true` to show on homepage |
| `author` | Text | ❌ | Author name |

### Project Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | Text | ✅ | Project name (max 100 chars) |
| `slug` | Text | ✅ | Lowercase, hyphenated, unique |
| `description` | Text | ✅ | Project overview (max 200 chars) |
| `technologies` | Text | ✅ | Comma-separated: `React, TypeScript, PostgreSQL` |
| `projectType` | Text | ✅ | Private, Open Source, Freelance, or Archived |
| `featured` | Boolean | ❌ | `true` to show on homepage |
| `demoUrl` | URL | ❌ | https://example.com |
| `githubUrl` | URL | ❌ | https://github.com/user/repo |

## Content Guidelines

### Markdown Standards
```markdown
# H1: Main Title (One per post)

## H2: Section Heading

### H3: Subsection

**Bold text** for emphasis
*Italic text* for references
`inline code` for functions/variables

# Code Blocks
\`\`\`typescript
const example = () => {
  return "hello";
};
\`\`\`

# Links
[Link text](https://url.com)

# Lists
- Item 1
- Item 2
```

### SEO Best Practices

**Titles** (50-60 chars):
- ✅ "React Performance Optimization: A Complete Guide"
- ✅ "Building Scalable TypeScript Applications"
- ❌ "My thoughts on programming" (too generic)
- ❌ "A very long title about many topics that exceeds recommended length" (too long)

**Slugs** (Unique & Descriptive):
- ✅ `react-performance-optimization`
- ✅ `typescript-scalable-apps`
- ❌ `post-1` (not descriptive)
- ❌ `My Amazing Post` (spaces/caps)

**Excerpts** (150-160 chars):
- ✅ "Learn key techniques for optimizing React performance, including code splitting, lazy loading, and memoization. Improve your app's speed and user experience."
- ❌ "This is a post about stuff" (too vague)

## Error Prevention

### Before Creating Content

1. **Check for duplicates**:
   ```bash
   npm run script -- contentful:list-blogs
   npm run script -- contentful:list-projects
   ```

2. **Validate slug uniqueness**: Slug must not appear in list

3. **Verify required fields**: All marked ✅ above must be present

4. **Test markdown**: All code blocks must have language identifier

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Slug already exists" | Duplicate slug | Add suffix: `slug-v2` or `slug-updated` |
| "Missing required field" | Empty content/title | Provide all ✅ required fields |
| "API rate limit" | Too many requests | Wait 60 seconds, retry |
| "Invalid markdown" | Wrong code block syntax | Use `` \`\`\`language `` format |
| "Content not published" | Entry in draft | Script auto-publishes, check Contentful UI |

## Deployment Flow

### Content-Only Changes
```
1. Create/update content in Contentful ✅
2. Content auto-publishes
3. Next rebuild fetches new content
4. Site updates automatically
5. No code changes needed
```

### Content + Code Changes
```
1. Create/update content in Contentful ✅
2. Update code files in GitHub ✅
3. Commit & push to main
4. GitHub Actions triggers:
   - npm test (validate)
   - npm run build (build site with new content)
   - Deploy to GitHub Pages
5. Live in seconds
```

## Agent Restrictions

Agents should NOT:
- ❌ Delete production blog posts without confirmation
- ❌ Publish sensitive/incomplete content without review
- ❌ Update core portfolio code without user approval
- ❌ Share API tokens or secrets
- ❌ Access production data without authorization

Agents SHOULD:
- ✅ Ask for clarification on ambiguous requests
- ✅ List existing content before creating similar entries
- ✅ Validate all inputs match required formats
- ✅ Log all actions taken
- ✅ Report success/failure clearly

## Quick Start for Agents

### First Time Setup
```bash
# 1. Verify environment variables
echo $CONTENTFUL_MANAGEMENT_TOKEN  # Should exist
echo $NEXT_PUBLIC_CONTENTFUL_SPACE_ID  # Should exist

# 2. Test connection
npm run script -- contentful:list-blogs

# 3. Ready to create content!
```

### Create Your First Blog Post
```bash
npm run script -- contentful:create-blog \
  --title "Getting Started with Next.js" \
  --slug "getting-started-nextjs" \
  --category "Tutorial" \
  --excerpt "A comprehensive guide to building modern web applications with Next.js 16" \
  --content "## Introduction

Next.js is a React framework for production...

## Key Features

- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- Automatic code splitting

## Getting Started

\`\`\`bash
npm install next react react-dom
\`\`\`"
```

### Typical Agent Response
```
✅ Blog post created: 
- ID: 5jKhL8mNpQ2rS3tUvWxYz0
- Title: Getting Started with Next.js
- Slug: getting-started-nextjs
- Status: Published

📝 Post is live on: https://yourusername.github.io/portfolio/blog/getting-started-nextjs
```

## Integration with Code

Agents can reference content in code:

```typescript
// In components, agents can create links to blog posts
<a href={`/blog/${post.slug}`}>Read: {post.title}</a>

// Or add blog post metadata to projects
<ProjectCard 
  title={project.title}
  relatedBlogPost="/blog/project-implementation"
/>
```

## Next Steps

1. ✅ Set up Contentful Management API token
2. ✅ Add `CONTENTFUL_MANAGEMENT_TOKEN` to GitHub Secrets
3. ✅ Install `contentful-management` package
4. ✅ Test with: `npm run script -- contentful:list-blogs`
5. ✅ Start using agents for content management!

---

**Your portfolio is now ready for AI-powered content and code management!** 🚀

For detailed setup, see: [docs/CONTENTFUL_MANAGEMENT_API.md](./CONTENTFUL_MANAGEMENT_API.md)
