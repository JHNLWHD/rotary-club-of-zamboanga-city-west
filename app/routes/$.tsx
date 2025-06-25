import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Link,
  Container,
} from "@chakra-ui/react";
import { AlertTriangle, Facebook, Phone, Mail } from "lucide-react";

export function meta() {
  return [
    { title: "Page Not Found | Rotary Club of Zamboanga City West" },
    { name: "description", content: "The page you're looking for doesn't exist. Return to our homepage or contact us for assistance." },
    { name: "robots", content: "noindex, nofollow" },
    
    // Open Graph tags
    { property: "og:title", content: "Page Not Found | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "The page you're looking for doesn't exist. Return to our homepage or contact us for assistance." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org" },
  ];
}

export default function NotFound() {
  return (
    <Container maxW="800px" py={{ base: 12, md: 20 }}>
      <Stack gap={8} textAlign="center" align="center">
        {/* 404 Icon */}
        <Box
          bg="red.100"
          borderRadius="full"
          p={6}
          border="3px solid"
          borderColor="red.400"
        >
          <AlertTriangle size={64} color="#E53E3E" />
        </Box>

        {/* Error Message */}
        <Stack gap={4} align="center">
          <Heading 
            as="h1" 
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
            fontWeight="bold" 
            color="gray.900"
            lineHeight="shorter"
          >
            4<Text as="span" color="brand.500">0</Text>4
          </Heading>
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "3xl" }} 
            fontWeight="bold" 
            color="gray.800"
            lineHeight="shorter"
          >
            Page Not Found
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            lineHeight="relaxed"
          >
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </Text>
        </Stack>

        {/* Contact Info */}
        <Box 
          bg="white" 
          p={6} 
          borderRadius="xl" 
          boxShadow="sm"
          border="1px solid" 
          borderColor="gray.200"
          w="full" 
          maxW="500px"
        >
          <Text fontSize="md" fontWeight="bold" color="gray.900" mb={4} textAlign="center">
            Need Help? Contact Us
          </Text>
          
          <Stack gap={3}>
            <Flex align="center" gap={3} justify="center">
              <Phone size={18} color="#3182CE" />
              <Text color="gray.700" fontSize="sm">0926 430 4580</Text>
            </Flex>
            
            <Flex align="center" gap={3} justify="center">
              <Mail size={18} color="#3182CE" />
              <Text color="gray.700" fontSize="sm">rotaryzcwest@gmail.com</Text>
            </Flex>
            
            <Flex align="center" gap={3} justify="center">
              <Facebook size={18} color="#1877F2" />
              <Link 
                href="https://www.facebook.com/RCZCwest" 
                target="_blank" 
                rel="noopener noreferrer"
                color="blue.600" 
                fontSize="sm"
                _hover={{ textDecoration: "underline" }}
              >
                Facebook Page
              </Link>
            </Flex>
          </Stack>
        </Box>

        {/* Footer Notice */}
        <Text fontSize="sm" color="gray.500" textAlign="center" maxW="400px">
          If you believe this is an error, please contact us and we'll help you find what you're looking for.
        </Text>
      </Stack>
    </Container>
  );
} 