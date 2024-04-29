import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParamsData = {
    client_id: "5006367c6b8a3e5ab778b34c24a2e0cc",
    redirect_uri: "http://localhost:3001/social/kakao",
    response_type: "code",
  };
  const kakaoParams = new URLSearchParams(kakaoParamsData);
  return (
    <Box mb={4} w={"100%"}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.400"}
          fontSize={"xs"}
          as={"b"}
        >
          OR
        </Text>
        <Divider />
      </HStack>
      <VStack w={"100%"}>
        <Button
          as='a'
          href='https://github.com/login/oauth/authorize?client_id=123750bcf89f6b89694b&scope=read:user,user:email'
          w='100%'
          leftIcon={<FaGithub />}
          colorScheme='telegram'
        >
          Continue with Github
        </Button>
        <Button
          as='a'
          href={`https://kauth.kakao.com/oauth/authorize?${kakaoParams}`}
          w='100%'
          leftIcon={<FaComment />}
          colorScheme='yellow'
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
