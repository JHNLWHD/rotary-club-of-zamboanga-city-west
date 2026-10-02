import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { PageHero } from "~/components/ui/PageHero";
import { OfficerCard } from "~/components/ui/OfficerCard";
import { ComingSoon } from "~/components/ui/ComingSoon";
import type { Officer, RotaryAnns } from "~/lib/contentful-types";
import { fetchAllOfficers, fetchAllRotaryAnns } from "~/lib/contentful-api";
import { sortOfficersByRoleHierarchy } from "~/lib/officer-utils";
import type { Route } from "./+types/about.leadership";
import { Users, Target, Award } from "lucide-react";

type LoaderData = {
  officers: {
    executives: Officer[];
    directors: Officer[];
    advisers: Officer[];
  };
  rotaryAnns: {
    executives: RotaryAnns[];
    directors: RotaryAnns[];
  };
};

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const [allOfficers, allRotaryAnns] = await Promise.all([
      fetchAllOfficers(),
      fetchAllRotaryAnns()
    ]);

    return {
      officers: allOfficers || { executives: [], directors: [], advisers: [] },
      rotaryAnns: allRotaryAnns || { executives: [], directors: [] }
    };
  } catch (error) {
    console.error('Error loading leadership data on server:', error);
    return {
      officers: { executives: [], directors: [], advisers: [] },
      rotaryAnns: { executives: [], directors: [] }
    };
  }
}

export function meta() {
  return [
    { title: "Club Leadership | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Review the Rotary Club of Zamboanga City West leadership roster published for Rotary Year 2025-2026." },
    { name: "keywords", content: "Rotary leadership, club officers, board members, Zamboanga City, Rotary West" },
    
    // Open Graph tags
    { property: "og:title", content: "Club Leadership | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Published club leadership roster for Rotary Year 2025-2026." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/leadership" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    
    // Canonical URL
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/about/leadership" },
  ];
}


export default function ClubLeadership() {
  const { officers, rotaryAnns } = useLoaderData<LoaderData>();
  
  // Sort executives by role priority using utility function
  const sortedExecutives = sortOfficersByRoleHierarchy(officers.executives);
  
  const leadershipStats = [
    {
      icon: <Users size={24} color="white" />,
      value: officers.executives.length > 0 ? officers.executives.length.toString() : "0",
      label: "Club Officers"
    },
    {
      icon: <Target size={24} color="white" />,
      value: officers.directors.length > 0 ? officers.directors.length.toString() : "0",
      label: "Directors"
    },
    {
      icon: <Award size={24} color="white" />,
      value: (rotaryAnns.executives.length + rotaryAnns.directors.length) > 0 
        ? (rotaryAnns.executives.length + rotaryAnns.directors.length).toString() 
        : "0",
      label: "Rotary Anns"
    }
  ];

  const hasRotaryAnnsData = rotaryAnns.executives.length > 0 || rotaryAnns.directors.length > 0;

  return (
    <>
      <PageHero
        title="Club Leadership"
        description="Browse the leadership roster currently published by the club. The Rotary Year is stated clearly so an older roster is never presented as current."
        stats={leadershipStats}
      />
      
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <Stack gap={12} align="center">
          <Box textAlign="center">
            <Box 
              bg="gold.100"
              color="#082b49"
              px={4}
              py={2}
              border="1px solid"
              borderColor="gold.500"
              display="inline-block"
              mb={3}
            >
              <Text fontWeight="bold" fontSize="xs" letterSpacing="0.12em" textTransform="uppercase">
                Published archive
              </Text>
            </Box>
            <Text fontSize="xl" color="#082b49" fontWeight="bold">
              Rotary Year 2025–2026
            </Text>
            <Text fontSize="sm" color="gray.700" mt={2}>
              Contact the club to confirm leadership for the current Rotary Year.
            </Text>
          </Box>

        {/* Club Officers */}
        <Box w="full">
          <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold" mb={8} textAlign="center">
            Club Officers
          </Heading>
          {officers.executives.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {sortedExecutives.map((officer) => (
                <OfficerCard 
                  key={officer.role}
                  officer={officer}
                />
              ))}
            </SimpleGrid>
          ) : (
            <ComingSoon
              title="Roster being prepared"
              message="Our club officers information is being prepared. Check back soon for updates on our leadership team."
              colorScheme="gray"
              size="md"
            />
          )}
        </Box>

        {/* Directors */}
        <Box w="full">
          <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold" mb={8} textAlign="center">
            Directors
          </Heading>
          {officers.directors.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {officers.directors.map((director) => (
                <OfficerCard 
                  key={director.role}
                  officer={director}
                />
              ))}
            </SimpleGrid>
          ) : (
            <ComingSoon
              title="Roster being prepared"
              message="Our directors information is being prepared. Check back soon for updates on our board members."
              colorScheme="gray"
              size="md"
            />
          )}
        </Box>

        {/* Club Advisers */}
        <Box w="full">
          <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold" mb={8} textAlign="center">
            Club Advisers
          </Heading>
          {officers.advisers.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {officers.advisers.map((adviser) => (
                <OfficerCard 
                  key={adviser.name}
                  officer={adviser}
                />
              ))}
            </SimpleGrid>
          ) : (
            <ComingSoon
              title="Roster being prepared"
              message="Our club advisers information is being prepared. Check back soon for updates on our advisory team."
              colorScheme="gray"
              size="md"
            />
          )}
        </Box>

        {/* Rotary Anns Section Divider */}
        {hasRotaryAnnsData && (
          <Box w="full" textAlign="center" py={8}>
            <Box 
              bg="cranberry.500" 
              color="white" 
              px={8} 
              py={4} 
              border="1px solid"
              borderColor="brand.900"
              display="inline-block"
              mb={4}
            >
              <Text fontWeight="bold" fontSize="xl">
                ROTARY ANNS CLUB OF ZAMBOANGA CITY WEST
              </Text>
            </Box>
            <Text fontSize="md" color="gray.600" fontWeight="medium">
              Rotary Year 2025–2026 archive
            </Text>
          </Box>
        )}

        {/* Show Rotary Anns section only if there's data */}
        {hasRotaryAnnsData && (
          <>
            {/* Rotary Anns Officers */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" color="cranberry.500" fontWeight="bold" mb={8} textAlign="center">
                Rotary Anns Officers
              </Heading>
              {rotaryAnns.executives.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                  {rotaryAnns.executives.map((officer) => (
                    <OfficerCard 
                      key={officer.role}
                      officer={officer}
                      colorScheme="cranberry"
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <ComingSoon
                  title="Roster being prepared"
                  message="Our Rotary Anns officers information is being prepared. Check back soon for updates on our women's leadership team."
                  colorScheme="cranberry"
                  size="md"
                />
              )}
            </Box>

            {/* Rotary Anns Directors */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" color="cranberry.500" fontWeight="bold" mb={8} textAlign="center">
                Rotary Anns Directors
              </Heading>
              {rotaryAnns.directors.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                  {rotaryAnns.directors.map((director) => (
                    <OfficerCard 
                      key={director.name}
                      officer={director}
                      colorScheme="cranberry"
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <ComingSoon
                  title="Roster being prepared"
                  message="Our Rotary Anns directors information is being prepared. Check back soon for updates on our women's board members."
                  colorScheme="cranberry"
                  size="md"
                  maxWidth="800px"
                />
              )}
            </Box>
          </>
        )}
        </Stack>
      </Container>
    </>
  );
}
