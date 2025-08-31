import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "Donate | Support Rotary Club of Zamboanga City West" },
    { name: "description", content: "Support our community service projects by making a donation to Rotary Club of Zamboanga City West. Your contribution helps us serve communities in need." },
    { name: "keywords", content: "donate Rotary, support community service, charitable donation, Zamboanga City, humanitarian aid" },
    
    // Open Graph tags
    { property: "og:title", content: "Donate | Support Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Support our community service projects by making a donation." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/donate" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/donate" },
  ];
}

export default function Donate() {
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
            Support Our Mission
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Your generous donation helps us continue our mission of service above self and makes a lasting impact in communities across Zamboanga City.
          </Text>
        </Box>

        <Box 
          bg="green.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="green.200"
          w="full" 
          maxW="500px"
        >
          <Heading as="h2" fontSize="xl" color="gray.900" mb={4}>
            Make a Difference
          </Heading>
          <Text color="gray.700" mb={4}>
            Every peso counts towards building schools, providing clean water, supporting healthcare initiatives, and creating lasting positive change in our community.
          </Text>
          <Text color="gray.600" fontSize="sm">
            Secure donation options and project-specific giving opportunities will be available here soon.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 