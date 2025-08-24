import React from 'react';
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
  IconButton 
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
  if (!isOpen || !content) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content.shareableLink);
    toast.success(`${contentType === 'event' ? 'Event' : 'Project'} link copied to clipboard!`);
    onClose();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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
    <Box 
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.500"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      onClick={onClose}
    >
      <Box 
        bg="white" 
        borderRadius="lg" 
        p={6} 
        maxW="md" 
        w="full"
        onClick={(e) => e.stopPropagation()}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h3" size="md">{getShareTitle()}</Heading>
          <IconButton
            aria-label="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
            icon={<X size={16} />}
          />
        </Flex>
        
        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="sm" color="gray.600" mb={3}>Share on social media:</Text>
            <Grid templateColumns="repeat(5, 1fr)" gap={3}>
              <FacebookShareButton
                url={content.shareableLink}
                hashtag="#RotaryZamboangaCityWest"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              
              <TwitterShareButton
                url={content.shareableLink}
                title={`${content.title} - ${content.description}`}
                hashtags={['RotaryZamboangaCityWest', contentType === 'event' ? 'RotaryEvent' : 'RotaryProject', 'ServiceAboveSelf']}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              
              <WhatsappShareButton
                url={content.shareableLink}
                title={getWhatsappMessage()}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              
              <TelegramShareButton
                url={content.shareableLink}
                title={`${content.title} - ${content.description}`}
              >
                <TelegramIcon size={40} round />
              </TelegramShareButton>
              
              <EmailShareButton
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
                leftIcon={<Copy size={16} />}
              >
                Copy
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default ShareModal;
