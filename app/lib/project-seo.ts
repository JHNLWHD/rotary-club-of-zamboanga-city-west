import type { Project } from './contentful-types';

export function projectStructuredData(project: Project) {
  const origin = 'https://rotaryzcwest.org';
  const url = `${origin}${project.slug}`;
  const organization = {
    '@type': 'Organization',
    name: 'Rotary Club of Zamboanga City West',
    url: origin,
  };
  const image = project.gallery?.find((photo) => photo?.url)?.url || project.headerImage?.url;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: project.title,
        description: project.shortDescription,
        url,
        mainEntityOfPage: url,
        author: organization,
        publisher: organization,
        ...(image && { image: [image] }),
        // The activity date does not establish article publication or modification.
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Service Projects', item: `${origin}/service-projects` },
          { '@type': 'ListItem', position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
}
