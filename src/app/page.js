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
} from "@chakra-ui/react";
import { BsCart2 } from "react-icons/bs";

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
    <Container maxW="6xl" my={20}>
      <Stack direction="row">
        <Box>
          <Heading>Hola! Somos Sem y Vicky</Heading>
          <Text fontSize="2xl">
            In love with React & Next. In love with React & Next. In love with
            React & Next. In love with React & Next. In love with React & Next.
          </Text>
        </Box>

        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          boxSize="400px"
        />
      </Stack>

      <Heading>Hola! Somos Sem y Vicky</Heading>
      <Text fontSize="2xl">
        In love with React & Next. In love with React & Next.
      </Text>

      <Stack direction="row">
        <Card size="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              boxSize="200px"
            />
            <Heading size="md"> Customer dashboard</Heading>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Agregar al carrito
            </Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              boxSize="200px"
            />
            <Heading size="md"> Customer dashboard</Heading>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Agregar al carrito
            </Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              boxSize="200px"
            />
            <Heading size="md"> Customer dashboard</Heading>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Agregar al carrito
            </Button>
          </CardFooter>
        </Card>
      </Stack>

      <Button onClick={onOpen}>
        Ver carrito <Icon as={BsCart2} ml={1} />
      </Button>

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
    </Container>
  );
}
