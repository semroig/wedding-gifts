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
  CloseButton,
  Square,
  Spacer,
  Icon,
  GridItem,
  Card,
  CardBody,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiTrash } from "react-icons/bi";

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
    <Grid flexDir="column" backgroundColor="blackAlpha.50">
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
        pr={20}
      >
        <VStack
          w={"full"}
          justify={"center"}
          bgGradient={"linear(to-r, blackAlpha.700, transparent)"}
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
              Para hacer más sencilla su elección de regalo, aquí encontrarán
              los artículos que nos faltan para nuestro futuro hogar ¡Gracias
              por acompañarnos!
            </Text>
            {/* <Stack direction={"row"}>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                position="static"
              >
                Comenzar {">>"}
              </Button>
            </Stack> */}
          </Stack>
        </VStack>
      </Flex>

      {/* Deep body */}
      <Container maxW="6xl" my={20}>
        <Container maxW="6xl" centerContent mt={5}>
          {/* Instrucciones */}
          <Stack direction={"row"} mb={10}>
            <Box>
              <Text fontSize="xl" color="blackAlpha.600">
                LISTA DE ARTICULOS
              </Text>
              <Divider mr={20} border="1px" color="blackAlpha.600"></Divider>
              {/* <hr style={{ height: "6px" }}></hr> */}
              <Heading size="2xl" pr={20} color="blackAlpha.800">
                Agregá y reservá tu regalo
              </Heading>
            </Box>
            <Box ml={20} color="blackAlpha.800">
              <Text fontSize="xl">
                <Text fontSize="xl" as="b">
                  1.
                </Text>{" "}
                Clickeá en “Agregar” para reservar los artículos que querés
                regalarnos
              </Text>
              <Text fontSize="xl">
                <Text fontSize="xl" as="b">
                  2.
                </Text>{" "}
                Clickeá el botón de “Carrito” para ver los artículos que
                seleccionaste
              </Text>
              <Text fontSize="xl">
                <Text fontSize="xl" as="b">
                  3.
                </Text>{" "}
                Una vez enviada tu reserva de artículos, ¡compralos donde más te
                guste!
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
                  isincarrito={carritoItems.includes(product.id)}
                ></Tarjeta>
              </WrapItem>
            ))}
          </Wrap>

          {/* Alias */}
          <Card direction="row" rounded="lg" shadow="lg" w="80%" mt={20}>
            <Stack p={5}>
              <CardBody>
                <Text fontSize="lg" color="blue.700">
                  Si no pueden comprarnos un regalo, ¡también pueden ayudarnos
                  con nuestra luna de miel! Depositen su contribución en nuestra
                  cuenta con el alias{" "}
                  <Text as="b" fontSize="lg" color="blue.700">
                    {"sem.vicky"}
                  </Text>
                </Text>
                <Text fontSize="lg" mt={3} color="blue.700">
                  ¡Gracias por su amor! :)
                </Text>
              </CardBody>
            </Stack>
            <Image
              // rounded="lg"
              borderRightRadius="10"
              maxW={{ base: "100%", sm: "440px" }}
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
        <ModalContent color="blackAlpha.800">
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
