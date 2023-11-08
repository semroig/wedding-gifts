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
  Stack,
  Heading,
  Text,
  Container,
  WrapItem,
  Wrap,
  Grid,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Tarjeta from "./tarjeta";
import Footer from "./footer";
import Navbar from "./navbar";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Body({ records }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [carritoItems, setCarritoItems] = useState([]);
  const [prodsUpdate, setProdsUpdate] = useState([]);
  const [name, setName] = useState();
  const [message, setMessage] = useState();

  function regalarAction(event) {
    // Primero, evito que se haga refresh de la página
    event.preventDefault();

    // Creo el carrito y actualizo los products
    createCarrito();

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

  const agregarRegalo = (productId, cantRestante) => {
    console.log("se agrega un regalo");
    setCarritoItems([...carritoItems, productId]);
    setProdsUpdate([...prodsUpdate, { id: productId, cantidad: cantRestante }]);
  };

  async function createCarrito() {
    const { data, error } = await supabase
      .from("carrito")
      .insert([{ name: name, message: message, items: carritoItems }])
      .select();

    console.log("data nuevo carrito");
    console.log(data);
  }

  async function updateProducts() {
    const { data, error } = await supabase
      .from("carrito")
      .update({ other_column: "otherValue" })
      .select();

    console.log("data nuevo carrito");
    console.log(data);
  }

  return (
    <Grid
      minH="100vh"
      flexDir="column"
      templateRows="auto 1fr auto"
      backgroundColor="blackAlpha.50"
    >
      <Navbar abrir={onOpen}></Navbar>

      <Flex
        w={"full"}
        h={"85vh"}
        backgroundImage={"url()"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        pr={20}
      >
        <VStack
          w={"full"}
          justify={"center"}
          bgGradient={"linear(to-r, blackAlpha.300, transparent)"}
          mr={20}
          pr={20}
        >
          <Stack maxW={"2xl"} spacing={4} pr={20} mr={20}>
            <Text fontSize="3xl">¡Hola!</Text>
            <Heading size="2xl">Somos Sem y Vicky</Heading>
            <Text fontSize="xl">
              Para hacer más sencilla su elección de regalo, aqui encontraran
              los articulos que nos faltan para nuestro futuro hogar. Gracias
              por acompañarnos!
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                position="static"
              >
                Comenzar {">>"}
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>

      <Container maxW="6xl" my={20}>
        <Container mt={20} maxW="6xl" centerContent>
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

      <Footer></Footer>

      {/* Modal for carrito */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carrito de regalos</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={regalarAction}>
            <ModalBody>
              {carritoItems?.map((carritoItem) => (
                <p key={carritoItem}>{carritoItem}</p>
              ))}
              <FormControl>
                <FormLabel>Tu nombre</FormLabel>
                <Input
                  placeholder="Carlos"
                  onChange={(event) => setName(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tu mensaje</FormLabel>
                <Input
                  placeholder="Holaa"
                  onChange={(event) => setMessage(event.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Regalar :)
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
