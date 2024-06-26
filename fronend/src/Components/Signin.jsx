import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../Redux/Auth/action";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  useToast,
  FormErrorMessage
} from "@chakra-ui/react";

const Signin = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const [signData, setSignData] = useState(initialData);
  const [inputErrors, setInputErrors] = useState({ email: false, password: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setInputErrors({ ...inputErrors, email: !isValidEmail });
    } else if (name === 'password') {
      // You can add validation for password if needed
      setInputErrors({ ...inputErrors, password: false }); // Reset password error for demonstration
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!signData.email || !signData.password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const user = {
      email: signData.email,
      password: signData.password,
    };

    dispatch(signIn(user))
      .then(() => {
        navigate("/");
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Signin error:", error);
        toast({
          title: "Login Error",
          description: "There was an error during login. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleBack = () => {
    navigate(-1);
  };
  // const validateEmail = (value) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(value);
  // };

  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" h="100vh">
      <Box bg="white" shadow="md" rounded="md" p="8" w="96">
        <Heading as="h1" size="xl" fontWeight="bold" mb="4">
          Sign In
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb="4" isInvalid={inputErrors.email}>
            <FormLabel htmlFor="email" fontSize="sm" fontWeight="bold" mb="2">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={signData.email}
              onChange={handleChange}
              className="input"
            />
            <FormErrorMessage>Enter a valid email address</FormErrorMessage>
          </FormControl>
          <FormControl mb="6" isInvalid={inputErrors.password}>
            <FormLabel htmlFor="password" fontSize="sm" fontWeight="bold" mb="2">
              Password
            </FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={signData.password}
              onChange={handleChange}
              className="input"
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>
          <Flex align="center" justify="between">
            <Button
              type="submit"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.700" }}
              fontWeight="bold"
              rounded="md"
            >
              Sign In
            </Button>
          </Flex>
        </form>
        <Flex justify={"center"} align={"center"}>
          <Button onClick={handleBack} ml={"20px"}>Back</Button>
        </Flex>
      </Box>
    </Flex>
    </>
  );
};

export default Signin;
