import type { Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

export type ContentfulAsset = Asset;

export type ProcessedAsset = {
  url: string;
  title: string;
  description: string;
  width?: number;
  height?: number;
} | null;

export type RichTextDocument = Document;

export type HomepageHero = {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: ProcessedAsset;
  carouselImages: ProcessedAsset[];
  isActive: boolean;
};

export type StatItem = {
  endValue: number;
  suffix: string;
  label: string;
  iconName: string;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  duration: number;
  formatValue?: string;
};

export type ServiceArea = {
  title: string;
  description: string;
  icon: ProcessedAsset;
  color: string;
  isActive?: boolean;
};

export type Project = {
  title: string;
  shortDescription: string;
  description: string | RichTextDocument; // Support both markdown string and rich text
  headerImage: ProcessedAsset;
  gallery: ProcessedAsset[];
  date: string;
  location: string;
  partners: string[];
  hashtags: string[];
  facebookLink?: string;
  isActive: boolean;
  isFeatured: boolean;
  slug: string;
  category: string;
};

export type Event = {
  title: string;
  date: string;
  image: ProcessedAsset;
  description: string;
  location?: string;
  isActive: boolean;
  isFeatured: boolean;
  slug: string;
};

export type Officer = {
  name: string;
  role: string;
  designation: string;
  type: 'Executive' | 'Director' | 'Adviser';
  photo?: ProcessedAsset;
  isActive: boolean;
  isFeatured: boolean;
};

export type RotaryAnns = {
  name: string;
  role: string;
  designation: string;
  type: 'Executive' | 'Director';
  photo?: ProcessedAsset;
  isActive: boolean;
  isFeatured: boolean;
};

export type HomepageStats = {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
  isActive: boolean;
};

export type HomepageServiceAreas = {
  title?: string;
  subtitle?: string;
  serviceAreas: ServiceArea[];
  isActive: boolean;
};

export type HomepageProjectHighlights = {
  title?: string;
  subtitle?: string;
  projects: Project[];
  viewAllLink?: string;
  isActive: boolean;
};

export type HomepageEvents = {
  title?: string;
  subtitle?: string;
  events: Event[];
  isActive: boolean;
};

export type MeetingInfo = {
  day: string;
  time: string;
  location: string;
  address: string;
};

export type ContactInfo = {
  email: string;
  facebookUrl: string;
  facebookHandle: string;
  phone?: string;
  website?: string;
};

export type HomepageContact = {
  title?: string;
  subtitle?: string;
  meetingInfo: MeetingInfo;
  contactInfo: ContactInfo;
  isActive: boolean;
};
