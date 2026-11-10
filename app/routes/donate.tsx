import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "~/components/ui/PageHero";

export function meta() {
  return [
    { title: "Giving Inquiries | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Contact Rotary Club of Zamboanga City West to ask about verified project-specific giving opportunities." },
    { name: "robots", content: "noindex, follow" },
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/donate" },
  ];
}

export default function Donate() {
  return (
    <>
      <PageHero
        title="Support a verified project"
        description="The club does not currently publish an online payment flow on this website. Contact us first to confirm an active project, receiving account, and acknowledgment process."
      />
      <Container maxW="900px" py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
        <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="lg" p={{ base: 6, md: 9 }}>
          <Box color="brand.700" mb={5} aria-hidden="true"><ShieldCheck size={36} strokeWidth={1.5} /></Box>
          <Heading as="h2" color="#082b49" fontSize={{ base: "2xl", md: "3xl" }}>Confirm before sending funds</Heading>
          <Text color="gray.700" lineHeight="1.8" mt={4}>
            For your protection, do not send money based on an unofficial message or an unverified account number. Ask the club to confirm the project and payment details directly.
          </Text>
          <Flex direction={{ base: "column", sm: "row" }} gap={3} mt={8}>
            <Link href="/contact" display="inline-flex" alignItems="center" justifyContent="center" gap={2} bg="brand.700" color="white" px={6} py={3.5} borderRadius="md" fontWeight="bold" _hover={{ bg: "brand.800", textDecoration: "none" }}>
              Contact the club <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/service-projects" textAlign="center" color="brand.700" px={6} py={3.5} fontWeight="bold">Review projects</Link>
          </Flex>
        </Box>
      </Container>
    </>
  );
}
