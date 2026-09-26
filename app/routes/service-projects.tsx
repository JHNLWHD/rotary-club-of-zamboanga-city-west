import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { fetchAllProjects } from "../lib/contentful-api";
import { ProjectCard } from "../components/ui/ProjectCard";
import { PageHero } from "../components/ui/PageHero";
import type { Route } from "./+types/service-projects";
import type { Project } from "../lib/contentful-types";
import { Users, Target } from "lucide-react";

type LoaderData = {
  projects: Project[];
};

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const allProjects = await fetchAllProjects();
    return { 
      projects: allProjects || [],
    };
  } catch (error) {
    console.error('Error loading projects data on server:', error);
    return { 
      projects: [],
    };
  }
}
export function meta() {
  return [
    { title: "Service Projects | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Review published Rotary Club of Zamboanga City West project records with dates, locations, partners, and project details." },
    { name: "keywords", content: "Rotary service projects, community service Zamboanga City, clean water initiatives Philippines, education programs Mindanao, healthcare projects Zamboanga, peace building initiatives, Rotary community impact, local service projects, humanitarian aid Philippines" },
    
    // Open Graph tags
    { property: "og:title", content: "Service Projects | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Review the club’s published project records with dates, locations, partners, and details." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/service-projects" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { property: "og:image:alt", content: "Rotary Club of Zamboanga City West service projects and community initiatives" },
    { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Service Projects | Rotary Club of Zamboanga City West" },
    { name: "twitter:description", content: "Published project records from Rotary Club of Zamboanga City West." },
    { name: "twitter:image", content: "https://rotaryzcwest.org/og-service-projects.jpg" },
    
    // Additional SEO tags
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
    { name: "geo.region", content: "PH-ZAM" },
    { name: "geo.placename", content: "Zamboanga City, Philippines" },
    { name: "geo.position", content: "6.9214;122.0790" },
    { name: "ICBM", content: "6.9214, 122.0790" },
    
    // Canonical URL
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/service-projects" },
    
    // Structured data for better search results
    { name: "application-name", content: "Rotary Club of Zamboanga City West" },
    { name: "theme-color", content: "#17458f" },
  ];
}

export default function ServiceProjects() {
  const { projects } = useLoaderData() as LoaderData;
  const locationCount = new Set(projects.map((project) => project.location?.trim()).filter(Boolean)).size;

  return (
    <Box>
      <PageHero
        title="Our Service Projects"
        description="Review the project records currently published by the club, including dates, locations, partners, and the details behind each handover."
        stats={[
          {
            icon: <Target size={24} color="white" />,
            value: projects.length.toString(),
            label: "Published projects"
          },
          {
            icon: <Users size={24} color="white" />,
            value: locationCount.toString(),
            label: "Locations represented"
          }
        ]}
      />

      {/* Projects Grid Section */}
      <Container maxW="1400px" py={{ base: 8, md: 14 }} px={{ base: 4, md: 8 }}>
        <Stack gap={12} align="center">

          {projects.length > 0 ? (
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              gap={{ base: 10, md: 8 }}
              w="full"
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </SimpleGrid>
          ) : (
            <Box 
              bg="white" 
              p={12} 
              borderRadius="2xl" 
              border="1px solid" 
              borderColor="gray.200"
              w="full" 
              maxW="600px"
              boxShadow="lg"
              textAlign="center"
            >
              <Box
                p={4}
                borderRadius="full"
                bg="brand.50"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <Target size={32} color="#17458f" />
              </Box>
              <Heading as="h2" fontSize="2xl" color="gray.900" mb={4}>
                Service Above Self
              </Heading>
              <Text color="gray.700" mb={4} lineHeight="relaxed">
                From clean water initiatives to education programs, healthcare outreach to peacebuilding efforts - our projects address the most pressing needs in our community.
              </Text>
              <Text color="gray.600" fontSize="sm">
                No project records are published on this page yet.
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
