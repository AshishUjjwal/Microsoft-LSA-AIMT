import { Box, Heading, SimpleGrid, Text, Flex, Button } from '@chakra-ui/react';

const EventCard = ({ event }) => (
    <Flex direction="column" p={4} bg="white" borderRadius="md" boxShadow="md">
        <Heading as="h3" size="md" mb={2}>
            {event.title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
            {event.date}
        </Text>
        <Text fontSize="sm" color="gray.700" mb={4}>
            {event.description}
        </Text>
        <Button colorScheme="teal" size="sm">
            View Event
        </Button>
    </Flex>
);

const EventsList = ({ events }) => {
    return (
        <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
                Events Registered
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default EventsList;
