import { Box, SimpleGrid, Text, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiCalendar, FiEdit3 } from 'react-icons/fi';

const StatBox = ({ icon, label, value }) => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const labelColor = useColorModeValue('gray.600', 'gray.400');
    const boxShadowColor = useColorModeValue('md', 'dark-lg');

    return (
        <Flex direction="column" align="center" p={4} bg={bgColor} borderRadius="md" boxShadow={boxShadowColor}>
            <Icon as={icon} boxSize={8} color="teal.500" mb={2} />
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
                {value}
            </Text>
            <Text fontSize="md" color={labelColor}>
                {label}
            </Text>
        </Flex>
    );
};

const UserStats = ({ stats }) => {
    const gridBgColor = useColorModeValue('gray.500', 'gray.500');

    return (
        <SimpleGrid columns={[1, 2]} spacing={6} mt={6} bg={gridBgColor} p={4} borderRadius="lg">
            <StatBox icon={FiCalendar} label="Events Registered" value={stats.eventsRegistered} />
            <StatBox icon={FiEdit3} label="Blogs Created" value={stats.blogsCreated} />
        </SimpleGrid>
    );
};

export default UserStats;
