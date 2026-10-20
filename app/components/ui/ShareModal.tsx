import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Input,
  Grid,
  VStack,
  HStack,
  IconButton,
  Dialog,
  Portal
} from '@chakra-ui/react';
import { X, Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from 'react-share';

type ShareableContent = {
  title: string;
  description: string;
  date: string;
  venue: string;
  shareableLink: string;
  time?: string; // Optional for projects
  category?: string; // Optional for projects
};

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: ShareableContent | null;
  contentType: 'event' | 'project';
};

function ShareModal({ isOpen, onClose, content, contentType }: ShareModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!content) return null;

  const copyToClipboard = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(content.shareableLink);
        toast.success(`${contentType === 'event' ? 'Event' : 'Project'} link copied to clipboard!`);
      } else {
        // Fallback for browsers without clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = content.shareableLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success(`${contentType === 'event' ? 'Event' : 'Project'} link copied to clipboard!`);
      }
    } catch (error) {
      toast.error('Failed to copy link to clipboard');
    }
    onClose();
  };

  const formatDate = (date: string) => {
    // Ensure consistent date formatting for hydration
    if (!isMounted) {
      // Return a consistent fallback for SSR
      return 'Loading...';
    }
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const getShareTitle = () => {
    return contentType === 'event' ? 'Share Event' : 'Share Project';
  };

  const getWhatsappMessage = () => {
    const baseMessage = `${content.title} - ${content.description}`;
    const details = `\n\n📅 ${formatDate(content.date)}${content.time ? `\n⏰ ${content.time}` : ''}\n📍 ${content.venue}`;
    return baseMessage + details;
  };

  const getEmailBody = () => {
    const baseBody = `Hi there!\n\nI'd like to share with you ${contentType === 'event' ? 'this event' : 'this project'}: ${content.title}.\n\n${content.description}\n\nDetails:\n📅 Date: ${formatDate(content.date)}${content.time ? `\n⏰ Time: ${content.time}` : ''}\n📍 Venue: ${content.venue}\n\nFor more information, please visit:`;
    return baseBody;
  };

  const getEmailSubject = () => {
    return `${content.title} - Rotary Club of Zamboanga City West`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={({ open }) => { if (!open) onClose(); }} placement="center" lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={4}>
          <Dialog.Content
            bg="white"
            borderRadius="lg"
            p={6}
            maxW="md"
            w="full"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Dialog.Title asChild><Heading as="h2" size="md">{getShareTitle()}</Heading></Dialog.Title>
              <IconButton
                aria-label="Close"
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X size={16} />
              </IconButton>
            </Flex>

            <VStack gap={4} align="stretch">
              <Box>
                <Text fontSize="sm" color="gray.600" mb={3}>Share on social media:</Text>
                <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                  <FacebookShareButton
                    aria-label="Share on Facebook"
                    url={content.shareableLink}
                    hashtag="#RotaryZamboangaCityWest"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    aria-label="Share on X"
                    url={content.shareableLink}
                    title={`${content.title} - ${content.description}`}
                    hashtags={['RotaryZamboangaCityWest', contentType === 'event' ? 'RotaryEvent' : 'RotaryProject', 'ServiceAboveSelf']}
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    aria-label="Share on WhatsApp"
                    url={content.shareableLink}
                    title={getWhatsappMessage()}
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>

                  <TelegramShareButton
                    aria-label="Share on Telegram"
                    url={content.shareableLink}
                    title={`${content.title} - ${content.description}`}
                  >
                    <TelegramIcon size={40} round />
                  </TelegramShareButton>

                  <EmailShareButton
                    aria-label="Share by email"
                    url={content.shareableLink}
                    subject={getEmailSubject()}
                    body={getEmailBody()}
                  >
                    <EmailIcon size={40} round />
                  </EmailShareButton>
                </Grid>
              </Box>

              <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                <Text fontSize="sm" color="gray.600" mb={2}>Or copy link:</Text>
                <HStack gap={2}>
                  <Input
                    aria-label="Share link"
                    value={content.shareableLink}
                    readOnly
                    fontSize="sm"
                    bg="gray.50"
                    flex={1}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    <Copy size={16} />
                    Copy
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ShareModal;
