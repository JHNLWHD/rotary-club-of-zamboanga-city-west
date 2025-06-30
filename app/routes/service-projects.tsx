import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "Service Projects | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Explore our community service projects in Zamboanga City. From clean water initiatives to education programs, discover how we're making a difference." },
    { name: "keywords", content: "Rotary service projects, community service, Zamboanga City, clean water, education, healthcare, peace building" },
    
    // Open Graph tags
    { property: "og:title", content: "Service Projects | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Explore our community service projects in Zamboanga City." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/service-projects" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/service-projects" },
  ];
}

export default function ServiceProjects() {
  return (
    <Container maxW="1200px" py={{ base: 12, md: 20 }}>
      <Stack gap={8} textAlign="center" align="center">
        <Box>
          <Heading 
            as="h1" 
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
            fontWeight="bold" 
            color="gray.900"
            mb={4}
          >
            Service Projects
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Discover our ongoing and completed community service projects that are making a lasting impact in Zamboanga City and beyond.
          </Text>
        </Box>

        <Box 
          bg="brand.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="brand.200"
          w="full" 
          maxW="500px"
        >
          <Heading as="h2" fontSize="xl" color="gray.900" mb={4}>
            Service Above Self
          </Heading>
          <Text color="gray.700" mb={4}>
            From clean water initiatives to education programs, healthcare outreach to peacebuilding efforts - our projects address the most pressing needs in our community.
          </Text>
          <Text color="gray.600" fontSize="sm">
            Detailed information about our current and past service projects will be available here soon.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 