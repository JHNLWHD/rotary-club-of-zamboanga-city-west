import { Box, SimpleGrid, Flex, Heading, Text, Image, Link } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";

type ServiceArea = {
  title: string;
  desc: string;
  icon: string;
  color: string;
};

type ServiceAreasSectionProps = {
  serviceAreas: ServiceArea[];
};

export function ServiceAreasSection({ serviceAreas }: ServiceAreasSectionProps) {
  return (
    <Box as="section" py={20} maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} id="focus-areas">
      <SectionHeader 
        subtitle="Rotary's Areas of Focus"
        title="ROTARY'S AREAS OF FOCUS"
        description="Our seven areas of focus guide our service projects and help us create lasting positive change in communities around the world."
      />

      <Box>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} gap={8}>
          {serviceAreas.slice(0, 6).map((area) => (
            <Box 
              key={area.title} 
              textAlign="center" 
              _hover={{ transform: "translateY(-8px)" }} 
              transition="all 0.3s ease"
            >
              {/* Enhanced Circular Icon Container */}
              <Box 
                borderRadius="full" 
                w={{ base: "120px", md: "140px", lg: "160px" }}
                h={{ base: "120px", md: "140px", lg: "160px" }}
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={4}
                bg="white"
                border="4px solid"
                borderColor={area.color}
                boxShadow="0 8px 25px rgba(0,0,0,0.1)"
                _hover={{ 
                  transform: "scale(1.05)", 
                  boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                  borderColor: `${area.color.split('.')[0]}.600`
                }}
                transition="all 0.3s ease"
                position="relative"
                overflow="hidden"
              >
                <Image 
                  src={area.icon} 
                  alt={`${area.title} - Rotary service area in Zamboanga City`} 
                  boxSize={{ base: "60px", md: "70px", lg: "80px" }}
                  objectFit="contain"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/80"; 
                  }} 
                />
              </Box>
              
              {/* Title and Description */}
              <Box maxW="200px" mx="auto">
                <Heading as="h3" size={{ base: "sm", md: "md" }} color="gray.900" mb={2} fontWeight="bold" lineHeight="shorter">
                  {area.title}
                </Heading>
                <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} lineHeight="relaxed" mb={3}>
                  {area.desc}
                </Text>
                <Link 
                  href="/service-projects" 
                  color={area.color} 
                  fontWeight="bold" 
                  _hover={{ textDecoration: "underline", color: `${area.color.split('.')[0]}.600` }}
                  fontSize="xs"
                >
                  Learn More →
                </Link>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        
        {/* Centered 7th item */}
        {serviceAreas.length > 6 && (
          <Flex justify="center" mt={8}>
            <Box 
              textAlign="center" 
              _hover={{ transform: "translateY(-8px)" }} 
              transition="all 0.3s ease"
            >
              {/* Enhanced Circular Icon Container */}
              <Box 
                borderRadius="full" 
                w={{ base: "120px", md: "140px", lg: "160px" }}
                h={{ base: "120px", md: "140px", lg: "160px" }}
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={4}
                bg="white"
                border="4px solid"
                borderColor={serviceAreas[6].color}
                boxShadow="0 8px 25px rgba(0,0,0,0.1)"
                _hover={{ 
                  transform: "scale(1.05)", 
                  boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                  borderColor: `${serviceAreas[6].color.split('.')[0]}.600`
                }}
                transition="all 0.3s ease"
                position="relative"
                overflow="hidden"
              >
                <Image 
                  src={serviceAreas[6].icon} 
                  alt={`${serviceAreas[6].title} - Rotary service area in Zamboanga City`} 
                  boxSize={{ base: "60px", md: "70px", lg: "80px" }}
                  objectFit="contain"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/80"; 
                  }} 
                />
              </Box>
              
              {/* Title and Description */}
              <Box maxW="200px" mx="auto">
                <Heading as="h3" size={{ base: "sm", md: "md" }} color="gray.900" mb={2} fontWeight="bold" lineHeight="shorter">
                  {serviceAreas[6].title}
                </Heading>
                <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} lineHeight="relaxed" mb={3}>
                  {serviceAreas[6].desc}
                </Text>
                <Link 
                  href="/service-projects" 
                  color={serviceAreas[6].color} 
                  fontWeight="bold" 
                  _hover={{ textDecoration: "underline", color: `${serviceAreas[6].color.split('.')[0]}.600` }}
                  fontSize="xs"
                >
                  Learn More →
                </Link>
              </Box>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
} 