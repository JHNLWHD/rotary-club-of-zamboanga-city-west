import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import type { Officer } from "~/lib/contentful-types";
import { OfficerCard } from "../ui/OfficerCard";

type OfficersSectionProps = {
  officers: Officer[];
};

function getOfficerRoleOrderPriority(role: string): number {
  const roleOrderMap: Record<string, number> = {
    'PRESIDENT': 1,
    'VICE PRESIDENT': 2, 
    'SECRETARY': 3,
    'EXECUTIVE SECRETARY': 4,
    'TREASURER': 5,
    'AUDITOR': 6,
  };
  
  const normalizedRole = role.toUpperCase().trim();
  if (roleOrderMap[normalizedRole]) {
    return roleOrderMap[normalizedRole];
  }
  
  return 999;
}

function sortOfficersByRoleHierarchy(officers: Officer[]): Officer[] {
  return [...officers].sort((officerA, officerB) => {
    const priorityA = getOfficerRoleOrderPriority(officerA.role);
    const priorityB = getOfficerRoleOrderPriority(officerB.role);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    return officerA.name.localeCompare(officerB.name);
  });
}

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