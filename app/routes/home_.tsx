import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Stack,
  Link,
  Input,
  Textarea,
  useBreakpointValue,
  VStack,
  Button,
} from "@chakra-ui/react";
import { HeroCarousel } from "../components/homepage/HeroCarousel";
import { Users, Handshake, Heart } from "lucide-react";

export function meta() {
  return [
    { title: "Rotary Club of Zamboanga City West | Service Above Self" },
    { name: "description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. We focus on peacebuilding, education, healthcare, clean water, and community development. Service Above Self since 1979." },
    { name: "keywords", content: "Rotary Club, Zamboanga City, community service, volunteer, charity, Philippines, peacebuilding, education, healthcare, clean water, community development, service above self" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    
    // Open Graph tags
    { property: "og:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
    { property: "og:description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. We focus on peacebuilding, education, healthcare, clean water, and community development." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
    { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
    { name: "twitter:description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. Service Above Self since 1979." },
    { name: "twitter:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { name: "twitter:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
    
    // Additional SEO tags
    { name: "theme-color", content: "#005DAA" },
    { name: "msapplication-TileColor", content: "#005DAA" },
    { name: "geo.region", content: "PH-ZAM" },
    { name: "geo.placename", content: "Zamboanga City" },
    { name: "geo.position", content: "6.9214;122.0790" },
    { name: "ICBM", content: "6.9214, 122.0790" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org" },
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
      borderRadius="md"
      _hover={{ bg: "brand.700" }}
      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
      {...props}
    >
      {children}
    </Link>
  );
}

const impactStats = [
  { label: "Members", value: "85+", icon: "https://img.icons8.com/ios-filled/50/005DAA/group-foreground-selected.png" },
  { label: "Projects Completed", value: "120+", icon: "https://img.icons8.com/ios-filled/50/005DAA/task-completed.png" },
  { label: "Funds Raised", value: "₱5M+", icon: "https://img.icons8.com/ios-filled/50/005DAA/money-bag.png" },
  { label: "Years of Service", value: "45", icon: "https://img.icons8.com/ios-filled/50/005DAA/clock--v1.png" },
];

const serviceAreas = [
  { 
    title: "Peacebuilding and Conflict Prevention", 
    desc: "Promoting peace and understanding in our community.", 
    icon: "https://img.icons8.com/color/96/dove--v1.png",
    color: "blue.500"
  },
  { 
    title: "Disease Prevention and Treatment", 
    desc: "Health outreach and medical assistance programs.", 
    icon: "https://img.icons8.com/color/96/stethoscope.png",
    color: "red.500"
  },
  { 
    title: "Water, Sanitation, and Hygiene", 
    desc: "Clean water and sanitation for all communities.", 
    icon: "https://img.icons8.com/color/96/drop-of-water.png",
    color: "cyan.500"
  },
  { 
    title: "Maternal and Child Health", 
    desc: "Supporting mothers and children's wellbeing.", 
    icon: "https://img.icons8.com/color/96/mother.png",
    color: "purple.500"
  },
  { 
    title: "Basic Education and Literacy", 
    desc: "Education programs and literacy initiatives.", 
    icon: "https://img.icons8.com/color/96/book-and-pencil.png",
    color: "orange.500"
  },
  { 
    title: "Community Economic Development", 
    desc: "Empowering local livelihoods and economic growth.", 
    icon: "https://img.icons8.com/color/96/money-bag.png",
    color: "teal.500"
  },
];

const projectHighlights = [
  {
    title: "Clean Water for Barangay Sta. Maria",
    desc: "Installed a new water filtration system benefiting 500+ families.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    quote: "Now our children have safe water every day!",
    person: "- Resident, Sta. Maria",
  },
  {
    title: "Medical Mission 2024",
    desc: "Free checkups and medicines for 1,200+ residents.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    quote: "Thank you, Rotary, for caring for our health!",
    person: "- Local beneficiary",
  },
];

const popularProjects = [
  {
    title: "School Supplies Drive",
    desc: "Provided 1,000+ students with essential school kits.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Feeding Program",
    desc: "Weekly meals for undernourished children in local barangays.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Tree Planting",
    desc: "Planted 2,000+ trees for a greener Zamboanga.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=800&q=80",
  },
];

const events = [
  {
    title: "Weekly Club Meeting",
    date: "Every Thursday, 7:00 PM",
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=800&q=80",
    desc: "Join us for fellowship and planning our next service project!",
  },
  {
    title: "District Conference",
    date: "July 15, 2024",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    desc: "Rotary District 3850 annual gathering for all clubs.",
  },
];

const team = [
  { name: "Juan Dela Cruz", role: "President", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Maria Santos", role: "Vice President", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Jose Ramos", role: "Secretary", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Ana Lim", role: "Treasurer", image: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const faqs = [
  { q: "How do I become a member?", a: "Visit our Membership page and fill out the application form." },
  { q: "When and where do you meet?", a: "Every Thursday, 7:00 PM at Grand Astoria Hotel, Zamboanga City." },
  { q: "Can I volunteer without joining?", a: "Yes! Contact us to join our next service project as a volunteer." },
];

const testimonials = [
  { quote: "Rotary changed my life and my community.", name: "Carlos, Member" },
  { quote: "The projects really help our barangay!", name: "Liza, Beneficiary" },
];

const news = [
  {
    title: "Rotary Club Donates Books to Local Schools",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    desc: "Over 500 books distributed to promote literacy.",
  },
  {
    title: "Medical Mission Reaches 1,200 Residents",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    desc: "Free checkups and medicines provided by club volunteers.",
  },
  {
    title: "Tree Planting for a Greener City",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=800&q=80",
    desc: "2,000+ trees planted in partnership with local youth.",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
];

export default function Home() {
  const heroImgSize = useBreakpointValue({ base: "100%", md: "80%" });
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rotary Club of Zamboanga City West",
    "alternateName": "Rotary Zamboanga West",
    "url": "https://rotaryzcwest.org",
    "logo": "https://rotaryzcwest.org/logo.png",
    "description": "A service organization dedicated to community development, peacebuilding, education, healthcare, and humanitarian projects in Zamboanga City, Philippines.",
    "foundingDate": "1979",
    "memberOf": {
      "@type": "Organization",
      "name": "Rotary International",
      "url": "https://www.rotary.org"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grand Astoria Hotel, 914 Mayor Jaldon Street",
      "addressLocality": "Zamboanga City",
      "addressRegion": "Zamboanga Peninsula",
      "addressCountry": "Philippines",
      "postalCode": "7000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63-926-430-4580",
      "email": "rotaryzcwest@gmail.com",
      "contactType": "General Inquiry"
    },
    "sameAs": [
      "https://www.facebook.com/RCZCwest"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Zamboanga City",
      "addressCountry": "Philippines"
    },
    "knowsAbout": [
      "Community Development",
      "Peacebuilding",
      "Education",
      "Healthcare",
      "Clean Water Projects",
      "Humanitarian Aid"
    ]
  };

  return (
    <Box>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <Box as="section" position="relative" overflow="hidden" bg="gray.50" py={{ base: 8, md: 12 }}>
        <Box px={{ base: 4, md: 16 }}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 6, lg: 8 }}>
            <Box flex={1} maxW={{ base: "100%", lg: "52%" }} pr={{ base: 0, lg: 4 }}>
              <Text 
                fontSize="sm" 
                fontWeight="bold" 
                color="brand.500" 
                letterSpacing="wider" 
                textTransform="uppercase"
                mb={3}
              >
                Rotary Club of Zamboanga City West
              </Text>
              <Heading 
                as="h1" 
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
                fontWeight="bold" 
                lineHeight="shorter"
                color="gray.900"
                mb={6}
              >
                Lend a Helping Hand{" "}
                <Text as="span" color="brand.500">
                  to Those in Need
                </Text>
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color="gray.600" 
                mb={8} 
                lineHeight="relaxed"
                maxW="480px"
              >
                We help communities develop powerful corporate social responsibility 
                through meaningful community engagement strategies in Zamboanga City, Philippines.
              </Text>
              
              <Flex direction={{ base: "column", sm: "row" }} gap={4} mb={8}>
                <ButtonLink 
                  href="/membership"
                  bg="brand.500"
                  color="white"
                  px={8}
                  py={4}
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="full"
                  _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  boxShadow="sm"
                >
                  Join Our Volunteers
                </ButtonLink>
                <Link
                  href="#projects"
                  border="2px solid"
                  borderColor="gray.300"
                  color="gray.700"
                  fontWeight="bold"
                  px={8}
                  py={4}
                  borderRadius="full"
                  _hover={{ bg: "white", borderColor: "brand.500", color: "brand.500" }}
                  style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                  transition="all 0.2s"
                >
                  Learn About Our Projects
                </Link>
              </Flex>
              
              {/* Stats or Icons */}
              <Flex gap={6} align="center" mt={2}>
                <Box color="brand.500">
                  <Users size={28} />
                </Box>
                <Box color="brand.500">
                  <Handshake size={28} />
                </Box>
                <Box color="brand.500">
                  <Heart size={28} />
                </Box>
                <Text fontSize="sm" color="gray.500" ml={2} fontWeight="medium">
                  Join Our Volunteers
                </Text>
              </Flex>
            </Box>
            
            <Box 
              flex={1} 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              position="relative"
              maxW={{ base: "100%", lg: "48%" }}
            >
              <HeroCarousel />
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Three Column Feature Section */}
      <Box as="section" py={16} bg="white" id="services">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="gray.900">
            How You Can Get Involved
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {/* Become a Volunteer */}
            <Box as="article" textAlign="center" p={6}>
              <Box 
                bg="blue.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={6}
                role="img"
                aria-label="Volunteer icon"
              >
                <Users size={32} color="#3182CE" />
              </Box>
              <Heading as="h3" size="lg" color="gray.900" mb={4} fontWeight="bold">
                Become a Volunteer
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                Join our dedicated team of Rotarians and make a meaningful impact in Zamboanga City. 
                Together, we create lasting change through service above self.
              </Text>
            </Box>

            {/* Quick Fundraise */}
            <Box as="article" textAlign="center" p={6}>
              <Box 
                bg="green.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={6}
                role="img"
                aria-label="Fundraising icon"
              >
                <Handshake size={32} color="#38A169" />
              </Box>
              <Heading as="h3" size="lg" color="gray.900" mb={4} fontWeight="bold">
                Quick Fundraise
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                Help us raise funds for important community projects. Every peso counts towards 
                building schools, providing clean water, and supporting healthcare initiatives.
              </Text>
            </Box>

            {/* Start Donating */}
            <Box as="article" textAlign="center" p={6}>
              <Box 
                bg="red.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={6}
                role="img"
                aria-label="Donation icon"
              >
                <Heart size={32} color="#E53E3E" />
              </Box>
              <Heading as="h3" size="lg" color="gray.900" mb={4} fontWeight="bold">
                Start Donating
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                Your generous donations directly support our mission to serve communities in need. 
                From disaster relief to education programs, your contribution makes a difference.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Impact Statistics */}
      <Box as="section" py={16} bg="gray.50" id="impact">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={12}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Our Services
            </Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} color="gray.900" mb={4} fontWeight="bold">
              We Are Here to Help Them
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              At Rotary Club Zamboanga City West, we help communities solve problems and focus on their 
              mission. We support development through services of tomorrow, worldwide.
            </Text>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {/* Healthy Food */}
            <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm" _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Box 
                bg="green.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={4}
              >
                <Image src="https://img.icons8.com/color/48/organic-food.png" alt="Healthy food program icon" boxSize="40px" />
              </Box>
              <Heading as="h3" size="md" color="gray.900" fontWeight="bold" mb={3}>
                Healthy Food
              </Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                We help communities develop sustainable food programs ensuring 
                responsibility, governance, and workplace engagement strategies.
              </Text>
            </Box>

            {/* Kids Education */}
            <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm" _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Box 
                bg="blue.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={4}
              >
                <Image src="https://img.icons8.com/color/48/book-and-pencil.png" alt="Children education program icon" boxSize="40px" />
              </Box>
              <Heading as="h3" size="md" color="gray.900" fontWeight="bold" mb={3}>
                Kids Education
              </Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                We help communities develop literacy programs ensuring 
                responsibility, governance, and workplace engagement strategies.
              </Text>
            </Box>

            {/* Pure Water */}
            <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm" _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Box 
                bg="cyan.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={4}
              >
                <Image src="https://img.icons8.com/color/48/water-glass.png" alt="Clean water initiative icon" boxSize="40px" />
              </Box>
              <Heading as="h3" size="md" color="gray.900" fontWeight="bold" mb={3}>
                Pure Water
              </Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                We help communities develop clean water systems ensuring 
                responsibility, governance, and workplace engagement strategies.
              </Text>
            </Box>

            {/* Medical Care */}
            <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm" _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Box 
                bg="red.50" 
                borderRadius="full" 
                w={16} 
                h={16} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={4}
              >
                <Image src="https://img.icons8.com/color/48/medical-heart.png" alt="Medical care services icon" boxSize="40px" />
              </Box>
              <Heading as="h3" size="md" color="gray.900" fontWeight="bold" mb={3}>
                Medical Care
              </Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                We help communities develop healthcare services ensuring 
                responsibility, governance, and workplace engagement strategies.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Service Areas Overview */}
      <Box as="section" py={16} maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} id="focus-areas">
        {/* Section Header */}
        <Box textAlign="center" mb={12}>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="brand.500" fontWeight="bold" mb={4}>
            ROTARY'S AREAS OF FOCUS
          </Heading>
          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto" 
            lineHeight="relaxed"
          >
            Our six areas of focus guide our service projects and help us create lasting positive change in communities around the world.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
          {serviceAreas.map((area) => (
            <Box 
              key={area.title} 
              textAlign="center" 
              p={6} 
              bg="white" 
              borderRadius="xl" 
              boxShadow="sm" 
              _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }} 
              transition="all 0.3s"
              border="2px solid"
              borderColor="gray.100"
            >
              <Box 
                bg={`${area.color.split('.')[0]}.50`}
                borderRadius="full" 
                w={20} 
                h={20} 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mx="auto" 
                mb={6}
                border="3px solid"
                borderColor={area.color}
                position="relative"
              >
                <Image 
                  src={area.icon} 
                  alt={`${area.title} - Rotary service area in Zamboanga City`} 
                  boxSize="50px" 
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/50"; 
                  }} 
                />
              </Box>
              <Heading as="h3" size="md" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                {area.title}
              </Heading>
              <Text color="gray.600" mb={4} lineHeight="relaxed">
                {area.desc}
              </Text>
              <Link 
                href="/service-projects" 
                color={area.color} 
                fontWeight="bold" 
                _hover={{ textDecoration: "underline", color: `${area.color.split('.')[0]}.600` }}
                fontSize="sm"
              >
                Learn More →
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Project Highlights / Success Stories */}
      <Box as="section" py={20} bg="gray.50" id="projects">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Success Stories
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Project Highlights
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Discover the transformative impact of our community projects and the lives we've touched together.
            </Text>
          </Box>

          <Stack gap={16}>
            {projectHighlights.map((proj, idx) => (
              <Box 
                as="article"
                key={proj.title}
                bg="white" 
                borderRadius="2xl" 
                boxShadow="sm" 
                overflow="hidden"
                _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }}
                transition="all 0.3s"
              >
                <Flex direction={{ base: "column", lg: idx % 2 === 0 ? "row" : "row-reverse" }} align="stretch">
                  <Box flex="1" position="relative">
                    <Image
                      src={proj.image}
                      alt={`${proj.title} - Community service project in Zamboanga City`}
                      width="100%"
                      height={{ base: "250px", lg: "350px" }}
                      objectFit="cover"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x350?text=Project+Image"; 
                      }}
                    />
                    <Box 
                      position="absolute" 
                      top={4} 
                      left={4} 
                      bg="brand.500" 
                      color="white" 
                      px={3} 
                      py={1} 
                      borderRadius="full" 
                      fontSize="sm" 
                      fontWeight="bold"
                    >
                      Featured Project
                    </Box>
                  </Box>
                  
                  <Box flex="1" p={{ base: 8, lg: 12 }} display="flex" flexDirection="column" justifyContent="center">
                    <Heading as="h3" fontSize={{ base: "xl", lg: "2xl" }} color="gray.900" mb={4} fontWeight="bold" lineHeight="shorter">
                      {proj.title}
                    </Heading>
                    <Text color="gray.600" mb={6} fontSize={{ base: "md", lg: "lg" }} lineHeight="relaxed">
                      {proj.desc}
                    </Text>
                    
                    <Box 
                      as="blockquote"
                      bg="blue.50" 
                      borderLeft="4px solid" 
                      borderLeftColor="brand.500" 
                      p={6} 
                      borderRadius="md"
                      mb={6}
                    >
                      <Text fontSize="lg" fontStyle="italic" color="gray.700" mb={2}>
                        "{proj.quote}"
                      </Text>
                      <Text as="cite" fontSize="sm" fontWeight="bold" color="brand.500">
                        {proj.person}
                      </Text>
                    </Box>

                    <ButtonLink 
                      href="/service-projects"
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: "brand.600" }}
                      borderRadius="lg"
                      px={6}
                      py={3}
                      fontSize="md"
                      fontWeight="bold"
                      alignSelf="flex-start"
                      aria-label={`Learn more about ${proj.title} project`}
                    >
                      Learn More About This Project
                    </ButtonLink>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Popular Projects / Causes */}
      <Box as="section" py={20} bg="white" id="causes">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Get Involved
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Support Our Community Causes
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Support our ongoing initiatives that are making a real difference in Zamboanga City communities.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {popularProjects.map((proj, idx) => (
              <Box 
                as="article"
                key={proj.title} 
                bg="white" 
                borderRadius="2xl" 
                boxShadow="sm" 
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                _hover={{ boxShadow: "sm", transform: "translateY(-6px)", borderColor: "brand.200" }}
                transition="all 0.3s"
              >
                <Box position="relative">
                  <Image 
                    src={proj.image} 
                    alt={`${proj.title} - Rotary community project in Zamboanga City`}
                    width="100%" 
                    height="220px" 
                    objectFit="cover" 
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x220?text=Project+Image"; 
                    }} 
                  />
                  <Box 
                    position="absolute" 
                    top={4} 
                    right={4} 
                    bg="white" 
                    borderRadius="full" 
                    p={2}
                    boxShadow="sm"
                    aria-label="Featured cause"
                  >
                    <Heart size={20} color="#E53E3E" />
                  </Box>
                </Box>
                
                <Box p={6}>
                  <Heading as="h3" fontSize="xl" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                    {proj.title}
                  </Heading>
                  <Text color="gray.600" mb={6} lineHeight="relaxed">
                    {proj.desc}
                  </Text>
                  
                  <Flex justify="space-between" align="center">
                    <ButtonLink 
                      href="/donate"
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: "brand.600" }}
                      borderRadius="lg"
                      px={6}
                      py={3}
                      fontSize="sm"
                      fontWeight="bold"
                      aria-label={`Donate to ${proj.title} project`}
                    >
                      Donate Now
                    </ButtonLink>
                    <Link 
                      href="/service-projects"
                      color="brand.500"
                      fontSize="sm"
                      fontWeight="medium"
                      _hover={{ color: "brand.600", textDecoration: "underline" }}
                      aria-label={`Learn more about ${proj.title}`}
                    >
                      Learn More →
                    </Link>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Full-width CTA */}
      <Box 
        as="section"
        py={20} 
        position="relative"
        overflow="hidden"
        bgGradient="linear(135deg, brand.500 0%, brand.600 100%)"
        color="white"
        id="cta"
      >
        {/* Background Pattern */}
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          opacity={0.1}
          bgImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
          bgSize="50px 50px"
          aria-hidden="true"
        />
        
        <Box maxW="1000px" mx="auto" px={{ base: 4, md: 8 }} textAlign="center" position="relative" zIndex={1}>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} mb={6} fontWeight="bold" lineHeight="shorter" color="black">
            Join Your Hand With Us For A{" "}
            <Text as="span" color="yellow.200">
              Better Life and Future
            </Text>
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={10} maxW="600px" mx="auto" lineHeight="relaxed" opacity={0.9} color="black">
            Become a Rotarian and make a lasting difference in Zamboanga City! Together, we can create positive change in our community.
          </Text>
          
          <Flex direction={{ base: "column", sm: "row" }} gap={4} justify="center" align="center">
            <ButtonLink 
              href="/membership" 
              bg="white" 
              color="gray.800" 
              _hover={{ bg: "gray.100", transform: "translateY(-2px)", color: "gray.900" }}
              borderRadius="xl"
              px={10}
              py={4}
              fontSize="lg"
              fontWeight="bold"
              boxShadow="sm"
              transition="all 0.3s"
              border="2px solid"
              borderColor="gray.200"
              aria-label="Apply for Rotary membership in Zamboanga City"
            >
              Apply for Membership
            </ButtonLink>
            <Link
              href="/about"
              border="2px solid white"
              bg="white"
              color="black"
              fontWeight="bold"
              px={10}
              py={4}
              borderRadius="xl"
              _hover={{ bg: "whiteAlpha.200" }}
              style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
              transition="all 0.3s"
              aria-label="Learn about Rotary Club of Zamboanga City West"
            >
              Learn About Us
            </Link>
          </Flex>
        </Box>
      </Box>

      {/* Events / News */}
      <Box as="section" py={20} bg="gray.50" id="events">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Events & Meetings
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Ready to Join Our Latest Upcoming Events
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Stay connected with our community through regular meetings and special events that bring Rotarians together.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            {events.map((event, idx) => (
              <Box 
                as="article"
                key={event.title} 
                bg="white" 
                borderRadius="2xl" 
                boxShadow="sm" 
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }}
                transition="all 0.3s"
              >
                <Box position="relative">
                  <Image 
                    src={event.image} 
                    alt={`${event.title} - Rotary event in Zamboanga City`}
                    width="100%" 
                    height="240px" 
                    objectFit="cover" 
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x240?text=Event+Image"; 
                    }} 
                  />
                  <Box 
                    position="absolute" 
                    bottom={4} 
                    left={4} 
                    bg="brand.500" 
                    color="white" 
                    px={3} 
                    py={1} 
                    borderRadius="full" 
                    fontSize="sm" 
                    fontWeight="bold"
                  >
                    <time dateTime={event.date}>{event.date}</time>
                  </Box>
                </Box>
                
                <Box p={6}>
                  <Heading as="h3" fontSize="xl" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                    {event.title}
                  </Heading>
                  <Text color="gray.600" mb={6} lineHeight="relaxed">
                    {event.desc}
                  </Text>
                  
                  <Flex justify="space-between" align="center">
                    <ButtonLink 
                      href="/events"
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: "brand.600" }}
                      borderRadius="lg"
                      px={6}
                      py={3}
                      fontSize="sm"
                      fontWeight="bold"
                      aria-label={`Learn more about ${event.title}`}
                    >
                      Learn More
                    </ButtonLink>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      📅 <time dateTime={event.date}>{event.date}</time>
                    </Text>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Team Section */}
      <Box as="section" py={20} bg="white" id="team">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Leadership Team
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Meet The Team Behind Their Success Story
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Our dedicated leaders work tirelessly to make our community initiatives successful and impactful.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {team.map((member) => (
              <Box 
                as="article"
                key={member.name} 
                textAlign="center" 
                bg="gray.50" 
                borderRadius="2xl" 
                p={6}
                _hover={{ bg: "white", boxShadow: "sm", transform: "translateY(-4px)" }}
                transition="all 0.3s"
                border="1px solid"
                borderColor="gray.100"
              >
                <Box position="relative" mb={4}>
                  <Image 
                    src={member.image} 
                    alt={`${member.name} - ${member.role} of Rotary Club Zamboanga City West`}
                    borderRadius="full" 
                    boxSize="100px" 
                    mx="auto" 
                    border="4px solid"
                    borderColor="brand.500"
                    objectFit="cover"
                  />
                  <Box 
                    position="absolute" 
                    bottom={0} 
                    right="50%" 
                    transform="translateX(50%)" 
                    bg="brand.500" 
                    borderRadius="full" 
                    p={2}
                    aria-label="Team member badge"
                  >
                    <Users size={16} color="white" />
                  </Box>
                </Box>
                <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold" mb={1}>
                  {member.name}
                </Heading>
                <Text color="brand.500" fontWeight="medium" fontSize="sm">
                  {member.role}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* FAQ & Stats Combined */}
      <Box as="section" py={20} bg="gray.50" id="faq-stats">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Flex direction={{ base: "column", lg: "row" }} gap={16}>
            {/* Impact Stats */}
            <Box flex={1}>
              <Heading as="h2" fontSize="2xl" color="gray.900" mb={8} fontWeight="bold">
                Our Impact in Numbers
              </Heading>
              <SimpleGrid columns={2} gap={6}>
                <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm">
                  <Heading as="h3" fontSize="3xl" color="brand.500" fontWeight="bold" mb={2}>
                    85+
                  </Heading>
                  <Text color="gray.700" fontWeight="medium" fontSize="sm">Members</Text>
                </Box>
                <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm">
                  <Heading as="h3" fontSize="3xl" color="brand.500" fontWeight="bold" mb={2}>
                    120+
                  </Heading>
                  <Text color="gray.700" fontWeight="medium" fontSize="sm">Projects Completed</Text>
                </Box>
                <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm">
                  <Heading as="h3" fontSize="3xl" color="brand.500" fontWeight="bold" mb={2}>
                    ₱5M+
                  </Heading>
                  <Text color="gray.700" fontWeight="medium" fontSize="sm">Funds Raised</Text>
                </Box>
                <Box as="article" textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="sm">
                  <Heading as="h3" fontSize="3xl" color="brand.500" fontWeight="bold" mb={2}>
                    45
                  </Heading>
                  <Text color="gray.700" fontWeight="medium" fontSize="sm">Years of Service</Text>
                </Box>
              </SimpleGrid>
            </Box>

            {/* FAQ */}
            <Box flex={1}>
              <Heading as="h2" fontSize="2xl" color="gray.900" mb={8} fontWeight="bold">
                Frequently Asked Questions
              </Heading>
              <Box display="flex" flexDirection="column" gap={4}>
                {faqs.map((faq, idx) => (
                  <Box as="article" key={idx} bg="white" p={6} borderRadius="xl" boxShadow="sm">
                    <Heading as="h3" fontWeight="bold" color="gray.900" mb={2} fontSize="md">
                      {faq.q}
                    </Heading>
                    <Text color="gray.600" lineHeight="relaxed">
                      {faq.a}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Testimonials */}
      <Box as="section" py={20} bg="white" id="testimonials">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Testimonials
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Trusted by Thousands of People & Companies
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Hear what our members and community partners say about our impact and dedication to service.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            {testimonials.map((testimonial, idx) => (
              <Box 
                as="article"
                key={idx} 
                bg="gray.50" 
                borderRadius="2xl" 
                p={8}
                position="relative"
                _hover={{ bg: "white", boxShadow: "sm" }}
                transition="all 0.3s"
                border="1px solid"
                borderColor="gray.100"
              >
                <Box 
                  position="absolute" 
                  top={4} 
                  left={6} 
                  fontSize="4xl" 
                  color="brand.500" 
                  fontFamily="serif"
                  aria-hidden="true"
                >
                  "
                </Box>
                <Text as="blockquote" fontSize="lg" fontStyle="italic" color="gray.700" mb={6} mt={6} lineHeight="relaxed">
                  {testimonial.quote}
                </Text>
                <Text color="brand.500" fontWeight="bold" fontSize="md">
                  — {testimonial.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* News & Articles */}
      <Box as="section" py={20} bg="gray.50" id="news">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Latest Updates
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Directly from the Latest News and Articles
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Stay updated with our recent activities, community projects, and impact stories from around Zamboanga City.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {news.map((article, idx) => (
              <Box 
                as="article"
                key={idx} 
                bg="white" 
                borderRadius="2xl" 
                boxShadow="sm" 
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                _hover={{ boxShadow: "sm", transform: "translateY(-4px)" }}
                transition="all 0.3s"
              >
                <Box position="relative">
                  <Image 
                    src={article.image} 
                    alt={`${article.title} - Rotary news article in Zamboanga City`}
                    width="100%" 
                    height="200px" 
                    objectFit="cover" 
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=News+Image"; 
                    }} 
                  />
                  <Box 
                    position="absolute" 
                    top={4} 
                    left={4} 
                    bg="brand.500" 
                    color="white" 
                    px={3} 
                    py={1} 
                    borderRadius="full" 
                    fontSize="xs" 
                    fontWeight="bold"
                  >
                    News
                  </Box>
                </Box>
                
                <Box p={6}>
                  <Heading as="h3" fontSize="lg" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                    {article.title}
                  </Heading>
                  <Text color="gray.600" mb={6} lineHeight="relaxed" fontSize="sm">
                    {article.desc}
                  </Text>
                  <ButtonLink 
                    href="/news"
                    bg="brand.500"
                    color="white"
                    _hover={{ bg: "brand.600" }}
                    borderRadius="lg"
                    px={4}
                    py={2}
                    fontSize="sm"
                    fontWeight="bold"
                    aria-label={`Read more about ${article.title}`}
                  >
                    Read More
                  </ButtonLink>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Gallery */}
      <Box as="section" py={20} bg="white" id="gallery">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Visual Stories
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Our Photo Gallery
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Explore moments captured from our community service projects, events, and fellowship activities.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 2, md: 3 }} gap={6}>
            {gallery.map((img, i) => (
              <Box 
                key={i}
                position="relative"
                borderRadius="xl" 
                overflow="hidden"
                _hover={{ transform: "scale(1.05)" }}
                transition="all 0.3s"
                boxShadow="sm"
              >
                <Image 
                  src={img} 
                  alt={`Gallery ${i + 1} - Community project in Zamboanga City`}
                  width="100%" 
                  height="200px" 
                  objectFit="cover" 
                />
                <Box 
                  position="absolute" 
                  bottom={0} 
                  left={0} 
                  right={0} 
                  bg="blackAlpha.600" 
                  color="white" 
                  p={3} 
                  textAlign="center"
                >
                  <Text fontSize="sm" fontWeight="medium">
                    Community Project {i + 1}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          
          <Box textAlign="center" mt={12}>
            <ButtonLink 
              href="/gallery"
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
              borderRadius="xl"
              px={8}
              py={4}
              fontSize="md"
              fontWeight="bold"
              aria-label="View full photo gallery of community projects"
            >
              View Full Gallery
            </ButtonLink>
          </Box>
        </Box>
      </Box>

      {/* Contact & Meeting Info */}
      <Box as="section" py={20} bg="gray.50" id="contact">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Contact Us
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Get in Touch with Us
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Have questions about our projects or want to join our mission? We'd love to hear from you and explore how we can work together.
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

            {/* Meeting & Contact Details */}
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
                  <Flex align="center" gap={3}>
                    <Box 
                      bg="blue.50" 
                      borderRadius="lg" 
                      p={2}
                      border="2px solid"
                      borderColor="blue.200"
                    >
                      <Image src="https://img.icons8.com/ios-filled/20/1877F2/facebook.png" alt="Facebook" />
                    </Box>
                    <Box>
                      <Link 
                        href="https://www.facebook.com/RCZCwest" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        fontWeight="bold" 
                        color="blue.600" 
                        fontSize="md"
                        _hover={{ color: "blue.700", textDecoration: "underline" }}
                      >
                        @RCZCwest
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
    </Box>
  );
}
