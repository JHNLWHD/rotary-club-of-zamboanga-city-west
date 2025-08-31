import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  Badge,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { Download, Calendar, Users, Award, FileText, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchTheFortress } from "../lib/contentful-api";
import type { FortressIssue } from "../lib/contentful-types";
import type { Route } from "./+types/the-fortress";
import "../styles/react-pdf.css";

// Client-side PDF components
let Document: any = null;
let Page: any = null;
let pdfjs: any = null;

type LoaderData = {
  fortressIssues: FortressIssue[];
};

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const fortressIssues = await fetchTheFortress();
    return { 
      fortressIssues: fortressIssues || [],
    };
  } catch (error) {
    console.error('Error loading fortress data on server:', error);
    return { 
      fortressIssues: [],
    };
  }
}

export function meta() {
  return [
    { title: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { name: "description", content: "Feel the spirit of Rotary through stories of fellowship, service, and impact that continue to shape lives in Zamboanga City and across wider communities." },
    { name: "keywords", content: "The Fortress, Rotary publication, club newsletter, Zamboanga City West, member news, project updates, UNITE FOR GOOD" },
    
    // Open Graph tags
    { property: "og:title", content: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Stories of fellowship, service, and impact shaping lives in Zamboanga City and beyond." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/the-fortress" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/the-fortress" },
  ];
}

// Helper function to convert Google Drive share link to embed URL
function getGoogleDriveEmbedUrl(shareUrl: string): string {
  if (!shareUrl || typeof shareUrl !== 'string') return '';
  
  // Extract file ID from Google Drive URL
  const fileIdMatch = shareUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // If it's already a direct URL, return as is
  return shareUrl;
}

// Helper function to get PDF URL from Contentful asset
function getPdfUrlFromAsset(asset: any): string {
  if (!asset || !asset.url) return '';
  
  // Contentful assets already provide direct URLs
  return asset.url;
}

// Helper function to get a proxy URL for CORS issues
function getProxiedPdfUrl(originalUrl: string): string {
  // For development, we might need a CORS proxy
  // In production, you might want to serve PDFs through your own backend
  return originalUrl;
}

// Default data for when Contentful is not available
const defaultFortressIssues: FortressIssue[] = [
  {
    id: "1",
    issueNumber: "ISSUE NO. 1",
    month: "July 2025 Issue",
    rotaryYear: "RY 2025-2026",
    file: {
      url: "",
      title: "The Fortress Issue No. 1",
      description: "July 2025 Issue",
    },
    isFeatured: false,
  },
];

export default function TheFortress() {
  const { fortressIssues } = useLoaderData() as LoaderData;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string>("");
  const [selectedIssueTitle, setSelectedIssueTitle] = useState<string>("");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [pdfComponentsLoaded, setPdfComponentsLoaded] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  // Use Contentful data or fallback to default
  const publicationIssues = fortressIssues?.length > 0 ? fortressIssues : defaultFortressIssues;

  // Load PDF components only on client side
  useEffect(() => {
    setIsClient(true);
    
    const loadPdfComponents = async () => {
      try {
        const reactPdf = await import('react-pdf');
        Document = reactPdf.Document;
        Page = reactPdf.Page;
        pdfjs = reactPdf.pdfjs;
        
        // Set up PDF.js worker using local file
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        
        // Note: CSS files are handled by the bundler or can be imported at the top level
        // Removing dynamic CSS imports that cause Vite issues
        
        setPdfComponentsLoaded(true);
      } catch (error) {
        console.error('Failed to load PDF components:', error);
        setError('PDF viewer not available');
      }
    };

    loadPdfComponents();
  }, []);

  const handleOpenPdfModal = (issue: FortressIssue) => {
    console.log('Opening PDF modal for:', issue.issueNumber);
    console.log('File asset:', issue.file);
    
    // Get PDF URL from Contentful asset
    const pdfUrl = getPdfUrlFromAsset(issue.file);
    console.log('PDF URL:', pdfUrl);
    
    // Check if PDF components are loaded
    if (!pdfComponentsLoaded) {
      console.log('PDF components not loaded yet');
      setError('PDF viewer is still loading. Please try again in a moment.');
      return;
    }
    
    if (!pdfUrl) {
      setError('No PDF file available for this issue.');
      return;
    }
    
    setSelectedPdfUrl(pdfUrl);
    setSelectedIssueTitle(issue.issueNumber);
    setPageNumber(1);
    setError(null);
    setLoading(true);
    setUseIframeFallback(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPdfUrl("");
    setSelectedIssueTitle("");
    setNumPages(null);
    setPageNumber(1);
    setError(null);
    setUseIframeFallback(false);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully, pages:', numPages);
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    console.error('Error details:', error.message);
    
    // If it's a CORS error, worker setup failure, or version mismatch, try iframe fallback
    if (error.message.includes('CORS') || 
        error.message.includes('cross-origin') || 
        error.message.includes('fetch') ||
        error.message.includes('worker') ||
        error.message.includes('Setting up fake worker failed') ||
        error.message.includes('version') ||
        error.message.includes('does not match')) {
      console.log('PDF.js error detected (CORS/Worker/Version), switching to iframe fallback');
      setUseIframeFallback(true);
      setError(null);
      setLoading(false);
    } else {
      setError(`Failed to load PDF: ${error.message}. Switching to browser viewer.`);
      setUseIframeFallback(true);
      setLoading(false);
    }
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box 
        position="relative" 
        bg="white" 
        overflow="hidden"
        pt={{ base: 24, md: 28 }}
        pb={{ base: 16, md: 20 }}
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage="linear-gradient(135deg, rgba(0, 93, 170, 0.03) 0%, rgba(255, 255, 255, 1) 100%)"
          zIndex={1}
        />
        
        <Container maxW="1200px" position="relative" zIndex={2}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={12}>
            {/* Left Content */}
            <Box flex={1} textAlign={{ base: "center", lg: "left" }}>
              {/* Rotary Logo */}
              <Flex align="center" justify={{ base: "center", lg: "flex-start" }} mb={4}>
                <Image
                  src="/logo.png"
                  alt="Rotary Club Logo"
                  width="60px"
                  height="auto"
                  objectFit="contain"
                />
                <Box ml={3} textAlign="left">
                  <Text fontSize="sm" fontWeight="bold" color="brand.500" lineHeight={1.2}>
                    Rotary Club of
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="brand.500" lineHeight={1.2}>
                    Zamboanga City West
                  </Text>
                </Box>
              </Flex>

              {/* Main Title */}
              <Heading 
                as="h1" 
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
                fontWeight="bold" 
                color="brand.500"
                mb={2}
                letterSpacing="tight"
              >
                THE <Text as="span" color="gray.900">FORTRESS</Text>
              </Heading>
              
              <Text 
                fontSize="md" 
                color="gray.600" 
                mb={6}
                fontWeight="medium"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                The Official Publication of the Rotary Club of Zamboanga City West, District 3850, Philippines
              </Text>

              {/* Theme */}
              <Box 
                bg="brand.500" 
                color="white" 
                py={6} 
                px={8} 
                borderRadius="lg" 
                mb={8}
                transform="rotate(-1deg)"
                boxShadow="lg"
              >
                <Heading 
                  as="h2" 
                  fontSize={{ base: "2xl", md: "3xl" }} 
                  fontWeight="bold" 
                  textAlign="center"
                  letterSpacing="wider"
                >
                  UNITE FOR GOOD
                </Heading>
              </Box>

              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.700" 
                lineHeight="relaxed"
                mb={8}
              >
                Feel the spirit of Rotary through stories of fellowship, service, and impact that continue to shape lives in Zamboanga City and across wider communities.
              </Text>
            </Box>

            {/* Right Content - Magazine Cover */}
            <Box flex={1} display="flex" justifyContent="center">
              <Box 
                position="relative"
                bg="white"
                borderRadius="xl"
                boxShadow="2xl"
                p={4}
                maxW="400px"
                w="full"
                transform="rotate(2deg)"
                _hover={{ transform: "rotate(0deg)" }}
                transition="all 0.3s"
              >
                <Box
                  bg="gray.100"
                  borderRadius="lg"
                  aspectRatio="3/4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  position="relative"
                >
                  {/* Mock Magazine Cover */}
                  <Box 
                    position="absolute" 
                    top={0} 
                    left={0} 
                    right={0} 
                    bottom={0}
                    bgGradient="linear(to-b, white 0%, gray.100 100%)"
                  />
                  <Box position="relative" zIndex={2} textAlign="center" p={6}>
                    <Image
                      src="/logo.png"
                      alt="Rotary Logo"
                      width="40px"
                      height="auto"
                      mx="auto"
                      mb={4}
                    />
                    <Text fontSize="2xl" fontWeight="bold" color="brand.500" mb={2}>
                      THE FORTRESS
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="brand.500" mb={4}>
                      UNITE FOR GOOD
                    </Text>
                    <Box 
                      bg="gray.300" 
                      height="120px" 
                      borderRadius="md" 
                      mb={4}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      overflow="hidden"
                    >
                      <Image
                        src="/fort-pilar.png"
                        alt="Fort Pilar - Historic Fortress of Zamboanga"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Box>
                    <Text fontSize="xs" color="gray.600">
                      Official Publication of Rotary Club of Zamboanga City West
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Publication Issues Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="1200px">
          <Box textAlign="center" mb={12}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="gray.900" mb={4}>
              Issues
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="600px" mx="auto">
              Explore our latest publications featuring member stories, project updates, and community impact highlights.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={8}>
            {publicationIssues.map((issue) => (
              <Box 
                key={issue.id} 
                bg="white" 
                borderRadius="2xl" 
                overflow="hidden" 
                boxShadow="lg" 
                border="1px solid" 
                borderColor="gray.200"
                _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
                transition="all 0.3s"
              >
                <Box p={0}>
                  <Flex direction={{ base: "column", md: "row" }} h="full">
                    {/* Cover Image */}
                    <Box 
                      flex="0 0 200px" 
                      position="relative"
                      minH={{ base: "200px", md: "auto" }}
                    >
                      {issue.isFeatured && (
                        <Badge 
                          position="absolute" 
                          top={3} 
                          left={3} 
                          zIndex={2}
                          colorScheme="red" 
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          LATEST
                        </Badge>
                      )}
                      <Image
                        src="/fort-pilar.png"
                        alt={`The Fortress ${issue.issueNumber} Cover`}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.300"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box textAlign="center" color="white">
                          <Text fontSize="lg" fontWeight="bold" mb={1}>
                            THE FORTRESS
                          </Text>
                          <Text fontSize="md" fontWeight="semibold">
                            {issue.issueNumber}
                          </Text>
                        </Box>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box p={6} flex={1} display="flex" flexDirection="column">
                      <Flex align="center" gap={2} mb={3}>
                        <Badge colorScheme="blue" fontSize="xs">
                          {issue.month}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {issue.rotaryYear}
                        </Text>
                      </Flex>

                      <Heading as="h3" fontSize="xl" color="gray.900" mb={4} lineHeight="shorter">
                        {issue.issueNumber}
                      </Heading>

                      <Flex gap={3} align="center">
                        {issue.file && issue.file.url ? (
                          <Button
                            size="sm"
                            bg="brand.500"
                            color="white"
                            _hover={{ bg: "brand.600" }}
                            onClick={() => handleOpenPdfModal(issue)}
                            px={4}
                            py={2}
                            borderRadius="md"
                          >
                            <Flex align="center" gap={2}>
                              <Eye size={16} />
                              Read Online
                            </Flex>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            bg="brand.500"
                            color="white"
                            _hover={{ bg: "brand.600" }}
                            disabled
                            px={4}
                            py={2}
                            borderRadius="md"
                          >
                            <Flex align="center" gap={2}>
                              <Eye size={16} />
                              Coming Soon
                            </Flex>
                          </Button>
                        )}
                        {issue.file && issue.file.url ? (
                          <Link href={issue.file.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="gray"
                              px={4}
                              py={2}
                              borderRadius="md"
                            >
                              <Flex align="center" gap={2}>
                                <Download size={16} />
                                Download
                              </Flex>
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="gray"
                            disabled
                            px={4}
                            py={2}
                            borderRadius="md"
                          >
                            <Flex align="center" gap={2}>
                              <Download size={16} />
                              Download
                            </Flex>
                          </Button>
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* View All Issues */}
          <Box textAlign="center" mt={12}>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Looking for older issues? Our complete archive will be available soon.
            </Text>
            <Button
              size="lg"
              variant="outline"
              colorScheme="brand"
              disabled
            >
              View Complete Archive (Coming Soon)
            </Button>
          </Box>
        </Container>
      </Box>



      {/* PDF Modal */}
      {isModalOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.800"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Box
            bg="white"
            borderRadius="lg"
            maxW="95vw"
            maxH="95vh"
            w="full"
            h="full"
            display="flex"
            flexDirection="column"
            boxShadow="2xl"
          >
            {/* Header */}
            <Flex
              bg="brand.500"
              color="white"
              p={4}
              borderTopRadius="lg"
              align="center"
              justify="space-between"
            >
              <Flex align="center" gap={3}>
                <FileText size={24} />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    The Fortress - {selectedIssueTitle}
                  </Text>
                  <Text fontSize="sm" opacity={0.9}>
                    Official Publication of Rotary Club of Zamboanga City West
                  </Text>
                </Box>
              </Flex>
              <Button
                aria-label="Close modal"
                onClick={handleCloseModal}
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                size="sm"
                minW="auto"
                p={2}
              >
                <X size={20} />
              </Button>
            </Flex>

            {/* PDF Controls */}
            <Flex
              bg="gray.100"
              p={2}
              align="center"
              justify="space-between"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              {/* Page Navigation - only show if using react-pdf with multiple pages */}
              {!useIframeFallback && numPages && numPages > 1 ? (
                <Flex align="center" gap={4} flex={1} justify="center">
                  <Button
                    aria-label="Previous page"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    size="sm"
                    minW="auto"
                    p={2}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Text fontSize="sm" color="gray.600" minW="100px" textAlign="center">
                    Page {pageNumber} of {numPages}
                  </Text>
                  <Button
                    aria-label="Next page"
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    size="sm"
                    minW="auto"
                    p={2}
                  >
                    <ChevronRight size={20} />
                  </Button>
                </Flex>
              ) : (
                <Box flex={1} />
              )}
              
              {/* Viewer Toggle */}
              {selectedPdfUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setUseIframeFallback(!useIframeFallback)}
                  fontSize="xs"
                >
                  {useIframeFallback ? "Try Advanced Viewer" : "Use Browser Viewer"}
                </Button>
              )}
            </Flex>

            {/* PDF Content */}
            <Box
              flex={1}
              overflow="auto"
              bg="gray.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {error ? (
                <Box textAlign="center" p={8}>
                  <FileText size={48} color="#CBD5E0" />
                  <Text color="gray.500" fontSize="lg" mt={4}>
                    {error}
                  </Text>
                  <Link 
                    href={publicationIssues.find(issue => issue.issueNumber === selectedIssueTitle)?.file?.url || ""} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button
                      mt={4}
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: "brand.600" }}
                    >
                      <Flex align="center" gap={2}>
                        <Download size={16} />
                        Download PDF Instead
                      </Flex>
                    </Button>
                  </Link>
                </Box>
              ) : useIframeFallback && selectedPdfUrl ? (
                <Box w="full" h="80vh" position="relative">
                  <iframe
                    src={selectedPdfUrl}
                    width="100%"
                    height="100%"
                    style={{
                      border: "none",
                      borderRadius: "0 0 6px 6px",
                    }}
                    title={`The Fortress - ${selectedIssueTitle}`}
                    onError={() => {
                      console.log('Iframe also failed to load');
                      setError('Unable to display PDF. Please use the download button.');
                    }}
                  />
                  {/* Info overlay */}
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    bg="blackAlpha.700"
                    color="white"
                    px={3}
                    py={2}
                    borderRadius="md"
                    fontSize="sm"
                  >
                    Browser PDF Viewer
                  </Box>
                </Box>
              ) : selectedPdfUrl && isClient && pdfComponentsLoaded && Document && Page ? (
                <Box>
                  <Document
                    file={selectedPdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <Box textAlign="center" p={8}>
                        <Text color="gray.500">Loading PDF...</Text>
                      </Box>
                    }
                    error={
                      <Box textAlign="center" p={8}>
                        <FileText size={48} color="#CBD5E0" />
                        <Text color="gray.500" fontSize="lg" mt={4}>
                          Unable to load PDF viewer
                        </Text>
                        <Text color="gray.400" fontSize="sm" mt={2}>
                          This might be due to browser security restrictions
                        </Text>
                        <Link 
                          href={publicationIssues.find(issue => issue.issueNumber === selectedIssueTitle)?.file?.url || ""} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button
                            mt={4}
                            bg="brand.500"
                            color="white"
                            _hover={{ bg: "brand.600" }}
                          >
                            <Flex align="center" gap={2}>
                              <Download size={16} />
                              Download PDF Instead
                            </Flex>
                          </Button>
                        </Link>
                      </Box>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 800) : 800}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      loading={
                        <Box textAlign="center" p={4}>
                          <Text color="gray.500">Loading page...</Text>
                        </Box>
                      }
                      error={
                        <Box textAlign="center" p={4}>
                          <Text color="gray.500" fontSize="sm">
                            Page failed to load
                          </Text>
                        </Box>
                      }
                    />
                  </Document>
                </Box>
              ) : selectedPdfUrl && (!pdfComponentsLoaded || !isClient) ? (
                <Box textAlign="center" p={8}>
                  <FileText size={48} color="#CBD5E0" />
                  <Text color="gray.500" fontSize="lg" mt={4}>
                    Loading PDF viewer...
                  </Text>
                </Box>
              ) : (
                <Box textAlign="center" p={8}>
                  <FileText size={48} color="#CBD5E0" />
                  <Text color="gray.500" fontSize="lg" mt={4}>
                    No PDF to display
                  </Text>
                </Box>
              )}

              {/* Download Button */}
              {selectedPdfUrl && !error && (
                <Box
                  position="absolute"
                  bottom={4}
                  right={4}
                  zIndex={10}
                >
                  <Link 
                    href={publicationIssues.find(issue => issue.issueNumber === selectedIssueTitle)?.file?.url || ""} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="solid"
                      bg="white"
                      color="brand.500"
                      boxShadow="lg"
                      _hover={{ bg: "gray.100" }}
                    >
                      <Flex align="center" gap={2}>
                        <Download size={16} />
                        Download
                      </Flex>
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
} 