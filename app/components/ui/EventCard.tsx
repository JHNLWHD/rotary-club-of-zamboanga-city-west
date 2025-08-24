import { Box, Text, Image, Heading } from "@chakra-ui/react";
import { ButtonLink } from "./ButtonLink";
import type { Event } from "~/lib/contentful-types";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps): JSX.Element {
  return (
    <Box
      as="article"
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
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" flexShrink={0}>
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
        {event.isFeatured && (
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
        )}
      </Box>

      <Box p={6} flex="1" display="flex" flexDirection="column">
        <Heading as="h3" fontSize="xl" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
          {event.title}
        </Heading>
        
        <Text color="gray.600" mb={6} lineHeight="relaxed" flex="1">
          {event.description}
        </Text>

        <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={6}>
          📅 <time dateTime={event.date}>{event.date}</time>
        </Text>

        <Box mt="auto">
          <ButtonLink
            href={event.slug}
            size="sm"
            bg="white"
            color="brand.500"
            border="1px solid"
            borderColor="brand.500"
            _hover={{
              bg: "brand.500",
              color: "white",
            }}
            borderRadius="lg"
            px={4}
            py={2}
            fontSize="xs"
            fontWeight="bold"
            transition="all 0.3s ease"
            width="100%"
            textAlign="center"
          >
            Learn More
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}
