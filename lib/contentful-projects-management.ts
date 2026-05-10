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

export async function createProject(data: CreateProjectInput) {
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
      featured: data.featured ? { 'en-US': data.featured } : { 'en-US': false },
      demoUrl: data.demoUrl ? { 'en-US': data.demoUrl } : undefined,
      githubUrl: data.githubUrl ? { 'en-US': data.githubUrl } : undefined,
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

export async function updateProject(data: UpdateProjectInput) {
  if (!data.id) throw new Error('Project ID is required');

  const space = await managementClient.getSpace(
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
  );
  const environment = await space.getEnvironment('master');

  const entry = await environment.getEntry(data.id);

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

  return {
    id: published.sys.id,
    title: data.title,
    slug: data.slug,
    updated: true,
  };
}

export async function deleteProject(id: string) {
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

export async function listProjects() {
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
}
