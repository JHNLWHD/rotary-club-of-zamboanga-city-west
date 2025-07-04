import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  Link,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Construction, Clock, Mail, Phone, Facebook, Calendar, Camera, Handshake, Users } from "lucide-react";

export function meta() {
  return [
    { title: "Website Under Construction | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Our new website is coming soon! Rotary Club of Zamboanga City West is working on an improved digital experience. Stay tuned for updates on our community service projects." },
    { name: "keywords", content: "Rotary Club, Zamboanga City, website construction, coming soon, community service, Philippines" },
    { name: "robots", content: "index, follow" },
    
    // Open Graph tags
    { property: "og:title", content: "Website Under Construction | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Our new website is coming soon! Stay tuned for updates on our community service projects in Zamboanga City." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org" },
  ];
}

function ButtonLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <Link
      href={href}
      bg="brand.500"
      color="white"
      fontWeight="bold"
      px={8}
      py={4}
      borderRadius="lg"
      fontSize="md"
      _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
      transition="all 0.3s"
      boxShadow="md"
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Index() {
  const logoSize = useBreakpointValue({ base: "120px", md: "160px" });
  
  return (
    <Box minHeight="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" boxShadow="sm" py={4}>
        <Container maxW="1200px">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <Image
                src="/logo.png"
                alt="Rotary Club of Zamboanga City West Logo"
                width={{ base: '80px', md: '100px' }}
                height="auto"
                objectFit="contain"
              />
              <Box>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="brand.500">
                  Rotary Club of Zamboanga City West
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Service Above Self
                </Text>
              </Box>
            </Flex>
            <Link 
              href="https://www.facebook.com/RCZCwest" 
              target="_blank" 
              rel="noopener noreferrer"
              p={3}
              borderRadius="lg"
              bg="blue.50"
              _hover={{ bg: "blue.100", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <Facebook size={24} color="#1877F2" />
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="800px" py={{ base: 12, md: 20 }}>
        <Stack gap={8} textAlign="center" align="center">
          {/* Construction Icon */}
          <Box
            bg="yellow.100"
            borderRadius="full"
            p={6}
            border="3px solid"
            borderColor="yellow.400"
          >
            <Construction size={64} color="#D69E2E" />
          </Box>

          {/* Main Heading */}
          <Stack gap={4} align="center">
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
              fontWeight="bold" 
              color="gray.900"
              lineHeight="shorter"
            >
              Website Under{" "}
              <Text as="span" color="brand.500">
                Construction
              </Text>
            </Heading>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="600px" 
              lineHeight="relaxed"
            >
              We're working hard to bring you an improved website experience. 
              Our new site will better showcase our community service projects and make it easier to get involved.
            </Text>
          </Stack>

          {/* Coming Soon Notice with Infographics */}
          <Box 
            bg="white" 
            p={8} 
            borderRadius="xl" 
            boxShadow="lg" 
            border="1px solid" 
            borderColor="gray.200"
            w="full"
            maxW="600px"
          >
            <Flex align="center" justify="center" gap={3} mb={6}>
              <Clock size={24} color="#3182CE" />
              <Text fontSize="xl" fontWeight="bold" color="gray.900">
                Coming Soon
              </Text>
            </Flex>
            
            {/* Progress Infographic */}
            <Stack gap={4} mb={6}>
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">Website Design</Text>
                  <Text fontSize="sm" color="brand.500" fontWeight="bold">95%</Text>
                </Flex>
                <Box bg="gray.200" h="6px" borderRadius="full" overflow="hidden">
                  <Box bg="brand.500" h="100%" w="95%" borderRadius="full" />
                </Box>
              </Box>
              
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">Content Development</Text>
                  <Text fontSize="sm" color="orange.500" fontWeight="bold">85%</Text>
                </Flex>
                <Box bg="gray.200" h="6px" borderRadius="full" overflow="hidden">
                  <Box bg="orange.500" h="100%" w="85%" borderRadius="full" />
                </Box>
              </Box>
              
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">Testing & Review</Text>
                  <Text fontSize="sm" color="yellow.600" fontWeight="bold">70%</Text>
                </Flex>
                <Box bg="gray.200" h="6px" borderRadius="full" overflow="hidden">
                  <Box bg="yellow.500" h="100%" w="70%" borderRadius="full" />
                </Box>
              </Box>
            </Stack>

            {/* Feature Icons */}
            <Text fontSize="sm" color="gray.600" mb={4} textAlign="center" fontWeight="medium">
              What's Coming:
            </Text>
            <Flex justify="center" gap={8} mb={4}>
              <Box textAlign="center">
                <Box bg="blue.50" p={3} borderRadius="lg" mb={2} display="inline-block">
                  <Calendar size={32} color="#3182CE" />
                </Box>
                <Text fontSize="xs" color="gray.600">Events</Text>
              </Box>
              <Box textAlign="center">
                <Box bg="green.50" p={3} borderRadius="lg" mb={2} display="inline-block">
                  <Camera size={32} color="#38A169" />
                </Box>
                <Text fontSize="xs" color="gray.600">Gallery</Text>
              </Box>
              <Box textAlign="center">
                <Box bg="purple.50" p={3} borderRadius="lg" mb={2} display="inline-block">
                  <Handshake size={32} color="#805AD5" />
                </Box>
                <Text fontSize="xs" color="gray.600">Projects</Text>
              </Box>
              <Box textAlign="center">
                <Box bg="red.50" p={3} borderRadius="lg" mb={2} display="inline-block">
                  <Users size={32} color="#E53E3E" />
                </Box>
                <Text fontSize="xs" color="gray.600">Members</Text>
              </Box>
            </Flex>
            
            <Text color="gray.600" textAlign="center" fontSize="sm">
              We're putting the finishing touches on our new digital home!
            </Text>
          </Box>

          {/* Contact Information */}
          <Box 
            bg="brand.50" 
            p={8} 
            borderRadius="xl" 
            w="full" 
            maxW="600px"
          >
            <Heading as="h2" fontSize="xl" color="brand.700" mb={6} textAlign="center">
              Stay Connected
            </Heading>
            
            <Stack gap={4} align="stretch">
              <Flex align="center" gap={4} justify="center">
                <Phone size={20} color="#3182CE" />
                <Text color="gray.700">
                  <Text as="span" fontWeight="bold">Phone:</Text> 0926 430 4580
                </Text>
              </Flex>
              
              <Flex align="center" gap={4} justify="center">
                <Mail size={20} color="#3182CE" />
                <Text color="gray.700">
                  <Text as="span" fontWeight="bold">Email:</Text> rotaryzcwest@gmail.com
                </Text>
              </Flex>
              
              <Flex align="center" gap={4} justify="center">
                <Clock size={20} color="#3182CE" />
                <Text color="gray.700">
                  <Text as="span" fontWeight="bold">Meetings:</Text> Every Thursday, 7:00 PM
                </Text>
              </Flex>
            </Stack>

            <Text 
              fontSize="sm" 
              color="gray.600" 
              textAlign="center" 
              mt={6}
              fontStyle="italic"
            >
              Grand Astoria Hotel, 914 Mayor Jaldon Street, Zamboanga City
            </Text>
          </Box>

          {/* Footer Notice */}
          <Text fontSize="sm" color="gray.500" textAlign="center" maxW="400px">
            Thank you for your patience as we work to improve our digital presence. 
            We look forward to serving our community better through our new website.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
} 