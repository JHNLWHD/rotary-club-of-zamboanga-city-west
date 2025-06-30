import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "Calendar of Activities | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Stay updated with our upcoming events, meetings, and service projects. Join Rotary Club of Zamboanga City West in our community activities." },
    { name: "keywords", content: "Rotary calendar, club events, meetings, service projects, community activities, Zamboanga City" },
    
    // Open Graph tags
    { property: "og:title", content: "Calendar of Activities | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Stay updated with our upcoming events, meetings, and service projects." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/calendar" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/calendar" },
  ];
}

export default function CalendarOfActivities() {
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
            Calendar of Activities
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Stay connected with our upcoming events, regular meetings, and community service projects throughout the year.
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
            Regular Meetings
          </Heading>
          <Text color="gray.700" mb={4} fontWeight="medium">
            📅 Every Thursday, 7:00 PM<br />
            📍 Grand Astoria Hotel, Zamboanga City
          </Text>
          <Text color="gray.600" fontSize="sm">
            Our complete calendar with special events, service projects, and fellowship activities will be available soon.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 