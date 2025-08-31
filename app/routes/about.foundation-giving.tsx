import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  SimpleGrid,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { Target, Shield, BookOpen, Users, TrendingUp, Globe, Award, DollarSign } from "lucide-react";
import { PageHero } from "~/components/ui/PageHero";
import { Chart, useChart } from "@chakra-ui/charts";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";
import { useLoaderData } from "react-router";
import { fetchFoundationGiving } from "~/lib/contentful-api";
import type { FoundationGiving } from "~/lib/contentful-types";

export function meta() {
  return [
    { title: "The Rotary Foundation Giving | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Learn about The Rotary Foundation funds including Annual Fund, Polio Plus Fund, Other Fund, and Endowment Fund. Understand how your contributions support global humanitarian efforts." },
    { name: "keywords", content: "Rotary Foundation, Annual Fund, Polio Plus Fund, SHARE, World Fund, Areas of Focus, Global Grants, Endowment Fund" },
    
    // Open Graph tags
    { property: "og:title", content: "The Rotary Foundation Giving | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Learn about The Rotary Foundation funds and how your contributions support global humanitarian efforts." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/foundation-giving" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org/about/foundation-giving" },
  ];
}

export async function loader() {
  try {
    const foundationGiving = await fetchFoundationGiving();
    return { foundationGiving };
  } catch (error) {
    console.error('Error loading foundation giving data:', error);
    return { foundationGiving: [] };
  }
}

export default function FoundationGiving() {
  const { foundationGiving } = useLoaderData<typeof loader>();

  const foundationStats = [
    {
      icon: <Target size={24} color="white" />,
      value: "4",
      label: "Fund Types"
    },
    {
      icon: <Globe size={24} color="white" />,
      value: "200+",
      label: "Countries Served"
    },
    {
      icon: <Award size={24} color="white" />,
      value: "100%",
      label: "Fund Efficiency"
    },
    {
      icon: <DollarSign size={24} color="white" />,
      value: "SHARE",
      label: "District Impact"
    }
  ];

  // Use Contentful data or fallback to empty array
  const chartData = foundationGiving.length > 0 ? foundationGiving : [];

  // Chart configurations for each fund type
  const annualFundChart = useChart({
    data: chartData,
    series: [{ name: "annualFund", color: "blue.500" }]
  });

  const polioPlusChart = useChart({
    data: chartData,
    series: [{ name: "polioPlus", color: "red.500" }]
  });

  const otherFundChart = useChart({
    data: chartData,
    series: [{ name: "otherFund", color: "green.500" }]
  });

  const endowmentChart = useChart({
    data: chartData,
    series: [{ name: "endowment", color: "purple.500" }]
  });

  // Calculate totals for summary statistics
  const totalAnnualFund = chartData.reduce((sum, item) => sum + (item.annualFund || 0), 0);
  const totalPolioPlus = chartData.reduce((sum, item) => sum + (item.polioPlus || 0), 0);
  const totalOtherFund = chartData.reduce((sum, item) => sum + (item.otherFund || 0), 0);
  const totalEndowment = chartData.reduce((sum, item) => sum + (item.endowment || 0), 0);

  return (
    <>
      <PageHero
        title="The Rotary Foundation Giving"
        description="Understanding the four main fund types that power The Rotary Foundation's global humanitarian efforts and how your contributions create lasting impact."
        stats={foundationStats}
        backgroundGradient="linear-gradient(135deg, #005DAA 0%, #003d73 50%, #002147 100%)"
      />

      <Container maxW="1200px" py={{ base: 16, md: 20 }}>
        <Stack gap={12}>
          {/* Fund Types Overview */}
          <Box textAlign="center">
            <Heading 
              as="h2" 
              fontSize={{ base: "3xl", md: "4xl" }} 
              fontWeight="bold" 
              color="gray.900"
              mb={6}
            >
              Foundation Fund Types
            </Heading>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="800px" 
              mx="auto"
              lineHeight="relaxed"
            >
              The Rotary Foundation operates through four distinct fund types, each designed to maximize the impact 
              of your contributions and support specific humanitarian initiatives worldwide.
            </Text>
          </Box>

          {/* Fund Types Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
            {/* Annual Fund */}
            <Box 
              bg="blue.50"
              p={8}
              borderRadius="xl"
              border="2px solid"
              borderColor="blue.200"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={4}>
                <Icon as={Target} w={8} h={8} color="blue.500" />
                <Heading as="h3" fontSize="2xl" color="gray.900">
                  Annual Fund
                </Heading>
                <Badge colorScheme="blue" variant="solid" fontSize="sm">
                  Primary Fund
                </Badge>
              </Box>
              
              <Stack gap={4} textAlign="left">
                <Text color="gray.700" fontWeight="medium">
                  Designations include:
                </Text>
                <Box pl={4}>
                  <Text color="gray.600" mb={2}>• SHARE, World Fund, Areas of Focus, and Disaster Response</Text>
                  <Text color="gray.600" mb={2}>• SHARE contributions:</Text>
                  <Box pl={4}>
                    <Text color="gray.600">- 47.5% to District Designated Fund</Text>
                    <Text color="gray.600">- 47.5% to World Fund</Text>
                  </Box>
                </Box>
                
                <Box borderTop="1px solid" borderColor="gray.200" my={4} />
                
                <Box>
                  <Text color="green.600" fontWeight="semibold" mb={2}>✓ Counts toward Club and District Annual Fund Goal</Text>
                  <Text color="green.600" fontWeight="semibold" mb={2}>✓ Counts toward Annual Fund Per Capita</Text>
                  <Text color="green.600" fontWeight="semibold">✓ PHF recognition available</Text>
                </Box>
                
                <Text color="gray.500" fontSize="sm" fontStyle="italic">
                  Note: Will not match the SHARE Reports
                </Text>
              </Stack>
            </Box>

            {/* Polio Plus Fund */}
            <Box 
              bg="red.50"
              p={8}
              borderRadius="xl"
              border="2px solid"
              borderColor="red.200"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={4}>
                <Icon as={Shield} w={8} h={8} color="red.500" />
                <Heading as="h3" fontSize="2xl" color="gray.900">
                  Polio Plus Fund
                </Heading>
                <Badge colorScheme="red" variant="solid" fontSize="sm">
                  Eradication
                </Badge>
              </Box>
              
              <Stack gap={4} textAlign="left">
                <Text color="gray.700" fontWeight="medium">
                  Supports polio eradication through:
                </Text>
                <Box pl={4}>
                  <Text color="gray.600" mb={2}>• PolioPlus</Text>
                  <Text color="gray.600" mb={2}>• PolioPlus Partners</Text>
                  <Text color="gray.600">• Ride to End Polio</Text>
                </Box>
                
                <Box borderTop="1px solid" borderColor="gray.200" my={4} />
                
                <Box>
                  <Text color="red.600" fontWeight="semibold" mb={2}>✗ Does not count towards Club or District Annual Fund Goal</Text>
                  <Text color="red.600" fontWeight="semibold">✗ Does not count towards Annual Fund Per Capita</Text>
                </Box>
              </Stack>
            </Box>

            {/* Other Fund */}
            <Box 
              bg="green.50"
              p={8}
              borderRadius="xl"
              border="2px solid"
              borderColor="green.200"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={4}>
                <Icon as={BookOpen} w={8} h={8} color="green.500" />
                <Heading as="h3" fontSize="2xl" color="gray.900">
                  Other Fund
                </Heading>
                <Badge colorScheme="green" variant="solid" fontSize="sm">
                  Programs
                </Badge>
              </Box>
              
              <Stack gap={4} textAlign="left">
                <Text color="gray.700" fontWeight="medium">
                  Supports programs selected by donor:
                </Text>
                <Box pl={4}>
                  <Text color="gray.600" mb={2}>• Matching Grants</Text>
                  <Text color="gray.600" mb={2}>• Global Grants</Text>
                  <Text color="gray.600">• Other Approved Programs</Text>
                </Box>
                
                <Box borderTop="1px solid" borderColor="gray.200" my={4} />
                
                <Box>
                  <Text color="red.600" fontWeight="semibold" mb={2}>✗ Does not count towards Club or District Annual Fund Goal</Text>
                  <Text color="red.600" fontWeight="semibold">✗ Does not count towards Annual Fund Per Capita</Text>
                </Box>
              </Stack>
            </Box>

            {/* Endowment Fund */}
            <Box 
              bg="purple.50"
              p={8}
              borderRadius="xl"
              border="2px solid"
              borderColor="purple.200"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={4}>
                <Icon as={Users} w={8} h={8} color="purple.500" />
                <Heading as="h3" fontSize="2xl" color="gray.900">
                  Endowment Fund
                </Heading>
                <Badge colorScheme="purple" variant="solid" fontSize="sm">
                  Perpetual
                </Badge>
              </Box>
              
              <Stack gap={4} textAlign="left">
                <Text color="gray.700" fontWeight="medium">
                  Contributions are invested in perpetuity:
                </Text>
                <Box pl={4}>
                  <Text color="gray.600" mb={2}>• Spendable Earnings used on programs</Text>
                  <Text color="gray.600" mb={2}>• Donor can designate spendable earnings for:</Text>
                  <Box pl={4}>
                    <Text color="gray.600">- Areas of Focus</Text>
                    <Text color="gray.600">- Rotary Peace Centers</Text>
                    <Text color="gray.600">- SHARE</Text>
                    <Text color="gray.600">- World Fund</Text>
                  </Box>
                </Box>
                
                <Box borderTop="1px solid" borderColor="gray.200" my={4} />
                
                <Box>
                  <Text color="green.600" fontWeight="semibold" mb={2}>✓ Benefactor recognition available</Text>
                  <Text color="red.600" fontWeight="semibold" mb={2}>✗ PHF recognition is not available</Text>
                  <Text color="red.600" fontWeight="semibold">✗ Does not count towards Club or District Annual Fund Goal</Text>
                </Box>
              </Stack>
            </Box>
          </SimpleGrid>

          {/* Foundation Giving Charts - One per Fund Type */}
          {chartData.length > 0 ? (
            <Box>
              <Box textAlign="center" mb={8}>
                <Heading 
                  as="h3" 
                  fontSize={{ base: "2xl", md: "3xl" }} 
                  fontWeight="bold" 
                  color="gray.900"
                  mb={4}
                >
                  Foundation Giving by Fund Type
                </Heading>
                <Text 
                  fontSize={{ base: "md", md: "lg" }} 
                  color="gray.600" 
                  maxW="700px" 
                  mx="auto"
                >
                  Track our club's contributions to each fund type across different Rotary Years.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
                {/* Annual Fund Chart */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="xl" 
                  border="1px solid" 
                  borderColor="blue.200"
                  shadow="sm"
                >
                  <Heading as="h4" fontSize="lg" color="blue.600" mb={4} textAlign="center">
                    Annual Fund Contributions
                  </Heading>
                  <ResponsiveContainer width="100%" height={300}>
                    <Chart.Root chart={annualFundChart}>
                      <BarChart data={annualFundChart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={annualFundChart.color("border.muted")} />
                        <XAxis 
                          dataKey={(entry) => `${entry.startYear}-${entry.endYear}`}
                          stroke={annualFundChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <YAxis 
                          tickFormatter={annualFundChart.formatNumber({ maximumFractionDigits: 0 })}
                          stroke={annualFundChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          labelStyle={{ color: annualFundChart.color("fg.default") }}
                        />
                        <Bar
                          dataKey="annualFund"
                          fill={annualFundChart.color("blue.500")}
                          radius={[4, 4, 0, 0]}
                        >
                          <LabelList 
                            dataKey="annualFund" 
                            position="top" 
                            formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                            fontSize={11}
                            fill="#1A365D"
                            fontWeight="medium"
                          />
                        </Bar>
                      </BarChart>
                    </Chart.Root>
                  </ResponsiveContainer>
                </Box>

                {/* Polio Plus Fund Chart */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="xl" 
                  border="1px solid" 
                  borderColor="red.200"
                  shadow="sm"
                >
                  <Heading as="h4" fontSize="lg" color="red.600" mb={4} textAlign="center">
                    Polio Plus Fund Contributions
                  </Heading>
                  <ResponsiveContainer width="100%" height={300}>
                    <Chart.Root chart={polioPlusChart}>
                      <BarChart data={polioPlusChart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={polioPlusChart.color("border.muted")} />
                        <XAxis 
                          dataKey={(entry) => `${entry.startYear}-${entry.endYear}`}
                          stroke={polioPlusChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <YAxis 
                          tickFormatter={polioPlusChart.formatNumber({ maximumFractionDigits: 0 })}
                          stroke={polioPlusChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          labelStyle={{ color: polioPlusChart.color("fg.default") }}
                        />
                        <Bar
                          dataKey="polioPlus"
                          fill={polioPlusChart.color("red.500")}
                          radius={[4, 4, 0, 0]}
                        >
                          <LabelList 
                            dataKey="polioPlus" 
                            position="top" 
                            formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                            fontSize={11}
                            fill="#C53030"
                            fontWeight="medium"
                        />
                        </Bar>
                      </BarChart>
                    </Chart.Root>
                  </ResponsiveContainer>
                </Box>

                {/* Other Fund Chart */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="xl" 
                  border="1px solid" 
                  borderColor="green.200"
                  shadow="sm"
                >
                  <Heading as="h4" fontSize="lg" color="green.600" mb={4} textAlign="center">
                    Other Fund Contributions
                  </Heading>
                  <ResponsiveContainer width="100%" height={300}>
                    <Chart.Root chart={otherFundChart}>
                      <BarChart data={otherFundChart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={otherFundChart.color("border.muted")} />
                        <XAxis 
                          dataKey={(entry) => `${entry.startYear}-${entry.endYear}`}
                          stroke={otherFundChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <YAxis 
                          tickFormatter={otherFundChart.formatNumber({ maximumFractionDigits: 0 })}
                          stroke={otherFundChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          labelStyle={{ color: otherFundChart.color("fg.muted") }}
                        />
                        <Bar
                          dataKey="otherFund"
                          fill={otherFundChart.color("green.500")}
                          radius={[4, 4, 0, 0]}
                        >
                          <LabelList 
                            dataKey="otherFund" 
                            position="top" 
                            formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                            fontSize={11}
                            fill="#22543D"
                            fontWeight="medium"
                          />
                        </Bar>
                      </BarChart>
                    </Chart.Root>
                  </ResponsiveContainer>
                </Box>

                {/* Endowment Fund Chart */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="xl" 
                  border="1px solid" 
                  borderColor="purple.200"
                  shadow="sm"
                >
                  <Heading as="h4" fontSize="lg" color="purple.600" mb={4} textAlign="center">
                    Endowment Fund Contributions
                  </Heading>
                  <ResponsiveContainer width="100%" height={300}>
                    <Chart.Root chart={endowmentChart}>
                      <BarChart data={endowmentChart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={endowmentChart.color("border.muted")} />
                        <XAxis 
                          dataKey={(entry) => `${entry.startYear}-${entry.endYear}`}
                          stroke={endowmentChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <YAxis 
                          tickFormatter={endowmentChart.formatNumber({ maximumFractionDigits: 0 })}
                          stroke={endowmentChart.color("fg.muted")}
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          labelStyle={{ color: endowmentChart.color("fg.default") }}
                        />
                        <Bar
                          dataKey="endowment"
                          fill={endowmentChart.color("purple.500")}
                          radius={[4, 4, 0, 0]}
                        >
                          <LabelList 
                            dataKey="endowment" 
                            position="top" 
                            formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                            fontSize={11}
                            fill="#553C9A"
                            fontWeight="medium"
                          />
                        </Bar>
                      </BarChart>
                    </Chart.Root>
                  </ResponsiveContainer>
                </Box>
              </SimpleGrid>
            </Box>
          ) : (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" color="gray.600">
                Foundation giving data will be available soon.
              </Text>
            </Box>
          )}

          {/* Summary Statistics */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            <Box 
              bg="blue.50" 
              p={6} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="blue.200"
              textAlign="center"
            >
              <Icon as={TrendingUp} w={8} h={8} color="blue.500" mb={3} />
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                ${totalAnnualFund.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="blue.700" fontWeight="medium">
                Total Annual Fund
              </Text>
            </Box>
            
            <Box 
              bg="red.50" 
              p={6} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="red.200"
              textAlign="center"
            >
              <Icon as={Shield} w={8} h={8} color="red.500" mb={3} />
              <Text fontSize="2xl" fontWeight="bold" color="red.600">
                ${totalPolioPlus.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="red.700" fontWeight="medium">
                Total Polio Plus
              </Text>
            </Box>
            
            <Box 
              bg="green.50" 
              p={6} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="green.200"
              textAlign="center"
            >
              <Icon as={BookOpen} w={8} h={8} color="green.500" mb={3} />
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                ${totalOtherFund.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="green.700" fontWeight="medium">
                Total Other Fund
              </Text>
            </Box>
            
            <Box 
              bg="purple.50" 
              p={6} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="purple.200"
              textAlign="center"
            >
              <Icon as={Users} w={8} h={8} color="purple.500" mb={3} />
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                ${totalEndowment.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="purple.700" fontWeight="medium">
                Total Endowment
              </Text>
            </Box>
          </SimpleGrid>

          {/* SHARE Program Highlight */}
          <Box 
            bg="gold.50"
            p={8}
            borderRadius="xl"
            border="2px solid"
            borderColor="gold.200"
            textAlign="center"
          >
            <Heading as="h3" fontSize="2xl" color="gray.900" mb={4}>
              Understanding SHARE
            </Heading>
            <Text color="gray.700" fontSize="lg" mb={4}>
              SHARE (Sharing, Helping, Assisting, Reaching, Empowering) is The Rotary Foundation's 
              program that returns a portion of your Annual Fund contributions to your district for 
              local and international projects.
            </Text>
            <Text color="gray.600">
              Your SHARE contributions are split: 47.5% stays in your district for local projects, 
              while 47.5% goes to the World Fund for global humanitarian efforts.
            </Text>
          </Box>

          {/* Call to Action */}
          <Box 
            bg="gray.50"
            p={8}
            borderRadius="xl"
            border="2px solid"
            borderColor="gray.200"
            textAlign="center"
          >
            <Heading as="h3" fontSize="2xl" color="gray.900" mb={4}>
              Choose Your Impact
            </Heading>
            <Text color="gray.700" fontSize="lg" mb={6}>
              Each fund type serves a specific purpose in advancing Rotary's mission. Whether you choose 
              the Annual Fund for maximum local and global impact, support polio eradication, fund specific 
              programs, or create a lasting legacy through the Endowment Fund, your contribution makes a difference.
            </Text>
            <Text color="gray.600" fontSize="md">
              Contact our club leadership to learn more about how to contribute to these funds and maximize your impact.
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
} 