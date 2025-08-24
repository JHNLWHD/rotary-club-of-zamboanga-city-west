import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Badge,
  Link,
  Button,
  HStack,
  VStack,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { fetchProjectBySlug, fetchAllProjects } from "../lib/contentful-api";
import ShareModal from "../components/ui/ShareModal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Captions, Thumbnails } from "yet-another-react-lightbox/plugins";
import type { Route } from "./+types/service-projects.$slug";
import type { Project } from "../lib/contentful-types";
import { 
  CalendarDays, 
  MapPin, 
  ExternalLink, 
  ArrowLeft, 
  Share2, 
  Facebook,
  Hash,
  FacebookIcon
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

type LoaderData = {
  project: Project | null;
  relatedProjects: Project[];
};

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;
  
  try {
    const [project, allProjects] = await Promise.all([
      fetchProjectBySlug(slug),
      fetchAllProjects()
    ]);
    
    // Get related projects (exclude current project)
    const relatedProjects = allProjects
      ?.filter(p => p.slug !== `/service-projects/${slug}`)
      ?.slice(0, 8) || [];
    
    return { 
      project,
      relatedProjects,
    };
  } catch (error) {
    console.error('Error loading project data on server:', error);
    return { 
      project: null,
      relatedProjects: [],
    };
  }
}

export function meta({ data }: Route.MetaArgs) {
  const loaderData = data ? (data as unknown as LoaderData) : null;
  const project = loaderData?.project;
  
  if (!project) {
    return [
      { title: "Project Not Found | Rotary Club of Zamboanga City West" },
      { name: "description", content: "The requested project could not be found." },
    ];
  }

  return [
    { title: `${project.title} | Rotary Club of Zamboanga City West` },
    { name: "description", content: project.shortDescription },
    { name: "keywords", content: `Rotary service project, ${project.title}, community service, Zamboanga City, ${project.location}` },
    
    // Open Graph tags
    { property: "og:title", content: `${project.title} | Rotary Club of Zamboanga City West` },
    { property: "og:description", content: project.shortDescription },
    { property: "og:type", content: "article" },
    { property: "og:url", content: `https://rotaryzcwest.org${project.slug}` },
    { property: "og:image", content: project.headerImage?.url || "https://rotaryzcwest.org/logo.png" },
    
    // Canonical URL
    { rel: "canonical", href: `https://rotaryzcwest.org${project.slug}` },
  ];
}

export default function ProjectDetail() {
  const { project, relatedProjects } = useLoaderData() as LoaderData;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <Container maxW="1200px" py={{ base: 32, md: 36 }} textAlign="center">
        <Stack gap={6} align="center">
          <Heading as="h1" fontSize="3xl" color="gray.900">
            Project Not Found
          </Heading>
          <Text fontSize="lg" color="gray.600">
            The project you're looking for doesn't exist or has been removed.
          </Text>
          <Link 
            href="/service-projects"
            color="brand.500"
            fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <ArrowLeft size={16} />
            Back to Service Projects
          </Link>
        </Stack>
      </Container>
    );
  }

  const projectYear = new Date(project.date).getFullYear();
  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });


  // Share content data
  const shareContent = {
    title: project.title,
    description: project.shortDescription,
    date: project.date,
    venue: project.location,
    shareableLink: `${typeof window !== 'undefined' ? window.location.origin : 'https://rotaryzcwest.org'}${project.slug}`,
  };

  // Lightbox slides
  const lightboxSlides = project.gallery?.map((image, index) => ({
    src: image?.url || "/logo.png",
    alt: image?.title || `${project.title} - Photo ${index + 1}`,
    title: image?.title || `${project.title} - Photo ${index + 1}`,
    description: image?.description || "",
  })) || [];

  return (
    <Box bg="gray.50" minH="100vh" pt={{ base: 24, md: 28 }}>
      {/* Main Content */}
      <Container maxW="1200px" pt={{ base: 4, md: 6 }} pb={8}>
        {/* Breadcrumb Navigation */}
        <HStack gap={2} fontSize="sm" color="gray.600" mb={4}>
          <Link href="/service-projects" _hover={{ color: "brand.500" }}>Projects</Link>
          <Text>/</Text>
          <Text color="gray.900" fontWeight="medium">{project.title}</Text>
        </HStack>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Left Column - Main Content Card */}
          <GridItem>
            {/* White Card Container */}
            <Box 
              bg="white" 
              borderRadius="2xl" 
              boxShadow="xl" 
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
              p={{ base: 6, md: 8 }}
            >
              <Stack gap={8}>
                {/* Project Header Image */}
                <Box borderRadius="xl" overflow="hidden" boxShadow="lg" position="relative">
                  <Image 
                    src={project.headerImage?.url ?? "/logo.png"} 
                    alt={`${project.title} - ${projectYear}`}
                    width="100%" 
                    height="auto"
                    objectFit="cover"
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "/logo.png"; 
                    }}
                  />
                  <Badge
                    position="absolute"
                    top={4}
                    right={4}
                    colorScheme="blue"
                    variant="solid"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                    boxShadow="lg"
                  >
                    {projectYear}
                  </Badge>
                </Box>

                {/* Project Header */}
                <Box>
                  <HStack justify="space-between" align="start" mb={6} flexWrap="wrap" gap={4}>
                    <VStack align="flex-start" gap={4} flex={1}>
                      <Heading as="h1" fontSize="4xl" fontWeight="bold" color="gray.900" lineHeight="shorter">
                        {project.title}
                      </Heading>
                      <Badge 
                        colorScheme="blue" 
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="uppercase"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {project.category}
                      </Badge>
                    </VStack>
                    <HStack gap={2}>
                      <Button
                        variant="outline"
                        size="md"
                        display="flex"
                        alignItems="center"
                        px={4}
                        py={2}
                        onClick={() => setIsShareModalOpen(true)}
                        border="1px solid"
                        borderColor="brand.600"
                        borderRadius="md"
                      >
                        <Share2 size={16} />
                        <Text ml={2}>Share</Text>
                      </Button>
                      {project.facebookLink && (
                        <Link
                          href={project.facebookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          textDecoration="none"
                        >
                          <Button
                            variant="outline"
                            size="md"
                            display="flex"
                            alignItems="center"
                            px={4}
                            py={2}
                            border="1px solid"
                            borderColor="brand.600"
                            borderRadius="md"
                          >
                            <FacebookIcon size={16} />
                            <Text ml={2}>Facebook</Text>
                          </Button>
                        </Link>
                      )}
                    </HStack>
                  </HStack>

                  {/* Date and Venue */}
                  <HStack gap={8} mb={8} color="gray.600" flexWrap="wrap">
                    <HStack gap={2}>
                      <CalendarDays size={16} />
                      <Text fontSize="sm" fontWeight="medium">
                        <strong>Date:</strong> {formattedDate}
                      </Text>
                    </HStack>
                    <HStack gap={2}>
                      <MapPin size={16} />
                      <Text fontSize="sm" fontWeight="medium">
                        <strong>Venue:</strong> {project.location}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>

                {/* About This Project */}
                <Box>
                  <Heading 
                    as="h2" 
                    fontSize="2xl" 
                    fontWeight="bold"
                    color="gray.900" 
                    mb={6}
                    pb={3}
                    borderBottom="2px solid"
                    borderColor="gray.200"
                  >
                    About This Project
                  </Heading>
                  <div className="text-slate-700 leading-relaxed prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-semibold prose-ul:my-2 prose-li:my-1">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a 
                            {...props} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1"
                          >
                            {props.children}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )
                      }}
                    >
                      {typeof project.description === 'string' ? project.description : ''}
                    </ReactMarkdown>
                  </div>
                </Box>

                {/* Project Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <Box>
                    <Heading 
                      as="h2" 
                      fontSize="2xl" 
                      fontWeight="bold"
                      color="gray.900" 
                      mb={6}
                      pb={3}
                      borderBottom="2px solid"
                      borderColor="gray.200"
                    >
                      Project Gallery
                    </Heading>
                    <Text color="gray.600" mb={6} fontSize="sm">Photos and highlights from this project</Text>
                    <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                      {project.gallery.map((image, index) => (
                        <Box
                          key={index}
                          borderRadius="lg"
                          overflow="hidden"
                          cursor="pointer"
                          transition="all 0.3s ease"
                          _hover={{ 
                            transform: "scale(1.05)", 
                            boxShadow: "xl",
                            borderColor: "brand.500",
                            "& .gallery-overlay": { opacity: 1 }
                          }}
                          border="2px solid"
                          borderColor="transparent"
                          onClick={() => {
                            setLightboxIndex(index);
                            setLightboxOpen(true);
                          }}
                          position="relative"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setLightboxIndex(index);
                              setLightboxOpen(true);
                            }
                          }}
                        >
                          <Image
                            src={image?.url || "/logo.png"}
                            alt={image?.title || `${project.title} - Photo ${index + 1}`}
                            width="100%"
                            height="200px"
                            objectFit="cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/logo.png";
                            }}
                          />
                          {/* Hover overlay */}
                          <Box
                            className="gallery-overlay"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bg="blackAlpha.400"
                            opacity={0}
                            transition="opacity 0.3s ease"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text color="white" fontWeight="bold" fontSize="sm">
                              Click to view
                            </Text>
                          </Box>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </Stack>
            </Box>
          </GridItem>

          {/* Right Column - Sidebar */}
          <GridItem>
            <Stack gap={6}>
                {/* Partners Card */}
                {project.partners && project.partners.length > 0 && (
                  <Box
                    bg="white"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.200"
                    p={6}
                    boxShadow="sm"
                  >
                    <Heading 
                      as="h3" 
                      fontSize="lg" 
                      fontWeight="bold"
                      color="gray.900" 
                      mb={6}
                      pb={3}
                      borderBottom="2px solid"
                      borderColor="gray.200"
                    >
                      Partners
                    </Heading>
                    <VStack align="stretch" gap={4}>
                      {project.partners.map((partner, index) => (
                        <Flex key={index} align="flex-start" gap={3}>
                          <Box
                            width="6px"
                            height="6px"
                            borderRadius="full"
                            bg="brand.600"
                            flexShrink={0}
                            mt={2}
                          />
                          <Text 
                            fontSize="sm" 
                            color="gray.700" 
                            fontWeight="medium"
                            lineHeight="tall"
                          >
                            {partner}
                          </Text>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Related Projects Card */}
                {relatedProjects.length > 0 && (
                  <Box
                    bg="white"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.200"
                    p={6}
                    boxShadow="sm"
                  >
                    <Heading 
                      as="h3" 
                      fontSize="lg" 
                      fontWeight="bold"
                      color="gray.900" 
                      mb={6}
                      pb={3}
                      borderBottom="2px solid"
                      borderColor="gray.200"
                    >
                      Projects
                    </Heading>
                    <VStack gap={4} align="stretch">
                      {relatedProjects.slice(0, 5).map((relatedProject, index) => (
                        <Link
                          key={index}
                          href={relatedProject.slug}
                          display="block"
                          _hover={{ color: "brand.600" }}
                        >
                          <Text 
                            fontSize="sm" 
                            color="brand.500" 
                            fontWeight="medium" 
                            lineHeight="tall"
                          >
                            {relatedProject.title}
                          </Text>
                        </Link>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Hashtags Card */}
                {project.hashtags && project.hashtags.length > 0 && (
                  <Box
                    bg="white"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.200"
                    p={6}
                    boxShadow="sm"
                  >
                    <Heading 
                      as="h3" 
                      fontSize="lg" 
                      fontWeight="bold"
                      color="gray.900" 
                      mb={6}
                      pb={3}
                      borderBottom="2px solid"
                      borderColor="gray.200"
                    >
                      Hashtags
                    </Heading>
                    <Flex wrap="wrap" gap={3}>
                      {project.hashtags.map((hashtag, index) => (
                        <HStack key={index} gap={1}>
                          <Hash size={14} color="#6B7280" />
                          <Text fontSize="sm" color="brand.600" fontWeight="medium">
                            {hashtag.startsWith('#') ? hashtag.slice(1) : hashtag}
                          </Text>
                        </HStack>
                      ))}
                    </Flex>
                  </Box>
                )}
            </Stack>
          </GridItem>
        </Grid>
      </Container>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        content={shareContent}
        contentType="project"
      />

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Captions, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 1,
          borderRadius: 4,
        }}
      />
    </Box>
  );
}