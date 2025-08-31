import { useCallback } from 'react';

type EventProperties = Record<string, any>;

export function usePostHog() {
  const trackEvent = useCallback((eventName: string, properties?: EventProperties) => {
    if (typeof window !== 'undefined') {
      import('posthog-js').then((posthogModule) => {
        const posthog = posthogModule.default;
        if (posthog && posthog.__loaded) {
          posthog.capture(eventName, properties);
        }
      }).catch((error) => {
        console.warn('Failed to track event:', error);
      });
    }
  }, []);

  const identifyUser = useCallback((userId: string, userProperties?: EventProperties) => {
    if (typeof window !== 'undefined') {
      import('posthog-js').then((posthogModule) => {
        const posthog = posthogModule.default;
        if (posthog && posthog.__loaded) {
          posthog.identify(userId, userProperties);
        }
      }).catch((error) => {
        console.warn('Failed to identify user:', error);
      });
    }
  }, []);

  const resetUser = useCallback(() => {
    if (typeof window !== 'undefined') {
      import('posthog-js').then((posthogModule) => {
        const posthog = posthogModule.default;
        if (posthog && posthog.__loaded) {
          posthog.reset();
        }
      }).catch((error) => {
        console.warn('Failed to reset user:', error);
      });
    }
  }, []);

  const setUserProperties = useCallback((properties: EventProperties) => {
    if (typeof window !== 'undefined') {
      import('posthog-js').then((posthogModule) => {
        const posthog = posthogModule.default;
        if (posthog && posthog.__loaded && posthog.people) {
          posthog.people.set(properties);
        }
      }).catch((error) => {
        console.warn('Failed to set user properties:', error);
      });
    }
  }, []);

  return {
    trackEvent,
    identifyUser,
    resetUser,
    setUserProperties,
  };
}
