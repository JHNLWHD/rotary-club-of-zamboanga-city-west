import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Badge, Button, Image, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Calendar, Users, Heart, Target, Award, Globe, BookOpen, Lightbulb, Star } from "lucide-react";
import { PageHero } from "~/components/ui/PageHero";
import { OfficerCard } from "~/components/ui/OfficerCard";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { ComingSoon } from "~/components/ui/ComingSoon";
import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { fetchInteractClubOfZamboangaCityWest } from "~/lib/contentful-api";
import type { InteractClubOfZamboangaCityWest } from "~/lib/contentful-types";

export async function loader({ request }: LoaderFunctionArgs) {
  const interactData = await fetchInteractClubOfZamboangaCityWest();
  
  return {
    interactData,
  };
}

export default function InteractSCCPage() {
  const { interactData } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title="Interact Club of Zamboanga City West"
        description="Building Tomorrow's Leaders Today"
        backgroundGradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)"
      />
      
      <Container maxW="1200px" py={16}>
        {/* Mission & Vision Section */}
        <VStack gap={12} align="stretch">
          <Box textAlign="center">
            <Heading as="h2" size="2xl" color="interact.600" mb={6}>
              Our Mission
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto" lineHeight="tall">
              To inspire and empower high school students to become leaders in their communities through 
              service, leadership development, and international understanding. We believe that young 
              people have the power to change the world, one project at a time.
            </Text>
          </Box>

          {/* What is Interact Section */}
          <Box bg="interact.50" p={8} borderRadius="xl" border="1px solid" borderColor="interact.200">
            <Heading as="h3" size="xl" color="interact.700" mb={6} textAlign="center">
              What is Interact?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              <VStack align="start" gap={4}>
                <Box p={3} bg="interact.100" borderRadius="full">
                  <BookOpen size={24} color="#3b82f6" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color="interact.700" mb={2}>Leadership Skills</Text>
                  <Text color="gray.600" fontSize="sm">
                    Develop essential leadership skills through hands-on projects and mentorship
                  </Text>
                </Box>
              </VStack>
              
              <VStack align="start" gap={4}>
                <Box p={3} bg="interact.100" borderRadius="full">
                  <Heart size={24} color="#3b82f6" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color="interact.700" mb={2}>Community Service</Text>
                  <Text color="gray.600" fontSize="sm">
                    Make a positive impact through meaningful service projects and initiatives
                  </Text>
                </Box>
              </VStack>
              
              <VStack align="start" gap={4}>
                <Box p={3} bg="interact.100" borderRadius="full">
                  <Lightbulb size={24} color="#3b82f6" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color="interact.700" mb={2}>Innovation & Creativity</Text>
                  <Text color="gray.600" fontSize="sm">
                    Express creativity and innovation in solving community challenges
                  </Text>
                </Box>
              </VStack>
            </SimpleGrid>
          </Box>

          {/* Officers Section */}
          <Box>
            <VStack gap={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h3" size="xl" color="interact.600" mb={4}>
                  Club Leadership
                </Heading>
                <Text color="gray.600" maxW="600px" mx="auto">
                  Meet the passionate young leaders who are making a difference in our community
                </Text>
              </Box>
              
              {interactData?.clubLeadership && interactData.clubLeadership.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                  {interactData.clubLeadership.map((officer, index) => (
                    <OfficerCard
                      key={index}
                      officer={officer}
                      colorScheme="interact"
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <ComingSoon
                  title="👥 Leadership Team Coming Soon"
                  message="We're preparing to introduce our passionate young leaders. Please check back soon to meet the team making a difference in our community."
                  colorScheme="brand"
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
                <Heading as="h3" size="xl" color="interact.600" mb={4}>
                  Get Involved
                </Heading>
                <Text color="gray.600" maxW="600px" mx="auto">
                  Join our exciting activities and events. Connect with fellow Interactors and make new friends!
                </Text>
              </Box>
              
              <HStack gap={6} flexWrap="wrap" justify="center">
                <ButtonLink
                  href={interactData?.calendarOfActivitiesLink || "/about/calendar"}
                  leftIcon={<Calendar size={20} />}
                  colorScheme="interact"
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
