import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "Club History | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Discover the rich history of Rotary Club of Zamboanga City West, founded in 1979. Learn about our journey of service and community impact over 45 years." },
    { name: "keywords", content: "Rotary history, Zamboanga City West, founded 1979, community service history, Rotary legacy" },
    
    // Open Graph tags
    { property: "og:title", content: "Club History | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Discover the rich history of Rotary Club of Zamboanga City West, founded in 1979." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/history" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/history" },
  ];
}

export default function ClubHistory() {
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
            Our History
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Discover the rich heritage of Rotary Club of Zamboanga City West and our 45-year journey of service to the community.
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
            Since 1979
          </Heading>
          <Text color="gray.700" mb={4}>
            Founded in 1979, Rotary Club of Zamboanga City West has been serving the community for over four decades with unwavering dedication to our motto "Service Above Self."
          </Text>
          <Text color="gray.600" fontSize="sm">
            Detailed history content is being prepared. Please check back soon for our complete story of service and community impact.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 