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
    },
    onError: (error: any) => {
      console.log("mutation has as error");
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
