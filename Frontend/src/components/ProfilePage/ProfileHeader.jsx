import { Box, Flex, Avatar, Text, Heading, Stack } from '@chakra-ui/react';

const ProfileHeader = ({ user }) => {
    return (
        <Flex direction="column" align="center" p={6} bg="gray.100" borderRadius="md" boxShadow="lg">
            <Avatar size="2xl" src={user.avatarUrl} mb={4} />
            <Heading as="h1" fontSize="2xl" mb={2}>
                {user.name}
            </Heading>
            <Text fontSize="lg" color="gray.600">
                {user.email}
            </Text>
            <Text fontSize="md" mt={4} textAlign="center" maxW="lg" color="gray.700">
                {user.bio}
            </Text>
        </Flex>
    );
};

export default ProfileHeader;
