import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { useLoaderData } from "react-router";
import { ContactSection } from "../components/homepage/ContactSection";
import { HeroSection } from "../components/homepage/HeroSection";
import { ProjectHighlightsSection } from "../components/homepage/ProjectHighlightsSection";
import { StatsSection } from "../components/homepage/StatsSection";
import { fetchAllHomepageSections } from "../lib/contentful-api";
import type { HomepageContact, HomepageHero, Project } from "../lib/contentful-types";
import type { Route } from "./+types/home_";

type LoaderData = {
  homepageData: {
    hero?: HomepageHero;
    projectHighlights?: Project[];
    contact?: HomepageContact;
  } | null;
};

const trustLinks = [
  {
    eyebrow: "What we do",
    title: "Published project records",
    description: "See project descriptions, locations, dates, partners, and updates from the club’s work.",
    href: "/service-projects",
  },
  {
    eyebrow: "Who is accountable",
    title: "Named club leadership",
    description: "Review the leadership roster currently published by the club, with its Rotary Year clearly labeled.",
    href: "/about/leadership",
  },
  {
    eyebrow: "Where support goes",
    title: "Foundation giving records",
    description: "Inspect annual giving totals and the fund categories represented in the club’s published data.",
    href: "/about/foundation-giving",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const serverHomepageData = await fetchAllHomepageSections();
    return { homepageData: serverHomepageData || null };
  } catch (error) {
    console.error("Error loading homepage data on server:", error);
    return { homepageData: null };
  }
}

export function meta() {
  return [
    { title: "Rotary Club of Zamboanga City West | Local Service, Documented Impact" },
    { name: "description", content: "Explore the documented community projects, leadership, and Foundation giving of Rotary Club of Zamboanga City West, chartered in 1971." },
    { name: "keywords", content: "Rotary Club, Zamboanga City, community service, volunteer, Philippines, service projects" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
    { property: "og:title", content: "Rotary Club of Zamboanga City West | Local Service, Documented Impact" },
    { property: "og:description", content: "Explore the club’s documented community projects, leadership, and Foundation giving." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Rotary Club of Zamboanga City West" },
    { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Rotary Club of Zamboanga City West" },
    { name: "twitter:description", content: "Local service. Documented impact." },
    { name: "twitter:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { name: "theme-color", content: "#17458f" },
    { name: "geo.region", content: "PH-ZAM" },
    { name: "geo.placename", content: "Zamboanga City" },
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org" },
  ];
}

export default function Homepage() {
  const { homepageData } = useLoaderData() as LoaderData;
  const projects = homepageData?.projectHighlights || [];
  const featuredProject = projects[0];
  const carouselImage = homepageData?.hero?.carouselImages?.find((image) => image?.url);
  const heroImage = featuredProject?.headerImage?.url
    || carouselImage?.url
    || homepageData?.hero?.backgroundImage?.url
    || "/rotary-zc-west.jpg";
  const contact = homepageData?.contact;
  const publishedStats = [
    {
      value: projects.length.toString(),
      label: "Featured project records",
    },
    {
      value: new Set(projects.map((project) => project.location?.trim()).filter(Boolean)).size.toString(),
      label: "Featured locations",
    },
    {
      value: "1971",
      label: "Charter year",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rotary Club of Zamboanga City West",
    alternateName: "The Great West",
    url: "https://rotaryzcwest.org",
    logo: "https://rotaryzcwest.org/logo.png",
    description: "A Zamboanga City service organization publishing its community projects, leadership, and Foundation giving records.",
    foundingDate: "1971-06-02",
    memberOf: {
      "@type": "Organization",
      name: "Rotary International",
      url: "https://www.rotary.org",
    },
    ...(contact?.contactInfo && {
      contactPoint: {
        "@type": "ContactPoint",
        email: contact.contactInfo.email,
        contactType: "General Inquiry",
      },
      sameAs: [contact.contactInfo.facebookUrl],
    }),
  };

  return (
    <Box>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Keep CMS values from closing the script element during HTML parsing.
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <HeroSection
        image={heroImage}
        imageAlt={featuredProject?.title || "Rotary Club of Zamboanga City West community service"}
        imageCaption={featuredProject?.title}
      />

      <StatsSection stats={publishedStats} />

      <Box as="section" bg="#f2f0ea">
        <Flex maxW="1400px" mx="auto" direction={{ base: "column", lg: "row" }}>
          <Flex
            flex="0 0 42%"
            bg="#f7a81b"
            color="brand.900"
            direction="column"
            justify="space-between"
            p={{ base: 6, md: 10, lg: 12 }}
            minH={{ lg: "650px" }}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase" mb={8}>
                Start here / 01–03
              </Text>
              <Heading as="h2" fontWeight="semibold" fontSize={{ base: "4xl", md: "5xl" }} letterSpacing="-0.025em" lineHeight="1.12">
                Evidence before promises.
              </Heading>
            </Box>
            <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="500px" mt={10}>
              The fastest way to understand the club is to inspect the work, the people responsible, and the records already published.
            </Text>
          </Flex>

          <Box flex="1" bg="#f7f5f0" py={{ base: 4, md: 8 }}>
            {trustLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                display="block"
                color="brand.900"
                px={{ base: 5, md: 9 }}
                py={{ base: 8, md: 10 }}
                _hover={{ bg: "white", textDecoration: "none" }}
              >
                <Flex justify="space-between" align="center" gap={4}>
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase">
                    0{index + 1} · {item.eyebrow}
                  </Text>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </Flex>
                <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} mt={5} letterSpacing="-0.025em">{item.title}</Heading>
                <Text color="gray.700" lineHeight="1.7" mt={3} maxW="640px">{item.description}</Text>
              </Link>
            ))}
          </Box>
        </Flex>
      </Box>

      <ProjectHighlightsSection projects={projects} viewAllLink="/service-projects" />

      {contact?.meetingInfo && contact.contactInfo ? (
        <ContactSection meetingInfo={contact.meetingInfo} contactInfo={contact.contactInfo} />
      ) : (
        <Box as="section" bg="white" py={{ base: 12, md: 16 }}>
          <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
            <Heading as="h2" color="#082b49" fontSize="2xl">Contact the club</Heading>
            <Text color="gray.700" mt={3}>Email <Link href="mailto:rotaryzcwest@gmail.com" color="brand.700" fontWeight="bold">rotaryzcwest@gmail.com</Link>.</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
