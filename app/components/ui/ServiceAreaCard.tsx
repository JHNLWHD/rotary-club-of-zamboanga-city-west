import { Box, Heading, Text, Image, Link } from "@chakra-ui/react";
import type { ServiceArea } from "../../lib/contentful-types";

type ServiceAreaCardProps = {
    serviceArea: ServiceArea;
};
  
export function ServiceAreaCard({ serviceArea }: ServiceAreaCardProps) {
    return (
      <Box 
        textAlign="center" 
        _hover={{ transform: "translateY(-8px)" }} 
        transition="all 0.3s ease"
      >
        {/* Enhanced Circular Icon Container */}
        <Box 
          borderRadius="full"
          boxSize="120px"
          mx="auto"
          mb={6}
          bgGradient="linear(to-br, blue.100, blue.200)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="3px solid"
          borderColor={serviceArea.color}
          boxShadow="0 8px 25px rgba(0,0,0,0.15)"
          _hover={{ 
            transform: "scale(1.05)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
            borderColor: serviceArea.color
          }}
          transition="all 0.3s ease"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative Background Pattern */}
          <Box
            position="absolute"
            top="-50%"
            left="-50%"
            width="200%"
            height="200%"
            bgGradient="linear(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
            transform="rotate(45deg)"
            opacity="0.7"
          />
          
          <Image 
            src={serviceArea.icon?.url ?? ""} 
            alt={serviceArea.title}
            boxSize="60px"
            objectFit="contain"
            filter="brightness(1.1) contrast(1.1)"
            position="relative"
            zIndex="1"
          />
        </Box>
        
        <Heading 
          as="h3" 
          fontSize="lg" 
          fontWeight="bold" 
          mb={3} 
          color="gray.900"
          lineHeight="shorter"
          minH="3em"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {serviceArea.title}
        </Heading>
        
        <Text 
          color="gray.600" 
          fontSize="sm" 
          lineHeight="relaxed"
          textAlign="center"
          px={2}
        >
          {serviceArea.description}
        </Text>
  
        <Link 
          href="https://www.rotary.org/en/our-causes" 
          color={serviceArea.color} 
          fontWeight="bold" 
          _hover={{ textDecoration: "underline", color: `${serviceArea.color.split('.')[0]}.600` }}
          fontSize="xs"
          target="_blank"
        >
          Learn More →
        </Link>
      </Box>
    );
  }