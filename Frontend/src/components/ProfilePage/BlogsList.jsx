import { Box, Heading, SimpleGrid, Text, Flex, Button } from '@chakra-ui/react';

const BlogCard = ({ blog }) => (
    <Flex direction="column" p={4} bg="white" borderRadius="md" boxShadow="md">
        <Heading as="h3" size="md" mb={2}>
            {blog.title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
            {blog.date}
        </Text>
        <Text fontSize="sm" color="gray.700" mb={4}>
            {blog.description}
        </Text>
        <Button colorScheme="teal" size="sm">
            View Blog
        </Button>
    </Flex>
);

const BlogsList = ({ blogs }) => {
    return (
        <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
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
