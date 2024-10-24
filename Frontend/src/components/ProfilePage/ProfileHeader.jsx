import { Box, Flex, Avatar, Text, Heading, Stack, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const ProfileHeader = ({ user }) => {
    // Define colors for light and dark modes using useColorModeValue
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.100', 'gray.700');
    const boxShadowColor = useColorModeValue('lg', 'dark-lg');

    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            p={8}
            bg={bgColor}
            borderRadius="md"
            boxShadow={boxShadowColor}
            w="100%"
            maxW="5xl"
            mx="auto"
            transition="all 0.3s ease"
            _hover={{ boxShadow: 'xl' }}
        >
            {/* Left Side - Profile Image */}
            <Flex justify="center" w={{ base: '100%', md: '40%' }} mb={{ base: 6, md: 0 }}>
                <Avatar size="2xl" src={user.avatarUrl} name={user.name} boxShadow="lg" />
            </Flex>

            {/* Right Side - User Details */}
            <Box w={{ base: '100%', md: '60%' }}>
                <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={2}>
                    {user.name}
                </Heading>
                <Text fontSize="lg" color={textColor} display="flex" alignItems="center" mb={1}>
                    <Icon as={MdEmail} mr={2} /> {user.email}
                </Text>
                <Text fontSize="lg" color={textColor} display="flex" alignItems="center" mb={1}>
                    <Icon as={MdLocationOn} mr={2} /> {user.location}
                </Text>
                <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')} mt={4} mb={6}>
                    {user.bio}
                </Text>

                {/* Action Buttons */}
                {/* <Stack direction="row" spacing={4}>
                    <Button colorScheme="blue" variant="solid">
                        Follow
                    </Button>
                    <Button colorScheme="blue" variant="outline" borderColor={borderColor}>
                        Message
                    </Button>
                </Stack> */}
            </Box>
        </Flex>
    );
};

export default ProfileHeader;
