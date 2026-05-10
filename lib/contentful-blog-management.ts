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

export async function createBlogPost(data: CreateBlogPostInput) {
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
      featured: data.featured ? { 'en-US': data.featured } : { 'en-US': false },
      author: data.author ? { 'en-US': data.author } : undefined,
    },
  });

  const published = await entry.publish();
  return {
    id: published.sys.id,
    title: data.title,
    slug: data.slug,
    published: true,
  };
}

export async function updateBlogPost(data: UpdateBlogPostInput) {
  if (!data.id) throw new Error('Blog post ID is required');

  const space = await managementClient.getSpace(
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
  );
  const environment = await space.getEnvironment('master');

  const entry = await environment.getEntry(data.id);

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

  return {
    id: published.sys.id,
    title: data.title,
    slug: data.slug,
    updated: true,
  };
}

export async function deleteBlogPost(id: string) {
  const space = await managementClient.getSpace(
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
  );
  const environment = await space.getEnvironment('master');

  const entry = await environment.getEntry(id);
  if (entry.isPublished()) {
    await entry.unpublish();
  }

  await entry.delete();
  return { id, deleted: true };
}

export async function listBlogPosts() {
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
}
