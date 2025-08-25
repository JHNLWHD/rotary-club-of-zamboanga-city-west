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
    { title: "Service Projects | Rotary Club of Zamboanga City West - Community Impact Initiatives" },
    { name: "description", content: "Be inspired by service as our projects transform lives beyond our city—addressing urgent needs with dedication, resilience, and compassion to build a brighter future for all." },
    { name: "keywords", content: "Rotary service projects, community service Zamboanga City, clean water initiatives Philippines, education programs Mindanao, healthcare projects Zamboanga, peace building initiatives, Rotary community impact, local service projects, humanitarian aid Philippines" },
    
    // Open Graph tags
    { property: "og:title", content: "Service Projects | Rotary Club of Zamboanga City West - Community Impact" },
    { property: "og:description", content: "Be inspired by service as our projects transform lives—addressing urgent needs with dedication, resilience, and compassion." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/service-projects" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-service-projects.jpg" },
    { property: "og:image:alt", content: "Rotary Club of Zamboanga City West service projects and community initiatives" },
    { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Service Projects | Rotary Club of Zamboanga City West" },
    { name: "twitter:description", content: "Be inspired by service as our projects transform lives and build a brighter future for all." },
    { name: "twitter:image", content: "https://rotaryzcwest.org/og-service-projects.jpg" },
    
    // Additional SEO tags
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
    { name: "geo.region", content: "PH-ZAM" },
    { name: "geo.placename", content: "Zamboanga City, Philippines" },
    { name: "geo.position", content: "6.9214;122.0790" },
    { name: "ICBM", content: "6.9214, 122.0790" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/service-projects" },
    
    // Structured data for better search results
    { name: "application-name", content: "Rotary Club of Zamboanga City West" },
    { name: "theme-color", content: "#005DAA" },
  ];
}

export default function ServiceProjects() {
  const { projects } = useLoaderData() as LoaderData;

  return (
    <Box>
      <PageHero
        title="Our Service Projects"
        description="Be inspired by the spirit of service as our projects transform lives well beyond our city’s borders. Together, we address urgent needs with dedication, resilience, and compassion — building a brighter future for all."
        stats={[
          {
            icon: <Target size={24} color="white" />,
            value: `${projects.length}+`,
            label: "Projects"
          },
          {
            icon: <Users size={24} color="white" />,
            value: "1000+",
            label: "Lives Impacted"
          }
        ]}
      />

      {/* Projects Grid Section */}
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <Stack gap={12} align="center">

          {projects.length > 0 ? (
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              gap={{ base: 6, md: 8 }}
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
                <Target size={32} color="#005DAA" />
              </Box>
              <Heading as="h2" fontSize="2xl" color="gray.900" mb={4}>
                Service Above Self
              </Heading>
              <Text color="gray.700" mb={4} lineHeight="relaxed">
                From clean water initiatives to education programs, healthcare outreach to peacebuilding efforts - our projects address the most pressing needs in our community.
              </Text>
              <Text color="gray.600" fontSize="sm">
                Our service projects are being updated in the content management system. Please check back soon to explore our community impact initiatives.
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
} 