import { createClient } from 'contentful';

// Contentful client configuration
export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

// Contentful environment variables type
export type ContentfulConfig = {
  spaceId: string;
  accessToken: string;
  environment: string;
};

// Helper function to get contentful config
export function getContentfulConfig(): ContentfulConfig {
  return {
    spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
  };
}

// Helper function to validate contentful config
export function validateContentfulConfig(config: ContentfulConfig): boolean {
  return !!(config.spaceId && config.accessToken);
} 