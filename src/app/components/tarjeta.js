import { Text, Card, CardBody, Image, Button, Icon } from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";

export default function Tarjeta({ record, agregarregalo }) {
  return (
    <Card maxW="350px" w="100%" position="static" rounded="lg" shadow="lg">
      <CardBody>
        <Image
          src={record.image_url}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          boxSize="220px"
        />
        <Text fontSize="md" py={3}>
          {record.Nombre}
        </Text>
        <Button
          variant="outline"
          w="full"
          position="static"
          onClick={() => {
            agregarregalo(record.id, record.cantidad - 1);
          }}
        >
          Agregar <Icon as={FiGift} ml={1} />
        </Button>
      </CardBody>
    </Card>
  );
}
