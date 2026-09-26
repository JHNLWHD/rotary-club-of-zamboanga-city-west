import { Box, Flex, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Project } from "../../lib/contentful-types";
import { ProjectCard } from "../ui/ProjectCard";

type ProjectHighlightsSectionProps = {
  projects: Project[];
  viewAllLink: string;
};

export function ProjectHighlightsSection({ projects, viewAllLink }: ProjectHighlightsSectionProps) {
  return (
    <Box as="section" bg="#f7f5f0" id="projects">
      <Box maxW="1400px" mx="auto">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "end" }} gap={6} px={{ base: 5, md: 10 }} py={{ base: 11, md: 14 }}>
          <Box maxW="720px">
            <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase" mb={6}>
              Field notes / Published work
            </Text>
            <Heading as="h2" color="brand.900" fontWeight="semibold" fontSize={{ base: "4xl", md: "5xl" }} letterSpacing="-0.025em" lineHeight="1.12">
              Work that leaves a record.
            </Heading>
            <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" mt={6}>
              Published initiatives with dates, places, partners, and the details behind each handover.
            </Text>
          </Box>
          <Link href={viewAllLink} display="inline-flex" alignItems="center" justifyContent="space-between" gap={8} bg="#0067c8" color="white" px={5} py={4} fontWeight="bold" whiteSpace="nowrap" _hover={{ bg: "brand.700", textDecoration: "none" }}>
            View all projects <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Flex>

        {projects?.length ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 10, md: 8 }} px={{ base: 5, md: 10 }} pb={{ base: 12, md: 16 }}>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug || project.title} project={project} />
            ))}
          </SimpleGrid>
        ) : (
          <Box px={{ base: 5, md: 10 }} py={10}>
            <Text color="gray.700">Project records are being prepared for publication.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
