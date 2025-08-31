
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
  Officer,
  RotaryAnns,
  FoundationGiving,
  RotaractClubOfSouthernCityColleges,
  InteractClubOfZamboangaCityWest
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
  ROTARY_ANNS: 'rotaryAnns',
  STAT_ITEM: 'statItem',
  SERVICE_AREA: 'serviceArea',
  FOUNDATION_GIVING: 'foundationGiving',
  ROTARACT_CLUB_OF_SOUTHERN_CITY_COLLEGES: 'rotaractClubOfSouthernCityColleges',
  INTERACT_CLUB_OF_ZAMBOANGA_CITY_WEST: 'interactClubOfZamboangaCityWest',
} as const;

function extractContentfulEntryFields<T>(contentfulEntry: any): T {
  return {
    id: contentfulEntry.sys.id,
    ...contentfulEntry.fields,
  };
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
        gallery: projectFields.gallery?.map((image: any) => buildContentfulAssetMetadata(image)) || [],
        slug: `/service-projects/${projectFields.slug || slugify(projectFields.title, { lower: true })}`,
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

export async function fetchOfficersByType(type: 'Executive' | 'Director' | 'Adviser'): Promise<Officer[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.OFFICERS,
      'fields.isActive': true,
      'fields.type': type,
      order: type === 'Executive' ? ['-fields.role'] : ['fields.role'],
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
    console.error(`Error fetching ${type} officers:`, error);
    return [];
  }
}

export async function fetchRotaryAnnsByType(type: 'Executive' | 'Director'): Promise<RotaryAnns[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.ROTARY_ANNS,
      'fields.isActive': true,
      'fields.type': type,
      order: type === 'Executive' ? ['-fields.role'] : ['fields.role'],
    });

    if (contentfulResponse.items.length === 0) {
      return [];
    }

    const processedRotaryAnns = contentfulResponse.items.map((rotaryAnnsEntry) => {
      const rotaryAnnsFields = extractContentfulEntryFields<RotaryAnns>(rotaryAnnsEntry);
      return {
        ...rotaryAnnsFields,
        photo: buildContentfulAssetMetadata(rotaryAnnsFields.photo), 
      };
    });

    return processedRotaryAnns;
  } catch (error) {
    console.error(`Error fetching ${type} Rotary Anns:`, error);
    return [];
  }
}

export async function fetchAllOfficers(): Promise<{ 
  executives: Officer[], 
  directors: Officer[], 
  advisers: Officer[] 
} | null> {
  try {
    const [executives, directors, advisers] = await Promise.all([
      fetchOfficersByType('Executive'),
      fetchOfficersByType('Director'),
      fetchOfficersByType('Adviser')
    ]);

    return {
      executives: executives || [],
      directors: directors || [],
      advisers: advisers || []
    };
  } catch (error) {
    console.error('Error fetching all officers:', error);
    return null;
  }
}

export async function fetchAllRotaryAnns(): Promise<{ executives: RotaryAnns[], directors: RotaryAnns[] }> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.ROTARY_ANNS,
      'fields.isActive': true,
      include: 2,
      limit: 100,
    });

    if (contentfulResponse.items.length === 0) {
      return { executives: [], directors: [] };
    }

    const rotaryAnns: RotaryAnns[] = contentfulResponse.items.map((entry) => {
      const fields = extractContentfulEntryFields<RotaryAnns>(entry);
      return {
        ...fields,
        photo: buildContentfulAssetMetadata(fields.photo),
      };
    });

    const executives = rotaryAnns.filter((ann) => ann.type === 'Executive');
    const directors = rotaryAnns.filter((ann) => ann.type === 'Director');

    return { executives, directors };
  } catch (error) {
    console.error('Error fetching Rotary Anns:', error);
    return { executives: [], directors: [] };
  }
}

export async function fetchFoundationGiving(): Promise<FoundationGiving[]> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.FOUNDATION_GIVING,
      order: ['fields.startYear'],
      limit: 100,
    });

    if (contentfulResponse.items.length === 0) {
      return [];
    }

    const foundationGiving: FoundationGiving[] = contentfulResponse.items.map((entry) => {
      const fields = extractContentfulEntryFields<FoundationGiving>(entry);
      return {
        ...fields,
        startYear: fields.startYear || 0,
        endYear: fields.endYear || 0,
        annualFund: fields.annualFund || 0,
        polioPlus: fields.polioPlus || 0,
        otherFund: fields.otherFund || 0,
        endowment: fields.endowment || 0,
        total: fields.total || 0,
      };
    });

    // Sort by startYear to ensure chronological order
    return foundationGiving.sort((a, b) => a.startYear - b.startYear);
  } catch (error) {
    console.error('Error fetching Foundation Giving data:', error);
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

export async function fetchAllProjects(): Promise<Project[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.SERVICE_PROJECT,
      'fields.isActive': true,
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
        gallery: projectFields.gallery?.map((image: any) => buildContentfulAssetMetadata(image)) || [],
        slug: `/service-projects/${projectFields.slug || slugify(projectFields.title, { lower: true })}`,
      };
    });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
}

export async function fetchAllEvents(): Promise<Event[] | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.EVENT,
      'fields.isActive': true,
      order: ['-fields.date'],
    });

    if (contentfulResponse.items.length === 0) {
      return [];
    }

    return contentfulResponse.items.map((eventEntry) => {
      const eventFields = extractContentfulEntryFields<Event>(eventEntry);
      return {
        ...eventFields,
        image: buildContentfulAssetMetadata(eventFields.image),
        slug: `/about/calendar/${slugify(eventFields.title, { lower: true })}`,
      };
    });
  } catch (error) {
    console.error('Error fetching all events:', error);
    return [];
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.SERVICE_PROJECT,
      'fields.isActive': true,
      'fields.slug': slug,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }
    const projectEntry = contentfulResponse.items[0];
    const projectFields = extractContentfulEntryFields<Project>(projectEntry);
    
    const processedProject = {
      ...projectFields,
      headerImage: buildContentfulAssetMetadata(projectFields.headerImage),
      gallery: projectFields.gallery?.map((image: any) => buildContentfulAssetMetadata(image)) || [],
      slug: `/service-projects/${projectFields.slug || slugify(projectFields.title, { lower: true })}`,
    };
    console.log(processedProject);
    return processedProject;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
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

export async function fetchRotaractClubOfSouthernCityColleges(): Promise<RotaractClubOfSouthernCityColleges | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.ROTARACT_CLUB_OF_SOUTHERN_CITY_COLLEGES,
      'fields.isActive': true,
      include: 2,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }

    const rotaractEntry = contentfulResponse.items[0];
    const rotaractFields = extractContentfulEntryFields<RotaractClubOfSouthernCityColleges>(rotaractEntry);

    // Process the club leadership references
    const processedClubLeadership: Officer[] = rotaractFields.clubLeadership.map((leaderEntry) => {
      const leaderFields = extractContentfulEntryFields<Officer>(leaderEntry);
      return {
        ...leaderFields,
        photo: buildContentfulAssetMetadata(leaderFields.photo),
      };
    });

    return {
      ...rotaractFields,
      clubLeadership: processedClubLeadership,
    };
  } catch (error) {
    console.error('Error fetching Rotaract Club of Southern City Colleges:', error);
    return null;
  }
}

export async function fetchInteractClubOfZamboangaCityWest(): Promise<InteractClubOfZamboangaCityWest | null> {
  try {
    const contentfulResponse = await contentfulClient.getEntries({
      content_type: CONTENT_TYPES.INTERACT_CLUB_OF_ZAMBOANGA_CITY_WEST,
      'fields.isActive': true,
      include: 2,
      limit: 1,
    });

    if (contentfulResponse.items.length === 0) {
      return null;
    }

    const interactEntry = contentfulResponse.items[0];
    const interactFields = extractContentfulEntryFields<InteractClubOfZamboangaCityWest>(interactEntry);

    // Process the club leadership references
    const processedClubLeadership: Officer[] = interactFields.clubLeadership.map((leaderEntry) => {
      const leaderFields = extractContentfulEntryFields<Officer>(leaderEntry);
      return {
        ...leaderFields,
        photo: buildContentfulAssetMetadata(leaderFields.photo),
      };
    });

    return {
      ...interactFields,
      clubLeadership: processedClubLeadership,
    };
  } catch (error) {
    console.error('Error fetching Interact Club of Zamboanga City West:', error);
    return null;
  }
} 