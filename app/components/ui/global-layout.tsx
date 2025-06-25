import { Box, Flex, Button, Link, Spacer, Image, Text, Input } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Service Projects", href: "/service-projects" },
  { label: "Membership", href: "/membership" },
  { label: "News & Events", href: "/news-events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function ButtonLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <Link
      href={href}
      bg="brand.500"
      color="white"
      fontWeight="bold"
      px={7}
      py={2}
      borderRadius="md"
      fontSize="sm"
      _hover={{ bg: "brand.700" }}
      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
      {...props}
    >
      {children}
    </Link>
  );
}

function TopBar() {
  return (
    <Flex bg="gray.50" color="gray.700" fontSize="xs" px={{ base: 2, md: 12 }} py={2} align="center" justify="space-between" borderBottom="1px solid #E2E8F0">
      <Flex gap={2} align="center">
        <Link href="https://www.facebook.com/RCZCwest" target="_blank" rel="noopener noreferrer"><Image src="https://img.icons8.com/ios-filled/18/6C757D/facebook-new.png" alt="Facebook" /></Link>
      </Flex>
      <Flex gap={7} align="center" display={{ base: "none", md: "flex" }}>
        <Flex gap={1} align="center"><Image src="https://img.icons8.com/ios-filled/14/6C757D/marker.png" alt="Address" />914 Grand Astoria Hotel, Zamboanga City</Flex>
        <Flex gap={1} align="center"><Image src="https://img.icons8.com/ios-filled/14/6C757D/phone.png" alt="Phone" />0926 430 4580</Flex>
        <Flex gap={1} align="center"><Image src="https://img.icons8.com/ios-filled/14/6C757D/clock--v1.png" alt="Time" />Thu 7:00 PM</Flex>
      </Flex>
    </Flex>
  );
}

function CtaCard() {
  return (
    <Flex align="center" bg="gold.100" borderRadius="md" px={3} py={3} gap={2} minW="170px">
      <Image src="https://img.icons8.com/fluency/32/heart-with-arrow.png" alt="Volunteer" boxSize="22px" />
      <Box>
        <Text fontSize="10px" color="gray.700" lineHeight={1.1}>Join Us Now</Text>
        <Text fontWeight="bold" color="brand.500" fontSize="13px" lineHeight={1.1}>Become a Volunteer</Text>
      </Box>
    </Flex>
  );
}

function HamburgerIcon() {
  return (
    <Box as="span" display="inline-block" w="24px" h="24px">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
    </Box>
  );
}

export function GlobalLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Top Bar */}
      <TopBar />
      {/* Main Header/Nav */}
      <Box as="header" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10} borderBottom="1px solid #E2E8F0">
        <Flex align="center" px={{ base: 4, md: 12 }} height={20}>
          {/* Logo and Club Name (left) */}
          <Flex align="center" gap={2} minW="0">
            <Image
              src="/logo.png"
              alt="Rotary Club of Zamboanga City West Logo"
              width={{ base: '100px', md: '140px' }}
              height="auto"
              objectFit="contain"
            />
            <Box fontWeight="bold" fontSize={{ base: "md", md: "xl" }} color="brand.500" ml={2} whiteSpace="nowrap" display="flex" alignItems="center" height="100%">
              Rotary Club of Zamboanga City
            </Box>
          </Flex>
          {/* Nav Links (center) */}
          <Flex align="center" gap={5} flex={1} justify="center" minW={0} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontWeight="medium"
                color="gray.700"
                fontSize="sm"
                px={3}
                py={2}
                borderRadius="md"
                _hover={{ color: "brand.500", bg: "gray.100" }}
                style={{ transition: 'background 0.2s' }}
                textAlign="center"
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          {/* Right CTAs */}
          <Flex align="center" gap={3} display={{ base: "none", md: "flex" }}>
            <CtaCard />
            <ButtonLink href="/donate" bg="brand.500" color="white" _hover={{ bg: "brand.700" }} py={3}>Donate Now</ButtonLink>
          </Flex>
          {/* Hamburger for mobile */}
          <Button
            aria-label="Open menu"
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            color="brand.500"
            ml={2}
            onClick={() => setMobileMenuOpen((v) => !v)}
            p={2}
            minW={0}
            height="auto"
          >
            <HamburgerIcon />
          </Button>
        </Flex>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box bg="white" boxShadow="md" px={6} py={4} display={{ md: "none" }}>
            {navLinks.map((link) => (
              <Box key={link.href} mb={2}>
                <Link href={link.href} fontWeight="medium" color="gray.700" _hover={{ color: "brand.500" }} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              </Box>
            ))}
            <CtaCard />
            <ButtonLink href="/donate" w="full" mt={2} py={3} onClick={() => setMobileMenuOpen(false)}>
              Donate Now
            </ButtonLink>
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box as="main" flex="1 1 0%" bg="gray.50" py={8} px={{ base: 4, md: 0 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.900" color="white">
        {/* Main Footer Content */}
        <Box py={16}>
          <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
            <Flex direction={{ base: "column", lg: "row" }} gap={12}>
              {/* Club Info Section */}
              <Box flex={2}>
                <Flex align="center" gap={3} mb={6}>
                  <Image
                    src="/logo.png"
                    alt="Rotary Club Logo"
                    width="60px"
                    height="auto"
                    objectFit="contain"
                  />
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" color="white" lineHeight="shorter">
                      Rotary Club of Zamboanga City
                    </Text>
                    <Text fontSize="sm" color="gray.400" mt={1}>
                      Service Above Self
                    </Text>
                  </Box>
                </Flex>
                <Text color="gray.300" lineHeight="relaxed" mb={6} maxW="400px">
                  Dedicated to serving our community through meaningful projects that create lasting positive change in Zamboanga City and beyond.
                </Text>
                
                {/* Social Media */}
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="white" mb={3} textTransform="uppercase" letterSpacing="wider">
                    Follow Us
                  </Text>
                  <Flex gap={4}>
                    <Link 
                      href="https://www.facebook.com/RCZCwest" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      p={2}
                      borderRadius="lg"
                      bg="whiteAlpha.100"
                      _hover={{ bg: "brand.500", transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                    >
                      <Facebook size={20} color="white" />
                    </Link>
                  </Flex>
                </Box>
              </Box>

              {/* Quick Links */}
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" color="white" mb={4} textTransform="uppercase" letterSpacing="wider">
                  Quick Links
                </Text>
                <Flex direction="column" gap={3}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      color="gray.300"
                      fontSize="sm"
                      _hover={{ color: "brand.400", textDecoration: "none" }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </Link>
                  ))}
                </Flex>
              </Box>

              {/* Service Areas */}
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" color="white" mb={4} textTransform="uppercase" letterSpacing="wider">
                  Areas of Focus
                </Text>
                <Flex direction="column" gap={3}>
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Peacebuilding & Conflict Prevention
                  </Link>
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Disease Prevention & Treatment
                  </Link>
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Water, Sanitation & Hygiene
                  </Link>
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Maternal & Child Health
                  </Link>
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Basic Education & Literacy
                  </Link>
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Community Economic Development
                  </Link>
                </Flex>
              </Box>

              {/* Contact Info */}
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" color="white" mb={4} textTransform="uppercase" letterSpacing="wider">
                  Contact Info
                </Text>
                <Flex direction="column" gap={4}>
                  <Flex align="start" gap={3}>
                    <MapPin size={16} color="white" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <Box>
                      <Text color="gray.300" fontSize="sm" lineHeight="relaxed">
                        Grand Astoria Hotel<br />
                        914 Mayor Jaldon Street<br />
                        Zamboanga City, Philippines
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Phone size={16} color="white" style={{ flexShrink: 0 }} />
                    <Text color="gray.300" fontSize="sm">0926 430 4580</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Mail size={16} color="white" style={{ flexShrink: 0 }} />
                    <Text color="gray.300" fontSize="sm">rotaryzcwest@gmail.com</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Clock size={16} color="white" style={{ flexShrink: 0 }} />
                    <Text color="gray.300" fontSize="sm">Every Thursday, 7:00 PM</Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Newsletter Section */}
        <Box bg="gray.800" py={12}>
          <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={8}>
              <Box flex={1}>
                <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
                  Stay Updated
                </Text>
                <Text color="gray.300" fontSize="sm">
                  Subscribe to our newsletter for the latest updates on our community projects and events.
                </Text>
              </Box>
              <Box flex={1} maxW={{ base: "100%", md: "400px" }}>
                <Flex gap={3}>
                  <Input
                    placeholder="Enter your email address"
                    bg="white"
                    color="gray.900"
                    borderRadius="lg"
                    px={4}
                    py={3}
                    fontSize="sm"
                    flex={1}
                    border="none"
                    _focus={{ outline: "none", boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
                  />
                  <Button
                    bg="brand.500"
                    color="white"
                    _hover={{ bg: "brand.600" }}
                    borderRadius="lg"
                    px={6}
                    py={3}
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    Subscribe
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Bottom Footer */}
        <Box bg="gray.950" py={6}>
          <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={4}>
              <Text fontSize="sm" color="gray.400" textAlign={{ base: "center", md: "left" }}>
                © {new Date().getFullYear()} Rotary Club of Zamboanga City West. All rights reserved.
              </Text>
              <Flex gap={6} align="center">
                <Link href="/privacy" color="gray.400" fontSize="sm" _hover={{ color: "brand.400" }}>
                  Privacy Policy
                </Link>
                <Link href="/terms" color="gray.400" fontSize="sm" _hover={{ color: "brand.400" }}>
                  Terms of Service
                </Link>
                <Link href="/sitemap" color="gray.400" fontSize="sm" _hover={{ color: "brand.400" }}>
                  Sitemap
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
} 