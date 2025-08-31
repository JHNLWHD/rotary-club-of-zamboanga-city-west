import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home_.tsx"),
  route("under-construction", "routes/_index.tsx"),
  route("about/leadership", "routes/about.leadership.tsx"),
  route("about/history", "routes/about.history.tsx"),
  route("about/board-resolutions", "routes/about.board-resolutions.tsx"),
  route("about/foundation-giving", "routes/about.foundation-giving.tsx"),
  route("about/calendar", "routes/about.calendar.tsx"),
  route("contact", "routes/contact.tsx"),
  route("the-fortress", "routes/the-fortress.tsx"),
  route("service-projects", "routes/service-projects.tsx"),
  route("service-projects/:slug", "routes/service-projects.$slug.tsx"),
  route("donate", "routes/donate.tsx"),
  route("thank-you", "routes/thank-you.tsx"),
  route("new-generation/rotaract-southern-city-colleges", "routes/new-generation.rotaract-southern-city-colleges.tsx"),
  route("new-generation/interact-zamboanga-city-west", "routes/new-generation.interact-zamboanga-city-west.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
