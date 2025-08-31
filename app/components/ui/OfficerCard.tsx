import { Box, Heading, Text, Image } from "@chakra-ui/react";
import type { Officer } from "~/lib/contentful-types";
import { Users } from "lucide-react";
import { useState } from "react";

type OfficerCardProps = {
  officer: Officer;
  accentColor?: string;
  colorScheme?: "brand" | "cranberry" | "interact";
};

export function OfficerCard({ 
  officer, 
  colorScheme = "brand" 
}: OfficerCardProps): JSX.Element {
  const [imageLoadError, setImageLoadError] = useState(false);
  
  const colors = {
    brand: {
      primary: "#005DAA",
      border: "brand.500",
      text: "brand.500",
      bg: "blue.50"
    },
    cranberry: {
      primary: "#d41367",
      border: "cranberry.500",
      text: "cranberry.500", 
      bg: "cranberry.50"
    },
    interact: {
      primary: "#3b82f6",
      border: "interact.500",
      text: "interact.500",
      bg: "interact.50"
    }
  };
  
  const currentColors = colors[colorScheme];
  
  return (
    <Box
      as="article"
      textAlign="center"
      bg="white"
      borderRadius="2xl"
      p={6}
      _hover={{
        bg: "gray.50",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        transform: "translateY(-4px)"
      }}
      transition="all 0.3s ease"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 4px 15px rgba(0,0,0,0.05)"
    >
      <Box position="relative" mb={4}>
        <Box
          borderRadius="full"
          boxSize="100px"
          mx="auto"
          border="4px solid"
          borderColor={currentColors.primary}
          bgGradient="linear(to-br, gray.100, gray.200)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s"
          overflow="hidden"
        >
          {officer.photo?.url && !imageLoadError ? (
            <Image
              src={officer.photo.url}
              alt={officer.name}
              boxSize="100%"
              objectFit="cover"
              onError={() => setImageLoadError(true)}
            />
          ) : (
            <Users size={40} color={currentColors.primary} />
          )}
        </Box>
      </Box>
      <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold" mb={1} lineHeight="shorter">
        {officer.name}
      </Heading>
      <Text color={currentColors.primary} fontWeight="bold" fontSize="sm" mb={1}>
        {officer.role}
      </Text>
      {officer.designation && (
        <Text color="gray.600" fontSize="xs" lineHeight="tall">
          {officer.designation}
        </Text>
      )}
    </Box>
  );
}