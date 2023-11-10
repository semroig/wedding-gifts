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
  Textarea,
  Image,
  Center,
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
  const [records, setRecords] = useState([]);

  function regalarAction(event) {
    // Primero, evito que se haga refresh de la página
    event.preventDefault();

    // Creo el carrito y actualizo los products
    createCarrito();

    // Itero por los prods y los actualizo
    prodsUpdate.forEach((element, index) => {
      updateProducts(index, element.id, element.cantidad - 1);
    });

    // Muestro toast verde y cierro popup
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

  const agregarRegalo = (record) => {
    setCarritoItems([...carritoItems, record.id]);
    setProdsUpdate([...prodsUpdate, record]);
  };

  async function createCarrito() {
    const { data, error } = await supabase
      .from("carrito")
      .insert([{ name: name, message: message, items: carritoItems }])
      .select();
  }

  function limpiarCarrito() {
    setProdsUpdate([]);
    setCarritoItems([]);
  }

  async function updateProducts(index, id, cant) {
    const { data, error } = await supabase
      .from("products")
      .update({ cantidad: cant })
      .eq("id", id)
      .select();

    // Si es el último prod para actualizar, hago query refresh de prods y limpio carrito
    if (index + 1 == prodsUpdate.length) {
      getProducts();
      limpiarCarrito();
    }
  }

  async function getProducts() {
    const { data: registros } = await supabase
      .from("products")
      .select("*")
      .gt("cantidad", 0);

    console.table(registros);

    // Populo var de estado de registros
    setRecords(registros);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid flexDir="column" backgroundColor="blackAlpha.50">
      <Navbar abrir={onOpen}></Navbar>

      {/* Hero */}
      <Flex
        w={"full"}
        h={"90vh"}
        backgroundImage={
          "url(https://lh3.googleusercontent.com/drive-viewer/AK7aPaBIoAuYrjJIZfpjzi7oQH1jL0hVs7pyRyZwyTQYs848vrJrT0BSwlSlcmhG6QdrE09wpRjF5SuDD6JPzthYimQXCzEu=w2880-h1430)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        pr={20}
      >
        <VStack
          w={"full"}
          justify={"center"}
          bgGradient={"linear(to-r, blackAlpha.900, transparent)"}
          mr={20}
          pr={20}
        >
          <Stack maxW={"2xl"} spacing={4} pr={20} mr={20}>
            <Text fontSize="3xl" color="white">
              ¡Hola!
            </Text>
            <Heading size="2xl" color="white">
              Somos Sem y Vicky
            </Heading>
            <Text fontSize="xl" pr={20} color="white">
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
              <Heading size="2xl" pr={20}>
                Agregá y reservá tu regalo
              </Heading>
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
              {prodsUpdate?.map((prod) => (
                <Box
                  key={prod.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  display="flex"
                  p={3}
                  my={3}
                >
                  <Image
                    src={prod.image_url}
                    alt={prod.Nombre}
                    boxSize="80px"
                    borderRadius="lg"
                  />
                  <Center>
                    <Text fontSize="lg" ml={3}>
                      {prod.Nombre}
                    </Text>
                  </Center>
                </Box>
              ))}
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input onChange={(event) => setName(event.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mensaje</FormLabel>
                <Textarea
                  onChange={(event) => setMessage(event.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" mr={3} type="submit">
                Regalar :)
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
