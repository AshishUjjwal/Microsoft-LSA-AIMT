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
        {
            src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
            alt: "Audience at a tech event",
        },
        {
            src: "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            alt: "Speaker presenting at a conference",
        },
        {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Team collaboration at a hackathon",
        },
        {
            src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            alt: "People networking at an event",
        },
        {
            src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            alt: "Hands-on coding workshop",
        },
        {
            src: "https://plus.unsplash.com/premium_photo-1661387471394-69bcf224e833?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29yayUyMGN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
            alt: "Event with engaging sessions",
        },
        {
            src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
            alt: "Audience at a tech event",
        },
        {
            src: "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            alt: "Speaker presenting at a conference",
        },
        {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Team collaboration at a hackathon",
        },
        {
            src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
            alt: "Audience at a tech event",
        },
        {
            src: "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            alt: "Speaker presenting at a conference",
        },
        {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Team collaboration at a hackathon",
        },
    ];


    // Grid column count based on screen size
    const columns = useBreakpointValue({ base: 2, md: 3, lg: 3 });

    return (
        <Box p={4} bg="gray.50" minHeight="100vh">
            {/* Header */}
            <Box mx={'auto'} maxW={'1000px'} mb={10}>


                <VStack spacing={2} mb={8}>
                    <Heading as="h1" size="xl" color="teal.600" textAlign="center">
                        MLSA AIMT EVENT GALLARY
                    </Heading>
                    <Text fontSize="lg" color="gray.600" textAlign="center">
                        A GLIMPSE INTO THE WONDERFUL MONENTS OF THE EVENT
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
                            height="200px"
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
        </Box>
    );
};

export default EventGallery;
