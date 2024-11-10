'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Container,
    IconButton,
    Button,
    useBreakpointValue,
} from '@chakra-ui/react';
import LoadingPage from '../../pages/LoadingPage.jsx';

// Modals for CreateBlog, EditBlog, DeleteBlog
import CreateBlogModal from './BlogModals/CreateBlogModal.jsx';
import EditBlogModal from './BlogModals/EditBlogModal.jsx';
import DeleteBlogModal from './BlogModals/DeleteBlogModal.jsx';

import { AuthContext } from '../../contexts/AuthContext.js';
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import AdminBlogRotator from './AdminBlogRotator.jsx';

import { BlogAuthor, BlogTags, TruncatedText } from './BlogComponent.jsx';
import apiClient from '../../api/axiosInstance.js';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog
    const [isEditOpen, setEditOpen] = useState(false); // Edit modal visibility
    const [isDeleteOpen, setDeleteOpen] = useState(false); // Delete modal visibility

    const { auth } = useContext(AuthContext); // Access user from AuthContext
    const user = auth?.user;

    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const blogsPerPage = useBreakpointValue({
        base: 3, // For mobile (base) view
        md: 4,   // For tablet (md) and up
        lg: 6,   // For desktop/laptop (lg) and up
    });

    // Sorting the blogs by date
    blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get the blogs for the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    // Handlers for creating, editing, and deleting
    const handleCreate = (newBlog) => {
        setBlogs([...blogs, newBlog]);
    };

    const handleEdit = (id, updatedBlog) => {
        setBlogs(blogs.map((blog) => (blog._id === id ? updatedBlog : blog)));
    };

    const handleDelete = (id) => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
    };

    const handleEditEvent = (blog) => {
        setSelectedBlog(blog); // Set the selected blog
        setEditOpen(true); // Open the edit modal
    };

    const handleDeleteEvent = (blog) => {
        setSelectedBlog(blog); // Set the selected blog
        setDeleteOpen(true); // Open the delete modal
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blogs/getblog`, {
                const response = await apiClient.get('/api/blogs/getblog',{
                    withCredentials: true, // Include credentials
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading || !user) {
        return <LoadingPage />;
    }


    return (
        <Container maxWidth={'1170px'} p="12">

            <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                // textAlign="center"
                bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                mt={3}
            >
                Blogs By MLSA'S
            </Heading>
            <AdminBlogRotator
                blogs={blogs}
                user={user}
                handleEditEvent={handleEditEvent}
                handleDeleteEvent={handleDeleteEvent}
                bgGradient="linear(to-r, teal.500, green.500)" // Example gradient
            />

            <CreateBlogModal onCreate={handleCreate} />

            <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                // textAlign="center"
                bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                mt={3}
            >
                Latest Articles
            </Heading>
            {/* <CreateBlogModal onCreate={handleCreate} /> */}
            <Divider marginTop="5" />
            <Wrap spacing="30px" marginTop="5" alignItems="start">
                {currentBlogs
                    .map((blog) => (
                        <WrapItem key={blog._id} width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
                            <Box w="100%">
                                <Box borderRadius="lg" overflow="hidden" height="170px">
                                    <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                        <Image
                                            transform="scale(1.0)"
                                            src={
                                                blog.imageUrl || 'https://plopdo.com/wp-content/uploads/2020/02/GettyImages-887987150-5c770377c9e77c00011c82e6.jpg'
                                            }
                                            alt={blog.title}
                                            objectFit="contain"
                                            width="100%"
                                            maxHeight={'100%'}
                                            transition="0.3s ease-in-out"
                                            _hover={{
                                                transform: 'scale(1.05)',
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Heading fontSize="xl" marginTop="2">
                                    <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                        {`${blog.title?.substring(0, 40)}... `}
                                    </Text>
                                </Heading>
                                <BlogTags tags={blog.tags} />
                                <TruncatedText text={blog.description} slug={blog.slug} />
                                <BlogAuthor
                                    authorImage={blog.authorImage}
                                    author={blog.author}
                                    date={blog.createdAt}
                                />
                                {/* Author and Edit/Delete options */}
                                {(blog.author?._id === user._id || user.role === 'admin') && (
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
                                                color: 'yellow.900',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease, color 0.2s ease',
                                            }}
                                        />
                                    </HStack>
                                )}
                            </Box>
                        </WrapItem>
                    ))}
            </Wrap>

            {/* Pagination Controls */}
            <HStack justify="center" marginTop={6} spacing={2}>
                {/* Previous Button */}
                <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    colorScheme="blue"
                    _hover={{ bg: 'blue.400' }}
                    variant="outline"
                >
                    
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    // Show first two, last two, current page, and pages close to the current page
                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(currentPage - pageNumber) < 2
                    ) {
                        return (
                            <Button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                colorScheme={currentPage === pageNumber ? 'blue' : 'gray'}
                                _hover={{
                                    backgroundColor: currentPage === pageNumber ? 'blue.500' : 'gray.500',
                                }}
                                variant={currentPage === pageNumber ? 'solid' : 'outline'}
                            >
                                {pageNumber}
                            </Button>
                        );
                    }

                    // Show ellipsis for skipped pages
                    if (
                        (pageNumber === 2 && currentPage > 4) ||
                        (pageNumber === totalPages - 1 && currentPage < totalPages - 3)
                    ) {
                        return <Text key={pageNumber}>...</Text>;
                    }

                    return null;
                })}

                {/* Next Button */}
                <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    colorScheme="blue"
                    _hover={{ bg: 'blue.400' }}
                    variant="outline"
                >
                    
                </Button>
            </HStack>

            {/* Modal for Edit and Delete */}
            {isEditOpen && (
                <EditBlogModal
                    blog={selectedBlog} // Pass the selected blog
                    isOpen={isEditOpen}
                    onClose={() => setEditOpen(false)}
                    onEdit={handleEdit} // Pass the onEdit handler
                />
            )}

            {isDeleteOpen && (
                <DeleteBlogModal
                    blog={selectedBlog}
                    isOpen={isDeleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    onDelete={handleDelete}
                />
            )}
        </Container>
    );
};

export default BlogSection;
