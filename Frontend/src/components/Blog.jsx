'use client'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    useColorModeValue,
    Container,
    VStack,
    Button,
} from '@chakra-ui/react';
import LoadingPage from '../pages/LoadinPage';

const BlogTags = ({ tags }) => {
    return (
        <HStack spacing={2} marginTop={5}>
            {tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                        {tag}
                    </Tag>
                );
            })}
        </HStack>
    );
};

const TruncatedText = ({ text = '', slug }) => {
    const navigate = useNavigate();
    const maxLength = 100;
    console.log(slug);
    const handleReadMore = () => {
        navigate(`/blog/${slug}`);  // Navigate to blog detail page
    };

    if (!text) return <Text>No content available</Text>;

    if (text.length <= maxLength) return <Text>{text}</Text>;

    return (
        <Text>
            {`${text.substring(0, maxLength)}... `}
            <Button size="sm" variant="link" onClick={handleReadMore}>
                Read More
            </Button>
        </Text>
    );
};

const BlogAuthor = ({ authorImage, author, date }) => {
    if (authorImage === '') {
        authorImage = 'https://100k-faces.glitch.me/random-image'; // Placeholder image URL
    }
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src={authorImage}
                alt="Avatar"
            />
            <Text fontWeight="medium">{author}</Text>
            <Text>—</Text>
            <Text>{new Date(date).toLocaleDateString()}</Text>
        </HStack>
    );
};

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const bgGradient = useColorModeValue(
        'radial(orange.600 1px, transparent 1px)',
        'radial(orange.300 1px, transparent 1px)'
      );

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/blogs/getblog', {
                    withCredentials: true, // Include credentials
                    headers: {
                        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your token
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <Container maxWidth={'1170px'} p="12">
            <Heading as="h1">Stories by MLSA'S</Heading>
            {blogs.slice(0, 1).map((blog) => (
                <Box
                    key={blog._id}
                    marginTop={{ base: '1', sm: '5' }}
                    display="flex"
                    flexDirection={{ base: 'column', sm: 'row' }}
                    justifyContent="space-between"
                >
                    <Box
                        display="flex"
                        flex="1"
                        marginRight="3"
                        position="relative"
                        alignItems="center"
                    >
                        <Box
                            width={{ base: '100%', sm: '85%' }}
                            zIndex="2"
                            marginLeft={{ base: '0', sm: '5%' }}
                            marginTop="5%"
                        >
                            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                <Image
                                    borderRadius="lg"
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    objectFit="contain"
                                />
                            </Box>
                        </Box>
                        <Box zIndex="1" width="100%" position="absolute" height="100%">
                            <Box
                                bgGradient={bgGradient}
                                backgroundSize="20px 20px"
                                opacity="0.4"
                                height="100%"
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flex="1"
                        flexDirection="column"
                        justifyContent="center"
                        marginTop={{ base: '3', sm: '0' }}
                    >
                        <BlogTags tags={blog.tags} />
                        <Heading marginTop="1">
                            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                {blog.title}
                            </Text>
                        </Heading>
                        <TruncatedText text={blog.content} slug={blog.slug} />
                        <BlogAuthor authorImage={blog.authorImage} author={blog.author} date={blog.createdAt} />
                    </Box>
                </Box>
            ))}

            <Heading as="h2" marginTop="5">
                Latest articles
            </Heading>
            <Divider marginTop="5" />
            <Wrap spacing="30px" marginTop="5" justify={'space-between'}>
                {blogs.map((blog) => (
                    <WrapItem
                        key={blog.id}
                        width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
                    >
                        <Box w="100%">
                            <Box borderRadius="lg" overflow="hidden">
                                <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                    <Image
                                        transform="scale(1.0)"
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        objectFit="contain"
                                        width="100%"
                                        transition="0.3s ease-in-out"
                                        _hover={{
                                            transform: 'scale(1.05)',
                                        }}
                                    />
                                </Box>
                            </Box>
                            <BlogTags tags={blog.tags} />
                            <Heading fontSize="xl" marginTop="2">
                                <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                    {blog.title}
                                </Text>
                            </Heading>
                            <TruncatedText text={blog.content} slug={blog.slug} />
                            <BlogAuthor authorImage={blog.authorImage} author={blog.author} date={blog.createdAt} />
                        </Box>
                    </WrapItem>
                ))}
            </Wrap>
            {/* <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                <Heading as="h2">What we write about</Heading>
                <Text as="p" fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Text as="p" fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Text as="p" fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
            </VStack> */}
        </Container>
    );
};

export default BlogSection;
