import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function PHProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const initPostHog = async () => {
      try {
        // Only initialize on client-side after mount
        if (typeof window === 'undefined') return;
        
        const posthogModule = await import('posthog-js');
        const posthog = posthogModule.default;

        const posthogApiKey = import.meta.env.VITE_POSTHOG_KEY;
        const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
        
        if (posthogApiKey) {
          posthog.init(posthogApiKey, {
            api_host: posthogHost,
            defaults: "2025-05-24",
            person_profiles: 'always',
            loaded: (instance: any) => {
              if (import.meta.env.DEV) instance.debug();
            },
          });
        } else {
          console.warn('PostHog API key not found. Analytics will not be tracked.');
        }
      } catch (error) {
        console.warn('Failed to load PostHog:', error);
      }
    };

    initPostHog();
  }, []);

  // Always render children consistently - PostHog will initialize silently
  return <>{children}</>;
}
