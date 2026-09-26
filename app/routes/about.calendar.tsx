import { Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Archive, CalendarDays, MapPin } from "lucide-react";
import { useLoaderData } from "react-router";
import { PageHero } from "../components/ui/PageHero";
import { fetchAllEvents } from "../lib/contentful-api";
import type { Event } from "../lib/contentful-types";

type LoaderData = {
  upcomingEvents: Event[];
  pastEvents: Event[];
};

export async function loader(): Promise<LoaderData> {
  try {
    const events = (await fetchAllEvents()) || [];
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);
    const cutoff = startOfToday.getTime();
    const datedEvents = events.filter((event) => Number.isFinite(Date.parse(event.date)));

    return {
      upcomingEvents: datedEvents
        .filter((event) => Date.parse(event.date) >= cutoff)
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date)),
      pastEvents: datedEvents
        .filter((event) => Date.parse(event.date) < cutoff)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    };
  } catch (error) {
    console.error("Error loading events data on server:", error);
    return { upcomingEvents: [], pastEvents: [] };
  }
}

export function meta() {
  return [
    { title: "Calendar of Activities | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Review upcoming and past Rotary Club of Zamboanga City West activities, with dated events clearly separated from the archive." },
    { name: "keywords", content: "Rotary calendar, club events, community activities, Zamboanga City" },
    { property: "og:title", content: "Calendar of Activities | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Upcoming activities and a clearly labeled event archive." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/calendar" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/about/calendar" },
  ];
}

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function EventCard({ event, archived = false }: { event: Event; archived?: boolean }) {
  return (
    <Box as="article" bg="white" border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden">
      {event.image?.url && (
        <Image src={event.image.url} alt={event.title} w="full" h="210px" objectFit="cover" filter={archived ? "saturate(.75)" : undefined} />
      )}
      <Box p={{ base: 5, md: 6 }}>
        <Flex align="center" justify="space-between" gap={4} mb={4}>
          <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.1em" textTransform="uppercase">
            {formatEventDate(event.date)}
          </Text>
          <Text bg={archived ? "gray.100" : "gold.100"} color="#082b49" px={2.5} py={1} borderRadius="full" fontSize="xs" fontWeight="bold">
            {archived ? "Archive" : event.isFeatured ? "Featured" : "Upcoming"}
          </Text>
        </Flex>
        <Heading as="h3" color="#082b49" fontSize="xl" lineHeight="1.3">{event.title}</Heading>
        {!archived && <Text color="gray.700" lineHeight="1.7" mt={3}>{event.description}</Text>}
        {event.location && (
          <Flex color="gray.600" fontSize="sm" align="center" gap={2} mt={5}>
            <MapPin size={16} aria-hidden="true" />
            <Text>{event.location}</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default function CalendarOfActivities() {
  const { upcomingEvents, pastEvents } = useLoaderData() as LoaderData;

  return (
    <Box>
      <PageHero
        title="Calendar of Activities"
        description="Upcoming dates appear first. Completed activities move into a clearly labeled archive so an old event is never presented as upcoming."
        stats={[
          { icon: <CalendarDays size={24} color="white" />, value: upcomingEvents.length.toString(), label: "Upcoming dates" },
          { icon: <Archive size={24} color="white" />, value: pastEvents.length.toString(), label: "Archived events" },
        ]}
      />

      <Container maxW="1200px" py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 14, md: 20 }}>
          <Box as="section" aria-labelledby="upcoming-events-heading">
            <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase">Plan ahead</Text>
            <Heading id="upcoming-events-heading" as="h2" color="#082b49" fontSize={{ base: "2xl", md: "4xl" }} mt={2} mb={8}>
              Upcoming activities
            </Heading>
            {upcomingEvents.length ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {upcomingEvents.map((event) => <EventCard key={`${event.slug}-${event.date}`} event={event} />)}
              </SimpleGrid>
            ) : (
              <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="lg" p={{ base: 6, md: 8 }}>
                <Heading as="h3" color="#082b49" fontSize="xl">No upcoming dates are currently published.</Heading>
                <Text color="gray.700" lineHeight="1.7" mt={3}>Contact the club or follow its Facebook page for the latest confirmed activity schedule.</Text>
              </Box>
            )}
          </Box>

          {pastEvents.length > 0 && (
            <Box as="section" aria-labelledby="past-events-heading" borderTop="1px solid" borderColor="gray.300" pt={{ base: 10, md: 14 }}>
              <Text color="gray.600" fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase">Completed activities</Text>
              <Heading id="past-events-heading" as="h2" color="#082b49" fontSize={{ base: "2xl", md: "4xl" }} mt={2} mb={8}>
                Event archive
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {pastEvents.map((event) => <EventCard key={`${event.slug}-${event.date}`} event={event} archived />)}
              </SimpleGrid>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
