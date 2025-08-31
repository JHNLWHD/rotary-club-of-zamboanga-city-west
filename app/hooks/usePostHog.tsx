// Re-export PostHog React hooks for easier imports
export { usePostHog } from 'posthog-js/react';

// You can also create custom wrapper hooks if needed
import { usePostHog as usePostHogOriginal } from 'posthog-js/react';
import { useCallback } from 'react';

type EventProperties = Record<string, any>;

export function usePostHogAnalytics() {
  const posthog = usePostHogOriginal();

  const trackEvent = useCallback((eventName: string, properties?: EventProperties) => {
    posthog?.capture(eventName, properties);
  }, [posthog]);

  const identifyUser = useCallback((userId: string, userProperties?: EventProperties) => {
    posthog?.identify(userId, userProperties);
  }, [posthog]);

  const resetUser = useCallback(() => {
    posthog?.reset();
  }, [posthog]);

  const setUserProperties = useCallback((properties: EventProperties) => {
    posthog?.people?.set(properties);
  }, [posthog]);

  return {
    trackEvent,
    identifyUser,
    resetUser,
    setUserProperties,
    posthog,
  };
}
