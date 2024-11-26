import React from "react";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  return (
    <Flex>
      <Box
        w="250px"
        bg="blue.800"
        color="white"
        p={5}
        // display={{ base: "none", md: "block" }}
        borderRadius="15px"
        boxShadow="lg"
      >
        <VStack align="stretch" spacing={6}>
          {/* Sidebar Title */}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={6}
            textAlign="center"
            borderBottom="2px solid white"
            pb={2}
          >
            MLSA AIMT
          </Text>

          {/* Links */}
          {[
            { to: "/", label: "Dashboard" },
            { to: "/user-management", label: "Users" },
            { to: "/events", label: "Events" },
            { to: "/blog", label: "Blogs" },
            { to: "/projects", label: "Projects" },
            { to: "/resources", label: "Resources" },
            { to: "/profile", label: "Profile" },
            { to: "/settings", label: "Settings" },
          ].map((link) => (
            <Link
              as={RouterLink}
              to={link.to}
              position="relative"
              fontSize="lg"
              fontWeight="medium"
              _hover={{
                textDecoration: "none",
                color: "blue.400",
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: "0",
                height: "2px",
                bottom: "-3px",
                left: "0",
                bg: "blue.400",
                transition: "width 0.3s ease-out",
              }}
              _hoverAfter={{
                width: "100%",
              }}
            >
              {link.label}
            </Link>
          ))}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={5}>
        {children}
      </Box>
    </Flex>
  );
};

export default Sidebar;
