import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { PageHero } from "~/components/ui/PageHero";

export function meta() {
  return [
    { title: "Club History | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Rotary Club of Zamboanga City West was chartered on June 2, 1971. Review the verified founding fact while the club’s fuller historical archive is prepared." },
    { name: "keywords", content: "Rotary history, Zamboanga City West, chartered 1971, community service history" },
    { property: "og:title", content: "Club History | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Chartered June 2, 1971 in Zamboanga City." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/history" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/about/history" },
  ];
}

export default function ClubHistory() {
  return (
    <>
      <PageHero
        title="Rooted in Zamboanga City since 1971"
        description="Rotary Club of Zamboanga City West was chartered on June 2, 1971. That verified date anchors a service story spanning more than five decades."
      />

      <Container maxW="1200px" py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 14 }}>
          <Box borderTop="4px solid" borderColor="gold.500" pt={6}>
            <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase">
              Verified charter date
            </Text>
            <Heading as="h2" color="#082b49" fontSize={{ base: "3xl", md: "4xl" }} mt={3}>
              June 2, 1971
            </Heading>
            <Text color="gray.700" lineHeight="1.8" mt={4}>
              The club’s public history begins with its charter in Zamboanga City and its enduring commitment to Service Above Self.
            </Text>
          </Box>

          <Box bg="#f7f5f0" border="1px solid" borderColor="brand.900" p={{ base: 6, md: 8 }}>
            <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase">
              Archive in progress
            </Text>
            <Heading as="h2" color="#082b49" fontSize="2xl" mt={3}>
              Building the complete record
            </Heading>
            <Text color="gray.700" lineHeight="1.8" mt={4}>
              The club is preparing a fuller, source-backed timeline of presidents, milestones, partnerships, and major projects. Until that archive is complete, this page states only the founding fact currently verified by the club.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
}
