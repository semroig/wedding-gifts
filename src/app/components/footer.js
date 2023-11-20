import { Text, Box, Container, Grid, Flex } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box mt="auto" as="footer" pt={2} color="blackAlpha.800">
      <Container maxW="container.lg" pb={4} pt={2} borderTop="1px solid black">
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          <Text fontSize="sm">🇦🇷 2023 - Design and developed with ♡ by us</Text>

          <Flex justifyContent="center">
            <Text fontSize="2xl" color="accent">
              Sem & Vicky
            </Text>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}
