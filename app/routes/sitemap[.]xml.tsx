import { fetchAllProjects } from '../lib/contentful-api';
import type { Route } from './+types/sitemap[.]xml';

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
};

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = 'https://rotaryzcwest.org';
  
  // Static routes with their priorities and change frequencies
  const staticRoutes: SitemapEntry[] = [
    {
      loc: `${siteUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${siteUrl}/about/leadership`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${siteUrl}/about/history`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.7'
    },
    {
      loc: `${siteUrl}/about/board-resolutions`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: `${siteUrl}/about/foundation-giving`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: `${siteUrl}/about/calendar`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: `${siteUrl}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${siteUrl}/the-fortress`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: `${siteUrl}/service-projects`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${siteUrl}/donate`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${siteUrl}/thank-you`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      loc: `${siteUrl}/new-generation/rotaract-southern-city-colleges`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: `${siteUrl}/new-generation/interact-zamboanga-city-west`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }
  ];

  let dynamicRoutes: SitemapEntry[] = [];

  try {
    // Fetch all service projects for dynamic routes
    const allProjects = await fetchAllProjects();
    
    if (allProjects && allProjects.length > 0) {
      dynamicRoutes = allProjects.map((project) => ({
        loc: `${siteUrl}${project.slug}`,
        lastmod: new Date(project.date).toISOString(),
        changefreq: 'monthly' as const,
        priority: '0.7'
      }));
    }
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    // Continue with static routes even if dynamic routes fail
  }

  // Combine all routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Generate XML sitemap
  const sitemapXml = generateSitemapXml(allRoutes);

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      'encoding': 'UTF-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

function generateSitemapXml(routes: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlEntries = routes
    .map((route) => {
      const url = `
  <url>
    <loc>${escapeXml(route.loc)}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
    ${route.changefreq ? `<changefreq>${route.changefreq}</changefreq>` : ''}
    ${route.priority ? `<priority>${route.priority}</priority>` : ''}
  </url>`;
      return url;
    })
    .join('');

  return `${xmlHeader}
${urlsetOpen}${urlEntries}
${urlsetClose}`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return char;
    }
  });
}
