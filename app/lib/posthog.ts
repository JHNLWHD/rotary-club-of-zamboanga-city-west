import posthog from 'posthog-js';

export function initializePostHog() {
  if (typeof window !== 'undefined') {
    const posthogApiKey = import.meta.env.VITE_POSTHOG_KEY;
    const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
    
    if (posthogApiKey) {
      posthog.init(posthogApiKey, {
        api_host: posthogHost,
        // Disable in development for cleaner logs
        loaded: (posthog) => {
          if (import.meta.env.DEV) posthog.debug();
        },
        capture_pageview: true, // Automatically track pageviews
        capture_pageleave: true, // Track when users leave pages
        person_profiles: 'always', // Create profiles for all users including anonymous visitors
      });
    } else {
      console.warn('PostHog API key not found. Analytics will not be tracked.');
    }
  }
}

export { posthog };
