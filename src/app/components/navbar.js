import { Box, Container, Flex, Button, Icon, Heading } from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";

import NavStyles from "./navbar.module.css";

export default function Navbar({ abrir }) {
  return (
    <div className={NavStyles.webNavbar}>
      <Box
        as="nav"
        borderBottom="1px solid grey"
        backgroundColor="rgba(255,255,255,0.9)"
        color="blackAlpha.800"
      >
        <Container maxW="container.lg" py={6}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize="xl">Sem & Vicky</Heading>

            <Button onClick={abrir} variant="accent">
              <Icon as={FiGift} mr={1} /> Carrito
            </Button>
          </Flex>
        </Container>
      </Box>
    </div>
  );
}
