# Contentful Integration Guide

Complete guide for integrating Contentful CMS with your Next.js portfolio. Manage blog posts and projects dynamically without rebuilding the site.

## Overview

Contentful provides:
- **Headless CMS**: No built-in front-end, content delivered via API
- **Content Modeling**: Structure your blog posts, projects, and portfolio sections
- **Editorial Workflow**: Publish, schedule, and version your content
- **API Access**: REST and GraphQL APIs for content delivery
- **Real-time Content**: Update content without redeploying

### Architecture

```
Contentful (CMS) → API (REST/GraphQL) → Next.js App → Static Export
    Content         Fetch at Build       Render      GitHub Pages
```

## Prerequisites

1. **Contentful Account**: Free tier includes:
   - 1 space
   - 3 content models
   - 1 API access token
   - 1 hour API rate limit buffer
   - Perfect for portfolio use

2. **Repository Secrets Configured**:
   - `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
   - `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`

3. **Next.js App**: Already using Next.js 16 with static export

## Step 1: Set Up Contentful Space

### Create Contentful Account
1. Go to [Contentful](https://www.contentful.com/)
2. Sign up or log in
3. Create a new Space (or use existing)
4. Note your **Space ID** and **Access Token**

### Get API Credentials

#### Find Space ID
1. Go to Space Settings → General
2. Copy **Space ID**
3. Add to GitHub Secrets as `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`

#### Create Access Token
1. Go to Settings → API keys
2. Click **Add API key**
3. Name it: `Portfolio Production`
4. Copy **Content Delivery API - Access Token**
5. Add to GitHub Secrets as `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`

## Step 2: Create Content Models

Content models define the structure of your blog posts and projects.

### Model 1: Blog Post

**Name**: `BlogPost`
**API ID**: `blogPost`

#### Fields:

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✅ | Post title |
| `slug` | Short text | ✅ | URL-friendly identifier (unique) |
| `content` | Rich text | ✅ | Main post content |
| `excerpt` | Long text | ✅ | Summary for listing |
| `category` | Short text | ✅ | Post category (e.g., "Engineering", "Design") |
| `tags` | Short text | ❌ | Multiple tags (comma-separated) |
| `featuredImage` | Media | ❌ | Hero image for post |
| `publishedDate` | Date & time | ✅ | Publication date |
| `updatedDate` | Date & time | ❌ | Last update date |
| `readingTime` | Integer | ❌ | Minutes to read |
| `featured` | Boolean | ❌ | Show on homepage |
| `author` | Short text | ❌ | Author name |

#### Rich Text Fields Setup
For `content` field:
1. Enable **Markdown** in field settings
2. This allows code blocks, formatting, links

### Model 2: Project

**Name**: `Project`
**API ID**: `project`

#### Fields:

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✅ | Project name |
| `slug` | Short text | ✅ | URL-friendly identifier (unique) |
| `description` | Long text | ✅ | Project overview |
| `content` | Rich text | ❌ | Detailed project description |
| `technologies` | Short text | ✅ | Tech stack (comma-separated) |
| `projectType` | Dropdown | ✅ | "Private" or "Open Source" |
| `featured` | Boolean | ❌ | Show on homepage |
| `featuredImage` | Media | ❌ | Project thumbnail |
| `demoUrl` | Short text | ❌ | Live demo link |
| `githubUrl` | Short text | ❌ | GitHub repository URL |
| `startDate` | Date & time | ❌ | Project start date |
| `endDate` | Date & time | ❌ | Project completion date |
| `metrics` | JSON | ❌ | Performance metrics |

#### Dropdown Options for `projectType`
```
- Private
- Open Source
- Freelance
- Archived
```

## Step 3: Set Up Contentful Client in Next.js

### Install Dependencies

```bash
npm install contentful
# or
npm install axios  # for custom HTTP requests
```

### Create Contentful Client

Create `lib/contentful.ts`:

```typescript
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  host: 'cdn.contentful.com', // Use 'preview.contentful.com' for draft content
});

export default client;
```

### Environment Variables

Your `.env.local` already includes:
```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your-space-id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your-access-token
```

## Step 4: Fetch Content from Contentful

### Fetch Blog Posts

Create `lib/contentful-blog.ts`:

```typescript
import client from './contentful';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    title: string;
  };
  publishedDate: string;
  updatedDate?: string;
  readingTime?: number;
  featured?: boolean;
  author?: string;
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await client.getEntries<any>({
      content_type: 'blogPost',
      order: '-fields.publishedDate',
      limit: 100,
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      category: item.fields.category,
      tags: item.fields.tags?.split(',').map((t: string) => t.trim()),
      featuredImage: item.fields.featuredImage?.fields?.file && {
        url: `https:${item.fields.featuredImage.fields.file.url}`,
        title: item.fields.featuredImage.fields.title,
      },
      publishedDate: item.fields.publishedDate,
      updatedDate: item.fields.updatedDate,
      readingTime: item.fields.readingTime,
      featured: item.fields.featured,
      author: item.fields.author,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await client.getEntries<any>({
      content_type: 'blogPost',
      'fields.slug': slug,
    });

    if (!response.items.length) return null;

    const item = response.items[0];
    return {
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      category: item.fields.category,
      tags: item.fields.tags?.split(',').map((t: string) => t.trim()),
      featuredImage: item.fields.featuredImage?.fields?.file && {
        url: `https:${item.fields.featuredImage.fields.file.url}`,
        title: item.fields.featuredImage.fields.title,
      },
      publishedDate: item.fields.publishedDate,
      updatedDate: item.fields.updatedDate,
      readingTime: item.fields.readingTime,
      featured: item.fields.featured,
      author: item.fields.author,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch featured blog posts
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.filter(post => post.featured).slice(0, limit);
}
```

### Fetch Projects

Create `lib/contentful-projects.ts`:

```typescript
import client from './contentful';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  technologies: string[];
  projectType: 'Private' | 'Open Source' | 'Freelance' | 'Archived';
  featured?: boolean;
  featuredImage?: {
    url: string;
    title: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  metrics?: Record<string, any>;
}

// Fetch all projects
export async function getProjects(
  filter?: { type?: string; featured?: boolean }
): Promise<Project[]> {
  try {
    const query: any = {
      content_type: 'project',
      order: '-fields.startDate',
      limit: 100,
    };

    if (filter?.type) {
      query['fields.projectType'] = filter.type;
    }

    const response = await client.getEntries<any>(query);

    return response.items
      .map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        description: item.fields.description,
        content: item.fields.content,
        technologies: item.fields.technologies
          ?.split(',')
          .map((t: string) => t.trim()) || [],
        projectType: item.fields.projectType,
        featured: item.fields.featured,
        featuredImage: item.fields.featuredImage?.fields?.file && {
          url: `https:${item.fields.featuredImage.fields.file.url}`,
          title: item.fields.featuredImage.fields.title,
        },
        demoUrl: item.fields.demoUrl,
        githubUrl: item.fields.githubUrl,
        startDate: item.fields.startDate,
        endDate: item.fields.endDate,
        metrics: item.fields.metrics,
      }))
      .filter(project => filter?.featured ? project.featured : true);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await client.getEntries<any>({
      content_type: 'project',
      'fields.slug': slug,
    });

    if (!response.items.length) return null;

    const item = response.items[0];
    return {
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      content: item.fields.content,
      technologies: item.fields.technologies
        ?.split(',')
        .map((t: string) => t.trim()) || [],
      projectType: item.fields.projectType,
      featured: item.fields.featured,
      featuredImage: item.fields.featuredImage?.fields?.file && {
        url: `https:${item.fields.featuredImage.fields.file.url}`,
        title: item.fields.featuredImage.fields.title,
      },
      demoUrl: item.fields.demoUrl,
      githubUrl: item.fields.githubUrl,
      startDate: item.fields.startDate,
      endDate: item.fields.endDate,
      metrics: item.fields.metrics,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Fetch featured projects
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const allProjects = await getProjects();
  return allProjects
    .filter(project => project.featured && project.projectType !== 'Archived')
    .slice(0, limit);
}

// Fetch projects by type
export async function getProjectsByType(type: string): Promise<Project[]> {
  return getProjects({ type });
}
```

## Step 5: Display Content in Components

### Blog Post Listing Component

Add to `app/page.tsx` or create `components/BlogSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getBlogPosts, type BlogPost } from '../lib/contentful-blog';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  return (
    <section id="blog" className="blog">
      <div className="hero__wrapper">
        <h2 className="blog__title">Latest Articles</h2>
        <div className="blog__grid">
          {posts.map((post) => (
            <article key={post.id} className="blog__card">
              {post.featuredImage && (
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  className="blog__image"
                />
              )}
              <h3 className="blog__card-title">{post.title}</h3>
              <p className="blog__excerpt">{post.excerpt}</p>
              <div className="blog__meta">
                <span className="blog__category">{post.category}</span>
                <span className="blog__date">
                  {new Date(post.publishedDate).toLocaleDateString()}
                </span>
                {post.readingTime && (
                  <span className="blog__reading-time">
                    {post.readingTime} min read
                  </span>
                )}
              </div>
              <a href={`/blog/${post.slug}`} className="blog__link">
                Read More →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Projects Showcase Component

Add to `app/page.tsx` or create `components/ProjectsSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getFeaturedProjects, type Project } from '../lib/contentful-projects';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getFeaturedProjects(6);
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <section id="projects" className="projects">
      <div className="hero__wrapper">
        <h2 className="projects__title">Featured Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <div key={project.id} className="projects__card">
              {project.featuredImage && (
                <img
                  src={project.featuredImage.url}
                  alt={project.title}
                  className="projects__image"
                />
              )}
              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__description">{project.description}</p>
              
              <div className="projects__tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="projects__tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="projects__links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__link"
                  >
                    <i className="fab fa-github"></i> Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__link"
                  >
                    <i className="fas fa-external-link-alt"></i> Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Step 6: Create Dynamic Routes

### Blog Post Detail Page

Create `app/blog/[slug]/page.tsx`:

```typescript
import { getBlogPostBySlug, getBlogPosts } from '../../../lib/contentful-blog';
import { Metadata } from 'next';

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost(
  { params }: { params: { slug: string } }
) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="blog-post">
      <div className="hero__wrapper">
        {post.featuredImage && (
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="blog-post__image"
          />
        )}
        
        <h1 className="blog-post__title">{post.title}</h1>
        
        <div className="blog-post__meta">
          <span className="blog-post__category">{post.category}</span>
          <span className="blog-post__date">
            {new Date(post.publishedDate).toLocaleDateString()}
          </span>
          {post.readingTime && (
            <span className="blog-post__reading-time">
              {post.readingTime} min read
            </span>
          )}
        </div>

        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="blog-post__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
```

### Project Detail Page

Create `app/projects/[slug]/page.tsx`:

```typescript
import { getProjectBySlug, getProjects } from '../../../lib/contentful-projects';
import { Metadata } from 'next';

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetail(
  { params }: { params: { slug: string } }
) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <article className="project-detail">
      <div className="hero__wrapper">
        {project.featuredImage && (
          <img
            src={project.featuredImage.url}
            alt={project.title}
            className="project-detail__image"
          />
        )}
        
        <h1 className="project-detail__title">{project.title}</h1>
        <p className="project-detail__description">{project.description}</p>

        {project.content && (
          <div
            className="project-detail__content"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}

        <div className="project-detail__tech">
          <h3>Technologies</h3>
          <div className="project-detail__tech-list">
            {project.technologies.map((tech) => (
              <span key={tech} className="project-detail__tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-detail__actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail__button"
            >
              View on GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail__button"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
```

## Step 7: Productive Content Workflow

### Daily Content Workflow

#### 1. **Create Content in Contentful**
```
Contentful Dashboard → Content tab → Create Entry → Select Model
```

#### 2. **Fill in Content**
- Use Contentful's rich text editor
- Add metadata (tags, category, dates)
- Upload featured images
- Add external links

#### 3. **Preview & Draft**
```
Contentful → Publish → Schedule (optional)
```

#### 4. **Trigger Deployment**
```bash
# Once published, either:
# 1. Wait for scheduled rebuild (if configured)
# 2. Manual trigger:
git commit --allow-empty -m "trigger: rebuild from contentful"
git push origin main
```

#### 5. **GitHub Actions Auto-Deploy**
- Workflow fetches latest content
- Rebuilds static site
- Deploys to GitHub Pages

### Content Management Best Practices

#### SEO Optimization
- **Title**: 50-60 characters
- **Slug**: Lowercase, hyphenated (e.g., `my-awesome-post`)
- **Excerpt**: 150-160 characters
- **Featured Image**: Minimum 1200x630px

#### Content Structure
- **H1**: One main title per post
- **H2-H3**: Logical hierarchy
- **Code Blocks**: Use markdown syntax
- **Links**: Use descriptive anchor text

#### Tagging Strategy
```
Blog Posts:
- engineering
- design
- performance
- tutorial
- case-study

Projects:
- frontend
- backend
- fullstack
- mobile
- infrastructure
```

#### Publishing Schedule
```
Frequency: 1-2 posts per week
Optimal Days: Tuesday-Thursday
Optimal Time: 9 AM UTC
Evergreen: 60% of content
Time-sensitive: 40% of content
```

## Step 8: Styling Content

### Add CSS for Blog/Projects

Update `app/globals.css`:

```css
/* Blog Section */
.blog {
  padding: 60px 20px;
  background-color: #1a1a1a;
}

.blog__title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #007ced;
  text-align: center;
}

.blog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.blog__card {
  background-color: #222;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.blog__card:hover {
  transform: translateY(-5px);
}

.blog__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog__card-title {
  font-size: 1.3rem;
  padding: 20px 20px 10px;
  color: #e5e5e5;
}

.blog__excerpt {
  padding: 0 20px;
  color: #bbb;
  line-height: 1.6;
}

.blog__meta {
  padding: 15px 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #999;
}

.blog__category {
  background-color: #007ced;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.blog__link {
  display: inline-block;
  margin: 20px;
  color: #007ced;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.blog__link:hover {
  color: #0059b8;
}

/* Projects Section */
.projects {
  padding: 60px 20px;
  background-color: #222;
}

.projects__title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #007ced;
  text-align: center;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.projects__card {
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
  transition: border-color 0.3s ease;
}

.projects__card:hover {
  border-color: #007ced;
}

.projects__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.projects__card-title {
  font-size: 1.3rem;
  padding: 20px 20px 10px;
  color: #e5e5e5;
}

.projects__description {
  padding: 0 20px;
  color: #bbb;
  line-height: 1.6;
}

.projects__tech {
  padding: 15px 20px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.projects__tech-badge {
  background-color: #333;
  color: #007ced;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.projects__links {
  padding: 20px;
  display: flex;
  gap: 10px;
}

.projects__link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background-color: #007ced;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.projects__link:hover {
  background-color: #0059b8;
}

/* Blog Post Detail */
.blog-post {
  padding: 60px 20px;
  background-color: #1a1a1a;
}

.blog-post__title {
  font-size: 3rem;
  margin: 30px 0;
  color: #e5e5e5;
}

.blog-post__meta {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  color: #999;
  font-size: 0.95rem;
}

.blog-post__category {
  background-color: #007ced;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.blog-post__content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #e5e5e5;
  margin: 30px 0;
}

.blog-post__content h2 {
  font-size: 1.8rem;
  margin: 40px 0 20px;
  color: #007ced;
}

.blog-post__content p {
  margin-bottom: 15px;
}

.blog-post__content code {
  background-color: #222;
  padding: 2px 6px;
  border-radius: 4px;
  color: #58d4d1;
}

.blog-post__content pre {
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
}

.blog-post__tags {
  display: flex;
  gap: 10px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.blog-post__tag {
  background-color: #333;
  color: #007ced;
  padding: 4px 8px;
  border-radius: 4px;
}
```

## Troubleshooting

### Content Not Appearing

**Problem**: Blog posts/projects not showing on site

**Solutions**:
1. Check content is **Published** (not Draft)
2. Verify field names match exactly in code
3. Test API access token:
   ```bash
   curl "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?access_token=YOUR_TOKEN"
   ```
4. Check rich text is properly formatted

### Images Not Loading

**Problem**: Featured images show as broken

**Solutions**:
1. Verify image URLs start with `https:`
2. Check image file is published
3. Ensure correct asset field referenced
4. Test direct URL in browser

### Slow Build Times

**Problem**: Build takes too long

**Solutions**:
1. Limit entries fetched: `limit: 50`
2. Cache API responses
3. Use `next/cache` for incremental static regeneration
4. Implement pagination for large datasets

### API Rate Limits

**Problem**: "Rate limit exceeded"

**Solutions**:
1. Free tier: 6000 requests/hour
2. Spread requests across builds
3. Implement caching:
   ```typescript
   const response = await client.getEntries({...}, { cache: 'force-cache' })
   ```
4. Consider upgrading plan for high-traffic sites

## Advanced Features

### Incremental Static Regeneration (ISR)

Update `app/blog/[slug]/page.tsx`:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### Rich Text Rendering

Install rich text renderer:

```bash
npm install @contentful/rich-text-react-renderer
```

Use in components:

```typescript
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

<div>
  {documentToReactComponents(post.content)}
</div>
```

### Search Functionality

Create `lib/contentful-search.ts`:

```typescript
export async function searchContent(query: string) {
  const [posts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects(),
  ]);

  const results = [
    ...posts.filter(p => 
      p.title.includes(query) || 
      p.content.includes(query)
    ),
    ...projects.filter(p => 
      p.title.includes(query) || 
      p.description.includes(query)
    ),
  ];

  return results;
}
```

## Next Steps

1. ✅ Create content models in Contentful
2. ✅ Add sample content (3-5 blog posts, 5-10 projects)
3. ✅ Update Next.js components
4. ✅ Style components with CSS
5. ✅ Test locally: `npm run build`
6. ✅ Deploy: `git push origin main`
7. Monitor Analytics
8. Schedule regular content updates

## Resources

- [Contentful Documentation](https://www.contentful.com/developers/)
- [Contentful JavaScript SDK](https://github.com/contentful/contentful.js)
- [Rich Text Renderer](https://www.contentful.com/developers/docs/concepts/rich-text/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**Last Updated**: May 2026
**Status**: ✅ Ready for Production
