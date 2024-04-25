import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{ base: 10, lg: 40 }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
        (index) => (
          <Room key={index} />
        )
      )}
      {/* <VStack alignItems={"flex-start"}>
        <Box position={"relative"} overflow={"hidden"} mb={2} rounded={"3xl"}>
          <Image
            h='280'
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
              <HStack spacing={1}>
                <FaStar size={15} />
                <Text> 5.0</Text>
              </HStack>
            </Box>
          </Grid>

          <Text fontSize={"sm"} color={"gray.600"}>
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={"sm"} color={"gray.600"}>
          <Text as='b'>$72</Text> / night
        </Text>
      </VStack> */}
    </Grid>
  );
}
