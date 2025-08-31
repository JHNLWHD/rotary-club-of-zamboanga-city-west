import type { Route } from './+types/robots[.]txt';

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = 'https://rotaryzcwest.org';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Block access to admin/development paths if any
Disallow: /admin/
Disallow: /.netlify/
Disallow: /api/

# Allow search engine crawling of all content
Allow: /service-projects/
Allow: /about/
Allow: /new-generation/
Allow: /contact
Allow: /donate
Allow: /the-fortress`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
