import { Box, IconButton, Flex, Button } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, memo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OptimizedImage } from "../ui/OptimizedImage";

type HeroCarouselProps = {
  images: string[];
};

function HeroCarouselComponent({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  
  const handleSlideChanged = useCallback((s: any) => {
    setCurrent(s.track.details.rel);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged: handleSlideChanged,
    loop: true,
  });

  const handlePrev = useCallback(() => {
    instanceRef.current?.prev();
  }, []);

  const handleNext = useCallback(() => {
    instanceRef.current?.next();
  }, []);

  const handleMoveToIndex = useCallback((idx: number) => {
    instanceRef.current?.moveToIdx(idx);
  }, []);

  return (
    <Box position="relative" w="full" maxW={{ base: "100%", sm: "420px", md: "480px", lg: "520px" }} mx="auto" borderRadius="lg" overflow="hidden" boxShadow="xl">
      <Box ref={sliderRef} className="keen-slider">
        {images.map((src, idx) => (
          <Box className="keen-slider__slide" key={src}>
            <OptimizedImage 
              src={src} 
              alt={`Hero ${idx + 1}`} 
              w="full" 
              h={{ base: "200px", sm: "240px", md: "280px", lg: "300px" }} 
              objectFit="cover"
              width={520}
              height={300}
              priority={idx === 0} // Load first image with priority
              lazy={idx !== 0} // Lazy load other images
              quality={85}
            />
          </Box>
        ))}
      </Box>
      
      {/* Navigation Arrows */}
      <Button
        aria-label="Previous"
        position="absolute"
        top="50%"
        left={{ base: 2, md: 3 }}
        transform="translateY(-50%)"
        zIndex={2}
        onClick={handlePrev}
        bg="whiteAlpha.900"
        _hover={{ bg: "white", transform: "translateY(-50%) scale(1.05)" }}
        borderRadius="full"
        size={{ base: "sm", md: "md" }}
        minW={"auto"}
        p={{ base: 1, md: 1.5 }}
        boxShadow="md"
      >
        <ChevronLeft size={18} color="#2D3748" />
      </Button>
      
      <Button
        aria-label="Next"
        position="absolute"
        top="50%"
        right={{ base: 2, md: 3 }}
        transform="translateY(-50%)"
        zIndex={2}
        onClick={handleNext}
        bg="whiteAlpha.900"
        _hover={{ bg: "white", transform: "translateY(-50%) scale(1.05)" }}
        borderRadius="full"
        size={{ base: "sm", md: "md" }}
        minW={"auto"}
        p={{ base: 1, md: 1.5 }}
        boxShadow="md"
      >
        <ChevronRight size={18} color="#2D3748" />
      </Button>
      
      {/* Dots */}
      <Flex 
        position="absolute" 
        bottom={{ base: 3, md: 4 }} 
        left="50%"
        transform="translateX(-50%)"
        gap={{ base: 2, md: 3 }}
        zIndex={2}
      >
        {images.map((_, idx) => (
          <Box
            key={idx}
            w={current === idx ? { base: 3, md: 3.5 } : { base: 2, md: 2.5 }}
            h={current === idx ? { base: 3, md: 3.5 } : { base: 2, md: 2.5 }}
            borderRadius="full"
            bg={current === idx ? "brand.500" : "whiteAlpha.700"}
            border={current === idx ? "2px solid white" : "1px solid white"}
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => handleMoveToIndex(idx)}
            _hover={{ transform: "scale(1.1)" }}
          />
        ))}
      </Flex>
    </Box>
  );
}

export const HeroCarousel = memo(HeroCarouselComponent);
export default HeroCarousel; 