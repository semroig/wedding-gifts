"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Image,
  Stack,
  Heading,
  Text,
  Icon,
  Center,
  Box,
  Container,
  WrapItem,
  Wrap,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { BsCart2 } from "react-icons/bs";
import { useState } from "react";

import Tarjeta from "./tarjeta";
import Footer from "./footer";

import NavStyles from "./navbar.module.css";

export default function Body({ records }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [carritoItems, setCarritoItems] = useState([]);

  function regalarAction() {
    toast({
      title: "Regalo registrado",
      description:
        "Gracias por el regalo, contamos con eso! Nos has salvado estamos agradecidos 👽",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    onClose();
  }

  const agregarRegalo = (productId) => {
    console.log("se agrega un regalo");
    setCarritoItems([...carritoItems, { id: productId }]);
  };

  return (
    <Grid minH="100vh" flexDir="column" templateRows="auto 1fr auto">
      {/* Navbar */}
      <div className={NavStyles.webNavbar}>
        <Box as="nav" borderBottom="1px solid grey" backgroundColor="orange.50">
          <Container maxW="container.lg" py={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="4xl">navbar</Text>

              <Flex gap={4} alignItems="center" fontWeight="semibold">
                <Button onClick={onOpen}>
                  Ver carrito <Icon as={BsCart2} ml={1} />
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </div>

      {/* Body (Hero + Catalogo) */}
      <Container maxW="6xl" my={20}>
        <Stack direction="row" mb={20}>
          <Center>
            <Box mr={20}>
              <Heading size="3xl">
                Hola! Somos Sem y Vicky. Bla bla bla.
              </Heading>
              <Text fontSize="xl">
                In love with React & Next. In love with React & Next. In love
                with React & Next. In love with React & Next. In love with React
                & Next. In love with React & Next. Bla bla bla.
              </Text>
              <Button colorScheme="blue" position="static">
                Get started
              </Button>
            </Box>
          </Center>

          <Image
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            boxSize="400px"
            borderRadius="xl"
          />
        </Stack>

        <Container mt={20} pt={20} maxW="6xl" centerContent>
          <Heading size="2xl">Hola! Somos Sem y Vicky</Heading>
          <Text fontSize="2xl" mt={5} mb={14}>
            In love with React & Next. In love with React & Next.
          </Text>
          <Wrap spacing={4} justify="center">
            {records?.map((product) => (
              <WrapItem key={product.id}>
                <Tarjeta
                  record={product}
                  agregarregalo={agregarRegalo}
                ></Tarjeta>
              </WrapItem>
            ))}
          </Wrap>
        </Container>
      </Container>

      {/* Footer */}
      <Footer></Footer>

      {/* Modal for carrito */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carrito de regalos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>cosas elegidass</p>
            <FormControl>
              <FormLabel>Tu nombre</FormLabel>
              <Input placeholder="Carlos" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={regalarAction}>
              Regalar :)
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
