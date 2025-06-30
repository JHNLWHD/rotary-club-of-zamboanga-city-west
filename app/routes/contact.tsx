import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Input,
  Textarea,
  VStack,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  // Handle form submission and redirect to GET request
  // Netlify will process the form data, we just need to handle the redirect
  return redirect("/thank-you");
}

export function meta() {
  return [
    { title: "Contact Us | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Get in touch with Rotary Club of Zamboanga City West. Join our mission of service above self in Zamboanga City, Philippines." },
    { name: "keywords", content: "contact Rotary, Zamboanga City West, club membership, volunteer, community service" },
    
    // Open Graph tags
    { property: "og:title", content: "Contact Us | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Get in touch with Rotary Club of Zamboanga City West." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/contact" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/contact" },
  ];
}

export default function Contact() {
  return (
    <Container maxW="1200px" py={{ base: 12, md: 20 }}>
      <Stack gap={12}>
        {/* Header */}
        <Box textAlign="center">
          <Heading 
            as="h1" 
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
            fontWeight="bold" 
            color="gray.900"
            mb={4}
          >
            Contact Us
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto"
            lineHeight="relaxed"
          >
            Ready to make a difference? Get in touch with us to learn more about joining our mission or supporting our community projects.
          </Text>
        </Box>

        <Flex direction={{ base: "column", lg: "row" }} gap={12}>
          {/* Contact Form */}
          <Box 
            flex={1} 
            bg="white" 
            borderRadius="2xl" 
            p={8} 
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading as="h2" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
              Send us a Message
            </Heading>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/thank-you"
            >
              {/* Hidden field for Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field for spam protection */}
              <Box display="none">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </Box>

              <VStack gap={4} align="stretch">
                <Input 
                  name="name"
                  placeholder="Your Name" 
                  bg="gray.50" 
                  color="gray.900"
                  border="2px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  px={4}
                  py={4}
                  height="auto"
                  required
                  _focus={{ 
                    borderColor: "brand.500", 
                    bg: "white",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                  }}
                  _hover={{ borderColor: "gray.300" }}
                  _placeholder={{ color: "gray.500" }}
                />
                <Input 
                  name="email"
                  placeholder="Your Email Address" 
                  type="email"
                  bg="gray.50" 
                  color="gray.900"
                  border="2px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  px={4}
                  py={4}
                  height="auto"
                  required
                  _focus={{ 
                    borderColor: "brand.500", 
                    bg: "white",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                  }}
                  _hover={{ borderColor: "gray.300" }}
                  _placeholder={{ color: "gray.500" }}
                />
                <Textarea 
                  name="message"
                  placeholder="Tell us about your inquiry or how you'd like to get involved..." 
                  bg="gray.50" 
                  color="gray.900"
                  border="2px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  px={4}
                  py={4}
                  rows={5}
                  resize="vertical"
                  required
                  _focus={{ 
                    borderColor: "brand.500", 
                    bg: "white",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                  }}
                  _hover={{ borderColor: "gray.300" }}
                  _placeholder={{ color: "gray.500" }}
                />
                <Button
                  type="submit"
                  bg="brand.500"
                  color="white"
                  _hover={{ bg: "brand.600", transform: "translateY(-1px)" }}
                  borderRadius="lg"
                  px={8}
                  py={4}
                  fontSize="md"
                  fontWeight="bold"
                  w="full"
                  transition="all 0.2s"
                  boxShadow="sm"
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Contact Information */}
          <Box flex={1} display="flex" flexDirection="column" gap={6}>
            {/* Meeting Information Card */}
            <Box 
              bg="white" 
              borderRadius="2xl" 
              p={8} 
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                Join Our Weekly Meetings
              </Heading>
              <VStack align="start" gap={4}>
                <Flex align="center" gap={3}>
                  <Box 
                    bg="blue.50" 
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="blue.200"
                  >
                    <Image src="https://img.icons8.com/ios-filled/20/3182CE/calendar.png" alt="Calendar" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      Every Thursday
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      7:00 PM - 9:00 PM
                    </Text>
                  </Box>
                </Flex>
                <Flex align="start" gap={3}>
                  <Box 
                    bg="green.50" 
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="green.200"
                    mt={1}
                  >
                    <Image src="https://img.icons8.com/ios-filled/20/38A169/marker.png" alt="Location" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      Grand Astoria Hotel
                    </Text>
                    <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                      914 Mayor Jaldon Street<br />
                      Zamboanga City, Philippines
                    </Text>
                  </Box>
                </Flex>
              </VStack>
            </Box>

            {/* Contact Information Card */}
            <Box 
              bg="white" 
              borderRadius="2xl" 
              p={8} 
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                Contact Information
              </Heading>
              <VStack align="start" gap={4}>
                <Flex align="center" gap={3}>
                  <Box 
                    bg="purple.50" 
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="purple.200"
                  >
                    <Image src="https://img.icons8.com/ios-filled/20/805AD5/phone.png" alt="Phone" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      0926 430 4580
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Call us during business hours
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Box 
                    bg="red.50" 
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="red.200"
                  >
                    <Image src="https://img.icons8.com/ios-filled/20/E53E3E/email.png" alt="Email" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      rotaryzcwest@gmail.com
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      We'll respond within 24 hours
                    </Text>
                  </Box>
                </Flex>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
} 