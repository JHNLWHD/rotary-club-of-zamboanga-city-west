import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import type { ServiceArea } from "../../lib/contentful-types";
import { ServiceAreaCard } from "../ui/ServiceAreaCard";

type ServiceAreasSectionProps = {
  serviceAreas: ServiceArea[];
};

export function ServiceAreasSection({ serviceAreas }: ServiceAreasSectionProps) {
  return (
    <Box as="section" py={20} maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} id="focus-areas">
      <SectionHeader 
        subtitle="Rotary's Areas of Focus"
        title="ROTARY'S AREAS OF FOCUS"
        description="Our seven areas of focus guide our service projects and help us create lasting positive change in communities around the world."
      />

      {!serviceAreas?.length ? (
        <Box textAlign="center" py={12}>
          <Text fontSize="xl" color="gray.600" fontWeight="medium">
            No service areas have been added to the CMS yet.
          </Text>
        </Box>
      ) : (
        <Box>
          <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} gap={8}>
            {serviceAreas.slice(0, 6).map((area) => (
              <ServiceAreaCard key={area.title} serviceArea={area} />
            ))}
          </SimpleGrid>

          {serviceAreas.length > 6 && (
            <Box mt={8} display="flex" justifyContent="center">
              <ServiceAreaCard serviceArea={serviceAreas[6]} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
} 