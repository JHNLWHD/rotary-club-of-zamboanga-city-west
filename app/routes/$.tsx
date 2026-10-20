import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { data } from "react-router";

export function loader() {
  return data(null, { status: 404 });
}

export function meta() {
  return [
    { title: "Page Not Found | Rotary Club of Zamboanga City West" },
    { name: "description", content: "The requested page could not be found." },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function NotFound() {
  return (
    <Box bg="white">
      <Container maxW="900px" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}>
        <Box color="brand.700" mb={6} aria-hidden="true">
          <FileQuestion size={48} strokeWidth={1.5} />
        </Box>
        <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" mb={3}>Error 404</Text>
        <Heading as="h1" color="#082b49" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.04em" lineHeight="1.05">
          This page could not be found.
        </Heading>
        <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8" maxW="650px" mt={6}>
          The link may be outdated or the address may be incorrect. Return home, review the club’s projects, or contact us if you need help finding a record.
        </Text>
        <Flex direction={{ base: "column", sm: "row" }} gap={3} mt={9}>
          <Link href="/" display="inline-flex" alignItems="center" justifyContent="center" gap={2} bg="brand.700" color="white" px={6} py={3.5} borderRadius="md" fontWeight="bold" _hover={{ bg: "brand.800", textDecoration: "none" }}>
            <ArrowLeft size={18} aria-hidden="true" /> Return home
          </Link>
          <Link href="/service-projects" textAlign="center" color="brand.700" px={6} py={3.5} border="1px solid" borderColor="brand.700" borderRadius="md" fontWeight="bold" _hover={{ bg: "brand.50", textDecoration: "none" }}>
            Browse projects
          </Link>
        </Flex>
        <Text color="gray.600" fontSize="sm" mt={8}>
          Need help? <Link href="mailto:rotaryzcwest@gmail.com" color="brand.700" fontWeight="bold">rotaryzcwest@gmail.com</Link>
        </Text>
      </Container>
    </Box>
  );
}
