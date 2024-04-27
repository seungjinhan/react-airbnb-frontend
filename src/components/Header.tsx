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
import { useQueryClient } from "@tanstack/react-query";

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

  const logOut = async () => {
    await logout();
    queryClient.refetchQueries({ queryKey: ["me"] });
    toast({
      title: "Good Bye",
      description: "See Ya",
      status: "success",
      position: "top",
      isClosable: true,
    });
    // toast.update(toastId, { status: "error", title: "DONE" });
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
                  <Avatar name={user.name} src={user.avatar} size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logOut}>Log out</MenuItem>
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
