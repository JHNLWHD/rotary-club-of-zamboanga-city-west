import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const posthogApiKey = import.meta.env.VITE_POSTHOG_KEY;
    const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
    
    if (posthogApiKey) {
      posthog.init(posthogApiKey, {
        api_host: posthogHost,
        defaults: "2025-05-24",
        person_profiles: 'always', // Create profiles for all users including anonymous visitors
        // Disable in development for cleaner logs
        loaded: (posthog) => {
          if (import.meta.env.DEV) posthog.debug();
        },
      });
    } else {
      console.warn('PostHog API key not found. Analytics will not be tracked.');
    }

    setHydrated(true);
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
