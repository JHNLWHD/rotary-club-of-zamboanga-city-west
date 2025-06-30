import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { name: "description", content: "Read The Fortress, the official publication of Rotary Club of Zamboanga City West. Stay updated with club news, member spotlights, and community project updates." },
    { name: "keywords", content: "The Fortress, Rotary publication, club newsletter, Zamboanga City West, member news, project updates" },
    
    // Open Graph tags
    { property: "og:title", content: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Read The Fortress, the official publication of Rotary Club of Zamboanga City West." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/the-fortress" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/the-fortress" },
  ];
}

export default function TheFortress() {
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
            The Fortress
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Our official club publication featuring member spotlights, project updates, and important club announcements.
          </Text>
        </Box>

        <Box 
          bg="purple.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="purple.200"
          w="full" 
          maxW="500px"
        >
          <Heading as="h2" fontSize="xl" color="gray.900" mb={4}>
            Official Publication
          </Heading>
          <Text color="gray.700" mb={4}>
            The Fortress keeps our members and community informed about our latest service projects, member achievements, and upcoming events.
          </Text>
          <Text color="gray.600" fontSize="sm">
            Digital and archived issues of The Fortress will be available here soon. Stay tuned for our latest publications!
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 