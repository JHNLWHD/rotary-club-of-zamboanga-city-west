import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../../lib/query-client"
import system from "../../theme/rotary-theme"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  )
}
