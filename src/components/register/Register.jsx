import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomLink from "../link/link";
import MyButton from "../button/Button";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`/api/user/cadastro`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (response.status !== 201) throw new Error(json);
      setCookie("authorization", json);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Flex
      minH="100vh"
      bg="transparent"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      textColor="red"
      display="flex"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="video.mp4" type="video/mp4" />
      </video>

      <Box
        rounded="full"
        maxW="800px"
        p={14}
        border="black"
        borderRadius="xl"
        boxShadow="xl"
        zIndex="1"
        bg="rgba(30, 39, 46, 0.4)"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="#0B68F4">
          Crie sua conta
        </Text>
        <form onSubmit={handleForm}>
          <VStack spacing={4} width="100%" maxWidth="400px" as="flex">
            <FormControl isInvalid={error}>
              <FormLabel htmlFor="username" color="white">
                Nome de Usuário
              </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleFormEdit(e, "name")}
                placeholder="Digite seu Nome"
                bg="white"
                color="black"
                required
              />
            </FormControl>
            <FormControl isInvalid={error}>
              <FormLabel htmlFor="email" color="white">
                Email
              </FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleFormEdit(e, "email")}
                placeholder="E-mail"
                bg="white"
                color="black"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" color="white">
                Senha
              </FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(event) => handleFormEdit(event, "password")}
                placeholder="Digite sua Senha"
                bg="white"
                color="black"
                required
              />
            </FormControl>

            <MyButton type="submit" bg="#0B68F4" color="white" width="100%">
              Cadastrar
            </MyButton>

            {error && <p>{error}</p>}
          </VStack>
        </form>
        <CustomLink to="/">
          <Text mt={4} _hover={{ color: "#0B68F4" }} pl="8" color="white">
            Já possui uma conta?
          </Text>
        </CustomLink>
      </Box>
    </Flex>
  );
};

export default Register;
