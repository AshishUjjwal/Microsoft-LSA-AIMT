import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
//   import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const EventGallary = () => {
  // Toggle between dark and light mode
  const { colorMode } = useColorMode();

  // Inside your component
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Gallery data with descriptions
  const galleryItems = [
    {
      date: "11/07/24",
      title: "MLSA TEAM MEETUP",
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

  const itemsPerPage = 6 // Reduce items per page for better mobile display
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

    // Scroll to the top of the container or page
    window.scrollTo({
      top: 2500,
      behavior: 'smooth', // Optional: Adds a smooth scrolling effect
    });
  };

  return (
    <Box bg={colorMode === "dark" ? "gray.800" : "white"} minH="100vh" fontFamily="'Alice', serif" >
      <Box py={10} px={6} maxW={{ base: '96vw', md: '1100px' }} mx="auto">
        {/* Gallery Title */}
        <Flex align="center" justify="center" mb={8}>
          <Text
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            textAlign="center"
            fontFamily="'Alice', serif"
            color={colorMode === "dark" ? "white" : "gray.800"}
          >
            WORKSHOPS $$$ EVENTS <br /> $$$ HACKATHONS $$$
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
                  fontFamily="'Alice', serif"
                >
                  {item.title}
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color={colorMode === "dark" ? "gray.300" : "gray.600"}
                  alignContent={'space-between'}
                >
                  {item.date}
                </Text>
                <Divider borderColor={colorMode === "dark" ? "gray.500" : "gray.300"} />
                <Spacer />
                <Box flex="1" />
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={colorMode === "dark" ? "gray.400" : "gray.500"}
                  textAlign="justify"
                >
                  {item.description}
                </Text>
              </VStack>
            </Stack>
          ))}
        </VStack>

        {/* Pagination Controls */}
        {!isHomePage &&
          <HStack justify="center" mt={8} spacing={2}>

            {/* Previous Button */}
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="blue"
              _hover={{ bg: 'blue.400' }}
              variant="outline"
            >

            </Button>

            {/* Page buttons */}
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              // Show first two, last two, current page, and pages close to the current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(currentPage - pageNumber) < 2
              ) {
                return (
                  <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    colorScheme={currentPage === pageNumber ? 'blue' : 'gray'}
                    _hover={{
                      backgroundColor: currentPage === pageNumber ? 'blue.500' : 'gray.500',
                    }}
                    variant={currentPage === pageNumber ? 'solid' : 'outline'}
                  >
                    {pageNumber}
                  </Button>
                );
              }

              // Show ellipsis for skipped pages
              if (
                (pageNumber === 2 && currentPage > 4) ||
                (pageNumber === totalPages - 1 && currentPage < totalPages - 3)
              ) {
                return <Text key={pageNumber}>...</Text>;
              }

              return null;
            })}

            {/* Next Button */}

            <Button
              rightIcon={<ChevronRightIcon />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
              _hover={{ bg: 'blue.400' }}
              variant="outline"
            ></Button>

          </HStack>
        }
      </Box>
    </Box>
  );
};

export default EventGallary;
