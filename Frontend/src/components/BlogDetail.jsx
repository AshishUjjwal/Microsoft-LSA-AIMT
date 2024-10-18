import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Heading,
    Image,
    Text,
    Container,
    VStack,
    HStack,
    Tag,
    Divider,
} from '@chakra-ui/react';
import LoadingPage from '../pages/LoadinPage.jsx';

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

const BlogAuthor = ({authorImage, author, date }) => {
    if(authorImage === '') {
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

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    console.log(`slug: `,slug);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogs/getblog/${slug}` , {
                    withCredentials: true, // Include credentials
                    headers: {
                        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your token
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`Resopnse : `,response);
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
            <VStack spacing="4" >
                <Heading as="h1">{blog.title}</Heading>
                <BlogTags tags={blog.tags} />
                <BlogAuthor authorImage = {blog.authorImage} author={blog.author} date={blog.createdAt} />
                <Divider my={5} />
                <Image src={blog.imageUrl || 'https://via.placeholder.com/800'} alt={blog.title} borderRadius="lg" />
                <Text fontSize="lg" marginTop="2">{blog.content}</Text>
            </VStack>
        </Container>
    );
};

export default BlogDetail;
