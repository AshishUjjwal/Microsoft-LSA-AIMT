import { Box, Heading, SimpleGrid, Text, Flex, Button, useColorModeValue } from '@chakra-ui/react';

const EventCard = ({ event }) => {
    // Define colors for light and dark mode
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const dateColor = useColorModeValue('gray.500', 'gray.400');
    const boxShadowColor = useColorModeValue('md', 'dark-lg');
    
    return (
        <Flex direction="column"  p={4} bg={bgColor} borderRadius="md" boxShadow={boxShadowColor} transition="all 0.3s ease">
            <Heading as="h3" size="md" mb={2} color={textColor}>
                {event.title}
            </Heading>
            <Text fontSize="sm" color={dateColor}  mb={2}>
                {event.date}
            </Text>
            <Text fontSize="sm" color={textColor} textAlign="Justify" mb={4}>
                {event.description}
            </Text>
            <Button mt="auto" colorScheme="teal"  size="sm">
                View Event
            </Button>
        </Flex>
    );
};

const EventsList = ({ events }) => {
    const headingColor = useColorModeValue('gray.800', 'white');
    const sectionBgColor = useColorModeValue('gray.50', 'gray.800');

    return (
        <Box bg={sectionBgColor} mt={8} p={4}>
            <Heading as="h2" size="lg" mb={4} color={headingColor}>
                Events Registered
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {events.events ? events.events.map((event) => (
                    <EventCard key={event._id} event={event} />
                )) : events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default EventsList;
