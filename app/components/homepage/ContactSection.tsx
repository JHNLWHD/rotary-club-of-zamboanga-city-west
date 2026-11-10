import { Box, Button, Flex, Heading, Input, Link, Stack, Text, Textarea } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { ContactInfo, MeetingInfo } from "~/lib/contentful-types";

type ContactSectionProps = {
  meetingInfo: MeetingInfo;
  contactInfo: ContactInfo;
  headingAs?: "h1" | "h2";
};

const labelStyle = {
  display: "block",
  color: "#082247",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  marginBottom: "0.65rem",
  textTransform: "uppercase" as const,
};

export function ContactSection({ meetingInfo, contactInfo, headingAs = "h2" }: ContactSectionProps): React.JSX.Element {
  const formHeadingAs = headingAs === "h1" ? "h2" : "h3";

  return (
    <Box as="section" bg="#f2f0ea" id="contact">
      <Flex
        maxW="1400px"
        mx="auto"
        direction={{ base: "column", lg: "row" }}
        minH={{ lg: "760px" }}
      >
        <Flex
          flex="0 0 48%"
          direction="column"
          justify="space-between"
          p={{ base: 6, md: 10, lg: 12 }}
        >
          <Box>
            <Flex align="center" gap={4} mb={{ base: 8, md: 10 }}>
              <Box w="28px" h="2px" bg="brand.600" />
              <Text fontSize="xs" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase">
                Contact / The Great West
              </Text>
            </Flex>
            <Heading
              as={headingAs}
              color="brand.900"
              fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
              fontWeight="semibold"
              letterSpacing="-0.025em"
              lineHeight="1.12"
              maxW="650px"
            >
              Start with a real need.
            </Heading>
            <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="560px" mt={7}>
              Ask about a project, propose a partnership, attend a meeting, or learn how membership works. Specific messages are easier to route.
            </Text>
          </Box>

          <Box mt={{ base: 12, lg: 16 }} borderTop="1px solid" borderColor="brand.900">
            <Flex py={4} borderBottom="1px solid" borderColor="#b9b7b0" justify="space-between" gap={6} direction={{ base: "column", sm: "row" }}>
              <Text fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" fontWeight="bold">Meeting</Text>
              <Text textAlign={{ sm: "right" }} fontWeight="semibold">{meetingInfo.day} · {meetingInfo.time}</Text>
            </Flex>
            <Flex py={4} borderBottom="1px solid" borderColor="#b9b7b0" justify="space-between" gap={6} direction={{ base: "column", sm: "row" }}>
              <Text fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" fontWeight="bold">Venue</Text>
              <Text textAlign={{ sm: "right" }} maxW="380px">{meetingInfo.location}<br />{meetingInfo.address}</Text>
            </Flex>
            <Flex py={4} borderBottom="1px solid" borderColor="#b9b7b0" justify="space-between" gap={6} direction={{ base: "column", sm: "row" }}>
              <Text fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" fontWeight="bold">Direct</Text>
              <Link href={`mailto:${contactInfo.email}`} color="brand.700" fontWeight="bold">{contactInfo.email}</Link>
            </Flex>
            <Flex py={4} justify="space-between" gap={6} direction={{ base: "column", sm: "row" }}>
              <Text fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" fontWeight="bold">Updates</Text>
              <Link href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" color="brand.700" fontWeight="bold">
                {contactInfo.facebookHandle}
              </Link>
            </Flex>
          </Box>
        </Flex>

        <Flex flex="1" align="center" p={{ base: 6, md: 10, lg: 12 }} bg="#f7f5f0">
          <Box w="full">
            <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase" mb={4}>
              Inquiry form
            </Text>
            <Heading as={formHeadingAs} color="brand.900" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-0.03em" mb={8}>
              Write to the club.
            </Heading>

            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/thank-you">
              <input type="hidden" name="form-name" value="contact" />
              <Box display="none">
                <label>Do not fill this in: <input name="bot-field" /></label>
              </Box>

              <Stack gap={6}>
                <Flex direction={{ base: "column", md: "row" }} gap={5}>
                  <Box flex="1">
                    <label htmlFor="contact-name" style={labelStyle}>Name</label>
                    <Input id="contact-name" name="name" autoComplete="name" bg="white" border="1px solid" borderColor="#b9b7b0" h="56px" px={4} required />
                  </Box>
                  <Box flex="1">
                    <label htmlFor="contact-email" style={labelStyle}>Email address</label>
                    <Input id="contact-email" name="email" type="email" autoComplete="email" bg="white" border="1px solid" borderColor="#b9b7b0" h="56px" px={4} required />
                  </Box>
                </Flex>
                <Box>
                  <label htmlFor="contact-message" style={labelStyle}>What would you like to discuss?</label>
                  <Textarea id="contact-message" name="message" bg="white" border="1px solid" borderColor="#b9b7b0" rows={8} p={4} resize="vertical" required />
                </Box>
                <Button type="submit" bg="#0067c8" color="white" h="58px" px={7} w="full" display="inline-flex" justifyContent="space-between" _hover={{ bg: "brand.700" }}>
                  Send your inquiry <ArrowRight size={19} aria-hidden="true" />
                </Button>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
