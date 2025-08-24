import { Box, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { HeroSection } from "../components/homepage/HeroSection";
import { StatsSection } from "../components/homepage/StatsSection";
import { ServiceAreasSection } from "../components/homepage/ServiceAreasSection";
import { ProjectHighlightsSection } from "../components/homepage/ProjectHighlightsSection";
import { EventsSection } from "../components/homepage/EventsSection";
import { OfficersSection } from "../components/homepage/OfficersSection";
import { ContactSection } from "../components/homepage/ContactSection";
import { fetchAllHomepageSections } from "../lib/contentful-api";
import type { Route } from "./+types/home_";
import type {
  StatItem,
  Project,
  Event,
  Officer,
  HomepageHero,
  HomepageContact,
  ServiceArea
} from "../lib/contentful-types";

type LoaderData = {
  homepageData: {
    hero?: HomepageHero;
    stats?: StatItem[];
    serviceAreas?: ServiceArea[];
    projectHighlights?: Project[];
    events?: Event[];
    officers?: Officer[];
    contact?: HomepageContact;
  } | null;
};

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const serverHomepageData = await fetchAllHomepageSections();
    return { 
      homepageData: serverHomepageData || null,
    };
  } catch (error) {
    console.error('Error loading homepage data on server:', error);
    return { 
      homepageData: null,
    };
  }
}

export function meta() {
  return [
    { title: "Rotary Club of Zamboanga City West | Service Above Self" },
    { name: "description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. We focus on peacebuilding, education, healthcare, clean water, and community development. Service Above Self since 1979." },
    { name: "keywords", content: "Rotary Club, Zamboanga City, community service, volunteer, charity, Philippines, peacebuilding, education, healthcare, clean water, community development, service above self" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    
    // Open Graph tags
    { property: "og:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
    { property: "og:description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. We focus on peacebuilding, education, healthcare, clean water, and community development." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
    { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
    { name: "twitter:description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. Service Above Self since 1979." },
    { name: "twitter:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { name: "twitter:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
    
    // Additional SEO tags
    { name: "theme-color", content: "#005DAA" },
    { name: "msapplication-TileColor", content: "#005DAA" },
    { name: "geo.region", content: "PH-ZAM" },
    { name: "geo.placename", content: "Zamboanga City" },
    { name: "geo.position", content: "6.9214;122.0790" },
    { name: "ICBM", content: "6.9214, 122.0790" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org" },
  ];
}

const defaultHeroData = {
  title: "Rotary Club of Zamboanga City West",
  subtitle: "Service Above Self",
  description: "Join us in serving our community through meaningful projects and initiatives.",
  ctaText: "Learn More",
  ctaLink: "/about",
  backgroundImage: "/logo.png",
  carouselImages: []
};

export default function Homepage() {
  const { homepageData } = useLoaderData() as LoaderData;

  const heroSectionData = homepageData?.hero || defaultHeroData;

  const statisticsSectionData = homepageData?.stats || [];

  const serviceAreasSectionData = homepageData?.serviceAreas || [];
  
  const projectHighlightsSectionData = homepageData?.projectHighlights || [];
  
  const eventsSectionData = homepageData?.events || [];
  
  const officersSectionData = homepageData?.officers || [];
  
  // Convert meeting info to match component expectations
  const meetingInformationData = homepageData?.contact?.meetingInfo 
    ? {
        day: homepageData.contact.meetingInfo.day,
        time: homepageData.contact.meetingInfo.time,
        location: homepageData.contact.meetingInfo.location,
        address: homepageData.contact.meetingInfo.address,
      }
    : null;

  // Convert contact info to match component expectations  
  const contactInformationData = homepageData?.contact?.contactInfo
    ? {
        email: homepageData.contact.contactInfo.email,
        facebookUrl: homepageData.contact.contactInfo.facebookUrl,
        facebookHandle: homepageData.contact.contactInfo.facebookHandle,
      }
    : null;

  const structuredDataForSEO = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rotary Club of Zamboanga City West",
    "alternateName": "Rotary Zamboanga West",
    "url": "https://rotaryzcwest.org",
    "logo": "https://rotaryzcwest.org/logo.png",
    "description": "A service organization dedicated to community development, peacebuilding, education, healthcare, and humanitarian projects in Zamboanga City, Philippines.",
    "foundingDate": "1979",
    "memberOf": {
      "@type": "Organization",
      "name": "Rotary International",
      "url": "https://www.rotary.org"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grand Astoria Hotel, 914 Mayor Jaldon Street",
      "addressLocality": "Zamboanga City",
      "addressRegion": "Zamboanga Peninsula",
      "addressCountry": "Philippines",
      "postalCode": "7000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63-926-430-4580",
      "email": "rotaryzcwest@gmail.com",
      "contactType": "General Inquiry"
    },
    "sameAs": [
      "https://www.facebook.com/RCZCwest"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Zamboanga City",
      "addressCountry": "Philippines"
    },
    "knowsAbout": [
      "Community Development",
      "Peacebuilding",
      "Education",
      "Healthcare",
      "Clean Water Projects",
      "Humanitarian Aid"
    ]
  };

  return (
    <Box>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataForSEO) }}
      />

      <HeroSection 
        title={heroSectionData.title}
        subtitle={heroSectionData.subtitle}
        description={heroSectionData.description}
        ctaText={heroSectionData.ctaText}
        ctaLink={heroSectionData.ctaLink}
        backgroundImage={
          typeof heroSectionData.backgroundImage === 'string' 
            ? heroSectionData.backgroundImage 
            : heroSectionData.backgroundImage?.url || "/logo.png"
        }
        carouselImages={
          heroSectionData.carouselImages?.length > 0
            ? heroSectionData.carouselImages.map((image: any) => 
                typeof image === 'string' ? image : image?.url || "/logo.png"
              )
            : []
        }
      />

      <StatsSection stats={statisticsSectionData} />

      <ServiceAreasSection serviceAreas={serviceAreasSectionData} />

      <ProjectHighlightsSection 
        projects={projectHighlightsSectionData} 
        viewAllLink="/service-projects"
      />

      <EventsSection events={eventsSectionData} />

      <OfficersSection officers={officersSectionData} />

      {meetingInformationData && contactInformationData ? (
        <ContactSection 
          meetingInfo={meetingInformationData}
          contactInfo={contactInformationData}
        />
      ) : (
        <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="contact">
          <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} textAlign="center">
            <Text fontSize="xl" color="gray.600" fontWeight="medium">
              No contact information has been added to the CMS yet.
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
