import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import type { Officer } from "~/lib/contentful-types";
import { OfficerCard } from "../ui/OfficerCard";
import { sortOfficersByRoleHierarchy } from "~/lib/officer-utils";

type OfficersSectionProps = {
  officers: Officer[];
};



export function OfficersSection({ officers }: OfficersSectionProps): JSX.Element {
  const sortedOfficers = sortOfficersByRoleHierarchy(officers);
  return (
    <Box as="section" py={20} bg="white" id="team">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader 
          subtitle="Leadership Team"
          title="Meet The Team Behind Their Success Story"
          description="Our dedicated leaders work tirelessly to make our community initiatives successful and impactful."
        />

        {!sortedOfficers?.length ? (
          <Box textAlign="center" py={12}>
            <Text fontSize="xl" color="gray.600" fontWeight="medium">
              No team members have been added to the CMS yet.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 3 }} gap={8}>
            {sortedOfficers.map((officer) => (
              <OfficerCard key={officer.name} officer={officer} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
} 