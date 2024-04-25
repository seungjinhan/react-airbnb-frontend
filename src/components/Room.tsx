import {
  VStack,
  Button,
  Grid,
  HStack,
  Box,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={2} rounded={"3xl"}>
        <Image
          minH='280'
          src='https://a0.muscache.com/im/pictures/ffb001b7-92a3-413f-ae51-e5b2c1df5580.jpg?im_w=720'
        />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color={"white"}
        >
          <FaRegHeart size='15px' />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text as={"b"} display={"block"} noOfLines={1} fontSize={"md"}>
            Tagaytay and clear blue beaches of Nasugbu
          </Text>
          <Box>
            <HStack spacing={1} alignItems={"center"}>
              <FaStar size={12} />
              <Text> 5.0</Text>
            </HStack>
          </Box>
        </Grid>

        <Text fontSize={"sm"} color={gray}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        <Text as='b'>$72</Text> / night
      </Text>
    </VStack>
  );
}
