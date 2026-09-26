import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  image: string;
  imageAlt: string;
  imageCaption?: string;
};

export function HeroSection({ image, imageAlt, imageCaption }: HeroSectionProps) {
  return (
    <Box as="section" bg="brand.500" color="#f7f2e7">
      <Flex
        maxW="1400px"
        mx="auto"
        minH={{ base: "auto", lg: "680px" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Flex
          flex="1 1 58%"
          direction="column"
          justify="space-between"
          px={{ base: 4, md: 8, lg: 12 }}
          py={{ base: 12, md: 16, lg: 14 }}
        >
          <Box>
            <Text fontSize="xs" fontWeight="bold" letterSpacing="0.2em" textTransform="uppercase" mb={{ base: 8, md: 10 }}>
              The Great West · Chartered 1971
            </Text>
            <Heading
              as="h1"
              fontWeight="semibold"
              fontSize={{ base: "42px", md: "64px", xl: "80px" }}
              lineHeight="1.12"
              letterSpacing="-0.025em"
              maxW="760px"
            >
              Service,<br />in full view.
            </Heading>
            <Text color="rgba(247,242,231,.84)" fontSize={{ base: "md", md: "xl" }} lineHeight="1.65" maxW="610px" mt={{ base: 7, md: 9 }}>
              See who is serving, where the work happened, and what the club has published—without digging through slogans.
            </Text>
          </Box>

          <Box mt={{ base: 10, lg: 14 }}>
            <Flex direction={{ base: "column", sm: "row" }} gap={0} align={{ sm: "stretch" }}>
              <Link
                href="#projects"
                display="inline-flex"
                alignItems="center"
                justifyContent="space-between"
                gap={8}
                bg="#f7f2e7"
                color="brand.900"
                px={6}
                py={4}
                fontWeight="bold"
                border="1px solid"
                borderColor="brand.900"
                _hover={{ bg: "gold.300", textDecoration: "none" }}
              >
                Explore the work <ArrowRight size={19} aria-hidden="true" />
              </Link>
              <Link
                href="/about/leadership"
                color="#f7f2e7"
                px={6}
                py={4}
                border="1px solid"
                borderColor="rgba(247,242,231,.62)"
                fontWeight="bold"
                textAlign="center"
                _hover={{ bg: "rgba(247,242,231,.1)", textDecoration: "none" }}
              >
                Meet the club
              </Link>
            </Flex>
            <Flex mt={8} justify="space-between" gap={4} fontSize="xs" letterSpacing="0.12em" textTransform="uppercase">
              <Text color="rgba(247,242,231,.68)">Zamboanga City, Philippines</Text>
              <Text color="rgba(247,242,231,.68)">Service Above Self</Text>
            </Flex>
          </Box>
        </Flex>

        <Box flex="1 1 42%" position="relative" minH={{ base: "440px", md: "560px", lg: "680px" }} bg="brand.900">
          <Image src={image} alt={imageAlt} w="full" h="full" objectFit="cover" loading="eager" />
          <Text position="absolute" top={0} left={0} bg="#f7a81b" color="brand.900" px={4} py={3} fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase">
            Featured field record
          </Text>
          {imageCaption && (
            <Box position="absolute" left={0} right={0} bottom={0} bg="#f7f2e7" color="brand.900" px={{ base: 4, md: 6 }} py={5}>
              <Text fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="gray.700" mb={1}>Project / Published</Text>
              <Text fontWeight="bold">{imageCaption}</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
