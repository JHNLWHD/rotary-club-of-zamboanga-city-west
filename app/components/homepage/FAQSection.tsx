import { Box, Heading, Text } from "@chakra-ui/react";
import { SectionHeader } from "../ui/SectionHeader";

type FAQ = {
  q: string;
  a: string;
};

type FAQSectionProps = {
  faqs: FAQ[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <Box as="section" py={20} bg="white" id="faq">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SectionHeader 
          subtitle="Common Questions"
          title="Frequently Asked Questions"
          description="Find answers to common questions about joining our club and getting involved in our community projects."
        />

        <Box display="flex" flexDirection="column" gap={4} maxW="800px" mx="auto">
          {faqs.map((faq, idx) => (
            <Box 
              as="article" 
              key={idx} 
              bg="white" 
              p={6} 
              borderRadius="xl" 
              boxShadow="0 4px 15px rgba(0,0,0,0.05)"
              border="1px solid"
              borderColor="gray.100"
              _hover={{ 
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                transform: "translateY(-2px)"
              }}
              transition="all 0.3s ease"
            >
              <Heading as="h3" fontWeight="bold" color="gray.900" mb={3} fontSize="lg">
                {faq.q}
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                {faq.a}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 