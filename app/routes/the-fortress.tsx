import { Box, Button, Container, Dialog, Flex, Heading, Link, Portal, SimpleGrid, Text } from "@chakra-ui/react";
import { lazy, Suspense, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { fetchTheFortress } from "../lib/contentful-api";
import type { FortressIssue } from "../lib/contentful-types";
import "../styles/react-pdf.css";

type ReaderProps = {
  url: string;
  pageNumber: number;
  onLoad: (result: { numPages: number }) => void;
  onError: (error: Error) => void;
};

// Load the PDF library only when a visitor opens an issue.
const PdfReader = lazy(() => import("react-pdf").then(({ Document, Page, pdfjs }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return {
    default: function Reader({ url, pageNumber, onLoad, onError }: ReaderProps) {
      return (
        <Document file={url} onLoadSuccess={onLoad} onLoadError={onError} loading={<Text p={6}>Loading publication…</Text>}>
          <Page pageNumber={pageNumber} width={800} renderAnnotationLayer={false} renderTextLayer={false} />
        </Document>
      );
    },
  };
}).catch(() => ({
  default: function UnavailableReader(_props: ReaderProps) {
    return <Text role="alert" p={6}>The page reader is unavailable. Use the browser viewer or open the PDF below.</Text>;
  },
})));

export async function loader() {
  try {
    return { fortressIssues: await fetchTheFortress() || [] };
  } catch (error) {
    console.error("Error loading fortress data on server:", error);
    return { fortressIssues: [] };
  }
}

export function meta() {
  return [
    { title: "The Fortress | Official Publication of Rotary Club of Zamboanga City West" },
    { name: "description", content: "Read The Fortress, the club’s publication of project updates, member stories, and fellowship in Zamboanga City." },
    { property: "og:title", content: "The Fortress | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Published issues of the club’s official newsletter." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/the-fortress" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { tagName: "link", rel: "canonical", href: "https://rotaryzcwest.org/the-fortress" },
  ];
}

export default function TheFortress() {
  const { fortressIssues } = useLoaderData<typeof loader>();
  const publicationIssues = [...fortressIssues].sort((a, b) =>
    b.rotaryYear.localeCompare(a.rotaryYear, undefined, { numeric: true }) ||
    b.issueNumber.localeCompare(a.issueNumber, undefined, { numeric: true })
  );
  const [selectedIssue, setSelectedIssue] = useState<FortressIssue | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [browserViewer, setBrowserViewer] = useState(false);
  const [readerError, setReaderError] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const readerTrigger = useRef<HTMLButtonElement | null>(null);
  const readerBody = useRef<HTMLDivElement>(null);

  function openIssue(issue: FortressIssue, trigger: HTMLButtonElement) {
    readerTrigger.current = trigger;
    setPageNumber(1);
    setNumPages(0);
    setBrowserViewer(false);
    setReaderError(false);
    setSelectedIssue(issue);
  }

  function changePage(page: number) {
    setPageNumber(page);
    readerBody.current?.scrollTo({ top: 0 });
  }

  return (
    <Box>
      <PageHero title="The Fortress" description="The official publication of Rotary Club of Zamboanga City West. Read project updates, member stories, and news from the club." />

      <Container maxW="1200px" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Heading as="h2" fontSize="2xl" color="brand.900" mb={3}>Published issues</Heading>
        <Text color="gray.600" mb={8}>Each issue is labeled with its publication month and Rotary Year.</Text>
        {publicationIssues.length ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 8 }}>
            {publicationIssues.map((issue) => (
              <Box as="article" key={issue.id} bg="#f7f5f0" p={{ base: 5, md: 7 }}>
                <Text color="brand.700" fontSize="xs" fontWeight="bold" letterSpacing="0.1em" textTransform="uppercase" mb={3}>{issue.rotaryYear}</Text>
                <Heading as="h3" fontSize="xl" color="brand.900" lineHeight="1.3">{issue.issueNumber}</Heading>
                <Text color="gray.600" mt={2}>{issue.month}</Text>
                {issue.file?.url ? (
                  <Flex gap={5} align="center" mt={6} wrap="wrap">
                    <Button bg="brand.500" color="white" px={5} h="44px" onClick={(event) => openIssue(issue, event.currentTarget)} _hover={{ bg: "brand.700" }}>Read online</Button>
                    <Link href={issue.file.url} target="_blank" rel="noopener noreferrer" color="brand.700" fontWeight="bold" gap={2}>
                      <Download size={17} aria-hidden="true" /> Open PDF
                    </Link>
                  </Flex>
                ) : (
                  <Text color="gray.600" mt={6}>The PDF for this issue is not available yet.</Text>
                )}
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.700">No issues are currently published. Please check back for the club’s next update.</Text>
        )}
      </Container>

      <Dialog.Root open={Boolean(selectedIssue)} onOpenChange={({ open }) => { if (!open) setSelectedIssue(null); }} placement="center" lazyMount unmountOnExit initialFocusEl={() => closeButton.current} finalFocusEl={() => readerTrigger.current}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner p={{ base: 2, md: 6 }}>
            <Dialog.Content maxW="960px" w="full" h="90dvh" maxH="90dvh" m={0} overflow="hidden" bg="#f7f5f0">
              <Dialog.Header p={4} pr={14} flexDirection="column" gap={1}>
                <Dialog.Title color="brand.900" fontSize={{ base: "md", md: "xl" }}>The Fortress — {selectedIssue?.issueNumber}</Dialog.Title>
                <Dialog.Description color="gray.600" fontSize="sm">{selectedIssue?.month}</Dialog.Description>
              </Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <Button ref={closeButton} aria-label="Close publication" position="absolute" top={3} right={3} variant="ghost" minW="44px" h="44px" p={2}><X size={20} aria-hidden="true" /></Button>
              </Dialog.CloseTrigger>

              <Flex px={3} pb={3} gap={3} align="center" justify="space-between" wrap="wrap">
                {!browserViewer && numPages > 0 && (
                  <Flex gap={2} align="center">
                    <Button aria-label="Previous page" onClick={() => changePage(pageNumber - 1)} disabled={pageNumber <= 1} variant="ghost" minW="44px" p={2}><ChevronLeft size={20} /></Button>
                    <Text aria-live="polite" fontSize="sm">Page {pageNumber} of {numPages}</Text>
                    <Button aria-label="Next page" onClick={() => changePage(pageNumber + 1)} disabled={pageNumber >= numPages} variant="ghost" minW="44px" p={2}><ChevronRight size={20} /></Button>
                  </Flex>
                )}
                <Button variant="ghost" fontSize="sm" onClick={() => { setReaderError(false); setBrowserViewer(!browserViewer); }}>
                  {browserViewer ? "Use page reader" : "Use browser viewer"}
                </Button>
              </Flex>
              {readerError && <Text role="status" px={4} pb={3} fontSize="sm">The page reader could not load this file. Use the browser viewer or open the PDF below.</Text>}
              <Dialog.Body ref={readerBody} overflow="auto" p={0} minH={0} bg="white">
                {selectedIssue?.file?.url && (browserViewer ? (
                  <iframe src={selectedIssue.file.url} title={`The Fortress — ${selectedIssue.issueNumber}`} width="100%" height="100%" style={{ border: 0, minHeight: "55vh" }} />
                ) : (
                  <Box maxW="800px" w="full" mx="auto">
                    <Suspense fallback={<Text p={6} role="status">Loading publication…</Text>}>
                      <PdfReader url={selectedIssue.file.url} pageNumber={pageNumber} onLoad={({ numPages }) => setNumPages(numPages)} onError={() => { setReaderError(true); setBrowserViewer(true); }} />
                    </Suspense>
                  </Box>
                ))}
              </Dialog.Body>
              <Dialog.Footer p={4}>
                <Link href={selectedIssue?.file?.url} target="_blank" rel="noopener noreferrer" color="brand.700" fontWeight="bold" gap={2}><Download size={17} aria-hidden="true" /> Open PDF in a new tab</Link>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
