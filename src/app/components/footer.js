import {
  Text,
  Box,
  Container,
  Grid,
  GridItem,
  Center,
  Image,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" py={16} color="cyan.600">
      <Box boxShadow="md" mb={12} backgroundColor="white">
        <Image
          src="https://fcirdfdrqppqtcvyyfzr.supabase.co/storage/v1/object/public/images/cinta"
          alt="cinta"
          fit="cover"
        />
      </Box>

      <Container maxW="container.lg">
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          <GridItem colSpan={2} pt={8}>
            <Text
              fontSize="md"
              borderTop="2px solid"
              pt={5}
              borderColor="cyan.600"
            >
              🇦🇷 AR 2023 - Design and developed with ♡ by us
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Center ml={14}>
              <Image
                src="https://fcirdfdrqppqtcvyyfzr.supabase.co/storage/v1/object/public/images/firma.png"
                alt="firma"
                fit="cover"
              />
            </Center>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
