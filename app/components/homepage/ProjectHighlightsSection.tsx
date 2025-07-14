import { Box, SimpleGrid, VStack, Flex, Heading, Text, Image, Link } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import { ButtonLink } from "../ui/ButtonLink";

type Project = {
  title: string;
  shortDescription: string;
  description: string;
  headerImage: string;
  gallery: string[];
  date: string;
  location: string;
  partners: string[];
  facebookLink: string;
};

type ProjectHighlightsSectionProps = {
  projects: Project[];
  viewAllLink: string;
};

export function ProjectHighlightsSection({ projects, viewAllLink }: ProjectHighlightsSectionProps) {
  return (
    <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="projects">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader 
          subtitle="Success Stories"
          title="Project Highlights"
          description="Discover the transformative impact of our community projects and the lives we've touched together."
        />

        {/* 3-Column Project Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {projects.slice(0, 3).map((proj, idx) => (
            <Box 
              as="article"
              key={proj.title}
              bg="white" 
              borderRadius="2xl" 
              boxShadow="0 8px 25px rgba(0,0,0,0.08)"
              overflow="hidden"
              _hover={{ 
                boxShadow: "0 12px 35px rgba(0,0,0,0.12)", 
                transform: "translateY(-8px)" 
              }}
              transition="all 0.3s ease"
              border="1px solid"
              borderColor="gray.100"
              height="100%"
              display="flex"
              flexDirection="column"
            >
              {/* Image Section */}
              <Box position="relative" flexShrink={0}>
                <Image
                  src={proj.headerImage}
                  alt={`${proj.title} - Community service project in Zamboanga City`}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Project+Image"; 
                  }}
                />
                <Box 
                  position="absolute" 
                  top={4} 
                  left={4} 
                  bgGradient="linear(to-r, brand.500, brand.600)"
                  color="white" 
                  px={3} 
                  py={1} 
                  borderRadius="full" 
                  fontSize="xs" 
                  fontWeight="bold"
                  boxShadow="0 4px 15px rgba(0,93,170,0.3)"
                >
                  Featured
                </Box>
              </Box>
              
              {/* Content Section */}
              <Box p={6} flex="1" display="flex" flexDirection="column">
                <Heading as="h3" fontSize="lg" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                  {proj.title}
                </Heading>
                <Text color="gray.600" mb={4} fontSize="sm" lineHeight="relaxed" flex="1">
                  {proj.shortDescription}
                </Text>
                
                {/* Project Details */}
                <VStack align="start" gap={2} mb={4}>
                  <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                    <Box as="span">📅</Box>
                    <Text>{new Date(proj.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</Text>
                  </Flex>
                  <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                    <Box as="span">📍</Box>
                    <Text>{proj.location}</Text>
                  </Flex>
                  {proj.partners && proj.partners.length > 0 && (
                    <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                      <Box as="span">🤝</Box>
                      <Text>{proj.partners.length} partner{proj.partners.length > 1 ? 's' : ''}</Text>
                    </Flex>
                  )}
                </VStack>

                <ButtonLink 
                  href={viewAllLink}
                  bgGradient="linear(to-r, brand.500, brand.600)"
                  color="white"
                  _hover={{ 
                    bgGradient: "linear(to-r, brand.600, brand.700)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
                  }}
                  borderRadius="lg"
                  px={6}
                  py={3}
                  fontSize="sm"
                  fontWeight="bold"
                  alignSelf="flex-start"
                  aria-label={`Learn more about ${proj.title} project`}
                  transition="all 0.3s ease"
                  boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                  mt="auto"
                >
                  Learn More
                </ButtonLink>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        
        {/* View All Projects Button */}
        <Box textAlign="center" mt={12}>
          <ButtonLink 
            href={viewAllLink}
            bgGradient="linear(to-r, brand.500, brand.600)"
            color="white"
            _hover={{ 
              bgGradient: "linear(to-r, brand.600, brand.700)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
            }}
            borderRadius="lg"
            px={8}
            py={4}
            fontSize="md"
            fontWeight="bold"
            aria-label="View all our service projects"
            transition="all 0.3s ease"
            boxShadow="0 4px 15px rgba(0,93,170,0.2)"
          >
            View All Projects
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
} 