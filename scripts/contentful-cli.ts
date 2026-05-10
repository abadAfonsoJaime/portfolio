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
          tags: params.tags,
          publishedDate: params.publishedDate,
          featured: params.featured === 'true',
          author: params.author,
        });
        console.log('✅ Blog post updated:', result);
        break;
      }

      case 'contentful:list-blogs': {
        const posts = await listBlogPosts();
        console.log('📝 Blog Posts:', JSON.stringify(posts, null, 2));
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
          projectType: (params.type as any) || 'Private',
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
          slug: params.slug,
          description: params.description,
          technologies: params.technologies,
          projectType: params.type as any,
          featured: params.featured === 'true',
          demoUrl: params.demoUrl,
          githubUrl: params.githubUrl,
        });
        console.log('✅ Project updated:', result);
        break;
      }

      case 'contentful:list-projects': {
        const projects = await listProjects();
        console.log('🚀 Projects:', JSON.stringify(projects, null, 2));
        break;
      }

      case 'contentful:delete-project': {
        const params = parseArgs(args.slice(1));
        const result = await deleteProject(params.id);
        console.log('✅ Project deleted:', result);
        break;
      }

      default:
        console.error('Unknown command:', command);
        process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message || error);
    process.exit(1);
  }
}

function parseArgs(args: string[]) {
  const params: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    params[key] = args[i + 1];
  }
  return params;
}

main();
