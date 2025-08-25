import { Box, Text } from "@chakra-ui/react";

/**
 * Reusable Coming Soon component for consistent messaging across the application
 * 
 * @example
 * ```tsx
 * <ComingSoon
 *   title="🚧 Coming Soon"
 *   message="This content is being prepared. Check back soon for updates."
 *   colorScheme="cranberry"
 *   size="lg"
 *   maxWidth="600px"
 * />
 * ```
 */

type ComingSoonProps = {
  /** The title text to display (defaults to "🚧 Coming Soon") */
  title?: string;
  /** The message text to display below the title */
  message?: string;
  /** Color scheme for the component styling */
  colorScheme?: "gray" | "brand" | "cranberry" | "gold";
  /** Size variant affecting padding and typography */
  size?: "sm" | "md" | "lg";
  /** Maximum width of the component */
  maxWidth?: string;
};

export function ComingSoon({ 
  title = "🚧 Coming Soon",
  message = "This content is being prepared. Check back soon for updates.",
  colorScheme = "gray",
  size = "md",
  maxWidth = "400px"
}: ComingSoonProps) {
  const colorSchemes = {
    gray: {
      bg: "gray.50",
      border: "gray.300",
      title: "gray.500",
      text: "gray.600"
    },
    brand: {
      bg: "blue.50",
      border: "blue.300",
      title: "blue.500",
      text: "blue.600"
    },
    cranberry: {
      bg: "cranberry.50",
      border: "cranberry.300",
      title: "cranberry.500",
      text: "cranberry.600"
    },
    gold: {
      bg: "gold.50",
      border: "gold.300",
      title: "gold.500",
      text: "gold.600"
    }
  };

  const sizes = {
    sm: {
      padding: 8,
      titleSize: "lg",
      textSize: "sm"
    },
    md: {
      padding: 12,
      titleSize: "xl",
      textSize: "md"
    },
    lg: {
      padding: 16,
      titleSize: "2xl",
      textSize: "lg"
    }
  };

  const currentColors = colorSchemes[colorScheme];
  const currentSize = sizes[size];

  return (
    <Box 
      bg={currentColors.bg}
      p={currentSize.padding}
      borderRadius="xl"
      border="2px dashed"
      borderColor={currentColors.border}
      textAlign="center"
      maxW={maxWidth}
      mx="auto"
    >
      <Text 
        fontSize={currentSize.titleSize} 
        color={currentColors.title} 
        fontWeight="medium" 
        mb={2}
      >
        {title}
      </Text>
      <Text 
        color={currentColors.text} 
        fontSize={currentSize.textSize}
        lineHeight="relaxed"
      >
        {message}
      </Text>
    </Box>
  );
}
