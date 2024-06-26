import {
  Button,
  Flex,
  Spacer,
  Image,
  Link as ChakraLink,
  Heading,
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useToast
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/Auth/action';
import { AddIcon} from '@chakra-ui/icons'
import { useEffect } from 'react';


const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const token = useSelector((store) => store.AuthReducer.token);
  const dispatch = useDispatch();
const toast=useToast()
  const handleClick = () => {
    dispatch(logoutUser());
  
    toast({
      title: "Logout Successfull",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box >
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="teal.500"
      position="fixed"
      top="0"
  
      width="100%"
      zIndex="1"
      p={{ base: '2', md: '4' }} // Adjust padding for responsiveness
      color="white"
    >
      <ChakraLink as={Link} to="/">
        <Flex align="center">
          <Image
            src="https://cdn.dribbble.com/users/857299/screenshots/5279698/media/7c6e5da716ccc9b85a6476049ec4f297.jpg?resize=1200x900&vertical=center"
            alt="Profile Avatar"
            boxSize={{ base: '10', md: '14' }} // Adjust box size for responsiveness
            mr="2"
          />
          <Heading size="lg"   fontWeight="bold" >Task Manager</Heading>
        </Flex>
      </ChakraLink>

      <Spacer />

      <Flex display={{ base: 'none', md: 'flex' }} gap={"12px"} align={"center"} spacing={4}>
        <ChakraLink as={Link} to="/addtask">
          <Button bg="teal.500"    fontWeight="bold" fontSize={"md"} color="white" _hover={{ bg: 'teal.700' }}>
            Add Task
            <AddIcon ml={"10px"}/>
          </Button>
        </ChakraLink>

        <Box p={"10px"} ml={"10px"}>
          {!isAuth && (
          <ChakraLink
          as={Link}
          
          to="/signup"
          fontSize={{ base: 'sm', md: 'lg' }}
          _hover={{ textDecoration: 'underline' }}
          bg="orange"
          color="white"
          px="4"  
          py="2"  
          rounded="md"
          transition="background 0.3s ease-in-out, color 0.3s ease-in-out"
          _focus={{ outline: 'none' }} 
          fontWeight="bold" mt="4"
        >
          Sign up
        </ChakraLink>
        
          )}
          {isAuth && token? (
            <Button
            fontSize={{ base: 'sm', md: 'lg' }}
            _hover={{ textDecoration: 'underline' }}
            bg="orange"
            color="white"
            px="4"  
            py="2"  
            rounded="md"
            transition="background 0.3s ease-in-out, color 0.3s ease-in-out"
            _focus={{ outline: 'none' }} 
              onClick={handleClick}
              fontWeight="bold" 
            >
              Logout
            </Button>
          ) : (
            <ChakraLink
              as={Link}
              to="/signin"
              fontSize={{ base: 'sm', md: 'lg' }}
              _hover={{ textDecoration: 'underline' }}
              bg="orange"
              color="white"
              py="2"  
              px="4"  
              rounded="md"
              ml={"25px"}
              transition="background 0.3s ease-in-out, color 0.3s ease-in-out"
              _focus={{ outline: 'none' }} 
              fontWeight="bold" mt="4"
            >
              Sign in
            </ChakraLink>
          )}
        </Box>
      </Flex>

      <Flex display={{ base: 'flex', md: 'none' }}>
        <Button color="white" onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing="4">
              <ChakraLink as={Link} to="/addtask">
                <Button w="full" bg="teal.500" color="white" _hover={{ bg: 'teal.700' }}>
                  Add patient
                </Button>
              </ChakraLink>

              <ChakraLink as={Link} to="/signup">
                <Button
                  w="full"
                  fontSize={{ base: 'sm', md: 'lg' }}
                  bg="orange"
                  color="white"
                  _hover={{ textDecoration: 'underline' }}
                  rounded="md"
                >
                  Sign up
                </Button>
              </ChakraLink>

              {isAuth ? (
                <Button
                  w="full"
                  fontSize={{ base: 'sm', md: 'lg' }} 
                  bg="orange.500"
                  color="white"
                  onClick={handleClick}
                  _hover={{ textDecoration: 'underline' }}
                  rounded="md"
                >
                  Logout
                </Button>
              ) : (
                <ChakraLink as={Link} to="/signin">
                  <Button
                    w="full"
                    fontSize={{ base: 'sm', md: 'lg' }} 
                    bg="orange"
                    color="white"
                    _hover={{ textDecoration: 'underline' }}
                    rounded="md"
                  >
                    Sign in
                  </Button>
                </ChakraLink>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>

    </Box>
  );
};

export default Navbar;
