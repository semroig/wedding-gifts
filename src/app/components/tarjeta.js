import { Text, Card, CardBody, Image, Button } from "@chakra-ui/react";

export default function Tarjeta({ record, agregarregalo }) {
  return (
    <Card maxW="240px" w="100%" position="static" rounded="lg" shadow="lg">
      <CardBody>
        <Image
          src={record.image_url}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          boxSize="200px"
        />
        <Text fontSize="md" py={3}>
          {record.Nombre}
        </Text>
        <Button
          variant="solid"
          colorScheme="blue"
          w="full"
          position="static"
          onClick={() => {
            agregarregalo(record.id);
          }}
        >
          Agregar al carrito
        </Button>
      </CardBody>
    </Card>
  );
}
