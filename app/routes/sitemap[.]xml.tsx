import { fetchAllProjects } from "../lib/contentful-api";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

const siteUrl = "https://rotaryzcwest.org";

const staticRoutes: SitemapEntry[] = [
  { loc: `${siteUrl}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${siteUrl}/service-projects`, changefreq: "weekly", priority: "0.9" },
  { loc: `${siteUrl}/about/leadership`, changefreq: "monthly", priority: "0.8" },
  { loc: `${siteUrl}/about/foundation-giving`, changefreq: "monthly", priority: "0.8" },
  { loc: `${siteUrl}/about/calendar`, changefreq: "weekly", priority: "0.7" },
  { loc: `${siteUrl}/about/history`, changefreq: "yearly", priority: "0.7" },
  { loc: `${siteUrl}/contact`, changefreq: "monthly", priority: "0.8" },
  { loc: `${siteUrl}/the-fortress`, changefreq: "monthly", priority: "0.7" },
  { loc: `${siteUrl}/new-generation/rotaract-southern-city-colleges`, changefreq: "monthly", priority: "0.6" },
  { loc: `${siteUrl}/new-generation/interact-zamboanga-city-west`, changefreq: "monthly", priority: "0.6" },
];

export async function loader() {
  let projectRoutes: SitemapEntry[] = [];

  try {
    const projects = await fetchAllProjects();
    projectRoutes = projects.map((project) => {
      const timestamp = Date.parse(project.date);
      return {
        loc: `${siteUrl}${project.slug}`,
        lastmod: Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined,
        changefreq: "monthly",
        priority: "0.7",
      };
    });
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error);
    return new Response("Sitemap is temporarily unavailable. Please try again later.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(generateSitemapXml([...staticRoutes, ...projectRoutes]), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function generateSitemapXml(routes: SitemapEntry[]): string {
  const entries = routes.map((route) => `
  <url>
    <loc>${escapeXml(route.loc)}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ""}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}
</urlset>`;
}

function escapeXml(value: string): string {
  const entities: Record<string, string> = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  };

  return value.replace(/[<>&'"]/g, (character) => entities[character]);
}
