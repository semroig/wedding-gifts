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
  Box,
  Textarea,
  Image,
  Center,
  Icon,
  GridItem,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// Importo custom icons
import { BiTrash } from "react-icons/bi";
import {
  PiNumberOneBold,
  PiNumberTwoBold,
  PiNumberThreeBold,
} from "react-icons/pi";
import { FaAnglesRight } from "react-icons/fa6";

import Tarjeta from "./tarjeta";
import Footer from "./footer";
import Navbar from "./navbar";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Body() {
  const ref = useRef(null);

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  const eliminarItem = (id) => {
    setCarritoItems((current) =>
      current.filter((item) => {
        // 👇️ remove object that has id equal to 2
        return item !== id;
      })
    );
    setProdsUpdate((current) =>
      current.filter((item) => {
        // 👇️ remove object that has id equal to 2
        return item.id !== id;
      })
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Stack backgroundColor="blackAlpha.50" spacing="0px">
      <Navbar abrir={onOpen}></Navbar>

      {/* Hero */}
      <Flex
        w={"full"}
        h={"90vh"}
        backgroundImage={
          "url(https://fcirdfdrqppqtcvyyfzr.supabase.co/storage/v1/object/public/images/HERO%20comprimido.png?t=2023-11-14T03%3A22%3A27.001Z)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <Stack
          w={"full"}
          bgGradient={"linear(to-r, blackAlpha.900, transparent)"}
          justify="center"
        >
          <Stack direction={{ base: "column", md: "row" }}>
            {/* Agrego containers vacios para generar espacio */}
            <Container width="sm"></Container>
            <Container maxW="xl">
              <Stack spacing={4} mr={20}>
                <Text fontSize="3xl" color="white">
                  ¡Hola!
                </Text>
                <Heading size="2xl" color="white">
                  Somos Sem y Vicky
                </Heading>
                <Text fontSize="xl" color="white">
                  Para hacer más sencilla su elección de regalo, aquí
                  encontrarán los artículos que nos faltan para nuestro futuro
                  hogar ¡Gracias por acompañarnos!
                </Text>
                <Box>
                  <Button
                    variant="outline"
                    position="static"
                    color="white"
                    rounded="full"
                    size="md"
                    onClick={handleScroll}
                    _hover={{ bg: "blackAlpha.800" }}
                  >
                    Comenzar <Icon as={FaAnglesRight} ml={3}></Icon>
                  </Button>
                </Box>
              </Stack>
            </Container>
            <Container width="2xl"></Container>
          </Stack>
        </Stack>
      </Flex>

      {/* Div for ref auto scroll */}
      <Box ref={ref} mb={10}></Box>

      {/* Deep body */}
      <Container maxW="6xl" mb={10} mt={20}>
        <Container maxW="6xl" centerContent mt={5}>
          {/* Instrucciones */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "10", md: "20" }}
          >
            <Box>
              <Text fontSize="xl" color="blackAlpha.600">
                LISTA DE ARTICULOS
              </Text>
              <Divider
                mr={20}
                border="1px"
                color="blackAlpha.600"
                position="static"
              ></Divider>
              <Heading size="2xl" color="blackAlpha.800" mt={5}>
                Agregá y reservá tu regalo
              </Heading>
            </Box>
            <Box color="blackAlpha.800">
              <Stack direction={"row"} mb={2}>
                <Center>
                  <Icon
                    as={PiNumberOneBold}
                    boxSize={10}
                    boxShadow="md"
                    borderRadius="full"
                    color="cyan.600"
                    p={2}
                    mr={2}
                  ></Icon>
                </Center>
                <Text fontSize="xl">
                  Clickeá en “Agregar” para reservar los artículos que querés
                  regalarnos
                </Text>
              </Stack>
              <Stack direction={"row"} mb={2}>
                <Center>
                  <Icon
                    as={PiNumberTwoBold}
                    boxSize={10}
                    boxShadow="md"
                    borderRadius="full"
                    color="cyan.600"
                    p={2}
                    mr={2}
                  ></Icon>
                </Center>
                <Text fontSize="xl">
                  Clickeá el botón de “Carrito” para ver los artículos que
                  seleccionaste
                </Text>
              </Stack>
              <Stack direction={"row"}>
                <Center>
                  <Icon
                    as={PiNumberThreeBold}
                    boxSize={10}
                    boxShadow="md"
                    borderRadius="full"
                    color="cyan.600"
                    p={2}
                    mr={2}
                  ></Icon>
                </Center>
                <Text fontSize="xl">
                  Una vez enviada tu reserva de artículos, ¡compralos donde más
                  te guste!
                </Text>
              </Stack>
            </Box>
          </Stack>

          {/* Catalogo */}
          <Wrap spacing={4} justify="center" mt={14}>
            {records?.map((product) => (
              <WrapItem key={product.id}>
                <Tarjeta
                  record={product}
                  agregarregalo={agregarRegalo}
                  isincarrito={carritoItems.includes(product.id)}
                ></Tarjeta>
              </WrapItem>
            ))}
          </Wrap>

          {/* Alias */}
          <Card
            direction="row"
            rounded="lg"
            shadow="lg"
            w="90%"
            mt={20}
            position="static"
          >
            <CardBody>
              <Box p={5}>
                <Text fontSize="xl" color="blue.700">
                  Si no pueden comprarnos un regalo, ¡también pueden ayudarnos
                  con nuestra luna de miel! Depositen su contribución en nuestra
                  cuenta con el alias{" "}
                  <Text as="b" fontSize="xl" color="blue.700">
                    {"sem.vicky"}
                  </Text>
                </Text>
                <Text fontSize="xl" mt={3} color="blue.700">
                  ¡Gracias por su amor! :)
                </Text>
              </Box>
            </CardBody>
            <Image
              borderRightRadius="10"
              maxW={{ base: "0%", md: "50%" }}
              src="https://fcirdfdrqppqtcvyyfzr.supabase.co/storage/v1/object/public/images/cardAlias.png"
              alt="Caffe Latte"
            />
          </Card>
        </Container>
      </Container>

      <Footer></Footer>

      {/* Modal for carrito */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="blackAlpha.800" mx={{ base: "2", md: "1" }}>
          <ModalHeader>Carrito de regalos</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={regalarAction}>
            <ModalBody>
              <Text fontSize="md" mb={4}>
                Al hacer click en{" "}
                <Text as="b" color="orange.400">
                  Regalar
                </Text>
                , estás simplemente reservando los artículos en la lista de
                regalos. Luego, tendrás que comprar los regalos por tu cuenta en
                el lugar que prefieras!
              </Text>

              {prodsUpdate?.map((prod) => (
                <Box
                  key={prod.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={3}
                  my={3}
                >
                  <Grid
                    templateColumns="repeat(8, 1fr)"
                    gap={3}
                    alignItems="center"
                  >
                    <GridItem colSpan={2}>
                      <Image
                        src={prod.image_url}
                        alt={prod.Nombre}
                        boxSize="80px"
                        borderRadius="lg"
                      />
                    </GridItem>
                    <GridItem colSpan={5}>
                      <Text fontSize="lg" ml={3}>
                        {prod.Nombre}
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => eliminarItem(prod.id)}
                      >
                        <Icon as={BiTrash} boxSize={5} />
                      </Button>
                    </GridItem>
                  </Grid>
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
              <Button variant="primary" mr={3} type="submit">
                Regalar :)
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
