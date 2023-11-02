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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  SimpleGrid,
  Icon,
  Center,
  StackDivider,
  VStack,
  Box,
  Container,
  WrapItem,
  Wrap,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { BsCart2 } from "react-icons/bs";

const currentYear = new Date().getFullYear();

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  return (
    <Grid minH="100vh" flexDir="column" templateRows="auto 1fr auto">
      <Box as="nav" bgColor="orange.50">
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
              <Button colorScheme="blue">Get started</Button>
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
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
            <WrapItem>
              <Card maxW="240px" w="100%">
                <CardBody>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="200px"
                  />
                  <Text fontSize="md" py={3}>
                    Tacho de basura para baño
                  </Text>
                  <Button variant="solid" colorScheme="blue" w="full">
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </WrapItem>
          </Wrap>
        </Container>
      </Container>

      <Box mt="auto" as="footer" pt={2}>
        <Container
          maxW="container.lg"
          pb={4}
          pt={2}
          borderTop="1px solid black"
        >
          <Grid templateColumns="repeat(3, 1fr)" gap={1}>
            <Text fontSize="sm">
              🇦🇷 {currentYear} - Design and developed with ♡ by us
            </Text>

            <Flex justifyContent="center">
              <Text fontSize="2xl" color="accent">
                Sem & Vicky
              </Text>
            </Flex>
          </Grid>
        </Container>
      </Box>

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
