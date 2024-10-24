import { Box, Heading, SimpleGrid, Text, Flex, Button, useColorModeValue } from '@chakra-ui/react';

const BlogCard = ({ blog }) => {
    // Use useColorModeValue to adjust colors for light and dark modes
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const dateColor = useColorModeValue('gray.500', 'gray.400');
    const boxShadow = useColorModeValue('md', 'dark-lg');

    return (
        <Flex direction="column" p={4} bg={bgColor} borderRadius="md" boxShadow={boxShadow}>
            <Heading as="h3" size="md" mb={2} color={textColor}>
                {blog.title}
            </Heading>
            <Text fontSize="sm" color={dateColor} mb={2}>
                {blog.date}
            </Text>
            <Text fontSize="sm" color={textColor} mb={4}>
                {blog.description}
            </Text>
            <Button colorScheme="teal" size="sm">
                View Blog
            </Button>
        </Flex>
    );
};

const BlogsList = ({ blogs }) => {
    const sectionBgColor = useColorModeValue('gray.50', 'gray.800');
    const sectionTextColor = useColorModeValue('gray.700', 'gray.300');

    return (
        <Box mt={8} bg={sectionBgColor} p={4} borderRadius="lg">
            <Heading as="h2" size="lg" mb={4} color={sectionTextColor}>
                Blogs Created
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default BlogsList;
