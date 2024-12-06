import {
    Box,
    Flex,
    Image,
    Text,
    VStack,
    Button,
    HStack,
    useColorMode,
    // IconButton,
    Stack,
  } from "@chakra-ui/react";
  import { useState } from "react";
//   import { SunIcon, MoonIcon } from "@chakra-ui/icons";
  
  const EventGallary = () => {
    // Toggle between dark and light mode
    const { colorMode } = useColorMode();
  
    // Gallery data with descriptions
    const galleryItems = [
      {
        date: "11/07/24",
        title: "MLSA Team MEETUP",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2024/08/GD.png",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/16/24",
        title: "Hack-A-Thon",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2023/04/lab.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/15/24",
        title: "CodeWar",
        imageUrl: "https://www.campusoption.com/images/colleges/gallery/14_11_16_091323_AM_6.jpeg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/09/24",
        title: "Tech War'2024",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2024/04/DSC_9096-scaled-600x400.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/16/24",
        title: "Hack-A-Thon",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2023/04/lab.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/15/24",
        title: "CodeWar",
        imageUrl: "https://www.campusoption.com/images/colleges/gallery/14_11_16_091323_AM_6.jpeg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/09/24",
        title: "Tech War'2024",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2024/04/DSC_9096-scaled-600x400.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/16/24",
        title: "Hack-A-Thon",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2023/04/lab.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/15/24",
        title: "CodeWar",
        imageUrl: "https://www.campusoption.com/images/colleges/gallery/14_11_16_091323_AM_6.jpeg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/09/24",
        title: "Tech War'2024",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2024/04/DSC_9096-scaled-600x400.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/16/24",
        title: "Hack-A-Thon",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2023/04/lab.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/15/24",
        title: "CodeWar",
        imageUrl: "https://www.campusoption.com/images/colleges/gallery/14_11_16_091323_AM_6.jpeg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/09/24",
        title: "Tech War'2024",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2024/04/DSC_9096-scaled-600x400.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/16/24",
        title: "Hack-A-Thon",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2023/04/lab.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/15/24",
        title: "CodeWar",
        imageUrl: "https://www.campusoption.com/images/colleges/gallery/14_11_16_091323_AM_6.jpeg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
      {
        date: "11/09/24",
        title: "Tech War'2024",
        imageUrl: "https://aimt.edu.in/wp-content/uploads/2024/04/DSC_9096-scaled-600x400.jpg",
        description:
          "An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals. An interactive meetup for the MLSA team, discussing collaboration, technology, and future goals.",
      },
    ];
  
    const itemsPerPage = 8 // Reduce items per page for better mobile display
    const [currentPage, setCurrentPage] = useState(1);
  
    // Calculate total pages
    const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  
    // Get current items to display
    const currentItems = galleryItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    // Handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    return (
      <Box bg={colorMode === "dark" ? "gray.800" : "white"} minH="100vh">
        <Box py={10} px={6} maxW="1150px" mx="auto">
          {/* Gallery Title */}
          <Flex align="center" justify="center" mb={8}>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              textAlign="center"
              fontFamily="'Alice', serif"
              color={colorMode === "dark" ? "white" : "gray.800"}
            >
              EVENTS $$$ WORKSHOPS $$$ HACKATHONS
            </Text>
          </Flex>
  
          {/* Gallery Grid */}
          <VStack spacing={8} align="stretch">
            {currentItems.map((item, index) => (
              <Stack
                key={index}
                direction={{ base: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
                align="center"
                gap={6}
                spacing={{ base: 4, md: 6 }}
              >
                {/* Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  borderRadius="md"
                  boxShadow="lg"
                  width={{ base: "100%", md: "400px" }}
                  height={{ base: "200px", md: "300px" }}
                  objectFit="cover"
                />
                {/* Description */}
                <VStack align="flex-start" spacing={2}>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="bold"
                    color={colorMode === "dark" ? "white" : "gray.800"}
                  >
                    {item.title}
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color={colorMode === "dark" ? "gray.300" : "gray.600"}
                  >
                    {item.date}
                  </Text>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color={colorMode === "dark" ? "gray.400" : "gray.500"}
                  >
                    {item.description}
                  </Text>
                </VStack>
              </Stack>
            ))}
          </VStack>
  
          {/* Pagination Controls */}
          <HStack justify="center" mt={8} spacing={2}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              bg="purple.600"
              color="white"
              _hover={{ bg: "purple.500" }}
              _active={{ bg: "purple.700" }}
              p={4}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  bg={pageNumber === currentPage ? "purple.500" : "gray.700"}
                  color="white"
                  _hover={{ bg: "purple.400" }}
                  _active={{ bg: "purple.600" }}
                  borderRadius="full"
                  p={4}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              bg="purple.600"
              color="white"
              _hover={{ bg: "purple.500" }}
              _active={{ bg: "purple.700" }}
              p={4}
            >
              Next
            </Button>
          </HStack>
        </Box>
      </Box>
    );
  };
  
  export default EventGallary;
  