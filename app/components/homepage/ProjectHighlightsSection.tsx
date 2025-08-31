import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import { ButtonLink } from "../ui/ButtonLink";
import type { Project } from "../../lib/contentful-types";
import { ProjectCard } from "../ui/ProjectCard";

type ProjectHighlightsSectionProps = {
  projects: Project[];
  viewAllLink: string;
};

export function ProjectHighlightsSection({ projects, viewAllLink }: ProjectHighlightsSectionProps) {
  return (
    <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="projects">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader 
          subtitle="Success Stories"
          title="Project Highlights"
          description="Witness the transformative impact of our community projects and the lives we've touched together."
        />

        {!projects?.length ? (
          <Box textAlign="center" py={12}>
            <Text fontSize="xl" color="gray.600" fontWeight="medium">
              No project highlights have been added to the CMS yet.
            </Text>
          </Box>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              {projects?.slice(0, 3).map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </SimpleGrid>

            <Flex justify="center" mt={12}>
              <ButtonLink
                href={viewAllLink}
                bgGradient="linear(to-r, brand.500, brand.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, brand.600, brand.700)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 35px rgba(0,93,170,0.3)"
                }}
                borderRadius="xl"
                px={8}
                py={4}
                fontSize="lg"
                fontWeight="bold"
                transition="all 0.3s ease"
                boxShadow="0 8px 25px rgba(0,93,170,0.2)"
              >
                View All Projects →
              </ButtonLink>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
} 