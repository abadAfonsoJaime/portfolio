# Contentful Management API Setup

Guide to enable AI agents to manage both GitHub code and Contentful content programmatically.

## Overview

This enables agents to:
- **Create/update blog posts** in Contentful
- **Create/update projects** in Contentful
- **Publish/unpublish content**
- **Manage assets** (images)
- **All while managing code** in GitHub

### Key Difference

| API | Purpose | Access | Use Case |
|---|---|---|---|
| **Content Delivery API** | Read content | Public | Frontend fetching content |
| **Content Management API** | Create/edit content | Token-authenticated | Agent content management |

## Step 1: Create Management API Token

### Get Personal Access Token

1. **Go to Contentful Dashboard**
2. **Account → Settings → Personal tokens**
3. Click **Create personal access token**

#### Token Scope (Permissions)
Required permissions for agent operations:
```
✅ content_management_api
✅ content_model_management (optional, for schema updates)
✅ environments_management (for publishing)
```

4. **Copy token** and save securely
5. **DO NOT** commit to git

### Add to Repository Secrets

1. **GitHub → Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. **Name**: `CONTENTFUL_MANAGEMENT_TOKEN`
4. **Value**: [Your personal access token]

⚠️ **This token is sensitive** - it has write access to your Contentful space!

## Step 2: Create Contentful Management Client

Create `lib/contentful-management.ts`:

```typescript
import { createClient } from 'contentful-management';

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  environment: 'master', // or your environment name
});

export default managementClient;
```

⚠️ **IMPORTANT**: This file uses `CONTENTFUL_MANAGEMENT_TOKEN` which is **sensitive**. Only use in:
- GitHub Actions workflows
- Server-side code
- Build scripts
- **Never in browser/client code**

## Step 3: Create Content Management Utilities

### Blog Post Management

Create `lib/contentful-blog-management.ts`:

```typescript
import managementClient from './contentful-management';

export interface CreateBlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string;
  publishedDate: string;
  featured?: boolean;
  author?: string;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: string;
}

/**
 * Create a new blog post in Contentful
 * @param data Blog post data
 * @returns Created entry with ID
 */
export async function createBlogPost(data: CreateBlogPostInput) {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entry = await environment.createEntry('blogPost', {
      fields: {
        title: { 'en-US': data.title },
        slug: { 'en-US': data.slug },
        excerpt: { 'en-US': data.excerpt },
        content: { 'en-US': data.content },
        category: { 'en-US': data.category },
        tags: data.tags ? { 'en-US': data.tags } : undefined,
        publishedDate: { 'en-US': data.publishedDate },
        featured: data.featured ? { 'en-US': data.featured } : undefined,
        author: data.author ? { 'en-US': data.author } : undefined,
      },
    });

    // Publish immediately
    const published = await entry.publish();
    console.log(`Blog post created and published: ${published.sys.id}`);
    return {
      id: published.sys.id,
      title: data.title,
      slug: data.slug,
      published: true,
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

/**
 * Update an existing blog post
 * @param data Updated blog post data (must include id)
 */
export async function updateBlogPost(data: UpdateBlogPostInput) {
  if (!data.id) throw new Error('Blog post ID is required');

  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entry = await environment.getEntry(data.id);

    // Update only provided fields
    if (data.title) entry.fields.title = { 'en-US': data.title };
    if (data.slug) entry.fields.slug = { 'en-US': data.slug };
    if (data.excerpt) entry.fields.excerpt = { 'en-US': data.excerpt };
    if (data.content) entry.fields.content = { 'en-US': data.content };
    if (data.category) entry.fields.category = { 'en-US': data.category };
    if (data.tags) entry.fields.tags = { 'en-US': data.tags };
    if (data.publishedDate)
      entry.fields.publishedDate = { 'en-US': data.publishedDate };
    if (data.featured !== undefined)
      entry.fields.featured = { 'en-US': data.featured };
    if (data.author) entry.fields.author = { 'en-US': data.author };

    const updated = await entry.update();
    const published = await updated.publish();

    console.log(`Blog post updated and published: ${published.sys.id}`);
    return {
      id: published.sys.id,
      title: data.title,
      slug: data.slug,
      updated: true,
    };
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string) {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entry = await environment.getEntry(id);

    // Unpublish first
    if (entry.isPublished()) {
      await entry.unpublish();
    }

    // Then delete
    await entry.delete();
    console.log(`Blog post deleted: ${id}`);
    return { id, deleted: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

/**
 * List all blog posts
 */
export async function listBlogPosts() {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entries = await environment.getEntries({
      content_type: 'blogPost',
      limit: 100,
    });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title?.['en-US'] || 'Untitled',
      slug: item.fields.slug?.['en-US'],
      published: item.isPublished(),
    }));
  } catch (error) {
    console.error('Error listing blog posts:', error);
    throw error;
  }
}
```

### Project Management

Create `lib/contentful-projects-management.ts`:

```typescript
import managementClient from './contentful-management';

export interface CreateProjectInput {
  title: string;
  slug: string;
  description: string;
  technologies: string;
  projectType: 'Private' | 'Open Source' | 'Freelance' | 'Archived';
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}

/**
 * Create a new project in Contentful
 */
export async function createProject(data: CreateProjectInput) {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entry = await environment.createEntry('project', {
      fields: {
        title: { 'en-US': data.title },
        slug: { 'en-US': data.slug },
        description: { 'en-US': data.description },
        technologies: { 'en-US': data.technologies },
        projectType: { 'en-US': data.projectType },
        featured: data.featured ? { 'en-US': data.featured } : undefined,
        demoUrl: data.demoUrl ? { 'en-US': data.demoUrl } : undefined,
        githubUrl: data.githubUrl ? { 'en-US': data.githubUrl } : undefined,
      },
    });

    const published = await entry.publish();
    console.log(`Project created and published: ${published.sys.id}`);
    return {
      id: published.sys.id,
      title: data.title,
      slug: data.slug,
      published: true,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

/**
 * Update an existing project
 */
export async function updateProject(data: UpdateProjectInput) {
  if (!data.id) throw new Error('Project ID is required');

  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entry = await environment.getEntry(data.id);

    // Update only provided fields
    if (data.title) entry.fields.title = { 'en-US': data.title };
    if (data.slug) entry.fields.slug = { 'en-US': data.slug };
    if (data.description)
      entry.fields.description = { 'en-US': data.description };
    if (data.technologies)
      entry.fields.technologies = { 'en-US': data.technologies };
    if (data.projectType)
      entry.fields.projectType = { 'en-US': data.projectType };
    if (data.featured !== undefined)
      entry.fields.featured = { 'en-US': data.featured };
    if (data.demoUrl) entry.fields.demoUrl = { 'en-US': data.demoUrl };
    if (data.githubUrl) entry.fields.githubUrl = { 'en-US': data.githubUrl };

    const updated = await entry.update();
    const published = await updated.publish();

    console.log(`Project updated and published: ${published.sys.id}`);
    return {
      id: published.sys.id,
      title: data.title,
      slug: data.slug,
      updated: true,
    };
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string) {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entry = await environment.getEntry(id);

    if (entry.isPublished()) {
      await entry.unpublish();
    }

    await entry.delete();
    console.log(`Project deleted: ${id}`);
    return { id, deleted: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

/**
 * List all projects
 */
export async function listProjects() {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
    );
    const environment = await space.getEnvironment('master');

    const entries = await environment.getEntries({
      content_type: 'project',
      limit: 100,
    });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title?.['en-US'] || 'Untitled',
      slug: item.fields.slug?.['en-US'],
      published: item.isPublished(),
    }));
  } catch (error) {
    console.error('Error listing projects:', error);
    throw error;
  }
}
```

## Step 4: Install Contentful Management SDK

```bash
npm install contentful-management
npm install --save-dev tsx
```

Update `package.json` dependencies.

## Step 5: Agent Instructions File

Create `.github/copilot-instructions.md` (or update existing) with agent guidance:

```markdown
# Copilot Agent Instructions - Contentful Management

## Available Contentful Operations

### Blog Posts

#### Create Blog Post
When user asks to create a blog post:

```bash
npm run script -- contentful:create-blog \
  --title "Post Title" \
  --slug "post-slug" \
  --category "Engineering" \
  --excerpt "Brief summary..." \
  --content "Full content here"
```

**Required fields**: title, slug, excerpt, content, category
**Optional fields**: tags, publishedDate, featured, author

#### Update Blog Post
```bash
npm run script -- contentful:update-blog --id <entry-id> --title "New Title"
```

#### List Blog Posts
```bash
npm run script -- contentful:list-blogs
```

### Projects

#### Create Project
```bash
npm run script -- contentful:create-project \
  --title "Project Name" \
  --slug "project-slug" \
  --description "Project overview" \
  --technologies "TypeScript, Next.js, React" \
  --type "Open Source"
```

**Required fields**: title, slug, description, technologies, projectType
**Optional fields**: featured, demoUrl, githubUrl

#### Update Project
```bash
npm run script -- contentful:update-project --id <entry-id> --title "New Title"
```

## Workflow Rules

1. **Always validate slugs**: Lowercase, hyphenated, unique
2. **Check for duplicates**: List entries before creating new ones
3. **SEO optimization**: 
   - Title: 50-60 chars
   - Excerpt: 150-160 chars
   - Slug: descriptive and URL-safe
4. **Content structure**:
   - Use markdown for blog content
   - Include code blocks with language identifiers
5. **Publishing**:
   - Content auto-publishes on creation
   - Set featured=true for homepage display
   - Schedule posts with publishedDate

## Error Handling

- **Slug conflicts**: Add date or number suffix
- **API rate limits**: Wait 5 seconds, retry once
- **Missing required fields**: Prompt user for input
- **Connection errors**: Retry with exponential backoff

## Dual Operations

You can manage BOTH code and content in single workflows:

1. **Create GitHub issue** for feature request
2. **Create Contentful blog post** documenting the feature
3. **Update code** to reference the blog post
4. **Push to GitHub** and trigger deployment

Example workflow:
```bash
# 1. Create blog post about new feature
npm run script -- contentful:create-blog \
  --title "New Authentication System" \
  --slug "auth-system-implementation" \
  --category "Engineering" \
  --excerpt "Implementing JWT-based auth" \
  --content "## Overview\n..."

# 2. Add link to blog post in code
# (edit src/components/Features.tsx)

# 3. Commit and push
git add .
git commit -m "docs: add blog post about auth system"
git push origin main
```
```

## Step 6: Create CLI Scripts

Create `scripts/contentful-cli.ts` for agent commands:

```typescript
#!/usr/bin/env tsx
import 'dotenv/config';

import {
  createBlogPost,
  updateBlogPost,
  listBlogPosts,
  deleteBlogPost,
} from '../lib/contentful-blog-management';

import {
  createProject,
  updateProject,
  listProjects,
  deleteProject,
} from '../lib/contentful-projects-management';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  try {
    switch (command) {
      case 'contentful:create-blog': {
        const params = parseArgs(args.slice(1));
        const result = await createBlogPost({
          title: params.title,
          slug: params.slug,
          excerpt: params.excerpt,
          content: params.content,
          category: params.category,
          tags: params.tags,
          publishedDate: params.publishedDate || new Date().toISOString(),
          featured: params.featured === 'true',
          author: params.author,
        });
        console.log('✅ Blog post created:', result);
        break;
      }

      case 'contentful:update-blog': {
        const params = parseArgs(args.slice(1));
        const result = await updateBlogPost({
          id: params.id,
          title: params.title,
          slug: params.slug,
          excerpt: params.excerpt,
          content: params.content,
          category: params.category,
        });
        console.log('✅ Blog post updated:', result);
        break;
      }

      case 'contentful:list-blogs': {
        const posts = await listBlogPosts();
        console.log('📝 Blog Posts:', posts);
        break;
      }

      case 'contentful:delete-blog': {
        const params = parseArgs(args.slice(1));
        const result = await deleteBlogPost(params.id);
        console.log('✅ Blog post deleted:', result);
        break;
      }

      case 'contentful:create-project': {
        const params = parseArgs(args.slice(1));
        const result = await createProject({
          title: params.title,
          slug: params.slug,
          description: params.description,
          technologies: params.technologies,
          projectType: params.type || 'Private',
          featured: params.featured === 'true',
          demoUrl: params.demoUrl,
          githubUrl: params.githubUrl,
        });
        console.log('✅ Project created:', result);
        break;
      }

      case 'contentful:update-project': {
        const params = parseArgs(args.slice(1));
        const result = await updateProject({
          id: params.id,
          title: params.title,
          description: params.description,
        });
        console.log('✅ Project updated:', result);
        break;
      }

      case 'contentful:list-projects': {
        const projects = await listProjects();
        console.log('🚀 Projects:', projects);
        break;
      }

      default:
        console.log('Unknown command:', command);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function parseArgs(args) {
  const params = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    params[key] = args[i + 1];
  }
  return params;
}

main();
```

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "node test/connections.js",
    "script": "tsx scripts/contentful-cli.ts"
  }
}
```

## Step 7: GitHub Actions Workflow

Create `.github/workflows/contentful-sync.yml`:

```yaml
name: Contentful Sync & Deploy

on:
  workflow_dispatch:
    inputs:
      action:
        description: 'Action to perform'
        required: true
        type: choice
        options:
          - list-blogs
          - list-projects
          - deploy

jobs:
  sync:
    runs-on: ubuntu-latest
    if: github.event.inputs.action == 'list-blogs' || github.event.inputs.action == 'list-projects'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm

      - run: npm ci
      - run: npm run script -- contentful:${{ github.event.inputs.action }}
        env:
          CONTENTFUL_MANAGEMENT_TOKEN: ${{ secrets.CONTENTFUL_MANAGEMENT_TOKEN }}
          NEXT_PUBLIC_CONTENTFUL_SPACE_ID: ${{ secrets.NEXT_PUBLIC_CONTENTFUL_SPACE_ID }}
          NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN }}

  deploy:
    if: github.event.inputs.action == 'deploy'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm

      - run: npm ci
      - run: npm run build
      - run: npm test
        env:
          NEXT_PUBLIC_GA4_MEASUREMENT_ID: ${{ secrets.GA4_MEASUREMENT_ID }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
          NEXT_PUBLIC_CONTENTFUL_SPACE_ID: ${{ secrets.NEXT_PUBLIC_CONTENTFUL_SPACE_ID }}
          NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN }}
          EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
          EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

## Step 8: Agent Capabilities

With this setup, agents can:

### 1. Create Blog Posts
```
Agent: "Create a blog post about TypeScript best practices"
Result: 
✅ Creates entry in Contentful
✅ Auto-publishes
✅ Returns entry ID and slug
```

### 2. Update Existing Content
```
Agent: "Update the 'Getting Started' blog post with new code examples"
Result:
✅ Fetches entry
✅ Updates fields
✅ Re-publishes
```

### 3. List Content
```
Agent: "Show me all blog posts"
Result:
✅ Lists titles, slugs, and publish status
✅ Helps prevent duplicate slugs
```

### 4. Combined Operations
```
Agent: "Create a blog post about new feature AND update code documentation"
Result:
✅ Creates blog post in Contentful
✅ Updates code files in GitHub
✅ Commits and pushes
✅ Triggers deployment
```

## Security Best Practices

### ✅ DO
- Store `CONTENTFUL_MANAGEMENT_TOKEN` in GitHub Secrets
- Use token only in server-side code
- Validate all input from agents
- Log all content changes
- Set token to expire periodically

### ❌ DON'T
- Commit `CONTENTFUL_MANAGEMENT_TOKEN` to git
- Use management token in browser/client code
- Give agents unrestricted access
- Skip content validation
- Leave token active indefinitely

## Troubleshooting

### "API Access Denied"
- Verify `CONTENTFUL_MANAGEMENT_TOKEN` is valid
- Check token has proper permissions
- Ensure space ID is correct

### "Entry not found"
- List entries first to get correct ID
- Verify content type is correct
- Check entry wasn't deleted

### "Rate limit exceeded"
- Free tier: 6000 API calls/hour
- Add delays between batch operations
- Consider upgrading for high-volume operations

## Next Steps

1. ✅ Create management API token in Contentful
2. ✅ Add token to GitHub Secrets
3. ✅ Install `contentful-management` package
4. ✅ Create management utility files
5. ✅ Set up CLI scripts
6. ✅ Create agent instructions file
7. ✅ Test with: `npm run script -- contentful:list-blogs`
8. ✅ Deploy and use agents for content management

## Resources

- [Contentful Management API Docs](https://www.contentful.com/developers/docs/references/content-management-api/)
- [Contentful JS SDK](https://github.com/contentful/contentful-management.js)
- [Authentication & Tokens](https://www.contentful.com/developers/docs/concepts/auth/)

---

**Ready for AI Agent Integration** ✅
