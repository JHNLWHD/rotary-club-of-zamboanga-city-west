import { Box, Container, Heading, Text, Stack, Button, Link } from "@chakra-ui/react";
import { ContactSection } from "../components/homepage/ContactSection";
import { ComingSoon } from "../components/ui/ComingSoon";
import { useRouteLoaderData, useSearchParams } from "react-router";
import { CheckCircle, Home } from "lucide-react";
import type { ContactInfo, MeetingInfo } from "~/lib/contentful-types";
import { redirect } from "react-router";

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
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/contact" },
  ];
}

// Handle form submission - Netlify will process the form data
export async function action() {
  // Netlify will handle the form processing automatically
  // We just redirect to thank-you to show confirmation
  return redirect("/thank-you");
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  
  const { contactData } = useRouteLoaderData("root") as {
    contactData?: {
      meetingInfo?: MeetingInfo;
      contactInfo?: ContactInfo;
    };
  };

  if (!contactData?.meetingInfo || !contactData?.contactInfo) {
    return (
      <Box py={{ base: 64, md: 42, lg: 42 }} display="flex" alignItems="center" justifyContent="center" minH="60vh">
        <Container maxW="full" p={0}>
          <ComingSoon
            title="🚧 Contact Information Coming Soon"
            message="We're currently setting up our contact system. Please check back soon for ways to get in touch with us."
            colorScheme="brand"
            size="lg"
            maxWidth="600px"
          />
        </Container>
      </Box>
    );
  }

  // Show success message if form was submitted
  if (isSuccess) {
    return (
      <Box py={{ base: 16, md: 24, lg: 32 }} minH="100vh" display="flex" alignItems="center">
        <Container maxW="800px" py={{ base: 8, md: 12 }}>
          <Stack gap={{ base: 8, md: 12 }} textAlign="center" align="center">
            {/* Success Icon */}
            <Box
              bg="green.100"
              borderRadius="full"
              p={{ base: 6, md: 8 }}
              border="3px solid"
              borderColor="green.400"
              mt={{ base: 4, md: 8 }}
            >
              <CheckCircle size={64} color="#38A169" />
            </Box>

            {/* Success Message */}
            <Stack gap={{ base: 4, md: 6 }} align="center">
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
                px={{ base: 4, md: 0 }}
              >
                Thank you for reaching out to Rotary Club of Zamboanga City West! We've received your message and will respond within 7 days.
              </Text>
            </Stack>

            {/* Action Button */}
            <Box mt={{ base: 4, md: 6 }}>
              <Link href="/home">
                <Button
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
                >
                  <Home size={20} />
                  Back to Homepage
                </Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={{ base: 8, md: 12, lg: 16 }}>
      <Container maxW="full" p={0}>
        <ContactSection 
          meetingInfo={contactData.meetingInfo}
          contactInfo={contactData.contactInfo}
        />
      </Container>
    </Box>
  );
} 