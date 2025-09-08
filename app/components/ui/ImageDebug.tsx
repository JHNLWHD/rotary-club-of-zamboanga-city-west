import { Box, Text, Code } from "@chakra-ui/react";
import { OptimizedImage } from "./OptimizedImage";

type ImageDebugProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function ImageDebug({ src, alt, width = 300, height = 200 }: ImageDebugProps) {
  const getOptimizedUrl = (originalSrc: string) => {
    if (!originalSrc) return originalSrc;
    
    if (!originalSrc.includes('images.ctfassets.net') && !originalSrc.includes('ctfassets.net')) {
      return originalSrc;
    }

    try {
      const fullUrl = originalSrc.startsWith('//') ? `https:${originalSrc}` : originalSrc;
      const separator = fullUrl.includes('?') ? '&' : '?';
      const params = [];
      if (width) params.push(`w=${width}`);
      if (height) params.push(`h=${height}`);
      if (width > 200) params.push('f=webp');
      
      return params.length > 0 ? `${fullUrl}${separator}${params.join('&')}` : fullUrl;
    } catch (error) {
      return originalSrc;
    }
  };

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <Text fontWeight="bold" mb={2}>Image Debug Info</Text>
      <Text fontSize="sm" mb={2}>Original URL:</Text>
      <Code p={2} mb={2} fontSize="xs" wordBreak="break-all">{src}</Code>
      
      <Text fontSize="sm" mb={2}>Optimized URL:</Text>
      <Code p={2} mb={4} fontSize="xs" wordBreak="break-all">{getOptimizedUrl(src)}</Code>
      
      <Text fontSize="sm" mb={2}>With Optimization:</Text>
      <OptimizedImage 
        src={src}
        alt={alt}
        width={width}
        height={height}
        w="300px"
        h="200px"
        objectFit="cover"
        mb={2}
      />
      
      <Text fontSize="sm" mb={2}>Without Optimization:</Text>
      <OptimizedImage 
        src={src}
        alt={alt}
        disableOptimization={true}
        w="300px"
        h="200px"
        objectFit="cover"
      />
    </Box>
  );
}