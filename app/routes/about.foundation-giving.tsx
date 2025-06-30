import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "The Rotary Foundation Giving | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Learn about The Rotary Foundation and how Rotary Club of Zamboanga City West supports global humanitarian efforts through foundation giving." },
    { name: "keywords", content: "Rotary Foundation, foundation giving, humanitarian aid, global grants, Rotary International, charity" },
    
    // Open Graph tags
    { property: "og:title", content: "The Rotary Foundation Giving | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Learn about The Rotary Foundation and our support for global humanitarian efforts." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/foundation-giving" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/foundation-giving" },
  ];
}

export default function FoundationGiving() {
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
            The Rotary Foundation Giving
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Supporting global humanitarian efforts through The Rotary Foundation's transformative programs and initiatives.
          </Text>
        </Box>

        <Box 
          bg="yellow.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="yellow.200"
          w="full" 
          maxW="500px"
        >
          <Heading as="h2" fontSize="xl" color="gray.900" mb={4}>
            Doing Good in the World
          </Heading>
          <Text color="gray.700" mb={4}>
            The Rotary Foundation helps us advance world understanding, goodwill, and peace by improving health, providing quality education, improving the environment, and alleviating poverty.
          </Text>
          <Text color="gray.600" fontSize="sm">
            Information about our foundation giving and impact will be available soon.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 