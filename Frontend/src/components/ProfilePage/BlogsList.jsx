import { Box, Heading, SimpleGrid, Text, Flex, Button, useColorModeValue, space } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    // Use useColorModeValue to adjust colors for light and dark modes
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const dateColor = useColorModeValue('gray.500', 'gray.400');
    const boxShadow = useColorModeValue('md', 'dark-lg');
    const navigate = useNavigate();
    const handleReadMore = (slug) => {
        navigate(`/blog/${slug}`); // Navigate to blog detail page
    };

    return (
        <Flex direction="column" p={4} bg={bgColor} borderRadius="md" boxShadow={boxShadow} transition="all 0.3s ease">
            <Heading as="h3" size="md" mb={2} color={textColor}>
                {blog.title}
            </Heading>
            <Text fontSize="sm" color={dateColor} mb={2}>
                {blog.date}
            </Text>
            <Text fontSize="sm" color={textColor} mb={4} textAlign={'justify'}>
                {blog.description}
            </Text>
            <Button mt="auto" colorScheme="teal" size="sm" onClick={() => handleReadMore(blog.slug)}>
                View Blog
            </Button>
        </Flex>
    );
};

const BlogsList = ({ blogs }) => {
    const sectionBgColor = useColorModeValue('gray.50', 'gray.800');
    const sectionTextColor = useColorModeValue('gray.700', 'gray.300');

    return (
        <Box mt={8} bg={sectionBgColor} p={4}>
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
