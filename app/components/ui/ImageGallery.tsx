import { Box, Image, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import type { ProcessedAsset } from "~/lib/contentful-types";

type ImageGalleryProps = {
  images: ProcessedAsset[];
  projectTitle: string;
};

export function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  function handleImageClick(index: number) {
    setSelectedImageIndex(index);
    onOpen();
  }

  const validImages = images.filter(image => image !== null);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
        {validImages.map((image, index) => (
          <Box 
            key={index}
            borderRadius="xl" 
            overflow="hidden" 
            boxShadow="lg"
            _hover={{ 
              transform: "scale(1.02)",
              boxShadow: "xl",
              cursor: "pointer"
            }}
            transition="all 0.2s"
            onClick={() => handleImageClick(index)}
          >
            <Image 
              src={image.url} 
              alt={image.title || `${projectTitle} gallery image ${index + 1}`}
              width="100%" 
              height="200px"
              objectFit="cover"
              onError={(e) => { 
                (e.target as HTMLImageElement).src = "/logo.png"; 
              }}
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Image Modal - Simple overlay implementation */}
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.900"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onClose}
          p={4}
        >
          {/* Close button */}
          <Box
            position="absolute"
            top={4}
            right={4}
            width={10}
            height={10}
            borderRadius="full"
            bg="whiteAlpha.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ bg: "whiteAlpha.300" }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <Box
              width={6}
              height={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="xl"
              fontWeight="bold"
            >
              ×
            </Box>
          </Box>
          
          {/* Image */}
          <Image 
            src={validImages[selectedImageIndex]?.url} 
            alt={validImages[selectedImageIndex]?.title || `${projectTitle} gallery image ${selectedImageIndex + 1}`}
            maxW="90%"
            maxH="90%"
            objectFit="contain"
            borderRadius="lg"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { 
              (e.target as HTMLImageElement).src = "/logo.png"; 
            }}
          />
        </Box>
      )}
    </>
  );
}
