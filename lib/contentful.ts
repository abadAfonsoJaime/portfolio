// lib/contentful.ts
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!

export interface Project {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    description: string
    type: 'Private' | 'Open Source'
    technologies: string[]
    githubUrl?: string
    demoUrl?: string
    featuredImage?: {
      fields: {
        file: {
          url: string
          details: { image: { width: number; height: number } }
        }
      }
    }
    status: 'Available' | 'Demo' | 'Sold'
    pricingType?: 'Contact' | 'Fixed'
    price?: number
    currency?: string
  }
}

export interface BlogPost {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: any // Rich text
    publishedAt: string
    category: string
    readingTime: number
    featuredImage?: {
      fields: {
        file: {
          url: string
          details: { image: { width: number; height: number } }
        }
      }
    }
    tags: string[]
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const response = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=project&access_token=${ACCESS_TOKEN}&order=-sys.createdAt`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }

  const data = await response.json()
  return data.items
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=blogPost&access_token=${ACCESS_TOKEN}&order=-fields.publishedAt`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch blog posts')
  }

  const data = await response.json()
  return data.items
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const response = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=project&fields.slug=${slug}&access_token=${ACCESS_TOKEN}`
  )

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.items[0] || null
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=blogPost&fields.slug=${slug}&access_token=${ACCESS_TOKEN}`
  )

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.items[0] || null
}