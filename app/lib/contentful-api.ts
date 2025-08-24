
import { contentfulClient } from './contentful';
import type {
  StatItem, 
  ServiceArea,
  Project,
  Event,
  HomepageStats,
  HomepageServiceAreas,
  HomepageHero,
  HomepageContact,
  Officer
} from './contentful-types';
import slugify from 'slugify';

const CONTENT_TYPES = {
  HOMEPAGE_HERO: 'homepageHero',
  HOMEPAGE_STATS: 'homepageStats',
  HOMEPAGE_SERVICE_AREAS: 'homepageServiceAreas',
  HOMEPAGE_CONTACT: 'homepageContact',
  SERVICE_PROJECT: 'serviceProject',
  EVENT: 'event',
  OFFICERS: 'officers',
  STAT_ITEM: 'statItem',
  SERVICE_AREA: 'serviceArea',
} as const;

function extractContentfulEntryFields<T>(contentfulEntry: any): T {
  return contentfulEntry.fields;
}

type ProcessedAsset = {
  url: string;
  title: string;
  description: string;
  width?: number;
  height?: number;
} | null;

function buildContentfulAssetMetadata(contentfulAsset: any): ProcessedAsset {
  if (!contentfulAsset) return null;
  
  return {
    url: contentfulAsset?.fields?.file?.url ? `https:${contentfulAsset.fields.file.url}` : '',
    title: contentfulAsset.fields?.title || '',
    description: contentfulAsset.fields?.description || '',
    width: contentfulAsset.fields?.file?.details?.image?.width,
    height: contentfulAsset.fields?.file?.details?.image?.height,
  };
}


export async function fetchHomepageHeroSection(): Promise<HomepageHero | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.HOMEPAGE_HERO,
      'fields.isActive': true,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }

    const heroEntry = contentfulResponse.items[0];
    const heroFields = extractContentfulEntryFields<HomepageHero>(heroEntry);

    return {
      ...heroFields,
      backgroundImage: buildContentfulAssetMetadata(heroFields.backgroundImage),
      carouselImages: heroFields.carouselImages?.map((image) => buildContentfulAssetMetadata(image)) || [],
    };
  } catch (error) {
    console.error('Error fetching homepage hero section:', error);
    return null;
  }
}

export async function fetchHomepageStatisticsSection(): Promise<StatItem[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.HOMEPAGE_STATS,
      'fields.isActive': true,
      include: 2,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }

    const statsEntry = contentfulResponse.items[0];
    const statsFields = extractContentfulEntryFields<HomepageStats>(statsEntry);

    const processedStatItems: StatItem[] = statsFields.stats.map((statEntry) => {
      const statItem = extractContentfulEntryFields<StatItem>(statEntry);
      return statItem;
    });

    return processedStatItems;
  } catch (error) {
    console.error('Error fetching homepage statistics section:', error);
    return null;
  }
}

export async function fetchHomepageServiceAreasSection(): Promise<ServiceArea[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.HOMEPAGE_SERVICE_AREAS,
      'fields.isActive': true,
      include: 2,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }

    const serviceAreasEntry = contentfulResponse.items[0];
    const serviceAreasFields = extractContentfulEntryFields<HomepageServiceAreas>(serviceAreasEntry);

    const processedServiceAreas: ServiceArea[] = serviceAreasFields.serviceAreas.map((serviceAreaEntry) => {
      const serviceArea = extractContentfulEntryFields<ServiceArea>(serviceAreaEntry);
      return {
        ...serviceArea,
        icon: buildContentfulAssetMetadata(serviceArea.icon),
      };
    });

    return processedServiceAreas;
  } catch (error) {
    console.error('Error fetching homepage service areas section:', error);
    return null;
  }
}

export async function fetchFeaturedProjectHighlights(): Promise<Project[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.SERVICE_PROJECT,
      'fields.isActive': true,
      'fields.isFeatured': true,
      limit: 3,
      order: ['-fields.date'],
    });

    if (contentfulResponse.items.length === 0) {
      return [];
    }

    return contentfulResponse.items.map((projectEntry) => {
      const projectFields = extractContentfulEntryFields<Project>(projectEntry);
      return {
        ...projectFields,
        headerImage: buildContentfulAssetMetadata(projectFields.headerImage),
        gallery: {
          images: projectFields.gallery?.images?.map((image: any) => buildContentfulAssetMetadata(image)) || []
        },
        slug: `/projects/${slugify(projectFields.title, { lower: true })}`,
      };
    });
  } catch (error) {
    console.error('Error fetching featured project highlights:', error);
    return [];
  }
}

export async function fetchFeaturedEvents(): Promise<Event[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.EVENT,
      'fields.isActive': true,
      'fields.isFeatured': true,
      limit: 2,
      order: ['-fields.date'],
    });

    if (contentfulResponse.items.length === 0) {
      return [];
    }

    const processedEvents = contentfulResponse.items.map((eventEntry) => {
      const eventFields = extractContentfulEntryFields<Event>(eventEntry);
      return {
        ...eventFields,
        image: buildContentfulAssetMetadata(eventFields.image),
        slug: `/about/calendar/${slugify(eventFields.title, { lower: true })}`,
      };
    });

    return processedEvents;
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
}

export async function fetchFeaturedOfficers(): Promise<Officer[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.OFFICERS,
      'fields.isActive': true,
      'fields.isFeatured': true,
      'fields.type': 'Executive',
      limit: 6,
      order: ['-fields.role'],
    });
    if (contentfulResponse.items.length === 0) {
      return [];
    }



    const processedOfficers = contentfulResponse.items.map((officerEntry) => {
      const officerFields = extractContentfulEntryFields<Officer>(officerEntry);
      return {
        ...officerFields,
        photo: buildContentfulAssetMetadata(officerFields.photo), 
      };
    });

    return processedOfficers;
  } catch (error) {
    console.error('Error fetching featured officers:', error);
    return [];
  }
}

export async function fetchHomepageContactSection(): Promise<HomepageContact | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.HOMEPAGE_CONTACT,
      'fields.isActive': true,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }

    const contactEntry = contentfulResponse.items[0];
    return extractContentfulEntryFields<HomepageContact>(contactEntry);
  } catch (error) {
    console.error('Error fetching homepage contact section:', error);
    return null;
  }
}

export async function fetchAllHomepageSections() {
  try {
    const [
      heroSection,
      statisticsSection,
      serviceAreasSection,
      projectHighlightsSection,
      eventsSection,
      officersSection,
      contactSection,
    ] = await Promise.all([
      fetchHomepageHeroSection(),
      fetchHomepageStatisticsSection(),
      fetchHomepageServiceAreasSection(),
      fetchFeaturedProjectHighlights(),
      fetchFeaturedEvents(),
      fetchFeaturedOfficers(),
      fetchHomepageContactSection(),
    ]);

    const result = {
      hero: heroSection,
      stats: statisticsSection,
      serviceAreas: serviceAreasSection,
      projectHighlights: projectHighlightsSection,
      events: eventsSection,
      officers: officersSection,
      contact: contactSection,
    };

    return result;
  } catch (error) {
    console.error('Error fetching all homepage sections:', error);
    return null;
  }
} 