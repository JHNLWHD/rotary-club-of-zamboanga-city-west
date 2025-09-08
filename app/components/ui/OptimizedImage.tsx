import { Box, Image as ChakraImage, Spinner, Flex } from "@chakra-ui/react";
import { useState, useRef, useEffect, memo } from "react";
import type { ImageProps as ChakraImageProps } from "@chakra-ui/react";

type OptimizedImageProps = ChakraImageProps & {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  priority?: boolean;
  disableOptimization?: boolean; // Add option to disable optimization
};

function OptimizedImageComponent({
  src,
  alt,
  fallbackSrc = "/logo.png",
  lazy = true,
  quality = 75,
  width,
  height,
  priority = false,
  disableOptimization = false,
  ...props
}: OptimizedImageProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(!lazy || priority);
  const [hasImageError, setHasImageError] = useState(false);
  const [isImageInView, setIsImageInView] = useState(!lazy || priority);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px 0px", // Start loading 50px before the image enters viewport
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setHasImageError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn('Image failed to load:', src, 'Optimized URL:', getOptimizedImageUrl(src));
    setHasImageError(true);
    setIsImageLoaded(true);
    
    // Try fallback image
    if (imageRef.current && fallbackSrc && fallbackSrc !== src) {
      imageRef.current.src = fallbackSrc;
    }
  };

  // Generate optimized image URL for Contentful images
  const getOptimizedImageUrl = (originalSrc: string) => {
    if (!originalSrc) {
      return originalSrc;
    }

    // For non-Contentful images, return as-is
    if (!originalSrc.includes('images.ctfassets.net') && !originalSrc.includes('ctfassets.net')) {
      return originalSrc;
    }

    try {
      // Handle Contentful URLs that might not have protocol
      const fullUrl = originalSrc.startsWith('//') ? `https:${originalSrc}` : originalSrc;
      
      // Simple approach: just add basic optimization params to the URL
      const separator = fullUrl.includes('?') ? '&' : '?';
      let optimizedUrl = fullUrl;
      
      const params = [];
      
      // Only add width and height for resizing, no format conversion
      if (width) params.push(`w=${width}`);
      if (height) params.push(`h=${height}`);
      
      // Add fit parameter based on objectFit prop
      if (width || height) {
        // Use different fit strategies based on objectFit
        if (props.objectFit === 'contain') {
          params.push('fit=pad'); // Maintains aspect ratio and centers the image
          params.push('bg=rgb:ffffff00'); // Transparent background for padded images
        } else if (props.objectFit === 'cover') {
          params.push('fit=fill'); // Fills the space, may crop
        } else {
          params.push('fit=scale'); // Default scaling
        }
      }
      
      // Only add quality if it's significantly different from default and we're resizing
      if (quality && quality !== 75 && (width || height)) {
        params.push(`q=${quality}`);
      }
      
      if (params.length > 0) {
        optimizedUrl = `${fullUrl}${separator}${params.join('&')}`;
      }
      
      return optimizedUrl;
    } catch (error) {
      console.warn('Failed to optimize image URL:', originalSrc, error);
      return originalSrc; // Return original URL if optimization fails
    }
  };

  const optimizedSrc = disableOptimization ? src : getOptimizedImageUrl(src);
  const shouldShowImage = isImageInView;

  return (
    <Box 
      ref={containerRef}
      position="relative" 
      w={props.w || props.width || "100%"}
      h={props.h || props.height || "auto"}
      {...(lazy && !isImageLoaded && {
        bg: "gray.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      {lazy && !isImageLoaded && shouldShowImage && (
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
        >
          <Spinner size="sm" color="brand.500" thickness="2px" />
        </Flex>
      )}
      
      {shouldShowImage && (
        <ChakraImage
          ref={imageRef}
          src={optimizedSrc}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          opacity={lazy && !isImageLoaded ? 0 : 1}
          transition="opacity 0.3s ease"
          {...props}
        />
      )}
    </Box>
  );
}

export const OptimizedImage = memo(OptimizedImageComponent);