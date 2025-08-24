import { Box, SimpleGrid, Flex, Heading, Text, Image, Link } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import { ButtonLink } from "../ui/ButtonLink";
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
            {events.map((event, idx) => (
              <Box
                as="article"
                key={event.title}
                bg="white"
                borderRadius="2xl"
                boxShadow="0 8px 25px rgba(0,0,0,0.08)"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                _hover={{
                  boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                  transform: "translateY(-4px)"
                }}
                transition="all 0.3s ease"
              >
                <Box position="relative">
                  <Image
                    src={event.image?.url || "/logo.png"}
                    alt={`${event.title} - Rotary event in Zamboanga City`}
                    width="100%"
                    height="240px"
                    objectFit="cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/logo.png";
                    }}
                  />
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    bg="rgba(0, 0, 0, 0.8)"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    boxShadow="0 4px 15px rgba(0,0,0,0.4)"
                    backdropFilter="blur(8px)"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                  >
                    Featured
                  </Box>
                </Box>

                <Box p={6}>
                  <Heading as="h3" fontSize="xl" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                    {event.title}
                  </Heading>
                  <Text color="gray.600" mb={6} lineHeight="relaxed">
                    {event.description}
                  </Text>

                  <Flex justify="space-between" align="center">
                    <ButtonLink
                      href="/about/calendar"
                      bgGradient="linear(to-r, brand.500, brand.600)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, brand.600, brand.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
                      }}
                      borderRadius="lg"
                      px={6}
                      py={3}
                      fontSize="sm"
                      fontWeight="bold"
                      aria-label={`Learn more about ${event.title}`}
                      transition="all 0.3s ease"
                      boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                    >
                      Learn More
                    </ButtonLink>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      📅 <time dateTime={event.date}>{event.date}</time>
                    </Text>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
} 