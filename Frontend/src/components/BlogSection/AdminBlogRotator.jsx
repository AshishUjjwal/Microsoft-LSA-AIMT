import React, { useState, useEffect } from 'react';
import { Box, Image, Heading, Text, HStack, IconButton, useColorModeValue, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

import { BlogAuthor, BlogTags } from './BlogComponent.jsx';
import apiClient from '../../api/axiosInstance.js';
import LoadingPage from '../../pages/LoadingPage.jsx';
import axios from 'axios';

const TruncatedText = ({ text = '', slug }) => {
    const navigate = useNavigate();
    const maxLength = 200;

    const handleReadMore = () => {
        navigate(`/blog/${slug}`); // Navigate to blog detail page
    };

    if (!text) return <Text>No content available</Text>;

    return (
        <Text>
            {`${text.substring(0, maxLength)}... `}
            <Button size="sm" variant="link" onClick={handleReadMore}>
                Read More
            </Button>
        </Text>
    );
};

const AdminBlogRotator = ({ user, handleEditEvent, handleDeleteEvent }) => {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blogs/getblog`, {
                // Determine the API endpoint based on the user's role
                // console.log(`user role : `, user?.role);

                const endpoint = '/api/blogsapprove/getapprovedAdminblogs'

                const response = await apiClient.get(endpoint, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // console.log(`response:`, response);
                const blogs = response?.data?.blogs?.map(item => ({
                        ...item.blog, // Spread the blog details
                        approvalDate: item.approvalDate, // Add the approval date
                        approvedBy: item.approvedBy, // Add approvedBy details
                    }));

                // console.log(`Blogs : `, blogs);

                setBlogs(blogs); // Store in state
                // console.log(`Response : `, response?.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [user]);


    // const bgGradient = useColorModeValue(
    //     'radial(orange.600 1px, transparent 1px)',
    //     'radial(orange.300 1px, transparent 1px)'
    // );

    const handleReadMore1 = () => {
        navigate(`/blog/${blog?.slug}`); // Navigate to blog detail page
    };


    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter to only show admin blogs
    const adminBlogs = blogs?.filter(blog => blog?.author?.role === 'admin');

    // Rotate through admin blogs every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % adminBlogs?.length);
        }, 5000); // 5 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [adminBlogs?.length]);

    // If there are no admin blogs, show nothing
    // if (adminBlogs?.length === 0) {
    //     return <Text>No admin blogs available.</Text>;
    // }

    if (loading || !blogs || !blogs?.length) {
        return <LoadingPage />;
    }

    // const blog = adminBlogs[currentIndex];
    const blog = blogs?.length > 0 ? adminBlogs[currentIndex ?? 0] : null;


    return (
        <Box
            key={blog?._id}
            marginTop={{ base: '5px', sm: '2' }}
            display="flex"
            maxWidth={'1100px'}
            p="4"
            alignItems={'center'}
            justifyContent={'center'}
            mx='auto'
            flexDirection={{ base: 'column', sm: 'row' }}
            // justifyContent="space-between"
            transition="all 0.6s ease-in-out" // Smooth transition
            _hover={{ transform: 'scale(1.02)' }}  // Scale effect on hover
        >
            <Box>
                <Heading
                    as="h1"
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    textAlign="center"
                    bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                    bgClip="text"
                    fontWeight="extrabold"
                    textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                    mb={5}
                >
                    LATEST ADMIN BLOG ...👨🏻‍💻
                </Heading>
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
                            alt={blog?.title}
                            objectFit="contain"
                            maxWidth="100%"
                            maxHeight="100%"
                            cursor={'pointer'}
                            onClick={handleReadMore1}
                        />
                    </Box>

                    {/* <Box zIndex="-1" minW="60vw"
                     position="absolute" height="100%">
                        <Box
                            mx={'auto'}
                            bgGradient={bgGradient}
                            backgroundSize="20px 20px"
                            // opacity="0.2"
                            height="100%"
                        />
                    </Box> */}
                </Box>


                <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="center"
                    marginTop={{ base: '3', sm: '0' }}
                >
                    <BlogTags tags={blog?.tags} />
                    <Heading marginTop="1">
                        <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {/* {`${blog?.title.substring(0, 50)}... `} */}
                            {blog?.title}
                        </Text>

                    </Heading>
                    <TruncatedText text={blog?.description} slug={blog?.slug} />
                    <BlogAuthor
                        authorImage={blog?.authorImage}
                        author={blog?.author}
                        date={blog?.createdAt}
                    />

                    {/* Add Edit and Delete Buttons for admin */}
                    {/* {(user.role === 'admin') &&
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
                } */}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminBlogRotator;
