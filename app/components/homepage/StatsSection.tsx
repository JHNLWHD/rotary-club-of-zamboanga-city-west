import { Box, SimpleGrid, Text } from "@chakra-ui/react";

type DisplayStat = { value: string; label: string };

export function StatsSection({ stats }: { stats: DisplayStat[] }): React.JSX.Element | null {
  if (!stats?.length) return null;

  return (
    <Box as="section" id="stats" bg="#f7f5f0" color="brand.900">
      <SimpleGrid maxW="1400px" mx="auto" columns={{ base: stats.length === 4 ? 2 : 1, md: stats.length }} gap={{ base: 6, md: 10 }} px={{ base: 5, md: 10 }} py={{ base: 8, md: 10 }}>
        {stats.map((stat) => (
          <Box
            key={stat.label}
            py={{ base: 2, md: 4 }}
          >
            <Text color="brand.500" fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" lineHeight="1.1">
              {stat.value}
            </Text>
            <Text mt={2} color="brand.700" fontSize="xs" lineHeight="1.5" letterSpacing="0.1em" textTransform="uppercase">
              {stat.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
