import React, { useState, useEffect } from 'react';
import { Box, Image, Heading, Text, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { BlogAuthor, BlogTags, TruncatedText } from './BlogComponent.jsx';

const AdminBlogRotator = ({ blogs, user, handleEditEvent, handleDeleteEvent }) => {

    const bgGradient = useColorModeValue(
        'radial(orange.600 1px, transparent 1px)',
        'radial(orange.300 1px, transparent 1px)'
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter to only show admin blogs
    const adminBlogs = blogs?.filter(blog => blog.author?.role === 'admin');

    // Rotate through admin blogs every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % adminBlogs?.length);
        }, 5000); // 5 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [adminBlogs?.length]);

    // If there are no admin blogs, show nothing
    if (adminBlogs?.length === 0) {
        return <Text>No admin blogs available.</Text>;
    }

    const blog = adminBlogs[currentIndex];

    return (
        <Box
            key={blog._id}
            marginTop={{ base: '1', sm: '5' }}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
            transition="all 0.6s ease-in-out" // Smooth transition
            _hover={{ transform: 'scale(1.02)' }}  // Scale effect on hover
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
                    height="250px"
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    marginTop="5%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        borderRadius="lg"
                        src={blog?.imageUrl}
                        alt={blog.title}
                        objectFit="contain"
                        maxWidth="100%"
                        maxHeight="100%"
                    />
                </Box>

                <Box zIndex="1" width="100%" position="absolute" height="100%">
                    <Box
                        bgGradient={bgGradient}
                        backgroundSize="20px 20px"
                        opacity="0.2"
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
                        {`${blog.title.substring(0, 50)}... `}
                    </Text>
                    
                </Heading>
                <TruncatedText text={blog.description} slug={blog.slug} />
                <BlogAuthor
                    authorImage={blog.authorImage}
                    author={blog.author}
                    date={blog.createdAt}
                />

                {/* Add Edit and Delete Buttons for admin */}
                {(user.role === 'admin') &&
                    <HStack spacing={4} marginTop={4}>
                        <IconButton
                            size="sm"
                            colorScheme="yellow"
                            aria-label="Edit Blog"
                            icon={<EditIcon />}
                            onClick={() => handleEditEvent(blog)}
                            _hover={{
                                cursor: 'pointer',
                                color: 'yellow.900',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.2s ease, color 0.2s ease',
                            }}
                        />

                        <IconButton
                            size="sm"
                            colorScheme="red"
                            aria-label="Delete Blog"
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteEvent(blog)}
                            _hover={{
                                cursor: 'pointer',
                                color: 'red.900',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.2s ease, color 0.2s ease',
                            }}
                        />
                    </HStack>
                }
            </Box>
        </Box>
    );
};

export default AdminBlogRotator;
