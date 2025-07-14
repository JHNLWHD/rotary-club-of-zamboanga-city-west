import { Box, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { Users, Target, DollarSign, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * (end - start) + start);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, start, hasAnimated]);

  return { count, ref };
}

// Animated Stat Component
function AnimatedStat({ 
  endValue, 
  suffix = "", 
  label, 
  icon: Icon, 
  iconColor, 
  bgGradient, 
  borderColor, 
  duration = 2000,
  formatValue
}: {
  endValue: number;
  suffix?: string;
  label: string;
  icon: any;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  duration?: number;
  formatValue?: (count: number) => string;
}) {
  const { count, ref } = useCountUp(endValue, duration);

  const displayValue = formatValue ? formatValue(count) : `${count.toLocaleString()}${suffix}`;

  return (
    <Box 
      ref={ref}
      bg="white" 
      borderRadius="2xl" 
      p={8} 
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.100"
      textAlign="center"
      _hover={{ 
        transform: "translateY(-4px)", 
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        borderColor: `${borderColor.split('.')[0]}.200`
      }}
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
    >
      <Box 
        bgGradient={bgGradient}
        borderRadius="full" 
        w={16} 
        h={16} 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        mx="auto" 
        mb={4}
        border="3px solid"
        borderColor={borderColor}
        _hover={{ transform: "scale(1.1)" }}
        transition="transform 0.2s"
      >
        <Icon size={32} color={iconColor} />
      </Box>
      <Heading as="h3" fontSize="3xl" color="brand.500" mb={2} fontWeight="bold">
        {displayValue}
      </Heading>
      <Text color="gray.700" fontWeight="medium" fontSize="md">
        {label}
      </Text>
    </Box>
  );
}

type StatsSectionProps = {
  stats: Array<{
    endValue: number;
    suffix?: string;
    label: string;
    icon: any;
    iconColor: string;
    bgGradient: string;
    borderColor: string;
    duration?: number;
    formatValue?: (count: number) => string;
  }>;
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="stats">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
          {stats.map((stat, index) => (
            <AnimatedStat 
              key={index}
              endValue={stat.endValue} 
              suffix={stat.suffix} 
              label={stat.label} 
              icon={stat.icon} 
              iconColor={stat.iconColor} 
              bgGradient={stat.bgGradient} 
              borderColor={stat.borderColor} 
              duration={stat.duration}
              formatValue={stat.formatValue}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
} 