import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { Users, Handshake, Heart } from "lucide-react";
import { HeroCarousel } from "./HeroCarousel";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  carouselImages: string[];
};

export function HeroSection({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  ctaLink, 
  backgroundImage,
  carouselImages
}: HeroSectionProps) {
  return (
    <Box 
      as="section" 
      position="relative" 
      overflow="hidden" 
      pt={{ base: "140px", md: "160px" }}
      pb={{ base: 8, md: 12 }}
      minH={{ base: "600px", md: "700px" }}
      backgroundImage={`url('${backgroundImage}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      w="100vw"
      maxW="100vw"
      px={0}
      m={0}
    >
      {/* Enhanced Overlay with Gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(135deg, rgba(0,93,170,0.8) 0%, rgba(0,0,0,0.6) 100%)"
        zIndex={1}
      />
      
      <Box px={{ base: 4, md: 16 }} position="relative" zIndex={2} w="100%">
        <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 6, lg: 8 }} minH={{ base: "400px", md: "500px" }} w="100%">
          <Box flex={1} maxW={{ base: "100%", lg: "52%" }} pr={{ base: 0, lg: 4 }} w="100%">
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="white" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={3}
              textShadow="0 2px 4px rgba(0,0,0,0.5)"
              opacity={0.9}
            >
              {subtitle}
            </Text>
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
              fontWeight="bold" 
              lineHeight="shorter"
              color="white"
              mb={6}
              textShadow="0 2px 4px rgba(0,0,0,0.7)"
              letterSpacing="tight"
            >
              {title}
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.100" 
              mb={8} 
              lineHeight="relaxed"
              maxW={{ base: "100%", md: "480px" }}
              textShadow="0 1px 3px rgba(0,0,0,0.7)"
              opacity={0.95}
            >
              {description}
            </Text>
            
            <Flex direction={{ base: "column", sm: "row" }} gap={4} mb={8} justify="flex-start" w="100%">
              <Link
                href={ctaLink}
                bg="brand.500"
                color="white"
                fontWeight="bold"
                px={8}
                py={4}
                borderRadius="md"
                _hover={{ 
                  bg: "brand.600", 
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px rgba(0,93,170,0.3)"
                }}
                style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                transition="all 0.3s ease"
                boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                fontSize="md"
                w={{ base: "100%", sm: "auto" }}
              >
                {ctaText}
              </Link>
            </Flex>
            
            {/* Enhanced Stats or Icons */}
            <Flex gap={6} align="center" mt={2} w="100%">
              <Box color="gold.400" _hover={{ transform: "scale(1.1)" }} transition="transform 0.2s">
                <Users size={28} />
              </Box>
              <Box color="gold.400" _hover={{ transform: "scale(1.1)" }} transition="transform 0.2s">
                <Handshake size={28} />
              </Box>
              <Box color="gold.400" _hover={{ transform: "scale(1.1)" }} transition="transform 0.2s">
                <Heart size={28} />
              </Box>
              <Text fontSize="sm" color="gray.200" ml={2} fontWeight="medium" textShadow="0 1px 2px rgba(0,0,0,0.7)">
                Service Above Self
              </Text>
            </Flex>
          </Box>
          
          <Box 
            flex={1} 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            position="relative"
            maxW={{ base: "100%", lg: "48%" }}
            w="100%"
          >
            <HeroCarousel images={carouselImages} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
} 