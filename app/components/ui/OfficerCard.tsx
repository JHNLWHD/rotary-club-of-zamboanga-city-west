import { Box, Heading, Text } from "@chakra-ui/react";
import type { Officer } from "~/lib/contentful-types";
import { Users } from "lucide-react";

export function OfficerCard({ officer }: { officer: Officer }): JSX.Element {
    return (
        <Box
            as="article"
            key={officer.name}
            textAlign="center"
            bg="white"
            borderRadius="2xl"
            p={6}
            _hover={{
                bg: "gray.50",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                transform: "translateY(-4px)"
            }}
            transition="all 0.3s ease"
            border="1px solid"
            borderColor="gray.100"
            boxShadow="0 4px 15px rgba(0,0,0,0.05)"
        >
            <Box position="relative" mb={4}>
                <Box
                    borderRadius="full"
                    boxSize="100px"
                    mx="auto"
                    border="4px solid"
                    borderColor="brand.500"
                    bgGradient="linear(to-br, gray.100, gray.200)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ transform: "scale(1.05)" }}
                    transition="transform 0.2s"
                >
                    <Users size={40} color="#005DAA" />
                </Box>
            </Box>
            <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold" mb={1} lineHeight="shorter">
                {officer.name}
            </Heading>
            <Text color="brand.500" fontWeight="bold" fontSize="sm" mb={1}>
                {officer.role}
            </Text>
            {officer.designation && (
                <Text color="gray.600" fontSize="xs">
                    {officer.designation}
                </Text>
            )}
        </Box>
    );
}