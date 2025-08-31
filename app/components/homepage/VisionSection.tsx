import { Box, Text, Container, VStack } from "@chakra-ui/react";

export function VisionSection() {
  return (
    <Box as="section" py={{ base: 16, md: 20 }} bg="white" position="relative">
      {/* Background pattern for visual interest */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.03"
        bgGradient="radial(circle at 30% 20%, brand.500, transparent 50%)"
        pointerEvents="none"
      />
      
      <Container maxW="1200px" position="relative">
        <VStack gap={{ base: 8, md: 10 }} textAlign="center">
          {/* Section Header */}
          <Box>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="bold"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={4}
            >
              Our Vision
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="gray.800"
              lineHeight="1.2"
              maxW="900px"
              mx="auto"
            >
              Empowering Communities Through{" "}
              <Text as="span" color="brand.500">
                Unity & Service
              </Text>
            </Text>
          </Box>

          {/* Vision Statement */}
          <Box
            bg="gray.50"
            borderRadius="xl"
            p={{ base: 8, md: 12 }}
            maxW="800px"
            mx="auto"
            borderLeft="4px solid"
            borderLeftColor="brand.500"
            position="relative"
          >
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              lineHeight="1.8"
              color="gray.700"
              fontWeight="medium"
              textAlign="center"
            >
              Together, we empower communities through collaboration and service—uniting people 
              for positive change, guided by integrity, leadership, and a shared commitment to 
              inspire transformation within ourselves and beyond.
            </Text>
          </Box>

          {/* Supporting Elements */}
          <VStack gap={6} maxW="600px" mx="auto">
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 4, md: 8 }}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                  ∞
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Endless Impact
                </Text>
              </VStack>
              
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                  🤝
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Unity in Service
                </Text>
              </VStack>
              
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                  ✨
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Positive Change
                </Text>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
