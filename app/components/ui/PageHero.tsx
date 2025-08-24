import { Box, Container, Stack, Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

/**
 * Reusable page hero component for consistent header sections across pages
 * 
 * @example
 * ```tsx
 * <PageHero
 *   title="Our Service Projects"
 *   description="Discover our community service projects that are making a lasting impact..."
 *   stats={[
 *     { icon: <Target size={24} color="white" />, value: "50+", label: "Projects" }
 *   ]}
 * />
 * ```
 */

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
  backgroundPattern?: boolean;
};

export function PageHero({ 
  title, 
  description, 
  stats = [],
  backgroundGradient = "linear-gradient(135deg, #005DAA 0%, #003d73 50%, #002147 100%)",
  backgroundPattern = true
}: PageHeroProps) {
  return (
    <Box 
      as="section"
      position="relative"
      pt={{ base: 32, md: 36 }}
      pb={{ base: 16, md: 20 }}
      bg={backgroundGradient}
      color="white"
      overflow="hidden"
    >
      {backgroundPattern && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity="0.15"
          backgroundImage="radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 40% 80%, white 1.5px, transparent 1.5px)"
          backgroundSize="60px 60px, 40px 40px, 80px 80px"
        />
      )}
      
      <Container maxW="1200px" position="relative" zIndex={1}>
        <Stack gap={8} textAlign="center" align="center">
          <Box>
            <Heading 
              as="h1" 
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
              fontWeight="bold" 
              mt={{ base: 6, md: 8 }}
              mb={6}
              textShadow="0 3px 6px rgba(0,0,0,0.8)"
              lineHeight="shorter"
            >
              {title}
            </Heading>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              maxW="900px" 
              mx="auto"
              lineHeight="relaxed"
              opacity="0.98"
              textShadow="0 2px 4px rgba(0,0,0,0.6)"
            >
              {description}
            </Text>
          </Box>

          {stats.length > 0 && (
            <Flex 
              direction={{ base: "column", sm: "row" }} 
              gap={{ base: 6, sm: 12 }} 
              justify="center" 
              align="center"
              pt={8}
            >
              {stats.map((stat, index) => (
                <Flex key={index} align="center" gap={3}>
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {stat.icon}
                  </Box>
                  <Box textAlign="left">
                    <Text fontSize="2xl" fontWeight="bold" lineHeight={1}>
                      {stat.value}
                    </Text>
                    <Text fontSize="sm" opacity="0.9">
                      {stat.label}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
