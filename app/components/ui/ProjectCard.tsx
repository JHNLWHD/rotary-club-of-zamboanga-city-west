import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "~/lib/contentful-types";
import { showProjectImageFallback } from "~/lib/project-image-fallback";
import { responsiveImage } from "~/lib/contentful-image";

export function ProjectCard({ project }: { project: Project }) {
  const year = project.date ? new Date(project.date).getUTCFullYear() : null;

  return (
    <Box
      as="article"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      boxShadow="0 4px 12px rgba(8, 34, 71, 0.06), 0 18px 36px -24px rgba(8, 34, 71, 0.28)"
      overflow="hidden"
      height="100%"
      display="flex"
      flexDirection="column"
      transition="transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: "brand.200",
        boxShadow: "0 8px 20px rgba(8, 34, 71, 0.08), 0 24px 44px -24px rgba(8, 34, 71, 0.32)",
      }}
      _focusWithin={{ borderColor: "brand.500" }}
      _motionReduce={{ transition: "none", _hover: { transform: "none" } }}
    >
      <Image
        {...responsiveImage(project.headerImage?.url ?? "/rotary-zc-west.jpg", [400, 800, 1200], "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 450px", project.headerImage?.width)}
        loading="lazy"
        decoding="async"
        alt={project.title}
        ref={showProjectImageFallback}
        onError={({ currentTarget }) => showProjectImageFallback(currentTarget)}
        w="full"
        h="auto"
        aspectRatio={4 / 3}
        objectFit="cover"
        borderBottom="1px solid"
        borderColor="gray.100"
      />
      <Flex direction="column" p={{ base: 5, md: 6 }} flex="1" minH={{ base: "auto", md: "300px" }}>
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
