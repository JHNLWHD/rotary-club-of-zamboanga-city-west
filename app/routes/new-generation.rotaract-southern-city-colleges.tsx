import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Badge, Button, Image, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Calendar, Users, Heart, Target, Award, Globe } from "lucide-react";
import { PageHero } from "~/components/ui/PageHero";
import { OfficerCard } from "~/components/ui/OfficerCard";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { ComingSoon } from "~/components/ui/ComingSoon";
import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { fetchRotaractClubOfSouthernCityColleges } from "~/lib/contentful-api";
import type { RotaractClubOfSouthernCityColleges } from "~/lib/contentful-types";

export const meta: MetaFunction = () => {
  return [
    { title: "Rotaract Club of Southern City Colleges | Rotary Club of Zamboanga City West" },
    { 
      name: "description", 
      content: "Empowering young leaders through service at the Rotaract Club of Southern City Colleges. Join us in developing leadership skills, community service, and international understanding." 
    },
    { name: "keywords", content: "Rotaract, Southern City Colleges, youth leadership, community service, Zamboanga City, leadership development, international understanding" },
    { property: "og:title", content: "Rotaract Club of Southern City Colleges" },
    { 
      property: "og:description", 
      content: "Empowering young leaders through service at the Rotaract Club of Southern City Colleges. Join us in developing leadership skills, community service, and international understanding." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Rotaract Club of Southern City Colleges" },
    { 
      name: "twitter:description", 
      content: "Empowering young leaders through service at the Rotaract Club of Southern City Colleges. Join us in developing leadership skills, community service, and international understanding." 
    },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const rotaractData = await fetchRotaractClubOfSouthernCityColleges();
  
  return {
    rotaractData,
  };
}

export default function RotaractSCCPage() {
  const { rotaractData } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title="Rotaract Club of Southern City Colleges"
        description="Empowering Young Leaders Through Service"
        backgroundGradient="linear-gradient(135deg, #d41367 0%, #b8105a 50%, #9c0e4d 100%)"
      />
      
      <Container maxW="1200px" py={16}>
        {/* Mission & Vision Section */}
        <VStack gap={12} align="stretch">
          <Box textAlign="center">
            <Heading as="h2" size="2xl" color="cranberry.600" mb={6}>
              Our Mission
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto" lineHeight="tall">
              To empower young professionals and students to become leaders in their communities through 
              service, leadership development, and international understanding. We believe in the power 
              of young people to create positive change and build a better world.
            </Text>
          </Box>

          {/* What is Rotaract Section */}
          <Box bg="cranberry.50" p={8} borderRadius="xl" border="1px solid" borderColor="cranberry.200">
            <Heading as="h3" size="xl" color="cranberry.700" mb={6} textAlign="center">
              What is Rotaract?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              <VStack align="start" gap={4}>
                <Box p={3} bg="cranberry.100" borderRadius="full">
                  <Users size={24} color="#d41367" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color="cranberry.700" mb={2}>Leadership Development</Text>
                  <Text color="gray.600" fontSize="sm">
                    Develop essential leadership skills through hands-on experience and mentorship
                  </Text>
                </Box>
              </VStack>
              
              <VStack align="start" gap={4}>
                <Box p={3} bg="cranberry.100" borderRadius="full">
                  <Heart size={24} color="#d41367" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color="cranberry.700" mb={2}>Community Service</Text>
                  <Text color="gray.600" fontSize="sm">
                    Make a positive impact through meaningful service projects and initiatives
                  </Text>
                </Box>
              </VStack>
              
              <VStack align="start" gap={4}>
                <Box p={3} bg="cranberry.100" borderRadius="full">
                  <Globe size={24} color="#d41367" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color="cranberry.700" mb={2}>International Understanding</Text>
                  <Text color="gray.600" fontSize="sm">
                    Connect with young leaders worldwide and gain global perspectives
                  </Text>
                </Box>
              </VStack>
            </SimpleGrid>
          </Box>

          {/* Officers Section */}
          <Box>
            <VStack gap={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h3" size="xl" color="cranberry.600" mb={4}>
                  Club Leadership
                </Heading>
                <Text color="gray.600" maxW="600px" mx="auto">
                  Meet the dedicated young leaders who are driving positive change in our community
                </Text>
              </Box>
              
              {rotaractData?.clubLeadership && rotaractData.clubLeadership.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                  {rotaractData.clubLeadership.map((officer, index) => (
                    <OfficerCard
                      key={index}
                      officer={officer}
                      colorScheme="cranberry"
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <ComingSoon
                  title="👥 Leadership Team Coming Soon"
                  message="We're preparing to introduce our dedicated club leadership. Please check back soon to meet the team driving positive change in our community."
                  colorScheme="cranberry"
                  size="lg"
                  maxWidth="700px"
                />
              )}
            </VStack>
          </Box>

          {/* Calendar & Activities Section */}
          <Box bg="gray.50" p={8} borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={6} align="center">
              <Box textAlign="center">
                <Heading as="h3" size="xl" color="cranberry.600" mb={4}>
                  Get Involved
                </Heading>
                <Text color="gray.600" maxW="600px" mx="auto">
                  Join our upcoming activities and events. Stay connected with the Rotaract community!
                </Text>
              </Box>
              
              <HStack gap={6} flexWrap="wrap" justify="center">
                <ButtonLink
                  href={rotaractData?.calendarOfActivitiesLink || "/about/calendar"}
                  leftIcon={<Calendar size={20} />}
                  colorScheme="cranberry"
                  size="lg"
                  variant="solid"
                >
                  View Calendar of Activities
                </ButtonLink>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
