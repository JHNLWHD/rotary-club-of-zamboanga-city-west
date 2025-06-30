import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Link,
  Container,
} from "@chakra-ui/react";
import { CheckCircle, Home, Mail } from "lucide-react";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  // Handle form submission and redirect to GET request
  // Netlify will process the form data, we just need to handle the redirect
  return redirect("/thank-you");
}

export function meta() {
  return [
    { title: "Thank You | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Thank you for contacting Rotary Club of Zamboanga City West. We'll get back to you soon!" },
    { name: "robots", content: "noindex, nofollow" },
    
    // Open Graph tags
    { property: "og:title", content: "Thank You | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Thank you for contacting Rotary Club of Zamboanga City West. We'll get back to you soon!" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/thank-you" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/thank-you" },
  ];
}

function ButtonLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <Link
      href={href}
      bg="brand.500"
      color="white"
      fontWeight="bold"
      px={6}
      py={3}
      borderRadius="lg"
      fontSize="md"
      _hover={{ bg: "brand.700", transform: "translateY(-1px)" }}
      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
      transition="all 0.2s"
      boxShadow="sm"
      {...props}
    >
      {children}
    </Link>
  );
}

export default function ThankYou() {
  return (
    <Container maxW="800px" py={{ base: 12, md: 20 }}>
      <Stack gap={8} textAlign="center" align="center">
        {/* Success Icon */}
        <Box
          bg="green.100"
          borderRadius="full"
          p={6}
          border="3px solid"
          borderColor="green.400"
        >
          <CheckCircle size={64} color="#38A169" />
        </Box>

        {/* Success Message */}
        <Stack gap={4} align="center">
          <Heading 
            as="h1" 
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
            fontWeight="bold" 
            color="gray.900"
            lineHeight="shorter"
          >
            Thank You!
          </Heading>
          <Heading 
            as="h2" 
            fontSize={{ base: "xl", md: "2xl" }} 
            fontWeight="bold" 
            color="green.600"
            lineHeight="shorter"
          >
            Your Message Has Been Sent
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            lineHeight="relaxed"
          >
            Thank you for reaching out to Rotary Club of Zamboanga City West! We've received your message and will respond within 24 hours.
          </Text>
        </Stack>

        {/* Action Buttons */}
        <Box>
          <ButtonLink 
            href="/home"
            bg="brand.500"
            color="white"
            _hover={{ bg: "brand.600" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            px={8}
            py={4}
            fontSize="lg"
            mx="auto"
          >
            <Flex alignItems="center" justifyContent="center">
              <Home size={20} />
            </Flex>
            Back to Homepage
          </ButtonLink>
        </Box>

        {/* What's Next Section */}
        <Box 
          bg="blue.50" 
          p={8} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="blue.200"
          w="full" 
          maxW="500px"
          mt={8}
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.900" mb={4} textAlign="center">
            What happens next?
          </Text>
          
          <Stack gap={3} textAlign="left">
            <Flex align="center" gap={3}>
              <Box 
                bg="blue.500" 
                color="white" 
                borderRadius="full" 
                w={8} 
                h={8} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                fontSize="sm" 
                fontWeight="bold"
                flexShrink={0}
              >
                1
              </Box>
              <Text color="gray.700" fontSize="sm">
                We'll review your message and determine the best person to respond
              </Text>
            </Flex>
            
            <Flex align="center" gap={3}>
              <Box 
                bg="blue.500" 
                color="white" 
                borderRadius="full" 
                w={8} 
                h={8} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                fontSize="sm" 
                fontWeight="bold"
                flexShrink={0}
              >
                2
              </Box>
              <Text color="gray.700" fontSize="sm">
                You'll receive a personalized response within 24 hours
              </Text>
            </Flex>
            
            <Flex align="center" gap={3}>
              <Box 
                bg="blue.500" 
                color="white" 
                borderRadius="full" 
                w={8} 
                h={8} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                fontSize="sm" 
                fontWeight="bold"
                flexShrink={0}
              >
                3
              </Box>
              <Text color="gray.700" fontSize="sm">
                We'll invite you to learn more about our community projects
              </Text>
            </Flex>
          </Stack>
        </Box>

        {/* Contact Alternative */}
        <Box 
          bg="gray.50" 
          p={6} 
          borderRadius="xl" 
          border="1px solid" 
          borderColor="gray.200"
          w="full" 
          maxW="400px"
        >
          <Text fontSize="md" fontWeight="bold" color="gray.900" mb={4} textAlign="center">
            Need immediate assistance?
          </Text>
          
          <Stack gap={3}>
            <Flex align="center" gap={3} justify="center">
              <Mail size={18} color="#3182CE" />
              <Text color="gray.700" fontSize="sm">rotaryzcwest@gmail.com</Text>
            </Flex>
            
            <Flex align="center" gap={3} justify="center">
              <Box as="span" fontSize="18px" color="#3182CE">📞</Box>
              <Text color="gray.700" fontSize="sm">0926 430 4580</Text>
            </Flex>
          </Stack>
        </Box>

        {/* Footer Message */}
        <Text fontSize="sm" color="gray.500" textAlign="center" maxW="400px">
          Thank you for your interest in Rotary Club of Zamboanga City West. Together, we can make a difference in our community!
        </Text>
      </Stack>
    </Container>
  );
} 