import {
  Box,
  Heading,
  Text,
  Container,
  Flex,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { PageHero } from "../components/ui/PageHero";
import { fetchAllEvents } from "../lib/contentful-api";
import type { Route } from "./+types/about.calendar";
import type { Event } from "../lib/contentful-types";
import { Calendar, Clock, MapPin, Star } from "lucide-react";

type LoaderData = {
  events: Event[];
};

type GroupedEvents = {
  [month: string]: Event[];
};

function groupEventsByMonth(events: Event[]): GroupedEvents {
  const grouped: GroupedEvents = {};

  events.forEach(event => {
    try {
      const eventDate = new Date(event.date);
      const monthKey = eventDate.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long'
      });

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(event);
    } catch (error) {
      console.warn('Invalid date format for event:', event.title, event.date);
    }
  });

  return grouped;
}

function formatEventDate(dateString: string): { day: string; month: string; weekday: string } {
  try {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
    };
  } catch (error) {
    return { day: '??', month: '???', weekday: '???' };
  }
}

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
    { name: "description", content: "Stay connected with our events, regular meetings, and community service projects throughout the year." },
    { name: "keywords", content: "Rotary calendar, club events, meetings, service projects, community activities, Zamboanga City" },

    // Open Graph tags
    { property: "og:title", content: "Calendar of Activities | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Stay connected with our events, regular meetings, and community service projects throughout the year." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/calendar" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },

    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/calendar" },
  ];
}

export default function CalendarOfActivities() {
  const { events } = useLoaderData() as LoaderData;

  const featuredEvents = events.filter(event => event.isFeatured);
  const regularEvents = events.filter(event => !event.isFeatured);

  const groupedEvents = groupEventsByMonth(regularEvents);
  const monthKeys = Object.keys(groupedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <Box>
      <PageHero
        title="Calendar of Activities"
        description="Stay connected with our events, regular meetings, and community service projects throughout the year."
        stats={[
          {
            icon: <Star size={24} color="white" />,
            value: `${featuredEvents.length}`,
            label: "Featured Events"
          },
          {
            icon: <Calendar size={24} color="white" />,
            value: `${events.length}`,
            label: "Total Events"
          },
          {
            icon: <Clock size={24} color="white" />,
            value: "Monthly",
            label: "Club Meetings"
          },
        ]}
      />

      {/* Calendar Timeline Section */}
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        {events.length > 0 ? (
          <VStack gap={16} align="stretch">

            {/* Featured Events Section */}
            {featuredEvents.length > 0 && (
              <Box>
                <Flex align="center" mb={8}>
                  <Box
                    bg="brand.500"
                    color="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    fontSize="lg"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Calendar size={20} />
                    Featured Events
                  </Box>
                  <Box flex="1" height="2px" bg="brand.100" ml={4} />
                </Flex>

                <VStack gap={6} align="stretch">
                  {featuredEvents.map((event) => {
                    return (
                      <Box key={event.title}>
                        <Flex
                          bg="white"
                          borderRadius="2xl"
                          boxShadow="0 8px 30px rgba(0,0,0,0.12)"
                          border="2px solid"
                          borderColor="brand.100"
                          overflow="hidden"
                          _hover={{
                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            transform: "translateY(-3px)"
                          }}
                          transition="all 0.3s ease"
                          direction={{ base: "column", md: "row" }}
                          position="relative"
                        >
                          {/* Featured Badge */}
                          <Box
                            position="absolute"
                            top={4}
                            right={4}
                            bg="brand.500"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            zIndex={2}
                          >
                            Featured
                          </Box>

                          {/* Calendar Date Box */}
                          <Box
                            bg="brand.500"
                            color="white"
                            p={6}
                            textAlign="center"
                            width={{ md: "140px" }}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text 
                              fontSize="xs" 
                              fontWeight="bold" 
                              lineHeight="1" 
                              color="white" 
                              textTransform="uppercase"
                              css={{
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {event.date}
                            </Text>
                          </Box>

                          {/* Event Content */}
                          <Box flex="1" p={6}>
                            <Flex direction={{ base: "column", lg: "row" }} gap={4}>
                              <Box flex="1">
                                <Heading as="h3" fontSize="xl" color="gray.900" mb={2} fontWeight="bold">
                                  {event.title}
                                </Heading>
                                <Text color="gray.600" mb={4} lineHeight="relaxed">
                                  {event.description}
                                </Text>
                                {event.location && (
                                  <HStack color="gray.500" fontSize="sm">
                                    <MapPin size={16} />
                                    <Text>{event.location}</Text>
                                  </HStack>
                                )}
                              </Box>

                              {event.image?.url && (
                                <Box
                                  borderRadius="lg"
                                  overflow="hidden"
                                  w={{ base: "full", lg: "200px" }}
                                  h="120px"
                                  flexShrink={0}
                                >
                                  <Image
                                    src={event.image.url}
                                    alt={event.title}
                                    w="full"
                                    h="full"
                                    objectFit="cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/logo.png";
                                    }}
                                  />
                                </Box>
                              )}
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            )}

            {/* Calendar Timeline */}
            {monthKeys.map((monthKey) => (
              <Box key={monthKey}>
                {/* Month Header */}
                <Flex align="center" mb={8}>
                  <Box
                    bg="brand.500"
                    color="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    fontSize="lg"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Calendar size={20} />
                    {monthKey}
                  </Box>
                  <Box flex="1" height="2px" bg="brand.100" ml={4} />
                </Flex>

                {/* Events for this month */}
                <VStack gap={6} align="stretch">
                  {groupedEvents[monthKey].map((event) => {
                    const dateInfo = formatEventDate(event.date);
                    const isMonthlyMeeting = event.title === "Monthly Club Meeting";
                    return (
                      <Box key={`${event.title}-${event.date}`}>
                        <Flex
                          bg="white"
                          borderRadius="2xl"
                          boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                          border="1px solid"
                          borderColor={isMonthlyMeeting ? "blue.200" : "gray.100"}
                          overflow="hidden"
                          _hover={{
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            transform: "translateY(-2px)"
                          }}
                          transition="all 0.3s ease"
                          direction={{ base: "column", md: "row" }}
                        >
                          {/* Calendar Date Box */}
                          <Box
                            bg={isMonthlyMeeting ? "blue.600" : "brand.500"}
                            color="white"
                            p={6}
                            textAlign="center"
                            minW={{ md: "140px" }}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="xs" fontWeight="bold" opacity="0.8" mb={1}>
                              {dateInfo.weekday.toUpperCase()}
                            </Text>
                            <Text fontSize="3xl" fontWeight="bold" lineHeight="1">
                              {dateInfo.day}
                            </Text>
                            <Text fontSize="sm" fontWeight="medium" opacity="0.9">
                              {dateInfo.month.toUpperCase()}
                            </Text>
                          </Box>

                          {/* Event Content */}
                          <Box flex="1" p={6}>
                            <Flex direction={{ base: "column", lg: "row" }} gap={4}>
                              <Box flex="1">
                                <Flex align="center" gap={2} mb={2}>
                                  <Heading as="h3" fontSize="xl" color="gray.900" fontWeight="bold">
                                    {event.title}
                                  </Heading>
                                  {isMonthlyMeeting && (
                                    <Text
                                      bg="blue.100"
                                      color="blue.800"
                                      px={2}
                                      py={1}
                                      borderRadius="md"
                                      fontSize="xs"
                                      fontWeight="bold"
                                    >
                                      RECURRING
                                    </Text>
                                  )}
                                </Flex>
                                <Text color="gray.600" mb={4} lineHeight="relaxed">
                                  {event.description}
                                </Text>
                                {event.location && (
                                  <HStack color="gray.500" fontSize="sm">
                                    <MapPin size={16} />
                                    <Text>{event.location}</Text>
                                  </HStack>
                                )}
                              </Box>

                              {event.image?.url && event.image.url !== "/logo.png" && (
                                <Box
                                  borderRadius="lg"
                                  overflow="hidden"
                                  w={{ base: "full", lg: "200px" }}
                                  h="120px"
                                  flexShrink={0}
                                >
                                  <Image
                                    src={event.image.url}
                                    alt={event.title}
                                    w="full"
                                    h="full"
                                    objectFit="cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/logo.png";
                                    }}
                                  />
                                </Box>
                              )}
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            ))}
          </VStack>
        ) : (
          <Box textAlign="center" py={20}>
            <Box
              p={6}
              borderRadius="full"
              bg="brand.50"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              mb={6}
            >
              <Calendar size={48} color="#005DAA" />
            </Box>
            <Heading as="h2" fontSize="2xl" color="gray.900" mb={4}>
              Coming Soon
            </Heading>
            <Text color="gray.600" maxW="400px" mx="auto" lineHeight="relaxed">
              Our events calendar is being updated. Check back soon to see our upcoming
              community activities and fellowship events.
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
} 