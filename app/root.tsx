import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Provider } from "./components/ui/Provider";
import { GlobalLayout } from "./components/ui/GlobalLayout";
import { fetchHomepageContactSection } from "./lib/contentful-api";
import type { ContactInfo, MeetingInfo } from "./lib/contentful-types";
import { Toaster } from "sonner";

type LoaderData = {
  contactData?: {
    meetingInfo?: MeetingInfo;
    contactInfo?: ContactInfo;
  };
};

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData> {
  try {
    const contactSection = await fetchHomepageContactSection();
    
    if (contactSection) {
      return {
        contactData: {
          meetingInfo: contactSection.meetingInfo,
          contactInfo: contactSection.contactInfo,
        },
      };
    }
    
    return { contactData: undefined };
  } catch (error) {
    console.error('Error loading contact data in root:', error);
    return { contactData: undefined };
  }
}

export const meta: Route.MetaFunction = () => [
  { title: "Rotary Club of Zamboanga City West | Service Above Self" },
  { name: "description", content: "Rotary Club of Zamboanga City West serves our community through meaningful projects focused on peacebuilding, education, healthcare, clean water, and community development. Service Above Self since 1979." },
  
  // Open Graph fallback tags
  { property: "og:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
  { property: "og:description", content: "Rotary Club of Zamboanga City West serves our community through meaningful projects focused on peacebuilding, education, healthcare, clean water, and community development." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://rotaryzcwest.org" },
  { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
  { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
  { property: "og:locale", content: "en_US" },
  
  // Twitter Card fallback tags
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
  { name: "twitter:description", content: "Rotary Club of Zamboanga City West serves our community through meaningful projects. Service Above Self since 1979." },
  { name: "twitter:image", content: "https://rotaryzcwest.org/og-image.jpg" },
  { name: "twitter:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const { contactData } = useLoaderData() as LoaderData;
  const isIndexPage = location.pathname === "/";

  return (
    <Provider>
      <GlobalLayout transparentHeader={isIndexPage} contactData={contactData}>
          <Outlet />
      </GlobalLayout>
      <Toaster position="top-right" richColors />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
