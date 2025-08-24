import { Box, Text, Image, Flex, Heading } from "@chakra-ui/react";
import { ButtonLink } from "./ButtonLink";
import type { Project } from "~/lib/contentful-types";
import { MapPinIcon } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Box 
        as="article"
        key={project.title}
        bg="white" 
        borderRadius="2xl" 
        boxShadow="0 8px 25px rgba(0,0,0,0.08)"
        overflow="hidden"
        _hover={{ 
          boxShadow: "0 12px 35px rgba(0,0,0,0.12)", 
          transform: "translateY(-8px)" 
        }}
        transition="all 0.3s ease"
        border="1px solid"
        borderColor="gray.100"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box position="relative" flexShrink={0}>
          <Image 
            src={project.headerImage?.url ?? "/logo.png"} 
            alt={project?.title ?? "Project Image"}
            width="100%" 
            height="220px"
            objectFit="cover"
            onError={(e) => { 
              (e.target as HTMLImageElement).src = "/logo.png"; 
            }}
          />
          
          {project.date && (
            <Box
              position="absolute"
              top={4}
              right={4}
              bg="rgba(0, 93, 170, 0.95)"
              color="white"
              px={3}
              py={2}
              borderRadius="lg"
              fontSize="sm"
              fontWeight="bold"
              boxShadow="0 4px 15px rgba(0,0,0,0.3)"
              backdropFilter="blur(10px)"
            >
              {new Date(project?.date ?? "").getFullYear()}
            </Box>
          )}
        </Box>
        
        <Box p={6} flex="1" display="flex" flexDirection="column">
          <Heading as="h3" fontSize="xl" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
            {project.title}
          </Heading>
          
          <Text color="gray.600" mb={6} lineHeight="relaxed" flex="1">
            {project.shortDescription}
          </Text>
          
          <Flex justify="space-between" align="center" mt="auto">
            {project.location && (
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                color="gray.500"
                fontSize="sm"
              >
                <Box
                  bg="gray.100"
                  borderRadius="md"
                  p={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MapPinIcon />
                </Box>
                <Text fontWeight="medium">{project.location}</Text>
              </Box>
            )}

            <ButtonLink
              href={project.slug}
              size="sm"
              bg="white"
              color="brand.500"
              border="1px solid"
              borderColor="brand.500"
              _hover={{
                bg: "brand.500",
                color: "white",
              }}
              borderRadius="lg"
              px={4}
              py={2}
              fontSize="xs"
              fontWeight="bold"
              transition="all 0.3s ease"
              ml="auto"
            >
              Learn More
            </ButtonLink>
          </Flex>
        </Box>
      </Box>
    )
}
