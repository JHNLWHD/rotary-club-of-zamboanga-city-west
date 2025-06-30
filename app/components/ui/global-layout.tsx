import { Box, Flex, Button, Link, Spacer, Image, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, ChevronDown } from "lucide-react";
import { Menu } from "./menu";

const aboutUsLinks = [
  { label: "Club Leadership", href: "/about/leadership" },
  { label: "History", href: "/about/history" },
  { label: "The Rotary Foundation Giving", href: "/about/foundation-giving" },
  { label: "Calendar of Activities", href: "/about/calendar" },
  { label: "Contact Us", href: "/contact" },
];

const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "The Fortress", href: "/the-fortress" },
  { label: "Service Projects", href: "/service-projects" },
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
    <Flex align="center" bg="gold.100" borderRadius="md" px={2} py={2} gap={2} minW="140px">
      <Image src="https://img.icons8.com/fluency/32/heart-with-arrow.png" alt="Volunteer" boxSize="18px" />
      <Box>
        <Text fontSize="9px" color="gray.700" lineHeight={1.1}>Join Us Now</Text>
        <Text fontWeight="bold" color="brand.500" fontSize="11px" lineHeight={1.1}>Become a Volunteer</Text>
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
  const [aboutUsMenuOpen, setAboutUsMenuOpen] = useState(false);

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Top Bar */}
      <TopBar />
      {/* Main Header/Nav */}
      <Box as="header" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10} borderBottom="1px solid #E2E8F0">
        <Flex align="center" px={{ base: 4, md: 12 }} height={20} gap={4}>
          {/* Logo and Club Name (left) */}
          <Flex align="center" gap={2} minW="0" flex="0 0 auto" maxW={{ base: "180px", md: "280px" }}>
            <Image
              src="/logo.png"
              alt="Rotary Club of Zamboanga City West Logo"
              width={{ base: '80px', md: '120px' }}
              height="auto"
              objectFit="contain"
              flexShrink={0}
            />
            <Box 
              fontWeight="bold" 
              fontSize={{ base: "xs", md: "sm" }} 
              color="brand.500" 
              overflow="hidden"
              display="flex" 
              alignItems="center" 
              height="100%"
              lineHeight={1.2}
            >
              <Box>
                <Box>Rotary Club of</Box>
                <Box>Zamboanga City West</Box>
              </Box>
            </Box>
          </Flex>
          
          {/* Nav Links (center) */}
          <Flex align="center" gap={3} flex={1} justify="center" minW={0} display={{ base: "none", lg: "flex" }}>
            {/* Home Link */}
            <Link
              href="/"
              fontWeight="medium"
              color="gray.700"
              fontSize="sm"
              px={2}
              py={2}
              borderRadius="md"
              _hover={{ color: "brand.500", bg: "gray.100" }}
              style={{ transition: 'background 0.2s' }}
              textAlign="center"
              whiteSpace="nowrap"
              minW="auto"
            >
              Home
            </Link>
            
            {/* About Us Dropdown */}
            <Box
              position="relative"
              onMouseEnter={() => setAboutUsMenuOpen(true)}
              onMouseLeave={() => setAboutUsMenuOpen(false)}
            >
              <Menu.Root open={aboutUsMenuOpen} onOpenChange={(details) => setAboutUsMenuOpen(details.open)}>
                <Menu.Trigger
                  asChild
                >
                  <Button
                    variant="ghost"
                    fontWeight="medium"
                    color="gray.700"
                    fontSize="sm"
                    px={2}
                    py={2}
                    borderRadius="md"
                    _hover={{ color: "brand.500", bg: "gray.100" }}
                    transition="all 0.2s"
                    minW="auto"
                  >
                    About Us <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                  </Button>
                </Menu.Trigger>
                <Menu.Content
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="lg"
                  borderRadius="lg"
                  py={2}
                  minW="220px"
                  position="absolute"
                  top="100%"
                  left={0}
                  mt={1}
                  zIndex={50}
                >
                  {aboutUsLinks.map((link) => (
                    <Menu.Item
                      key={link.href}
                      value={link.href}
                      asChild
                    >
                      <Link 
                        href={link.href} 
                        px={4}
                        py={3}
                        fontSize="sm"
                        fontWeight="medium"
                        color="gray.700"
                        _hover={{ bg: "gray.50", color: "brand.500" }}
                        _focus={{ bg: "gray.50", color: "brand.500" }}
                        transition="all 0.2s"
                        textDecoration="none"
                        display="block"
                      >
                        {link.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Root>
            </Box>

            {/* Other Nav Links */}
            {mainNavLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontWeight="medium"
                color="gray.700"
                fontSize="sm"
                px={2}
                py={2}
                borderRadius="md"
                _hover={{ color: "brand.500", bg: "gray.100" }}
                style={{ transition: 'background 0.2s' }}
                textAlign="center"
                whiteSpace="nowrap"
                minW="auto"
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          
          {/* Right CTAs */}
          <Flex align="center" gap={2} flex="0 0 auto" display={{ base: "none", lg: "flex" }}>
            <CtaCard />
            <ButtonLink href="/donate" bg="brand.500" color="white" _hover={{ bg: "brand.700" }} py={3} fontSize="sm">
              Donate Now
            </ButtonLink>
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
            {/* About Us Section */}
            <Box mb={4}>
              <Text fontWeight="bold" color="gray.900" mb={2} fontSize="sm" textTransform="uppercase" letterSpacing="wider">
                About Us
              </Text>
              {aboutUsLinks.map((link) => (
                <Box key={link.href} mb={2} ml={2}>
                  <Link 
                    href={link.href} 
                    fontWeight="medium" 
                    color="gray.600" 
                    fontSize="sm"
                    _hover={{ color: "brand.500" }} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
            
            {/* Other Nav Links */}
            {mainNavLinks.map((link) => (
              <Box key={link.href} mb={2}>
                <Link 
                  href={link.href} 
                  fontWeight="medium" 
                  color="gray.700" 
                  _hover={{ color: "brand.500" }} 
                  onClick={() => setMobileMenuOpen(false)}
                >
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
                  {/* About Us Links */}
                  <Text fontSize="xs" fontWeight="bold" color="gray.300" textTransform="uppercase" letterSpacing="wider">
                    About Us
                  </Text>
                  {aboutUsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      color="gray.300"
                      fontSize="sm"
                      ml={2}
                      _hover={{ color: "brand.400", textDecoration: "none" }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* Main Nav Links */}
                  <Box mt={4}>
                    {mainNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        color="gray.300"
                        fontSize="sm"
                        display="block"
                        mb={3}
                        _hover={{ color: "brand.400", textDecoration: "none" }}
                        transition="color 0.2s"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Box>
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
                    <Text color="gray.300" fontSize="sm">Every Tuesday, 6:00 PM</Text>
                  </Flex>
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