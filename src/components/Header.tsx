import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logout } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function Header() {
  const { userLoading, isLoggedId, user } = useUser();

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();

  // const logOut = async () => {
  //   await logout();
  //   queryClient.refetchQueries({ queryKey: ["me"] });
  //   toast({
  //     title: "Good Bye",
  //     description: "See Ya",
  //     status: "success",
  //     position: "top",
  //     isClosable: true,
  //   });
  //   // toast.update(toastId, { status: "error", title: "DONE" });
  // };
  const mutation = useMutation({
    mutationFn: logout,
    onMutate: () => {
      toastId.current = toast({
        title: "log out",
        description: "bye bye",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: (data: any) => {
      if (toastId.current) {
        queryClient.refetchQueries({ queryKey: ["me"] });
        toast.update(toastId.current, {
          status: "success",
          title: "Done",
          description: "See you laster",
        });
      }
    },
    onError: (error: any) => {},
  });
  const onLogOut = async () => {
    mutation.mutate();
  };
  return (
    <>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        py={5}
        px={40}
        direction={{
          sm: "column",
          md: "row",
        }}
        spacing={{ sm: 3, md: 0 }}
        borderBottomWidth={1}
      >
        <Box color={logoColor}>
          <FaAirbnb size={48} />
        </Box>
        <HStack spacing={2}>
          <IconButton
            onClick={toggleColorMode}
            variant={"Ghost"}
            aria-label='Toggle dark mode'
            icon={<Icon />}
          />
          {!userLoading ? (
            !isLoggedId ? (
              <>
                <Button onClick={onLoginOpen}>Log in</Button>
                <LightMode>
                  <Button onClick={onSignUpOpen} colorScheme='red'>
                    Sign up
                  </Button>
                </LightMode>
              </>
            ) : (
              <Menu>
                <MenuButton>
                  <Avatar name={user.name} src={user.avator} size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onLogOut}>Log out</MenuItem>
                </MenuList>
              </Menu>
            )
          ) : (
            <></>
          )}
        </HStack>
      </Stack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </>
  );
}
