import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type StatItemData = {
  icon: ReactNode;
  value: string;
  label: string;
};

type PageHeroProps = {
  title: string;
  description: string;
  stats?: StatItemData[];
  backgroundGradient?: string;
};

export function PageHero({
  title,
  description,
  stats = [],
  backgroundGradient,
}: PageHeroProps) {
  const hasCustomBackground = Boolean(backgroundGradient);

  return (
    <Box
      as="section"
      bg={backgroundGradient || "#f7f5f0"}
      color={hasCustomBackground ? "#f7f2e7" : "brand.900"}
    >
      <Container maxW="1400px" px={0}>
        <Box px={{ base: 4, md: 8, lg: 12 }} py={{ base: 12, md: 16 }}>
          <Flex align="center" gap={4} mb={{ base: 8, md: 10 }}>
            <Box w="28px" h="2px" bg="#f7a81b" />
            <Text fontSize="xs" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase">
              Rotary Club of Zamboanga City West
            </Text>
          </Flex>
          <Heading
            as="h1"
            fontWeight="semibold"
            fontSize={{ base: "4xl", md: "6xl" }}
            letterSpacing="-0.025em"
            lineHeight="1.12"
            maxW="1050px"
          >
            {title}
          </Heading>
          <Text color={hasCustomBackground ? "rgba(247,242,231,.82)" : "gray.700"} fontSize={{ base: "md", md: "xl" }} maxW="760px" lineHeight="1.7" mt={{ base: 6, md: 8 }}>
            {description}
          </Text>
        </Box>

        {stats.length > 0 && (
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 5, md: 8 }} px={{ base: 4, md: 8, lg: 12 }} pb={{ base: 10, md: 14 }}>
            {stats.map((stat) => (
              <Flex
                key={stat.label}
                flex="1"
                minW={0}
                align="center"
                gap={4}
                py={2}
              >
                <Box
                  color={hasCustomBackground ? "#f7a81b" : "brand.500"}
                  css={{ "& svg": { color: "currentColor", stroke: "currentColor" } }}
                  aria-hidden="true"
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Text color={hasCustomBackground ? "inherit" : "brand.500"} fontSize="2xl" fontWeight="bold" lineHeight="1">{stat.value}</Text>
                  <Text color={hasCustomBackground ? "rgba(247,242,231,.68)" : "brand.700"} fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" mt={1}>{stat.label}</Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        )}
      </Container>
    </Box>
  );
}
