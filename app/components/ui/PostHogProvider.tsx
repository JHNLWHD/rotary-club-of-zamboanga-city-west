import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function PHProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [PostHogProvider, setPostHogProvider] = useState<any>(null);
  const [posthog, setPosthog] = useState<any>(null);

  useEffect(() => {
    const initPostHog = async () => {
      try {
        // Dynamic imports to avoid SSR issues
        const [posthogModule, posthogReactModule] = await Promise.all([
          import('posthog-js'),
          import('posthog-js/react')
        ]);

        const posthogInstance = posthogModule.default;
        const PostHogProviderComponent = posthogReactModule.PostHogProvider;

        const posthogApiKey = import.meta.env.VITE_POSTHOG_KEY;
        const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
        
        if (posthogApiKey) {
          posthogInstance.init(posthogApiKey, {
            api_host: posthogHost,
            defaults: "2025-05-24",
            person_profiles: 'always', // Create profiles for all users including anonymous visitors
            // Disable in development for cleaner logs
            loaded: (posthog: any) => {
              if (import.meta.env.DEV) posthog.debug();
            },
          });

          setPosthog(posthogInstance);
          setPostHogProvider(() => PostHogProviderComponent);
        } else {
          console.warn('PostHog API key not found. Analytics will not be tracked.');
        }
      } catch (error) {
        console.warn('Failed to load PostHog:', error);
      }

      setHydrated(true);
    };

    initPostHog();
  }, []);

  if (!hydrated) return <>{children}</>;
  
  if (!PostHogProvider || !posthog) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
