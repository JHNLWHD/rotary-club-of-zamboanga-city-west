import { Box, Flex, Button, Link, Spacer, Image, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, ChevronDown, Heart } from "lucide-react";
import { Menu } from "./Menu";
import { useLocation } from "react-router";
import type { ContactInfo, MeetingInfo } from "~/lib/contentful-types";

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

type ContactData = {
  meetingInfo?: MeetingInfo;
  contactInfo?: ContactInfo;
};

function TopBar({ transparent, contactData }: { transparent: boolean; contactData?: ContactData }) {
  return (
    <Flex 
      bg={transparent ? "blackAlpha.300" : "white"} 
      color={transparent ? "white" : "gray.700"} 
      fontSize="xs" 
      px={{ base: 2, md: 12 }} 
      py={2}
      align="center" 

      justify="space-between"
      display={{ base: "none", md: "flex" }}
    >
      <Flex gap={2} align="center">
        <Link 
          href={contactData?.contactInfo?.facebookUrl || "https://www.facebook.com/RCZCwest"} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Facebook size={18} color={transparent ? "white" : "#6C757D"} />
        </Link>
      </Flex>
      <Flex gap={7} align="center" display={{ base: "none", md: "flex" }}>
        <Flex gap={1} align="center">
          <MapPin size={14} color={transparent ? "white" : "#6C757D"} />
          <Text color={transparent ? "white" : "gray.700"} textShadow={transparent ? "0 1px 3px rgba(0,0,0,0.7)" : undefined}>
            {contactData?.meetingInfo?.address || "914 Grand Astoria Hotel, Zamboanga City"}
          </Text>
        </Flex>
        <Flex gap={1} align="center">
          <Mail size={14} color={transparent ? "white" : "#6C757D"} />
          <Text color={transparent ? "white" : "gray.700"} textShadow={transparent ? "0 1px 3px rgba(0,0,0,0.7)" : undefined}>
            {contactData?.contactInfo?.email || "rotaryzcwest@gmail.com"}
          </Text>
        </Flex>
        <Flex gap={1} align="center">
          <Clock size={14} color={transparent ? "white" : "#6C757D"} />
          <Text color={transparent ? "white" : "gray.700"} textShadow={transparent ? "0 1px 3px rgba(0,0,0,0.7)" : undefined}>
            {contactData?.meetingInfo ? `${contactData.meetingInfo.day} ${contactData.meetingInfo.time}` : "Tue 6:00 PM"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function HamburgerIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <Box as="span" display="inline-block" w="24px" h="24px">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
    </Box>
  );
}

export function GlobalLayout({ children, transparentHeader = false, contactData }: { children: ReactNode, transparentHeader?: boolean, contactData?: ContactData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutUsMenuOpen, setAboutUsMenuOpen] = useState(false);

  const navTextColor = transparentHeader ? "white" : "gray.700";
  const navTextShadow = transparentHeader ? "0 1px 3px rgba(0,0,0,0.7)" : undefined;
  const navHoverColor = transparentHeader ? undefined : "brand.500";
  const navHoverBg = transparentHeader ? "whiteAlpha.200" : "gray.100";
  const clubNameColor = transparentHeader ? "white" : "brand.500";
  const clubNameShadow = transparentHeader ? "0 2px 4px rgba(0,0,0,0.7)" : undefined;

  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <Flex direction="column" minHeight="100vh" position="relative">
      <Box 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        zIndex={21}
      >
        <TopBar transparent={transparentHeader} contactData={contactData} />
      </Box>
      <Box 
        as="header" 
        bg={transparentHeader ? "transparent" : "white"}
        position="absolute" 
        top={{ base: "0px", md: "32px" }}
        left={0} 
        right={0} 
        zIndex={20} 
        borderBottom={transparentHeader ? "none" : "1px solid #E2E8F0"}
      >
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
              color={clubNameColor}
              overflow="hidden"
              display="flex" 
              alignItems="center" 
              height="100%"
              lineHeight={1.2}
              textShadow={clubNameShadow}
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
              color={navTextColor}
              fontSize="sm"
              px={2}
              py={2}
              borderRadius="md"
              _hover={{ color: navHoverColor, bg: navHoverBg }}
              style={{ transition: 'all 0.2s' }}
              textAlign="center"
              whiteSpace="nowrap"
              minW="auto"
              textShadow={navTextShadow}
            >
              Home
            </Link>
            
            {/* About Us Dropdown */}
            <Box
              position="relative"
              onClick={() => setAboutUsMenuOpen(!aboutUsMenuOpen)}
            >
              <Menu.Root open={aboutUsMenuOpen} onOpenChange={(details) => setAboutUsMenuOpen(details.open)}>
                <Menu.Trigger
                  asChild
                >
                  <Button
                    variant="ghost"
                    fontWeight="medium"
                    color={navTextColor}
                    fontSize="sm"
                    px={2}
                    py={2}
                    borderRadius="md"
                    _hover={{ color: navHoverColor, bg: navHoverBg }}
                    transition="all 0.2s"
                    minW="auto"
                    textShadow={navTextShadow}
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
                color={navTextColor}
                fontSize="sm"
                px={2}
                py={2}
                borderRadius="md"
                _hover={{ color: navHoverColor, bg: navHoverBg }}
                style={{ transition: 'all 0.2s' }}
                textAlign="center"
                whiteSpace="nowrap"
                minW="auto"
                textShadow={navTextShadow}
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          
          {/* Right CTAs */}
          <Flex align="center" gap={2} flex="0 0 auto" display={{ base: "none", lg: "flex" }}>
            <Link 
              href="https://rotaract.rotaryzcwest.org/?utm_source=rotary_zamboanga_west&utm_medium=website&utm_campaign=rotaract_referral" 
              target="_blank" 
              rel="noopener noreferrer"
              _hover={{ transform: "scale(1.02)", textDecoration: "none" }}
              transition="all 0.2s"
            >
              <Flex align="center" bg="gold.100" borderRadius="md" px={2} py={3} gap={2} minW="140px">
                <Heart size={18} color="#f7a81b" fill="#f7a81b" />
                <Box>
                  <Text fontSize="9px" color="gray.700" lineHeight={1.1}>Visit Now</Text>
                  <Text fontWeight="bold" color="brand.500" fontSize="11px" lineHeight={1.1}>Visit Rotaract Site</Text>
                </Box>
              </Flex>
            </Link>
            <Link 
              href="https://www.rotary.org/en/get-involved/ways-to-give?utm_source=rotary_zamboanga_west&utm_medium=website&utm_campaign=foundation_giving" 
              target="_blank" 
              rel="noopener noreferrer"
              bg="brand.500" 
              color="white" 
              _hover={{ bg: "brand.600", transform: "translateY(-1px)" }} 
              py={3} 
              px={7}
              borderRadius="md"
              fontSize="sm"
              fontWeight="bold"
              style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
              transition="all 0.2s"
              boxShadow="lg"
            >
              Donate Now
            </Link>
          </Flex>
          {/* Spacer to push hamburger to the right on mobile */}
          <Spacer display={{ base: "block", lg: "none" }} />
          {/* Hamburger for mobile */}
          <Button
            aria-label="Open menu"
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            ml={2}
            onClick={() => setMobileMenuOpen((v) => !v)}
            p={2}
            minW={0}
            height="auto"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            <HamburgerIcon color={transparentHeader ? "white" : "#2D3748"} />
          </Button>
        </Flex>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box 
            bg="blackAlpha.900" 
            backdropFilter="blur(10px)"
            px={6} 
            py={4} 
            display={{ md: "none" }} 
            borderTop="none"
          >
            {/* About Us Section */}
            <Box mb={4}>
              <Text fontWeight="bold" color="white" mb={2} fontSize="sm" textTransform="uppercase" letterSpacing="wider">
                About Us
              </Text>
              {aboutUsLinks.map((link) => (
                <Box key={link.href} mb={2} ml={2}>
                  <Link 
                    href={link.href} 
                    fontWeight="medium" 
                    color="gray.300" 
                    fontSize="sm"
                    _hover={{ color: "gold.400" }} 
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
                  color="white" 
                  _hover={{ color: "gold.400" }} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
            
            <Link 
              href="https://rotaract.rotaryzcwest.org/?utm_source=rotary_zamboanga_west&utm_medium=website&utm_campaign=rotaract_referral" 
              target="_blank" 
              rel="noopener noreferrer"
              _hover={{ transform: "scale(1.02)", textDecoration: "none" }}
              transition="all 0.2s"
              display="block"
              mb={2}
            >
              <Flex align="center" bg="gold.100" borderRadius="md" px={2} py={3} gap={2} minW="140px">
                <Heart size={18} color="#f7a81b" fill="#f7a81b" />
                <Box>
                  <Text fontSize="9px" color="gray.700" lineHeight={1.1}>Visit Now</Text>
                  <Text fontWeight="bold" color="brand.500" fontSize="11px" lineHeight={1.1}>Visit Rotaract Site</Text>
                </Box>
              </Flex>
            </Link>
            <Link 
              href="https://www.rotary.org/en/get-involved/ways-to-give?utm_source=rotary_zamboanga_west&utm_medium=website&utm_campaign=foundation_giving" 
              target="_blank" 
              rel="noopener noreferrer"
              bg="brand.500" 
              color="white" 
              _hover={{ bg: "brand.600", transform: "translateY(-1px)" }} 
              w="full" 
              mt={2} 
              py={3}
              px={7}
              borderRadius="md"
              fontSize="sm"
              fontWeight="bold"
              style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
              onClick={() => setMobileMenuOpen(false)}
              transition="all 0.2s"
              boxShadow="lg"
            >
              Donate Now
            </Link>
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box as="main" flex="1 1 0%" bg="gray.50" pb={8} px={isHomePage ? 0 : { base: 4, md: 0 }}>
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
                      href={contactData?.contactInfo?.facebookUrl || "https://www.facebook.com/RCZCwest"} 
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
                  <Link href="/service-projects" color="gray.300" fontSize="sm" _hover={{ color: "brand.400" }} transition="color 0.2s">
                    Supporting the Environment
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
                        {contactData?.meetingInfo?.location || "Grand Astoria Hotel"}<br />
                        {contactData?.meetingInfo?.address || "914 Mayor Jaldon Street"}<br />
                        Zamboanga City, Philippines
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Mail size={16} color="white" style={{ flexShrink: 0 }} />
                    <Text color="gray.300" fontSize="sm">
                      {contactData?.contactInfo?.email || "rotaryzcwest@gmail.com"}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Clock size={16} color="white" style={{ flexShrink: 0 }} />
                    <Text color="gray.300" fontSize="sm">
                      {contactData?.meetingInfo ? `Every ${contactData.meetingInfo.day}, ${contactData.meetingInfo.time}` : "Every Tuesday, 6:00 PM"}
                    </Text>
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