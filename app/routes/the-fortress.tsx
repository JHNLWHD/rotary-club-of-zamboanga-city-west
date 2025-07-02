import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  Badge,
  Button,
  Link,
} from "@chakra-ui/react";
import { Download, Calendar, Users, Award, FileText, Eye } from "lucide-react";

export function meta() {
  return [
    { title: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { name: "description", content: "Read The Fortress, the official publication of Rotary Club of Zamboanga City West. Stay updated with club news, member spotlights, and community project updates." },
    { name: "keywords", content: "The Fortress, Rotary publication, club newsletter, Zamboanga City West, member news, project updates, UNITE FOR GOOD" },
    
    // Open Graph tags
    { property: "og:title", content: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Read The Fortress, the official publication of Rotary Club of Zamboanga City West." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/the-fortress" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/the-fortress" },
  ];
}

// Mock data for publication issues
const publicationIssues = [
  {
    id: 1,
    title: "UNITE FOR GOOD",
    date: "December 2024",
    quarter: "Q4 2024",
    cover: "/fort-pilar.png",
    summary: "Our latest issue focuses on unity in service, featuring stories of community collaboration, peace-building initiatives, and the historical significance of Fort Pilar in bringing people together.",
    featured: true,
  },
  {
    id: 2,
    title: "COMMUNITY CHAMPIONS",
    date: "September 2024",
    quarter: "Q3 2024",
    cover: "/fort-pilar.png",
    summary: "Highlighting outstanding members who have made significant impacts in their communities, featuring project updates from our water sanitation initiatives and educational programs.",
    featured: false,
  },
  {
    id: 3,
    title: "BUILDING BRIDGES",
    date: "June 2024",
    quarter: "Q2 2024",
    cover: "/fort-pilar.png",
    summary: "Stories of connection and partnership, showcasing our interfaith dialogue projects, youth mentorship programs, and collaborative efforts with local organizations.",
    featured: false,
  },
  {
    id: 4,
    title: "HEALTH & HOPE",
    date: "March 2024",
    quarter: "Q1 2024",
    cover: "/fort-pilar.png",
    summary: "Dedicated to our health initiatives, featuring our medical missions, maternal health programs, and efforts to improve healthcare access in underserved communities.",
    featured: false,
  },
];

export default function TheFortress() {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box 
        position="relative" 
        bg="white" 
        overflow="hidden"
        py={{ base: 16, md: 20 }}
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage="linear-gradient(135deg, rgba(0, 93, 170, 0.03) 0%, rgba(255, 255, 255, 1) 100%)"
          zIndex={1}
        />
        
        <Container maxW="1200px" position="relative" zIndex={2}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={12}>
            {/* Left Content */}
            <Box flex={1} textAlign={{ base: "center", lg: "left" }}>
              {/* Rotary Logo */}
              <Flex align="center" justify={{ base: "center", lg: "flex-start" }} mb={4}>
                <Image
                  src="/logo.png"
                  alt="Rotary Club Logo"
                  width="60px"
                  height="auto"
                  objectFit="contain"
                />
                <Box ml={3} textAlign="left">
                  <Text fontSize="sm" fontWeight="bold" color="brand.500" lineHeight={1.2}>
                    Rotary Club of
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="brand.500" lineHeight={1.2}>
                    Zamboanga City West
                  </Text>
                </Box>
              </Flex>

              {/* Main Title */}
              <Heading 
                as="h1" 
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
                fontWeight="bold" 
                color="brand.500"
                mb={2}
                letterSpacing="tight"
              >
                THE <Text as="span" color="gray.900">FORTRESS</Text>
              </Heading>
              
              <Text 
                fontSize="md" 
                color="gray.600" 
                mb={6}
                fontWeight="medium"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                The Official Publication of the Rotary Club of Zamboanga City West, District 3850, Philippines
              </Text>

              {/* Theme */}
              <Box 
                bg="brand.500" 
                color="white" 
                py={6} 
                px={8} 
                borderRadius="lg" 
                mb={8}
                transform="rotate(-1deg)"
                boxShadow="lg"
              >
                <Heading 
                  as="h2" 
                  fontSize={{ base: "2xl", md: "3xl" }} 
                  fontWeight="bold" 
                  textAlign="center"
                  letterSpacing="wider"
                >
                  UNITE FOR GOOD
                </Heading>
              </Box>

              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.700" 
                lineHeight="relaxed"
                mb={8}
              >
                Discover stories of service, community impact, and fellowship from our members as we work together to make a positive difference in Zamboanga City and beyond.
              </Text>
            </Box>

            {/* Right Content - Magazine Cover */}
            <Box flex={1} display="flex" justifyContent="center">
              <Box 
                position="relative"
                bg="white"
                borderRadius="xl"
                boxShadow="2xl"
                p={4}
                maxW="400px"
                w="full"
                transform="rotate(2deg)"
                _hover={{ transform: "rotate(0deg)" }}
                transition="all 0.3s"
              >
                <Box
                  bg="gray.100"
                  borderRadius="lg"
                  aspectRatio="3/4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  position="relative"
                >
                  {/* Mock Magazine Cover */}
                  <Box 
                    position="absolute" 
                    top={0} 
                    left={0} 
                    right={0} 
                    bottom={0}
                    bgGradient="linear(to-b, white 0%, gray.100 100%)"
                  />
                  <Box position="relative" zIndex={2} textAlign="center" p={6}>
                    <Image
                      src="/logo.png"
                      alt="Rotary Logo"
                      width="40px"
                      height="auto"
                      mx="auto"
                      mb={4}
                    />
                    <Text fontSize="2xl" fontWeight="bold" color="brand.500" mb={2}>
                      THE FORTRESS
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="brand.500" mb={4}>
                      UNITE FOR GOOD
                    </Text>
                    <Box 
                      bg="gray.300" 
                      height="120px" 
                      borderRadius="md" 
                      mb={4}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      overflow="hidden"
                    >
                      <Image
                        src="/fort-pilar.png"
                        alt="Fort Pilar - Historic Fortress of Zamboanga"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Box>
                    <Text fontSize="xs" color="gray.600">
                      Official Publication of Rotary Club of Zamboanga City West
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Publication Stats */}
      <Box py={16} bg="white">
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            <Box textAlign="center" p={6} bg="blue.50" borderRadius="xl">
              <Calendar size={40} color="#3182CE" style={{ margin: "0 auto 16px" }} />
              <Heading as="h3" fontSize="2xl" color="brand.500" mb={2}>
                Quarterly
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Published every quarter
              </Text>
            </Box>
            <Box textAlign="center" p={6} bg="green.50" borderRadius="xl">
              <Users size={40} color="#38A169" style={{ margin: "0 auto 16px" }} />
              <Heading as="h3" fontSize="2xl" color="green.600" mb={2}>
                85+
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Members featured
              </Text>
            </Box>
            <Box textAlign="center" p={6} bg="purple.50" borderRadius="xl">
              <Award size={40} color="#805AD5" style={{ margin: "0 auto 16px" }} />
              <Heading as="h3" fontSize="2xl" color="purple.600" mb={2}>
                45 Years
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Of club history
              </Text>
            </Box>
            <Box textAlign="center" p={6} bg="orange.50" borderRadius="xl">
              <Download size={40} color="#DD6B20" style={{ margin: "0 auto 16px" }} />
              <Heading as="h3" fontSize="2xl" color="orange.600" mb={2}>
                Digital
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Available online
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Publication Issues Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="1200px">
          <Box textAlign="center" mb={12}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="gray.900" mb={4}>
              Recent Issues
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="600px" mx="auto">
              Explore our latest publications featuring member stories, project updates, and community impact highlights.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={8}>
            {publicationIssues.map((issue) => (
              <Box 
                key={issue.id} 
                bg="white" 
                borderRadius="2xl" 
                overflow="hidden" 
                boxShadow="lg" 
                border="1px solid" 
                borderColor="gray.200"
                _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
                transition="all 0.3s"
              >
                <Box p={0}>
                  <Flex direction={{ base: "column", md: "row" }} h="full">
                    {/* Cover Image */}
                    <Box 
                      flex="0 0 200px" 
                      position="relative"
                      minH={{ base: "200px", md: "auto" }}
                    >
                      {issue.featured && (
                        <Badge 
                          position="absolute" 
                          top={3} 
                          left={3} 
                          zIndex={2}
                          colorScheme="red" 
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          LATEST
                        </Badge>
                      )}
                      <Image
                        src={issue.cover}
                        alt={`The Fortress ${issue.title} Cover`}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.300"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box textAlign="center" color="white">
                          <Text fontSize="lg" fontWeight="bold" mb={1}>
                            THE FORTRESS
                          </Text>
                          <Text fontSize="md" fontWeight="semibold">
                            {issue.title}
                          </Text>
                        </Box>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box p={6} flex={1} display="flex" flexDirection="column">
                      <Flex align="center" gap={2} mb={3}>
                        <Badge colorScheme="blue" fontSize="xs">
                          {issue.quarter}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {issue.date}
                        </Text>
                      </Flex>

                      <Heading as="h3" fontSize="xl" color="gray.900" mb={3} lineHeight="shorter">
                        {issue.title}
                      </Heading>

                      <Text color="gray.600" fontSize="sm" lineHeight="relaxed" mb={4} flex={1}>
                        {issue.summary}
                      </Text>

                      <Flex gap={2} align="center">
                        <Button
                          size="sm"
                          bg="brand.500"
                          color="white"
                          _hover={{ bg: "brand.600" }}
                          disabled={!issue.featured}
                        >
                          {issue.featured ? "Read Online" : "Coming Soon"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          colorScheme="gray"
                          disabled={!issue.featured}
                        >
                          Download PDF
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* View All Issues */}
          <Box textAlign="center" mt={12}>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Looking for older issues? Our complete archive will be available soon.
            </Text>
            <Button
              size="lg"
              variant="outline"
              colorScheme="brand"
              disabled
            >
              View Complete Archive (Coming Soon)
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Content Sections */}
      <Box py={16} bg="white">
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12}>
            {/* What You'll Find */}
            <Box 
              bg="gray.50" 
              p={8} 
              borderRadius="2xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
            >
              <Heading as="h3" fontSize="2xl" color="gray.900" mb={6}>
                What You'll Find in The Fortress
              </Heading>
              <Stack gap={4}>
                <Flex align="start" gap={3}>
                  <Badge colorScheme="blue" fontSize="xs" px={2} py={1}>NEW</Badge>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" mb={1}>
                      Member Spotlights
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Get to know our Rotarians and their inspiring stories of service
                    </Text>
                  </Box>
                </Flex>
                <Flex align="start" gap={3}>
                  <Badge colorScheme="green" fontSize="xs" px={2} py={1}>FEATURED</Badge>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" mb={1}>
                      Project Updates
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Latest news on our community service projects and their impact
                    </Text>
                  </Box>
                </Flex>
                <Flex align="start" gap={3}>
                  <Badge colorScheme="purple" fontSize="xs" px={2} py={1}>REGULAR</Badge>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" mb={1}>
                      Club Events
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Coverage of meetings, fellowships, and special celebrations
                    </Text>
                  </Box>
                </Flex>
                <Flex align="start" gap={3}>
                  <Badge colorScheme="orange" fontSize="xs" px={2} py={1}>SPECIAL</Badge>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" mb={1}>
                      District News
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Updates from District 3850 and Rotary International
                    </Text>
                  </Box>
                </Flex>
              </Stack>
            </Box>

            {/* Subscribe/Access */}
            <Box 
              bg="brand.500" 
              color="white" 
              p={8} 
              borderRadius="2xl" 
              boxShadow="lg"
            >
              <Heading as="h3" fontSize="2xl" mb={6}>
                Stay Connected with The Fortress
              </Heading>
              <Text mb={6} lineHeight="relaxed">
                The Fortress keeps our Rotary family and the community informed about our service projects, achievements, and upcoming events. Our publication embodies our theme "Unite for Good" by sharing stories that inspire and connect us all.
              </Text>
              
              <Box 
                bg="whiteAlpha.200" 
                p={6} 
                borderRadius="xl" 
                mb={6}
              >
                <Text fontSize="sm" mb={4} opacity={0.9}>
                  <strong>Latest Issue Available:</strong> The "UNITE FOR GOOD" edition is now ready for reading online and download.
                </Text>
                <Button
                  size="lg"
                  bg="white"
                  color="brand.500"
                  _hover={{ bg: "gray.100" }}
                  w="full"
                >
                  Read Latest Issue
                </Button>
              </Box>

              <Text fontSize="sm" opacity={0.8} textAlign="center">
                For more information about The Fortress or to contribute content, contact our editorial team.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
} 