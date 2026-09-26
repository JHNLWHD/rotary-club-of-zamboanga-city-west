import { Box, Container } from "@chakra-ui/react";
import { ContactSection } from "../components/homepage/ContactSection";
import { ComingSoon } from "../components/ui/ComingSoon";
import { useRouteLoaderData, useSearchParams } from "react-router";
import ThankYou from "./thank-you";
import type { ContactInfo, MeetingInfo } from "~/lib/contentful-types";

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
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/contact" },
  ];
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { contactData } = useRouteLoaderData("root") as {
    contactData?: {
      meetingInfo?: MeetingInfo;
      contactInfo?: ContactInfo;
    };
  };

  if (!contactData?.meetingInfo || !contactData?.contactInfo) {
    return (
      <Box py={{ base: 12, md: 20 }} display="flex" alignItems="center" justifyContent="center" minH="60vh">
        <Container maxW="full" p={0}>
          <ComingSoon
            title="Contact information is being updated"
            message="We're currently setting up our contact system. Please check back soon for ways to get in touch with us."
            colorScheme="brand"
            size="lg"
            maxWidth="600px"
          />
        </Container>
      </Box>
    );
  }

  if (searchParams.get("success") === "true") {
    return <ThankYou />;
  }

  return (
    <Box>
      <Container maxW="full" p={0}>
        <ContactSection 
          meetingInfo={contactData.meetingInfo}
          contactInfo={contactData.contactInfo}
          headingAs="h1"
        />
      </Container>
    </Box>
  );
}
