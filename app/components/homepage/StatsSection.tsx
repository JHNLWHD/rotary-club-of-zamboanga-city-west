import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import type { StatItem } from "~/lib/contentful-types";
import { AnimatedStat } from "../ui/AnimatedStat";

export function StatsSection({ stats }: { stats: StatItem[] }): JSX.Element {
  if (!stats?.length) {
    return (
      <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="stats">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} textAlign="center">
          <Text fontSize="xl" color="gray.600" fontWeight="medium">
            No statistics have been added to the CMS yet.
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="stats">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
          {stats.map((stat, index) => {
            let formattedValue: string | undefined = undefined;

            if (stat.formatValue === 'true') {
              if (stat.endValue >= 1000000) {
                formattedValue = `₱${(stat.endValue / 1000000).toFixed(0)}M${stat.suffix}`;
              } else {
                formattedValue = `₱${stat.endValue.toLocaleString()}${stat.suffix}`;
              }
            }

            return (
              <AnimatedStat
                key={index}
                endValue={stat.endValue}
                suffix={stat.suffix}
                label={stat.label}
                iconName={stat.iconName}
                iconColor={stat.iconColor}
                bgGradient={stat.bgGradient}
                borderColor={stat.borderColor}
                duration={stat.duration}
                formatValue={formattedValue}
              />
            )
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
} 