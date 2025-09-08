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

  const handleImageError = () => {
    setHasImageError(true);
    setIsImageLoaded(true);
    if (imageRef.current && fallbackSrc) {
      imageRef.current.src = fallbackSrc;
    }
  };

  // Generate optimized image URL for Contentful images
  const getOptimizedImageUrl = (originalSrc: string) => {
    if (!originalSrc.includes('images.ctfassets.net')) {
      return originalSrc;
    }

    const url = new URL(originalSrc);
    const params = new URLSearchParams();
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality) params.set('q', quality.toString());
    params.set('f', 'webp'); // Use WebP format for better compression
    params.set('fit', 'fill'); // Ensure proper fitting

    url.search = params.toString();
    return url.toString();
  };

  const optimizedSrc = getOptimizedImageUrl(src);
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