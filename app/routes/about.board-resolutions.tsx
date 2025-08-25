import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { ExternalLink, FileText, Calendar, Hash } from "lucide-react";
import { PageHero } from "~/components/ui/PageHero";

type BoardResolution = {
  resolutionNumber: string;
  title: string;
  dateSigned: string;
  googleDriveLink: string;
};

// Sample board resolutions data - replace with actual data from CMS or database
const boardResolutions: BoardResolution[] = [
  {
    resolutionNumber: "2024-001",
    title: "Approval of Annual Budget for Fiscal Year 2024-2025",
    dateSigned: "July 15, 2024",
    googleDriveLink: "https://drive.google.com/file/d/example1/view"
  },
  {
    resolutionNumber: "2024-002",
    title: "Establishment of Community Service Projects Committee",
    dateSigned: "August 3, 2024",
    googleDriveLink: "https://drive.google.com/file/d/example2/view"
  },
  {
    resolutionNumber: "2024-003",
    title: "Amendment to Club Bylaws Section 3.2",
    dateSigned: "September 12, 2024",
    googleDriveLink: "https://drive.google.com/file/d/example3/view"
  },
  {
    resolutionNumber: "2024-004",
    title: "Approval of Partnership with Local Schools for Literacy Program",
    dateSigned: "October 8, 2024",
    googleDriveLink: "https://drive.google.com/file/d/example4/view"
  },
  {
    resolutionNumber: "2024-005",
    title: "Establishment of Youth Leadership Development Fund",
    dateSigned: "November 20, 2024",
    googleDriveLink: "https://drive.google.com/file/d/example5/view"
  },
  {
    resolutionNumber: "2024-006",
    title: "Approval of International Service Project in Partnership with District 3860",
    dateSigned: "December 5, 2024",
    googleDriveLink: "https://drive.google.com/file/d/example6/view"
  }
];

export function meta() {
  return [
    { title: "Board Resolutions | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Access official board resolutions and governance documents of Rotary Club of Zamboanga City West. View our club's official decisions and policy documents." },
    { name: "keywords", content: "board resolutions, Rotary governance, club policies, official documents, Zamboanga City West" },
    
    // Open Graph tags
    { property: "og:title", content: "Board Resolutions | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Access official board resolutions and governance documents of our Rotary club." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/board-resolutions" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/board-resolutions" },
  ];
}

export default function BoardResolutions() {
  const handleResolutionClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <PageHero
        title="Board Resolutions"
        description="Access official board resolutions and governance documents that guide our club's operations and community service initiatives."
      />

      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <Stack gap={12}>
          {/* Introduction Section */}
          <Box textAlign="center" maxW="800px" mx="auto">
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} mb={4} color="brand.600">
              Official Club Governance
            </Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="relaxed">
              Our board resolutions represent the official decisions and policies of the Rotary Club of Zamboanga City West. 
              These documents ensure transparency and accountability in our governance while guiding our mission of Service Above Self.
            </Text>
          </Box>

          {/* Board Resolutions Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {boardResolutions.map((resolution, index) => (
              <Box 
                key={index} 
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                _hover={{ 
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  borderColor: "brand.300"
                }}
                transition="all 0.3s ease-out"
                borderRadius="xl"
                overflow="hidden"
              >
                <Box p={6} pb={3}>
                  <Flex align="center" gap={3} mb={3}>
                    <Icon as={Hash} color="brand.500" boxSize={5} />
                    <Badge 
                      colorScheme="brand" 
                      variant="solid" 
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {resolution.resolutionNumber}
                    </Badge>
                  </Flex>
                  <Heading size="md" lineHeight="tight" color="gray.800">
                    {resolution.title}
                  </Heading>
                </Box>
                
                <Box p={6} pt={0}>
                  <Stack gap={4}>
                    <Flex align="center" gap={2} color="gray.600">
                      <Icon as={Calendar} boxSize={4} />
                      <Text fontSize="sm" fontWeight="medium">
                        {resolution.dateSigned}
                      </Text>
                    </Flex>
                    
                    <Button
                      colorScheme="brand"
                      variant="outline"
                      size="sm"
                      onClick={() => handleResolutionClick(resolution.googleDriveLink)}
                      _hover={{
                        bg: "brand.50",
                        borderColor: "brand.400"
                      }}
                      w="full"
                    >
                      <Flex align="center" gap={2}>
                        <ExternalLink size={16} />
                        Learn More
                        <FileText size={16} />
                      </Flex>
                    </Button>
                  </Stack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* Additional Information */}
          <Box 
            bg="gray.50" 
            p={8} 
            borderRadius="xl" 
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading as="h3" fontSize="xl" mb={4} color="gray.700">
              Need More Information?
            </Heading>
            <Text color="gray.600" maxW="600px" mx="auto">
              For questions about specific board resolutions or to request additional governance documents, 
              please contact our club secretary or reach out through our contact page.
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
