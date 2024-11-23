import { Box, Flex, Grid, Image, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

const EventGallary = () => {
    // Gallery data
    const galleryItems = [
        {
            date: "11/16/24",
            title: "Honey Dijon",
            imageUrl: "https://w0.peakpx.com/wallpaper/425/561/HD-wallpaper-nightclub-party-club-dance-club-clubs-night-club-partying.jpg" // Unsplash link for Honey Dijon
        },
        {
            date: "11/15/24",
            title: "Snakehips Tour",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRWkbZyZ9IPyyPUdRAlgwJHc8NeECh8ATVQ&s" // Unsplash link for Snakehips
        },
        {
            date: "11/09/24",
            title: "Boys Noize",
            imageUrl: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/06/GTA-Online-Nightclub.jpg" // Unsplash link for Boys Noize
        },
        {
            date: "11/08/24",
            title: "Infekt",
            imageUrl: "https://wallpapers.com/images/hd/club-background-qwu6jjux76ziig3f.jpg" // Unsplash link for Infekt
        },
        {
            date: "11/07/24",
            title: "Kennedy James",
            imageUrl: "https://img.freepik.com/premium-photo/blurred-background-people-club-party_912214-2649.jpg" // Unsplash link for Kennedy James
        },
        {
            date: "11/06/24",
            title: "Rave Opera",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9zxJ9xeEWmVjJhmd7_FWEdEBc2SXisGWiQ&s"
        },
        {
            date: "11/16/24",
            title: "Honey Dijon",
            imageUrl: "https://w0.peakpx.com/wallpaper/425/561/HD-wallpaper-nightclub-party-club-dance-club-clubs-night-club-partying.jpg" // Unsplash link for Honey Dijon
        },
        {
            date: "11/15/24",
            title: "Snakehips Tour",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRWkbZyZ9IPyyPUdRAlgwJHc8NeECh8ATVQ&s" // Unsplash link for Snakehips
        },
        {
            date: "11/09/24",
            title: "Boys Noize",
            imageUrl: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/06/GTA-Online-Nightclub.jpg" // Unsplash link for Boys Noize
        },
        {
            date: "11/08/24",
            title: "Infekt",
            imageUrl: "https://wallpapers.com/images/hd/club-background-qwu6jjux76ziig3f.jpg" // Unsplash link for Infekt
        },
        {
            date: "11/07/24",
            title: "Kennedy James",
            imageUrl: "https://img.freepik.com/premium-photo/blurred-background-people-club-party_912214-2649.jpg" // Unsplash link for Kennedy James
        },
        {
            date: "11/06/24",
            title: "Rave Opera",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9zxJ9xeEWmVjJhmd7_FWEdEBc2SXisGWiQ&s"
        },
    ];

    const itemsPerPage = 8;
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
        <Box bg="black">
            <Box color="white" py={10} px={6} maxW={1150} mx='auto'>
                {/* Gallery Title */}
                <Flex align="center" justify="center" mb={8}>
                    <Text fontSize="4xl" fontWeight="bold" mr={4} fontFamily="'Alice', serif">
                        GALLERY
                    </Text>
                    <Box height="2px" bg="white" width="100%" mx="auto" />
                </Flex>

                {/* Gallery Grid */}
                <Grid
                    templateColumns={{
                        base: "1fr", // Single column on small screens
                        md: "repeat(2, 1fr)", // Two columns on medium screens
                        lg: "repeat(4, 1fr)", // Four columns on large screens
                    }}
                    gap={6}
                >
                    {currentItems.map((item, index) => (
                        <VStack key={index} spacing={4}>
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                borderRadius="md"
                                boxShadow="lg"
                                width="300px"  // Adjust width as needed
                                height="200px"  // Adjust height as needed
                                objectFit="cover" // Ensures the image covers the area without distorting
                            />
                            <Text fontSize="md" textAlign="center" fontWeight="bold" fontFamily="'Alice', serif">
                                {item.date} {item.title}
                            </Text>
                        </VStack>
                    ))}
                </Grid>

                {/* Pagination Controls */}
                <HStack justify="center" mt={6}>
                    {/* Previous Button */}
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

                    {/* Page Numbers */}
                    <HStack spacing={3}>
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
                    </HStack>

                    {/* Next Button */}
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
