import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { CheckCircle2, Home } from "lucide-react";

export function meta() {
  return [
    { title: "Message Received | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Your message to Rotary Club of Zamboanga City West has been submitted." },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/thank-you" },
  ];
}

export default function ThankYou() {
  return (
    <Box bg="white">
      <Container maxW="800px" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} textAlign="center">
        <Box color="brand.700" display="inline-flex" mb={6} aria-hidden="true">
          <CheckCircle2 size={56} strokeWidth={1.5} />
        </Box>
        <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" mb={3}>Message submitted</Text>
        <Heading as="h1" color="#082b49" fontSize={{ base: "4xl", md: "5xl" }} letterSpacing="-0.04em">
          Thank you for reaching out.
        </Heading>
        <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8" maxW="620px" mx="auto" mt={6}>
          Your message will be reviewed by the club and routed to the appropriate person for follow-up.
        </Text>
        <Flex justify="center" mt={9}>
          <Link href="/" display="inline-flex" alignItems="center" gap={2} bg="brand.700" color="white" px={6} py={3.5} borderRadius="md" fontWeight="bold" _hover={{ bg: "brand.800", textDecoration: "none" }}>
            <Home size={18} aria-hidden="true" /> Back to homepage
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
