import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  usernameLogin,
  IUsernameLoginSuccess,
  IUsernameLoginError,
  IUsernameLoginVariables,
} from "../api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: usernameLogin,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data: any) => {
      toast({
        title: "welcome back",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
      reset();
    },
    onError: (error: any) => {
      console.log("mutation has as error");
      reset();
    },
  });

  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody as='form' onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", { required: "Please input username" })}
                placeholder='Username'
                variant={"filled"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please input passworld",
                })}
                placeholder='Password'
                variant={"filled"}
                type='password'
              />
            </InputGroup>
            {mutation.isError ? (
              <Text color={"red.500"} textAlign={"center"} fontSize={"sm"}>
                Username or Password are wrong
              </Text>
            ) : null}
            <Button
              isLoading={mutation.isPending}
              mt={4}
              w='100%'
              colorScheme='red'
              type='submit'
            >
              Log in
            </Button>
          </VStack>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
