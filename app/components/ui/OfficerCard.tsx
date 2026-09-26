import { Box, Heading, Text, Image } from "@chakra-ui/react";
import type { Officer } from "~/lib/contentful-types";
import { useState } from "react";

type OfficerCardProps = {
  officer: Officer;
  accentColor?: string;
  colorScheme?: "brand" | "cranberry" | "interact";
};

export function OfficerCard({ 
  officer, 
  colorScheme = "brand" 
}: OfficerCardProps): React.JSX.Element {
  const [imageLoadError, setImageLoadError] = useState(false);
  
  const colors = {
    brand: {
      text: "brand.700",
      bg: "blue.50"
    },
    cranberry: {
      text: "cranberry.700",
      bg: "cranberry.50"
    },
    interact: {
      text: "interact.700",
      bg: "interact.50"
    }
  };
  
  const currentColors = colors[colorScheme];
  
  return (
    <Box
      as="article"
      textAlign="left"
      bg="#f7f5f0"
    >
      {officer.photo?.url && !imageLoadError && (
        <Box aspectRatio="4 / 3" bg={currentColors.bg} overflow="hidden">
          <Image
            src={officer.photo.url}
            alt={officer.name}
            boxSize="100%"
            objectFit="cover"
            onError={() => setImageLoadError(true)}
          />
        </Box>
      )}
      <Box p={{ base: 5, md: 6 }}>
        <Text color={currentColors.text} fontWeight="bold" fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
          {officer.role}
        </Text>
        <Heading as="h3" fontSize="xl" color="brand.900" fontWeight="bold" mb={1} lineHeight="shorter">
          {officer.name}
        </Heading>
        {officer.designation && (
          <Text color="gray.600" fontSize="sm" lineHeight="tall" mt={2}>
            {officer.designation}
          </Text>
        )}
      </Box>
    </Box>
  );
}
