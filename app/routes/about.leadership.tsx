import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

export function meta() {
  return [
    { title: "Club Leadership | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Meet the leadership team of Rotary Club of Zamboanga City West. Our dedicated officers and board members guide our mission of service above self." },
    { name: "keywords", content: "Rotary leadership, club officers, board members, Zamboanga City, Rotary West" },
    
    // Open Graph tags
    { property: "og:title", content: "Club Leadership | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Meet the leadership team of Rotary Club of Zamboanga City West." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/leadership" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/leadership" },
  ];
}

const clubOfficers = [
  { position: "PRESIDENT", name: "Reynald \"Rey\" Ariño", designation: "MPHF" },
  { position: "VICE PRESIDENT", name: "PE Eliseo \"Totoh\" Hablo", designation: "MPHF" },
  { position: "SECRETARY", name: "PP Fernando \"Nanding\" Yu", designation: "RFMD" },
  { position: "EXECUTIVE SECRETARY", name: "PN Charliemagne \"Charles\" Tilos", designation: "PHF" },
  { position: "TREASURER", name: "Rtn. Ramon \"Mon\" Azuelo", designation: "PHF" },
  { position: "AUDITOR", name: "Rtn. Jonathan \"Nathan\" Lim", designation: "PHF" },
];

const directors = [
  { position: "CLUB ADMINISTRATION CHAIR", name: "PP Bernardo \"Bernie\" Cruz", designation: "MPHF" },
  { position: "CLUB ADMINISTRATION CO-CHAIR", name: "Rtn. Miecher Ian \"Mich\" Miranda", designation: "" },
  { position: "CLUB LEARNING FACILITATOR", name: "PP Jose Rizalino Ortega", designation: "MPHF" },
  { position: "CLUB MEMBERSHIP CHAIR", name: "PP Patrick \"Pat\" Lee", designation: "RFMD" },
  { position: "CLUB MEMBERSHIP CO-CHAIR", name: "Rtn. Richard John \"RJ\" Barredo", designation: "PHF" },
  { position: "CLUB SERVICE PROJECTS CHAIR", name: "PP John Hernani \"Doc John\" Anacan", designation: "MPHF" },
  { position: "CLUB SERVICE PROJECTS CO-CHAIR", name: "Rtn. Mark Anthony \"DOC MAC\" Sta. Elena", designation: "" },
  { position: "CLUB PUBLIC IMAGE CHAIR", name: "Rtn. Charlie Jose \"Charlie\" Villanueva", designation: "PHF" },
  { position: "CLUB PUBLIC IMAGE CO-CHAIR", name: "Rtn. Ryan \"Kit\" Quilaton", designation: "" },
  { position: "THE ROTARY FOUNDATION CHAIR", name: "PP Gil \"Gil\" Lim", designation: "RFMD" },
  { position: "THE ROTARY FOUNDATION CO-CHAIR", name: "Rtn. Seanar \"Seanar\" Sy", designation: "PHF" },
  { position: "CLUB YOUNG LEADERS CHAIR", name: "Rtn. Jason Justin \"JJ\" Lim", designation: "PHF" },
  { position: "PROTOCOL OFFICER", name: "Rtn. Harradier \"Radz\" Isnani", designation: "" },
];

const advisers = [
  { name: "PP Raoul \"Raul\" Quijano", designation: "PHF" },
  { name: "PP Erwin \"Win\" Bernardo", designation: "PHF" },
  { name: "PP Santiago \"Santi\" Araneta", designation: "PHF" },
];

function OfficerCard({ position, name, designation }: { position: string; name: string; designation: string }) {
  return (
    <Box 
      bg="white" 
      p={6} 
      borderRadius="xl" 
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.3s"
    >
      <Text 
        fontSize="sm" 
        fontWeight="bold" 
        color="brand.500" 
        textTransform="uppercase" 
        letterSpacing="wider"
        mb={2}
      >
        {position}
      </Text>
      <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold" mb={1} lineHeight="shorter">
        {name}
      </Heading>
      {designation && (
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {designation}
        </Text>
      )}
    </Box>
  );
}

function AdviserCard({ name, designation }: { name: string; designation: string }) {
  return (
    <Flex 
      align="center" 
      justify="space-between" 
      bg="gray.50" 
      p={4} 
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text fontWeight="bold" color="gray.900">
        {name}
      </Text>
      {designation && (
        <Text fontSize="sm" color="brand.500" fontWeight="medium">
          {designation}
        </Text>
      )}
    </Flex>
  );
}

export default function ClubLeadership() {
  return (
    <Container maxW="1200px" py={{ base: 12, md: 20 }}>
      <Stack gap={12} align="center">
        {/* Header */}
        <Box textAlign="center">
          <Heading 
            as="h1" 
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
            fontWeight="bold" 
            color="gray.900"
            mb={4}
          >
            Club Leadership
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
            mb={6}
          >
            Meet our dedicated leadership team who guide Rotary Club of Zamboanga City West in our mission of service above self.
          </Text>
          
          {/* Rotary Year Banner */}
          <Box 
            bg="brand.500" 
            color="white" 
            px={6} 
            py={3} 
            borderRadius="full" 
            display="inline-block"
            mb={2}
          >
            <Text fontWeight="bold" fontSize="lg">
              RY 2025-2026
            </Text>
          </Box>
          <Text fontSize="md" color="gray.600" fontWeight="medium">
            ROTARY CLUB OF ZAMBOANGA CITY WEST
          </Text>
        </Box>

        {/* Club Officers */}
        <Box w="full">
          <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold" mb={8} textAlign="center">
            Club Officers
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {clubOfficers.map((officer) => (
              <OfficerCard 
                key={officer.position}
                position={officer.position}
                name={officer.name}
                designation={officer.designation}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Directors */}
        <Box w="full">
          <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold" mb={8} textAlign="center">
            Directors
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {directors.map((director) => (
              <OfficerCard 
                key={director.position}
                position={director.position}
                name={director.name}
                designation={director.designation}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Club Advisers */}
        <Box w="full" maxW="600px">
          <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold" mb={8} textAlign="center">
            Club Advisers
          </Heading>
          <Stack gap={4}>
            {advisers.map((adviser) => (
              <AdviserCard 
                key={adviser.name}
                name={adviser.name}
                designation={adviser.designation}
              />
            ))}
          </Stack>
        </Box>

        {/* Contact Information */}
        <Box 
          bg="blue.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="blue.200"
          w="full" 
          maxW="600px"
          textAlign="center"
        >
          <Heading as="h3" fontSize="xl" color="gray.900" mb={4}>
            Get in Touch with Leadership
          </Heading>
          <Text color="gray.700" mb={4}>
            Have questions or want to connect with our leadership team? We meet every Thursday at 7:00 PM at Grand Astoria Hotel.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Contact us at <Text as="span" fontWeight="bold" color="brand.500">rotaryzcwest@gmail.com</Text> or call <Text as="span" fontWeight="bold" color="brand.500">0926 430 4580</Text>
          </Text>
        </Box>
      </Stack>
    </Container>
  );
} 