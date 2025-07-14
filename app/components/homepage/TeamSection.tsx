import { Box, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { Users } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

type TeamMember = {
  name: string;
  role: string;
  designation?: string;
};

type TeamSectionProps = {
  team: TeamMember[];
};

export function TeamSection({ team }: TeamSectionProps) {
  return (
    <Box as="section" py={20} bg="white" id="team">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader 
          subtitle="Leadership Team"
          title="Meet The Team Behind Their Success Story"
          description="Our dedicated leaders work tirelessly to make our community initiatives successful and impactful."
        />

        <SimpleGrid columns={{ base: 2, md: 3 }} gap={8}>
          {team.map((member) => (
            <Box 
              as="article"
              key={member.name} 
              textAlign="center" 
              bg="white" 
              borderRadius="2xl" 
              p={6}
              _hover={{ 
                bg: "gray.50", 
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)", 
                transform: "translateY(-4px)" 
              }}
              transition="all 0.3s ease"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="0 4px 15px rgba(0,0,0,0.05)"
            >
              <Box position="relative" mb={4}>
                <Box 
                  borderRadius="full" 
                  boxSize="100px" 
                  mx="auto" 
                  border="4px solid"
                  borderColor="brand.500"
                  bgGradient="linear(to-br, gray.100, gray.200)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="transform 0.2s"
                >
                  <Users size={40} color="#005DAA" />
                </Box>
              </Box>
              <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold" mb={1} lineHeight="shorter">
                {member.name}
              </Heading>
              <Text color="brand.500" fontWeight="bold" fontSize="sm" mb={1}>
                {member.role}
              </Text>
              {member.designation && (
                <Text color="gray.600" fontWeight="medium" fontSize="xs">
                  {member.designation}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
} 