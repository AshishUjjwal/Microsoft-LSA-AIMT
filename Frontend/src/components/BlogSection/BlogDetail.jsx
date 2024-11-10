import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Heading,
    Image,
    Text,
    Container,
    VStack,
    Divider,
} from '@chakra-ui/react';
import LoadingPage from '../../pages/LoadingPage.jsx';

import { BlogAuthor, BlogTags } from './BlogComponent.jsx';
import apiClient from '../../api/axiosInstance.js';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    console.log(`slug: `, slug);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blogs/getblog/${slug}`,
                const response = await apiClient.get(`/api/blogs/getblog/${slug}`, {
                    withCredentials: true, // Include credentials
                    headers: {
                        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your token
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`Resopnse : `, response);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [slug]);

    if (!blog) return <LoadingPage />;

    return (
        <Container maxWidth={'900px'} p="12">
            <VStack spacing="4">
                <Heading as="h1" textAlign="center">
                    {blog.title}
                </Heading>
                <Text as="h4" textAlign="center">
                    {blog.description}
                </Text>
                <BlogTags tags={blog.tags} />
                <BlogAuthor authorImage={blog.authorImage} author={blog.author} date={blog.createdAt} />
                <Divider my={5} />
                <Image
                    // src={'https://plopdo.com/wp-content/uploads/2020/02/GettyImages-887987150-5c770377c9e77c00011c82e6.jpg' || blog.imageUrl }
                    src={blog.imageUrl}
                    alt={blog.title}
                    borderRadius="lg"
                />

                {/* Render blog content */}
                {blog.content && blog.content.length > 0 ? (
                    blog.content.map((section, index) => (
                        <VStack key={index} align="start" spacing={3} mt={5}>
                            <Heading as="h3" size="lg">
                                {section.Header}
                            </Heading>
                            <Text fontSize="lg">{section.Body}</Text>
                        </VStack>
                    ))
                ) : (
                    <Text>No content available</Text>
                )}
            </VStack>
        </Container>
    );
};

export default BlogDetail;
