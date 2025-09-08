import { Box, Spinner, Flex } from "@chakra-ui/react";
import { Suspense, lazy, ComponentType, memo } from "react";

type LazySectionProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string | number;
};

const DefaultFallback = memo(() => (
  <Flex
    align="center"
    justify="center"
    minH="200px"
    w="full"
  >
    <Spinner
      thickness="3px"
      speed="0.8s"
      emptyColor="gray.200"
      color="brand.500"
      size="lg"
    />
  </Flex>
));

function LazySectionComponent({ 
  children, 
  fallback = <DefaultFallback />, 
  minHeight = "auto" 
}: LazySectionProps) {
  return (
    <Box minH={minHeight}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </Box>
  );
}

export const LazySection = memo(LazySectionComponent);

// Helper function to create lazy-loaded sections
export function createLazySection<T extends ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunction);
  
  return memo((props: any) => (
    <LazySection fallback={fallback}>
      <LazyComponent {...props} />
    </LazySection>
  ));
}