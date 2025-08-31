import { ChakraProvider } from "@chakra-ui/react"
import system from "../../theme/rotary-theme"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}
