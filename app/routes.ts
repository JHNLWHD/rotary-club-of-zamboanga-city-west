import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home_.tsx"),
  route("about/leadership", "routes/about.leadership.tsx"),
  route("about/history", "routes/about.history.tsx"),
  route("about/foundation-giving", "routes/about.foundation-giving.tsx"),
  route("about/calendar", "routes/about.calendar.tsx"),
  route("contact", "routes/contact.tsx"),
  route("the-fortress", "routes/the-fortress.tsx"),
  route("service-projects", "routes/service-projects.tsx"),
  route("donate", "routes/donate.tsx"),
  route("thank-you", "routes/thank-you.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
