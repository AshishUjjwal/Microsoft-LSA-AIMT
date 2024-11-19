import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Textarea,
    FormLabel,
    VStack,
    Box,
    HStack,
    IconButton
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import apiClient from '../../../api/axiosInstance';

const EditBlogModal = ({ blog, isOpen, onClose, onEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        content: [{ Header: '', Body: '' }],
        tags: [''],
    });

    // Load selected blog data into form fields
    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                description: blog.description || '',
                imageUrl: blog.imageUrl || '',
                content: blog.content || [{ Header: '', Body: '' }],
                tags: blog.tags || [''],
            });
        }
    }, [blog]);

    // Handle input field changes for simple fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle content field changes
    const handleContentChange = (index, field, value) => {
        const updatedContent = [...formData.content];
        updatedContent[index][field] = value;
        setFormData({ ...formData, content: updatedContent });
    };

    // Handle tag changes
    const handleTagChange = (index, value) => {
        const updatedTags = [...formData.tags];
        updatedTags[index] = value;
        setFormData({ ...formData, tags: updatedTags });
    };

    // Add new content section
    const addContentSection = () => {
        setFormData({
            ...formData,
            content: [...formData.content, { Header: '', Body: '' }]
        });
    };

    // Delete content section
    const deleteContentSection = (index) => {
        const updatedContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: updatedContent });
    };

    // Add new tag
    const addTag = () => {
        setFormData({
            ...formData,
            tags: [...formData.tags, '']
        });
    };

    // Delete tag
    const deleteTag = (index) => {
        const updatedTags = formData.tags.filter((_, i) => i !== index);
        setFormData({ ...formData, tags: updatedTags });
    };

    // Handle form submission and trigger axios API call
    const handleSubmit = async () => {
        try {
            const response = await apiClient.put(`/api/blogs/update-blog/${blog._id}`, formData, {
                withCredentials: true, // Include credentials
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(`Rees: `,response);
            onEdit(blog._id, response.data.blog);
            onClose();  // Close the modal after editing
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Blog</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        {/* Title Input */}
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                        />

                        {/* Description Input */}
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter blog description"
                        />

                        {/* Image URL Input */}
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />

                        {/* Content Section */}
                        <FormLabel>Content</FormLabel>
                        {formData.content.map((section, index) => (
                            <Box key={index} borderWidth="1px" borderRadius="lg" p={4} mb={4} width={'100%'}>
                                <HStack justifyContent="space-between">
                                    <FormLabel>Header</FormLabel>
                                    <IconButton
                                        m={'2'}
                                        icon={<DeleteIcon />}
                                        onClick={() => deleteContentSection(index)}
                                        colorScheme="red"
                                    />
                                </HStack>
                                <Input
                                    value={section.Header}
                                    onChange={(e) => handleContentChange(index, 'Header', e.target.value)}
                                    placeholder="Enter section header"
                                />
                                <FormLabel>Body</FormLabel>
                                <Textarea
                                    value={section.Body}
                                    onChange={(e) => handleContentChange(index, 'Body', e.target.value)}
                                    placeholder="Enter section body"
                                />
                            </Box>
                        ))}
                        <Button onClick={addContentSection} colorScheme="blue">Add Content Section</Button>

                        {/* Tags Section */}
                        <FormLabel>Tags</FormLabel>
                        {formData.tags.map((tag, index) => (
                            <HStack key={index} spacing={2} width={'100%'}>
                                <Input
                                    value={tag}
                                    onChange={(e) => handleTagChange(index, e.target.value)}
                                    placeholder="Enter tag"
                                />
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => deleteTag(index)}
                                    colorScheme="red"
                                />
                            </HStack>
                        ))}
                        <Button onClick={addTag} colorScheme="blue">Add Tag</Button>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    {/* Save changes button */}
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Save Changes
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditBlogModal;
