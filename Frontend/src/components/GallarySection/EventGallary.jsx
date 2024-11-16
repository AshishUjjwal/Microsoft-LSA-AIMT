import React from "react";
import {
  Box,
  Image,
  SimpleGrid,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

const EventGallery = () => {
  // Sample images for the gallery
  const images = [
    { src: "https://via.placeholder.com/300", alt: "Event 1" },
    { src: "https://via.placeholder.com/300", alt: "Event 2" },
    { src: "https://via.placeholder.com/300", alt: "Event 3" },
    { src: "https://via.placeholder.com/300", alt: "Event 4" },
    { src: "https://via.placeholder.com/300", alt: "Event 5" },
    { src: "https://via.placeholder.com/300", alt: "Event 6" },
  ];

  // Grid column count based on screen size
  const columns = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  return (
    <Box p={4} bg="gray.50" minHeight="100vh">
      {/* Header */}
      <VStack spacing={2} mb={8}>
        <Heading as="h1" size="xl" color="teal.600" textAlign="center">
          MLSA AIMT Event Gallery
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          A glimpse into the wonderful moments of the event.
        </Text>
      </VStack>

      {/* Gallery */}
      <SimpleGrid columns={columns} spacing={4}>
        {images.map((image, index) => (
          <Box
            key={index}
            overflow="hidden"
            borderRadius="lg"
            boxShadow="md"
            bg="white"
          >
            <Image
              src={image.src}
              alt={image.alt}
              objectFit="cover"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EventGallery;
