import {
  Text,
  Card,
  CardBody,
  Image,
  Button,
  Icon,
  Center,
} from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

{
  /* <Center>
            <Text color="blue.700" fontSize="lg">
              Agregado <Icon as={BsCheckLg} ml={1} />
            </Text>
          </Center> */
}

export default function Tarjeta({ record, agregarregalo, isincarrito }) {
  return (
    <Card maxW="350px" w="100%" position="static" rounded="lg" shadow="lg">
      <CardBody>
        <Image
          src={record.image_url}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          boxSize="220px"
        />
        <Text fontSize="md" py={3} color="blackAlpha.800">
          {record.Nombre}
        </Text>
        {isincarrito == true ? (
          <Button isDisabled variant="accent" w="full" position="static">
            Agregado <Icon as={BsCheckLg} ml={1} />
          </Button>
        ) : (
          <Button
            variant="primary"
            w="full"
            position="static"
            onClick={() => {
              agregarregalo(record);
            }}
          >
            Agregar <Icon as={FiGift} ml={1} />
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
