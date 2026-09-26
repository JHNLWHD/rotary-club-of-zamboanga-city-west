import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "~/lib/contentful-types";

export function ProjectCard({ project }: { project: Project }) {
  const year = project.date ? new Date(project.date).getUTCFullYear() : null;

  return (
    <Box as="article" bg="#f7f5f0" overflow="hidden" height="100%">
      <Image
        src={project.headerImage?.url ?? "/rotary-zc-west.jpg"}
        alt={project.title}
        w="full"
        h={{ base: "260px", md: "300px" }}
        objectFit="cover"
      />
      <Flex direction="column" px={{ base: 0, md: 1 }} py={{ base: 5, md: 6 }} minH={{ base: "auto", md: "300px" }}>
        <Flex direction={{ base: "column", md: "row" }} gap={3} align={{ base: "start", md: "center" }} color="gray.700" fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" mb={5}>
          {Number.isFinite(year) && <Text>{year}</Text>}
          {project.location && (
            <Flex align="center" gap={1}>
              <MapPin size={13} aria-hidden="true" />
              <Text>{project.location}</Text>
            </Flex>
          )}
        </Flex>
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} color="brand.900" lineHeight="1.2" letterSpacing="-0.025em" mb={4}>
          {project.title}
        </Heading>
        <Text color="gray.700" lineHeight="1.7" flex="1">
          {project.shortDescription}
        </Text>
        <Link href={project.slug} display="inline-flex" alignItems="center" gap={1.5} mt={7} color="brand.900" fontWeight="bold" fontSize="sm" textDecoration="underline" textUnderlineOffset="4px">
          View project <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </Flex>
    </Box>
  );
}
