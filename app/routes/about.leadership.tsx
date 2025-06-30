import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "Club Leadership | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Meet the leadership team of Rotary Club of Zamboanga City West. Our dedicated officers and board members guide our mission of service above self." },
    { name: "keywords", content: "Rotary leadership, club officers, board members, Zamboanga City, Rotary West" },
    
    // Open Graph tags
    { property: "og:title", content: "Club Leadership | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Meet the leadership team of Rotary Club of Zamboanga City West." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/leadership" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/leadership" },
  ];
}

export default function ClubLeadership() {
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
            Club Leadership
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Meet our dedicated leadership team who guide Rotary Club of Zamboanga City West in our mission of service above self.
          </Text>
        </Box>

        <Box 
          bg="blue.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="blue.200"
          w="full" 
          maxW="500px"
        >
          <Heading as="h2" fontSize="xl" color="gray.900" mb={4}>
            Coming Soon
          </Heading>
          <Text color="gray.700">
            We're currently updating our leadership page with detailed information about our club officers, board members, and committee chairs. Please check back soon!
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 