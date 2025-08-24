import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { PageHero } from "../components/ui/PageHero";
import { EventCard } from "../components/ui/EventCard";
import { fetchAllEvents } from "../lib/contentful-api";
import type { Route } from "./+types/about.calendar";
import type { Event } from "../lib/contentful-types";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

type LoaderData = {
  events: Event[];
};

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const allEvents = await fetchAllEvents();
    return { 
      events: allEvents || [],
    };
  } catch (error) {
    console.error('Error loading events data on server:', error);
    return { 
      events: [],
    };
  }
}

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
  const { events } = useLoaderData() as LoaderData;

  return (
    <Box>
      <PageHero
        title="Calendar of Activities"
        description="Stay connected with our events, regular meetings, and community service projects throughout the year. Join us as we serve our community and build lasting friendships."
        stats={[
          {
            icon: <Calendar size={24} color="white" />,
            value: `${events.length}+`,
            label: "Events"
          },
          {
            icon: <Clock size={24} color="white" />,
            value: "Monthly",
            label: "Meetings"
          },
          {
            icon: <Users size={24} color="white" />,
            value: "Regular",
            label: "Fellowships"
          },
        ]}
      />

      {/* Events Grid Section */}
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <Stack gap={12} align="center">

          {events.length > 0 ? (
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              gap={{ base: 6, md: 8 }}
              w="full"
            >
              {events.map((event) => (
                <EventCard key={event.title} event={event} />
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
                <Calendar size={32} color="#005DAA" />
              </Box>
              <Heading as="h2" fontSize="2xl" color="gray.900" mb={4}>
                Regular Meetings
              </Heading>
              <Text color="gray.700" mb={6} lineHeight="relaxed" fontSize="lg">
                Join us every Thursday for fellowship, service planning, and community impact discussions.
              </Text>
              
              <Box 
                bg="gray.50" 
                p={6} 
                borderRadius="xl" 
                mb={6}
              >
                <Stack gap={3} textAlign="left">
                  <Box display="flex" alignItems="center" gap={3}>
                    <Clock size={20} color="#4A5568" />
                    <Text fontWeight="medium" color="gray.800">
                      Every Thursday, 7:00 PM
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center" gap={3}>
                    <MapPin size={20} color="#4A5568" />
                    <Text fontWeight="medium" color="gray.800">
                      Grand Astoria Hotel, Zamboanga City
                    </Text>
                  </Box>
                </Stack>
              </Box>
              
              <Text color="gray.600" fontSize="sm">
                Our events are being updated in the content management system. Please check back soon to explore our upcoming activities and community engagements.
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
} 