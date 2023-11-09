"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export function Providers({ children }) {
  const theme = extendTheme({
    components: {
      Button: {
        variants: {
          outline: {
            bg: "white",
            color: "orange.400",
            border: "2px solid",
            borderColor: "orange.400",
            rounded: "full",
          },
          accent: {
            bg: "white",
            color: "blue.700",
            rounded: "full",
            boxShadow: "md",
          },
        },
      },
    },
  });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
