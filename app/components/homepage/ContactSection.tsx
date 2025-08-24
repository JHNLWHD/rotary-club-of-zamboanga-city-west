import { Box, Flex, VStack, Heading, Text, Input, Textarea, Button, Image, Link } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";
import type { ContactInfo, MeetingInfo } from "~/lib/contentful-types";
import { CalendarIcon, FacebookIcon, MailIcon, MapPinIcon } from "lucide-react";

type ContactSectionProps = {
  meetingInfo: MeetingInfo
  contactInfo: ContactInfo
};

export function ContactSection({ meetingInfo, contactInfo }: ContactSectionProps): JSX.Element {
  return (
    <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="contact">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader 
          subtitle="Contact Us"
          title="Get in Touch with Us"
          description="Have questions about our projects or want to join our mission? We'd love to hear from you and explore how we can work together."
        />

        <Flex direction={{ base: "column", lg: "row" }} gap={12}>
          <Box 
            flex={1} 
            bg="white" 
            borderRadius="2xl" 
            p={8} 
            boxShadow="0 8px 25px rgba(0,0,0,0.08)"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
              Send us a Message
            </Heading>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/thank-you"
            >
              <input type="hidden" name="form-name" value="contact" />
              
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
                  _hover={{ 
                    bg: "brand.600", 
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
                  }}
                  borderRadius="lg"
                  px={8}
                  py={4}
                  fontSize="md"
                  fontWeight="bold"
                  w="full"
                  transition="all 0.3s ease"
                  boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                  _active={{
                    bg: "brand.700",
                    transform: "translateY(0px)"
                  }}
                  _focus={{
                    bg: "brand.500",
                    boxShadow: "0 0 0 3px rgba(0,93,170,0.3)"
                  }}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Meeting & Contact Details */}
          <Box flex={1} display="flex" flexDirection="column" gap={6}>
            {/* Meeting Information Card */}
            <Box 
              bg="white" 
              borderRadius="2xl" 
              p={8} 
              boxShadow="0 8px 25px rgba(0,0,0,0.08)"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                Join Our Monthly Meetings
              </Heading>
              <VStack align="start" gap={4}>
                <Flex align="center" gap={3}>
                  <Box 
                    bgGradient="linear(to-br, blue.100, blue.200)"
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="blue.300"
                  >
                    <CalendarIcon color="blue" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      {meetingInfo.day}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {meetingInfo.time}
                    </Text>
                  </Box>
                </Flex>
                <Flex align="start" gap={3}>
                  <Box 
                    bgGradient="linear(to-br, green.100, green.200)"
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="green.300"
                    mt={1}
                  >
                    <MapPinIcon color="green" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      {meetingInfo.location}
                    </Text>
                    <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                      {meetingInfo.address}
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
              boxShadow="0 8px 25px rgba(0,0,0,0.08)"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                Contact Information
              </Heading>
              <VStack align="start" gap={4}>
                <Flex align="center" gap={3}>
                  <Box 
                    bgGradient="linear(to-br, red.100, red.200)"
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="red.300"
                  >
                    <MailIcon color="red" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize="md">
                      {contactInfo.email}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      We'll respond within 24 hours
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Box 
                    bgGradient="linear(to-br, blue.100, blue.200)"
                    borderRadius="lg" 
                    p={2}
                    border="2px solid"
                    borderColor="blue.300"
                  >
                    <FacebookIcon color="blue" />
                  </Box>
                  <Box>
                    <Link 
                      href={contactInfo.facebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      fontWeight="bold" 
                      color="blue.600" 
                      fontSize="md"
                      _hover={{ color: "blue.700", textDecoration: "underline" }}
                    >
                      {contactInfo.facebookHandle}
                    </Link>
                    <Text color="gray.600" fontSize="sm">
                      Follow us for updates
                    </Text>
                  </Box>
                </Flex>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
} 