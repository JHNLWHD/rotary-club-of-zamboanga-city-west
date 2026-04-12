import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
} from "@chakra-ui/react";
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
} from "recharts";
import { useLoaderData } from "react-router";
import { useMemo } from "react";
import { Target, Globe, Award, DollarSign } from "lucide-react";
import { fetchFoundationGiving } from "~/lib/contentful-api";
import type { FoundationGiving } from "~/lib/contentful-types";
import { MarkdownProse } from "~/components/ui/MarkdownProse";
import {
  foundationGivingDefinitionOfTermsAnnualFundMarkdown,
  foundationGivingDefinitionOfTermsEndowmentMarkdown,
  foundationGivingDefinitionOfTermsIntroMarkdown,
  foundationGivingDefinitionOfTermsOtherMarkdown,
  foundationGivingDefinitionOfTermsPolioPlusMarkdown,
} from "~/data/foundation-giving-definition-of-terms";

export function meta() {
  return [
    { title: "The Rotary Foundation Giving | Rotary Club of Zamboanga City West" },
    { name: "description", content: "Learn about The Rotary Foundation funds including Annual Fund, Polio Plus Fund, Other Fund, and Endowment Fund. Understand how your contributions support global humanitarian efforts." },
    { name: "keywords", content: "Rotary Foundation, Annual Fund, Polio Plus Fund, SHARE, World Fund, Areas of Focus, Global Grants, Endowment Fund" },

    { property: "og:title", content: "The Rotary Foundation Giving | Rotary Club of Zamboanga City West" },
    { property: "og:description", content: "Learn about The Rotary Foundation funds and how your contributions support global humanitarian efforts." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org/about/foundation-giving" },

    { rel: "canonical", href: "https://rotaryzcwest.org/about/foundation-giving" },
  ];
}

export async function loader() {
  try {
    const foundationGiving = await fetchFoundationGiving();
    return { foundationGiving };
  } catch (error) {
    console.error("Error loading foundation giving data:", error);
    return { foundationGiving: [] };
  }
}

function formatUsd(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/** Equivalent to Tailwind `bg-slate-50/80` (slate-50 #f8fafc at 80% opacity). */
const GIVING_TABLE_STRIPE_SLATE = "rgba(248, 250, 252, 0.8)";

function getGivingTableStripeBackground(zeroBasedRowIndex: number): string {
  return zeroBasedRowIndex % 2 === 0 ? "white" : GIVING_TABLE_STRIPE_SLATE;
}

type ChartRow = FoundationGiving & { rotaryYearLabel: string };

export default function FoundationGiving() {
  const { foundationGiving } = useLoaderData<typeof loader>();

  const sortedRows = useMemo(() => {
    return [...foundationGiving].sort((a, b) => a.startYear - b.startYear);
  }, [foundationGiving]);

  const chartRows: ChartRow[] = useMemo(() => {
    return sortedRows.map((row) => ({
      ...row,
      rotaryYearLabel: `${row.startYear}-${row.endYear}`,
    }));
  }, [sortedRows]);

  const foundationChart = useChart({
    data: chartRows,
    series: [
      { name: "annualFund", color: "gray.700" },
      { name: "polioPlus", color: "gray.600" },
      { name: "otherFund", color: "gray.500" },
      { name: "endowment", color: "gray.400" },
    ],
  });

  const totalAnnualFund = sortedRows.reduce((sum, item) => sum + (item.annualFund || 0), 0);
  const totalPolioPlus = sortedRows.reduce((sum, item) => sum + (item.polioPlus || 0), 0);
  const totalOtherFund = sortedRows.reduce((sum, item) => sum + (item.otherFund || 0), 0);
  const totalEndowment = sortedRows.reduce((sum, item) => sum + (item.endowment || 0), 0);

  const hasData = sortedRows.length > 0;

  const foundationStats = [
    {
      icon: <Target size={24} color="white" />,
      value: "4",
      label: "Fund Types",
    },
    {
      icon: <Globe size={24} color="white" />,
      value: "200+",
      label: "Countries Served",
    },
    {
      icon: <Award size={24} color="white" />,
      value: "100%",
      label: "Fund Efficiency",
    },
    {
      icon: <DollarSign size={24} color="white" />,
      value: "SHARE",
      label: "District Impact",
    },
  ];

  return (
    <>
      <PageHero
        title="The Rotary Foundation Giving"
        description="Understanding the four main fund types that power The Rotary Foundation's global humanitarian efforts and how your contributions create lasting impact."
        stats={foundationStats}
        backgroundGradient="linear-gradient(135deg, #005DAA 0%, #003d73 50%, #002147 100%)"
      />

      <Container maxW="1200px" py={{ base: 12, md: 16 }}>
        <Stack gap={{ base: 12, md: 16 }}>
          <Box as="section" aria-labelledby="giving-table-heading">
            <Heading id="giving-table-heading" as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" color="gray.900" mb={6}>
              Giving by Rotary Year
            </Heading>

            {hasData ? (
              <>
                <Box
                  display={{ base: "block", md: "none" }}
                  aria-label="Giving by Rotary Year"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                >
                  {sortedRows.map((row, yearIndex) => {
                    const mobileFundLines = [
                      { label: "Annual Fund", value: row.annualFund },
                      { label: "PolioPlus Fund", value: row.polioPlus },
                      { label: "Other Fund", value: row.otherFund },
                      { label: "Endowment Fund", value: row.endowment },
                    ] as const;
                    const isLastYear = yearIndex === sortedRows.length - 1;
                    return (
                      <Box
                        key={`mobile-${row.startYear}-${row.endYear}`}
                        bg={getGivingTableStripeBackground(yearIndex)}
                        px={4}
                        pt={4}
                        pb={4}
                        borderBottomWidth={isLastYear ? undefined : "1px"}
                        borderColor="gray.200"
                      >
                        <Text fontWeight="bold" color="gray.900" fontSize="md" mb={3}>
                          RY {row.startYear}-{row.endYear}
                        </Text>
                        <Stack gap={2}>
                          {mobileFundLines.map((line) => (
                            <Flex
                              key={line.label}
                              justify="space-between"
                              align="baseline"
                              gap={4}
                              fontSize="sm"
                            >
                              <Text color="gray.600" fontWeight="normal">
                                {line.label}
                              </Text>
                              <Text fontVariantNumeric="tabular-nums" color="gray.900" textAlign="right">
                                {formatUsd(line.value)}
                              </Text>
                            </Flex>
                          ))}
                        </Stack>
                        <Flex
                          justify="space-between"
                          align="baseline"
                          gap={4}
                          fontSize="sm"
                          pt={3}
                          mt={3}
                          borderTopWidth="1px"
                          borderColor="gray.200"
                        >
                          <Text color="gray.900" fontWeight="bold">
                            Total
                          </Text>
                          <Text fontVariantNumeric="tabular-nums" fontWeight="bold" color="gray.900" textAlign="right">
                            {formatUsd(row.total)}
                          </Text>
                        </Flex>
                      </Box>
                    );
                  })}
                </Box>

                <Box
                  display={{ base: "none", md: "block" }}
                  overflowX="auto"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  bg="white"
                >
                  <Box as="table" width="100%" minW="720px" fontSize="sm">
                    <Box as="thead" bg="gray.50">
                      <Box as="tr">
                        <Box as="th" textAlign="left" px={4} py={3} fontWeight="semibold" color="gray.700" borderBottomWidth="1px" borderColor="gray.200">
                          Rotary Year
                        </Box>
                        <Box as="th" textAlign="right" px={4} py={3} fontWeight="semibold" color="gray.700" borderBottomWidth="1px" borderColor="gray.200">
                          Annual Fund
                        </Box>
                        <Box as="th" textAlign="right" px={4} py={3} fontWeight="semibold" color="gray.700" borderBottomWidth="1px" borderColor="gray.200">
                          Polio Plus
                        </Box>
                        <Box as="th" textAlign="right" px={4} py={3} fontWeight="semibold" color="gray.700" borderBottomWidth="1px" borderColor="gray.200">
                          Other Fund
                        </Box>
                        <Box as="th" textAlign="right" px={4} py={3} fontWeight="semibold" color="gray.700" borderBottomWidth="1px" borderColor="gray.200">
                          Endowment
                        </Box>
                        <Box as="th" textAlign="right" px={4} py={3} fontWeight="semibold" color="gray.700" borderBottomWidth="1px" borderColor="gray.200">
                          Total
                        </Box>
                      </Box>
                    </Box>
                    <Box as="tbody">
                      {sortedRows.map((row, rowIndex) => (
                        <Box
                          as="tr"
                          key={`${row.startYear}-${row.endYear}`}
                          bg={getGivingTableStripeBackground(rowIndex)}
                        >
                          <Box as="td" px={4} py={3} borderBottomWidth="1px" borderColor="gray.100" color="gray.800">
                            {row.startYear}-{row.endYear}
                          </Box>
                          <Box as="td" px={4} py={3} borderBottomWidth="1px" borderColor="gray.100" textAlign="right" fontVariantNumeric="tabular-nums">
                            {formatUsd(row.annualFund)}
                          </Box>
                          <Box as="td" px={4} py={3} borderBottomWidth="1px" borderColor="gray.100" textAlign="right" fontVariantNumeric="tabular-nums">
                            {formatUsd(row.polioPlus)}
                          </Box>
                          <Box as="td" px={4} py={3} borderBottomWidth="1px" borderColor="gray.100" textAlign="right" fontVariantNumeric="tabular-nums">
                            {formatUsd(row.otherFund)}
                          </Box>
                          <Box as="td" px={4} py={3} borderBottomWidth="1px" borderColor="gray.100" textAlign="right" fontVariantNumeric="tabular-nums">
                            {formatUsd(row.endowment)}
                          </Box>
                          <Box
                            as="td"
                            px={4}
                            py={3}
                            borderBottomWidth="1px"
                            borderColor="gray.100"
                            textAlign="right"
                            fontVariantNumeric="tabular-nums"
                            fontWeight="semibold"
                          >
                            {formatUsd(row.total)}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </>
            ) : (
              <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" bg="gray.50" px={6} py={10} textAlign="center">
                <Text color="gray.600">Foundation giving data will be available soon.</Text>
              </Box>
            )}
          </Box>

          <Box as="section" aria-labelledby="giving-chart-heading">
            <Heading id="giving-chart-heading" as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" color="gray.900" mb={2}>
              Contributions by fund type
            </Heading>
            <Text color="gray.600" fontSize="sm" mb={6} maxW="720px">
              Grouped bars show each fund type per Rotary Year. Each series uses a distinct neutral shade; see the legend for series names.
            </Text>

            {hasData ? (
              <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" bg="white" p={{ base: 4, md: 6 }}>
                <Box height={{ base: "320px", md: "380px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart.Root chart={foundationChart}>
                      <BarChart data={foundationChart.data} barCategoryGap="12%">
                        <CartesianGrid strokeDasharray="3 3" stroke={foundationChart.color("border.muted")} vertical={false} />
                        <XAxis
                          dataKey="rotaryYearLabel"
                          stroke={foundationChart.color("fg.muted")}
                          fontSize={12}
                          tickLine={false}
                        />
                        <YAxis
                          tickFormatter={foundationChart.formatNumber({ maximumFractionDigits: 0 })}
                          stroke={foundationChart.color("fg.muted")}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          formatter={(value: number) => [formatUsd(value), ""]}
                          labelStyle={{ color: foundationChart.color("fg.default") }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: `1px solid ${foundationChart.color("border.muted")}`,
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "12px", paddingTop: 16 }}
                          formatter={(value) => {
                            const labels: Record<string, string> = {
                              annualFund: "Annual Fund",
                              polioPlus: "Polio Plus",
                              otherFund: "Other Fund",
                              endowment: "Endowment",
                            };
                            return labels[value] ?? value;
                          }}
                        />
                        <Bar dataKey="annualFund" name="annualFund" fill={foundationChart.color("gray.700")} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="polioPlus" name="polioPlus" fill={foundationChart.color("gray.600")} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="otherFund" name="otherFund" fill={foundationChart.color("gray.500")} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="endowment" name="endowment" fill={foundationChart.color("gray.400")} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </Chart.Root>
                  </ResponsiveContainer>
                </Box>
              </Box>
            ) : (
              <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" bg="gray.50" px={6} py={10} textAlign="center">
                <Text color="gray.600">Chart data will appear when Rotary Year records are published.</Text>
              </Box>
            )}
          </Box>

          <Box as="section" aria-labelledby="totals-heading">
            <Heading id="totals-heading" as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" color="gray.900" mb={6}>
              Totals (all years)
            </Heading>
            <Flex direction={{ base: "column", sm: "row" }} flexWrap="wrap" gap={4}>
              <TotalTile label="Annual Fund" value={formatUsd(totalAnnualFund)} />
              <TotalTile label="Polio Plus" value={formatUsd(totalPolioPlus)} />
              <TotalTile label="Other Fund" value={formatUsd(totalOtherFund)} />
              <TotalTile label="Endowment" value={formatUsd(totalEndowment)} />
            </Flex>
          </Box>

          <DefinitionOfTermsSection />
        </Stack>
      </Container>
    </>
  );
}

function TotalTile({ label, value }: { label: string; value: string }) {
  return (
    <Box
      flex="1"
      minW={{ base: "100%", sm: "calc(50% - 8px)", lg: "calc(25% - 12px)" }}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      bg="gray.50"
      px={5}
      py={4}
    >
      <Text fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide" mb={1}>
        {label}
      </Text>
      <Text fontSize="xl" fontWeight="semibold" color="gray.900" fontVariantNumeric="tabular-nums">
        {value}
      </Text>
    </Box>
  );
}

function DefinitionOfTermsSection() {
  return (
    <Box as="section" aria-labelledby="definition-of-terms-heading" borderTopWidth="1px" borderColor="gray.200" pt={{ base: 10, md: 12 }}>
      <Heading id="definition-of-terms-heading" as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" color="gray.900" mb={2}>
        Definition of terms
      </Heading>
      <Box mb={8} maxW="720px" fontSize="sm">
        <MarkdownProse content={foundationGivingDefinitionOfTermsIntroMarkdown} />
      </Box>

      <Stack gap={4}>
        <FundTypeSubsection title="Annual Fund" markdown={foundationGivingDefinitionOfTermsAnnualFundMarkdown} />
        <FundTypeSubsection title="Polio Plus Fund" markdown={foundationGivingDefinitionOfTermsPolioPlusMarkdown} />
        <FundTypeSubsection title="Other Fund" markdown={foundationGivingDefinitionOfTermsOtherMarkdown} />
        <FundTypeSubsection title="Endowment Fund" markdown={foundationGivingDefinitionOfTermsEndowmentMarkdown} />
      </Stack>
    </Box>
  );
}

function FundTypeSubsection({ title, markdown }: { title: string; markdown: string }) {
  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="white" p={4}>
      <Heading as="h3" fontSize="md" fontWeight="semibold" color="gray.900" mb={3}>
        {title}
      </Heading>
      <Box fontSize="sm">
        <MarkdownProse content={markdown} />
      </Box>
    </Box>
  );
}
