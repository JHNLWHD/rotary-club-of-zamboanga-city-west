import { createClient } from 'contentful';
import { contentfulClient, getContentfulConfig } from './contentful';

let previewClient: typeof contentfulClient | undefined;

export function getServiceProjectClient(): typeof contentfulClient {
  if (import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW !== 'true') return contentfulClient;

  if (!previewClient) {
    const accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
    if (!accessToken) throw new Error('Service-project draft preview is not configured.');

    const { spaceId, environment } = getContentfulConfig();
    previewClient = createClient({
      space: spaceId,
      environment,
      host: 'preview.contentful.com',
      accessToken,
    });
  }

  return previewClient;
}
