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
} from '@chakra-ui/react';
import LoadingPage from '../../pages/LoadingPage.jsx';

// Modals for CreateBlog, EditBlog, DeleteBlog
import CreateBlogModal from './BlogModals/CreateBlogModal.jsx';
import EditBlogModal from './BlogModals/EditBlogModal.jsx';
import DeleteBlogModal from './BlogModals/DeleteBlogModal.jsx';

import { AuthContext } from '../../contexts/AuthContext.js';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import AdminBlogRotator from './AdminBlogRotator.jsx';

import { BlogAuthor, BlogTags, TruncatedText } from './BlogComponent.jsx';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog
    const [isEditOpen, setEditOpen] = useState(false); // Edit modal visibility
    const [isDeleteOpen, setDeleteOpen] = useState(false); // Delete modal visibility

    const { auth } = useContext(AuthContext); // Access user from AuthContext
    const user = auth?.user;

    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const blogsPerPage = 6; // Number of blogs to show per page

    // Sorting the blogs by date
    const sortedBlogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                const response = await axios.get('http://localhost:8000/api/blogs/getblog', {
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

    if (loading) {
        return <LoadingPage />;
    }

    if (!user) {
        return <LoadingPage />;
    }

    return (
        <Container maxWidth={'1170px'} p="12">
            <CreateBlogModal onCreate={handleCreate} />

            <Heading as="h1">Blogs by MLSA'S</Heading>
            <AdminBlogRotator
                blogs={blogs}
                user={user}
                handleEditEvent={handleEditEvent}
                handleDeleteEvent={handleDeleteEvent}
                bgGradient="linear(to-r, teal.500, green.500)" // Example gradient
            />


            <Heading as="h2" marginTop="5">
                Latest articles
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
            <HStack justify="center" marginTop={6}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
                        onClick={() => handlePageChange(index + 1)}
                        _hover={{
                            backgroundColor: currentPage === index + 1 ? 'blue.500' : 'gray.500',
                        }}
                    >
                        {index + 1}
                    </Button>
                ))}
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
