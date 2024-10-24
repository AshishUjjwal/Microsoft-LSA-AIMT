import { Box, SimpleGrid, Text, Flex, Icon } from '@chakra-ui/react';
import { FiCalendar, FiEdit3 } from 'react-icons/fi';

const StatBox = ({ icon, label, value }) => (
    <Flex direction="column" align="center" p={4} bg="white" borderRadius="md" boxShadow="md">
        <Icon as={icon} boxSize={8} color="teal.500" mb={2} />
        <Text fontSize="xl" fontWeight="bold">
            {value}
        </Text>
        <Text fontSize="md" color="gray.600">
            {label}
        </Text>
    </Flex>
);

const UserStats = ({ stats }) => {
    return (
        <SimpleGrid columns={[1, 2]} spacing={6} mt={6}>
            <StatBox icon={FiCalendar} label="Events Registered" value={stats.eventsRegistered} />
            <StatBox icon={FiEdit3} label="Blogs Created" value={stats.blogsCreated} />
        </SimpleGrid>
    );
};

export default UserStats;
