import { Box, Heading, Text } from "@chakra-ui/react";

type SectionHeaderProps = {
  subtitle: string;
  title: string;
  description: string;
  maxW?: string;
};

export function SectionHeader({ subtitle, title, description, maxW = "600px" }: SectionHeaderProps) {
  return (
    <Box textAlign="center" mb={16}>
      <Text 
        fontSize="sm" 
        fontWeight="bold" 
        color="brand.500" 
        letterSpacing="wider" 
        textTransform="uppercase"
        mb={2}
      >
        {subtitle}
      </Text>
      <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
        {title}
      </Heading>
      <Text 
        fontSize={{ base: "md", md: "lg" }} 
        color="gray.600" 
        maxW={maxW} 
        mx="auto" 
        lineHeight="relaxed"
      >
        {description}
      </Text>
    </Box>
  );
} 