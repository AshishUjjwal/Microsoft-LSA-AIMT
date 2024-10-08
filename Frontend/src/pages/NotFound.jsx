import React from "react";
import { Box, Image, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import svg from "../Images/404.svg";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to home
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="89vh"
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Box boxSize="600px" >
        <Image src={svg} alt="404 Not Found" boxSize="100%" />
      </Box>
      <Button
        colorScheme="green"
        onClick={handleGoHome}
        size="lg"
        rounded="full"
        mb={8}
      >
        Back to Home
      </Button>
    </Flex>
  );
};

export default NotFound;
