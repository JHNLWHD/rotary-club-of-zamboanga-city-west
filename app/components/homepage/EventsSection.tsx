import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import { EventCard } from "../ui/EventCard";
import type { Event } from "~/lib/contentful-types";

type EventsSectionProps = {
  events: Event[];
};

export function EventsSection({ events }: EventsSectionProps): JSX.Element {
  return (
    <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="events">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader
          subtitle="Events & Meetings"
          title="Ready to Join Our Events"
          description="Stay connected with our community through regular meetings and special events that bring Rotarians together."
        />

        {!events?.length ? (
          <Box textAlign="center" py={12}>
            <Text fontSize="xl" color="gray.600" fontWeight="medium">
              No events have been added to the CMS yet.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
} 