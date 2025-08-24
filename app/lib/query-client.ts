import { QueryClient } from '@tanstack/react-query';

// Create a query client for potential future client-side queries
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: false, // Disabled since we're using SSR
      // Refetch on reconnect
      refetchOnReconnect: false, // Disabled since we're using SSR
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
}); 