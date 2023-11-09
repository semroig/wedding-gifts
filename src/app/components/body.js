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
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Tarjeta from "./tarjeta";
import Footer from "./footer";
import Navbar from "./navbar";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Body() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [carritoItems, setCarritoItems] = useState([]);
  const [prodsUpdate, setProdsUpdate] = useState([]);
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [refresher, setRefresher] = useState(0);
  const [records, setRecords] = useState([]);

  function regalarAction(event) {
    // Primero, evito que se haga refresh de la página
    event.preventDefault();

    // Creo el carrito y actualizo los products
    createCarrito();

    // Itero por los prods y los actualizo
    prodsUpdate.forEach((element) =>
      updateProducts(element.id, element.cantidad)
    );

    // Muestro toast verde, cierro popup y refresh de página (actualizando var de estado)
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
    setRefresher(refresher + 1);
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

  async function updateProducts(id, cant) {
    const { data, error } = await supabase
      .from("products")
      .update({ cantidad: cant })
      .eq("id", id)
      .select();

    console.log("data nuevo prod");
    console.log(data);
  }

  async function getProducts() {
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .gt("cantidad", 0);

    // Populo var de estado de registros
    setRecords(products);
  }

  useEffect(() => {
    getProducts();
  }, [refresher]);

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
            <Text fontSize="xl" pr={20}>
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
        <Container maxW="6xl" centerContent mt={5}>
          <Stack direction={"row"} mb={10}>
            <Box>
              <Text fontSize="xl">LISTA DE ARTICULOS</Text>
              <Heading size="2xl">Agregá y reservá tu regalo</Heading>
            </Box>
            <Box ml={20}>
              <Text fontSize="xl">
                1. Clickea en “Agregar” para reservar los articulos que queres
                regalarnos
              </Text>
              <Text fontSize="xl">
                2. Clickea el boton de “Carrito” para ver los articulos que
                seleccionaste
              </Text>
              <Text fontSize="xl">
                3. Una vez enviada tu reserva de articulos, compralos donde mas
                te guste!
              </Text>
            </Box>
          </Stack>

          {/* Catalogo */}
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
