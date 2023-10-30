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
} from "@chakra-ui/react";

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
    <main>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
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
      </SimpleGrid>

      <Button onClick={onOpen}>Ver carrito</Button>
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
    </main>
  );
}
