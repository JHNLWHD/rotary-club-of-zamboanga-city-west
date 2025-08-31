import { Box, Heading, Text } from "@chakra-ui/react";
import { useCountUp } from "~/hooks/useCountUp";
import { getIconByName } from "~/lib/icon-mapper";
import type { StatItem } from "~/lib/contentful-types";
import { Users } from "lucide-react";

export function AnimatedStat({ 
    endValue, 
    suffix = "", 
    label, 
    iconName, 
    iconColor, 
    bgGradient, 
    borderColor, 
    duration = 2000,
    formatValue
  }: StatItem) {
    const { count, ref } = useCountUp(endValue, duration);
    const IconComponent = getIconByName(iconName, Users);
  
    const displayValue = formatValue ? formatValue : `${count.toLocaleString()}${suffix}`;
  
    return (
      <Box 
        ref={ref}
        bg="white" 
        borderRadius="2xl" 
        p={8} 
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        border="1px solid"
        borderColor="gray.100"
        textAlign="center"
        _hover={{ 
          transform: "translateY(-4px)", 
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          borderColor: `${borderColor.split('.')[0]}.200`
        }}
        transition="all 0.3s ease"
        position="relative"
        overflow="hidden"
      >
        <Box 
          bgGradient={bgGradient}
          borderRadius="full" 
          w={16} 
          h={16} 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          mx="auto" 
          mb={4}
          border="3px solid"
          borderColor={borderColor}
          _hover={{ transform: "scale(1.1)" }}
          transition="transform 0.2s"
        >
          <IconComponent size={32} color={iconColor} />
        </Box>
        <Heading as="h3" fontSize="3xl" color="brand.500" mb={2} fontWeight="bold">
          {displayValue}
        </Heading>
        <Text color="gray.700" fontWeight="medium" fontSize="md">
          {label}
        </Text>
      </Box>
    );
  }