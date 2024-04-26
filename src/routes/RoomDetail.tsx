import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getRoom } from "../api";
import {
  Avatar,
  AvatarBadge,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>({
    queryKey: ["room", roomPk],
    queryFn: getRoom,
  });
  return (
    <Box m={10} px={{ base: 10, lg: 40 }}>
      <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded='xl'
        overflow={"hidden"}
        gap={2}
        height='60vh'
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h='100%' w='100%'>
              <Image
                objectFit={"cover"}
                w='100%'
                h='100%'
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
        <VStack>
          <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
          <HStack justifyContent={"flex-start"} w={"100%"}>
            <Text>
              {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
            </Text>
            <Text>.</Text>
            <Text>
              {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
            </Text>
          </HStack>
        </VStack>
        <Stack>
          <Avatar name={data?.owner.name} size={"lg"} src={data?.owner.avatar}>
            <AvatarBadge boxSize={"1.25em"} bg={"green.500"} />
          </Avatar>
        </Stack>
      </HStack>
    </Box>
  );
}
