import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { Clock, Facebook, Mail, MapPin, Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { ContactInfo, MeetingInfo } from "~/lib/contentful-types";

const primaryLinks = [
  { label: "Our Work", href: "/service-projects" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Foundation Giving", href: "/about/foundation-giving" },
  { label: "The Fortress", href: "/the-fortress" },
];

const clubLinks = [
  { label: "Club History", href: "/about/history" },
  { label: "Calendar", href: "/about/calendar" },
  { label: "Contact", href: "/contact" },
];

const newGenerationLinks = [
  {
    label: "Rotaract Club of Zamboanga City West",
    href: "https://rotaract.rotaryzcwest.org",
    external: true,
  },
  {
    label: "Rotaract Club of Southern City Colleges",
    href: "/new-generation/rotaract-southern-city-colleges",
  },
  {
    label: "Interact Club of Zamboanga City West",
    href: "/new-generation/interact-zamboanga-city-west",
  },
];

type ContactData = {
  meetingInfo?: MeetingInfo;
  contactInfo?: ContactInfo;
};

function TopBar({ contactData }: { contactData?: ContactData }) {
  const meeting = contactData?.meetingInfo;
  const email = contactData?.contactInfo?.email || "rotaryzcwest@gmail.com";

  return (
    <Box bg="brand.500" color="white">
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={2.5}
        align="center"
        justify="space-between"
        fontSize="xs"
      >
        <Text color="gold.300" letterSpacing="0.1em" textTransform="uppercase" fontWeight="bold">
          Chartered June 2, 1971
        </Text>
        <Flex gap={6} align="center" display={{ base: "none", md: "flex" }}>
          {meeting && (
            <Flex gap={2} align="center">
              <Clock size={14} aria-hidden="true" />
              <Text color="whiteAlpha.900">{meeting.day} · {meeting.time}</Text>
            </Flex>
          )}
          <Link href={`mailto:${email}`} color="whiteAlpha.900" _hover={{ color: "gold.300" }}>
            {email}
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export function GlobalLayout({
  children,
  contactData,
}: {
  children: ReactNode;
  transparentHeader?: boolean;
  contactData?: ContactData;
}) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);

  return (
    <Flex direction="column" minH="100vh" bg="#f2f0ea">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <TopBar contactData={contactData} />

      <Box as="header" bg="#f5f3ed" borderBottom="1px solid" borderColor="#b9b7b0" position="relative" zIndex={40}>
        <Flex maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} h={{ base: "74px", md: "88px" }} align="center" gap={8}>
          <Link href="/" aria-label="Rotary Club of Zamboanga City West home" flexShrink={0}>
            <Image
              src="/logo.png"
              alt="Rotary Club of Zamboanga City West"
              w={{ base: "145px", md: "172px" }}
              h="auto"
            />
          </Link>

          <Flex as="nav" aria-label="Primary navigation" align="center" justify="flex-end" gap={1} flex={1} display={{ base: "none", lg: "flex" }}>
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={location.pathname === link.href ? "page" : undefined}
                color={location.pathname === link.href ? "brand.700" : "brand.900"}
                fontSize="sm"
                fontWeight="bold"
                px={3}
                py={8}
                borderBottom="3px solid"
                borderColor={location.pathname === link.href ? "brand.600" : "transparent"}
                _hover={{ color: "brand.700", borderColor: "brand.600", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              bg="#0067c8"
              color="white"
              fontSize="sm"
              fontWeight="bold"
              px={5}
              py={3}
              ml={3}
              borderRadius="0"
              _hover={{ bg: "brand.700", textDecoration: "none" }}
            >
              Contact the club
            </Link>
          </Flex>

          <Button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            display={{ base: "inline-flex", lg: "none" }}
            ml="auto"
            variant="ghost"
            color="gray.900"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="0"
            p={2}
            minW="44px"
            h="44px"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </Button>
        </Flex>

        {mobileMenuOpen && (
          <Box id="mobile-navigation" as="nav" aria-label="Mobile navigation" borderTop="1px solid" borderColor="gray.300" bg="#f5f3ed">
            <Flex direction="column" maxW="1400px" mx="auto" px={4} py={0} gap={0}>
              {[...primaryLinks, ...clubLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  px={0}
                  py={4}
                  color="brand.900"
                  fontWeight="bold"
                  borderBottom="1px solid"
                  borderColor="gray.300"
                  _hover={{ color: "brand.700", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                bg="#0067c8"
                color="white"
                fontWeight="bold"
                textAlign="center"
                px={4}
                py={3}
                my={4}
                borderRadius="0"
                _hover={{ bg: "brand.800", textDecoration: "none" }}
              >
                Contact the club
              </Link>
            </Flex>
          </Box>
        )}
      </Box>

      <Box as="main" id="main-content" tabIndex={-1} flex="1 1 auto">
        {children}
      </Box>

      <Box as="footer" bg="brand.500" color="white">
        <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }}>
          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 16 }}>
            <Box flex="1.35">
              <Image src="/logo-white.png" alt="Rotary Club of Zamboanga City West" w="190px" mb={6} />
              <Text color="whiteAlpha.800" lineHeight="1.8" maxW="420px">
                A Zamboanga City service organization bringing local leaders together for measurable, documented community work since 1971.
              </Text>
              <Link
                href={contactData?.contactInfo?.facebookUrl || "https://www.facebook.com/RCZCwest"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rotary Club of Zamboanga City West on Facebook"
                display="inline-flex"
                mt={6}
                p={2}
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="full"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                <Facebook size={18} aria-hidden="true" />
              </Link>
            </Box>

            <Box flex="1">
              <Text fontSize="xs" fontWeight="bold" color="gold.300" textTransform="uppercase" letterSpacing="0.14em" mb={4}>
                Explore
              </Text>
              <Flex direction="column" gap={3}>
                {[...primaryLinks, ...clubLinks.slice(0, 2)].map((link) => (
                  <Link key={link.href} href={link.href} color="whiteAlpha.800" fontSize="sm" _hover={{ color: "white" }}>
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </Box>

            <Box flex="1.15">
              <Text fontSize="xs" fontWeight="bold" color="gold.300" textTransform="uppercase" letterSpacing="0.14em" mb={4}>
                New Generation
              </Text>
              <Flex direction="column" gap={3}>
                {newGenerationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    color="whiteAlpha.800"
                    fontSize="sm"
                    _hover={{ color: "white" }}
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </Box>

            <Box flex="1.15">
              <Text fontSize="xs" fontWeight="bold" color="gold.300" textTransform="uppercase" letterSpacing="0.14em" mb={4}>
                Meet Great West
              </Text>
              <Flex direction="column" gap={4} color="whiteAlpha.800" fontSize="sm">
                {contactData?.meetingInfo && (
                  <>
                    <Flex gap={3} align="start">
                      <Clock size={17} aria-hidden="true" />
                      <Text color="whiteAlpha.800">{contactData.meetingInfo.day}<br />{contactData.meetingInfo.time}</Text>
                    </Flex>
                    <Flex gap={3} align="start">
                      <MapPin size={17} aria-hidden="true" />
                      <Text color="whiteAlpha.800">{contactData.meetingInfo.location}<br />{contactData.meetingInfo.address}</Text>
                    </Flex>
                  </>
                )}
                <Flex gap={3} align="center">
                  <Mail size={17} aria-hidden="true" />
                  <Link href={`mailto:${contactData?.contactInfo?.email || "rotaryzcwest@gmail.com"}`} color="whiteAlpha.800" _hover={{ color: "white" }}>
                    {contactData?.contactInfo?.email || "rotaryzcwest@gmail.com"}
                  </Link>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box borderTop="1px solid" borderColor="whiteAlpha.200">
          <Flex maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} py={5} justify="space-between" direction={{ base: "column", md: "row" }} gap={2}>
            <Text color="whiteAlpha.600" fontSize="xs">© {currentYear} Rotary Club of Zamboanga City West.</Text>
            <Text color="whiteAlpha.600" fontSize="xs">Service Above Self</Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
