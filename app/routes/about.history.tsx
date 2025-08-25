import {
  Box,
  Container,
  Stack,
} from "@chakra-ui/react";
import { ComingSoon } from "~/components/ui/ComingSoon";
import { PageHero } from "~/components/ui/PageHero";

export function meta() {
  return [
    { title: "Club History | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Discover the rich history of Rotary Club of Zamboanga City West, founded in 1979. Learn about our journey of service and community impact over 45 years." },
    { name: "keywords", content: "Rotary history, Zamboanga City West, founded 1979, community service history, Rotary legacy" },

    // Open Graph tags
    { property: "og:title", content: "Club History | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Discover the rich history of Rotary Club of Zamboanga City West, founded in 1979." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/history" },

    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/history" },
  ];
}

export default function ClubHistory() {
  return (
    <>
      <PageHero
        title="Our History"
        description="Celebrate the rich heritage of Rotary Club of Zamboanga City West and our 45-year journey of service to the community."
      />

      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <Stack gap={8} textAlign="center" align="center">
          <ComingSoon
            title="🚧 History Coming Soon"
            message="We're currently preparing our complete club history. Chartered on June 2, 1971, Rotary Club of Zamboanga City West has been serving the community for over five decades with unwavering dedication to our motto 'Service Above Self.' Check back soon for our detailed story of service and community impact."
            colorScheme="brand"
            size="lg"
            maxWidth="600px"
          />
        </Stack>
      </Container>
    </>
  );
} 