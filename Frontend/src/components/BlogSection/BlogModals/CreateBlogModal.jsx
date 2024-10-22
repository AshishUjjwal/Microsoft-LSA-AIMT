import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea, FormLabel, useDisclosure, VStack, HStack, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const CreateBlogModal = ({ onCreate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: [{ Header: '', Body: '' }],
        imageUrl: '',
        category: 'Technology',
        tags: [''],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (index, field, value) => {
        const updatedContent = [...formData.content];
        updatedContent[index][field] = value;
        setFormData({ ...formData, content: updatedContent });
    };

    const addContentSection = () => {
        setFormData({ ...formData, content: [...formData.content, { Header: '', Body: '' }] });
    };

    const removeContentSection = (index) => {
        const updatedContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: updatedContent });
    };

    const handleTagChange = (index, value) => {
        const updatedTags = [...formData.tags];
        updatedTags[index] = value;
        setFormData({ ...formData, tags: updatedTags });
    };

    const addTag = () => {
        setFormData({ ...formData, tags: [...formData.tags, ''] });
    };

    const removeTag = (index) => {
        const updatedTags = formData.tags.filter((_, i) => i !== index);
        setFormData({ ...formData, tags: updatedTags });
    };

    // Submit form and send data to backend API
    const handleSubmit = async () => {
        try {
            // Prepare the request headers (include token if required)
            const headers = {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer YOUR_TOKEN_HERE`, // Include token if necessary
            };

            // Make POST request to the API
            const response = await axios.post(
                'http://localhost:8000/api/blogs/createblog', // Replace with your actual API endpoint
                formData,
                { headers, withCredentials: true } // Include credentials
            );

            console.log('Blog created successfully:', response.data);
            onCreate(response.data.blog);  // Trigger callback for any additional logic on blog creation

            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error creating blog:', error.response?.data || error.message);
        }
    };

    return (
        <>
            {/* <Button onClick={onOpen} colorScheme="green">Create A New Blog</Button> */}
            <Button
                size="lg"  // Larger size for better visual hierarchy
                mt={5}
                alignSelf="center"  // Align to the center for a balanced look
                colorScheme="teal"
                bgGradient="linear(to-r, teal.500, green.400)"
                aria-label="Add Event"
                leftIcon={<AddIcon />}
                _hover={{
                  bgGradient: "linear(to-r, green.400, teal.500)",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                _active={{
                  bgGradient: "linear(to-r, teal.600, green.500)",
                  transform: 'scale(0.98)',
                }}
                onClick={onOpen}
              >
                Create A New Blog
              </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a New Blog</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack alignItems="start" spacing={4}>
                            <FormLabel>Title</FormLabel>
                            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" />
                            <FormLabel>Description</FormLabel>
                            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Blog Description" />
                            {/* <FormLabel>Author</FormLabel>
                            <Input name="author" value={formData.author} onChange={handleChange} placeholder="Author Name" /> */}
                            
                            <FormLabel>Image URL</FormLabel>
                            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />

                            {/* Dynamic tag fields */}
                            <FormLabel>Tags</FormLabel>
                            {formData.tags.map((tag, index) => (
                                <HStack key={index} width="100%" spacing={4}>
                                    <Input 
                                        placeholder={`Tag ${index + 1}`} 
                                        value={tag} 
                                        onChange={(e) => handleTagChange(index, e.target.value)} 
                                    />
                                    <IconButton 
                                        icon={<DeleteIcon />} 
                                        colorScheme="red" 
                                        onClick={() => removeTag(index)} 
                                        aria-label="Delete tag"
                                    />
                                </HStack>
                            ))}

                            <Button onClick={addTag} colorScheme="green" mt={2}>Add Tag</Button>

                            {/* Dynamic content fields */}
                            {formData.content.map((section, index) => (
                                <VStack alignItems="start" key={index} spacing={4} w="100%">
                                    <HStack width="100%" justifyContent="space-between">
                                        <FormLabel>Content Section {index + 1}</FormLabel>
                                        <IconButton 
                                            icon={<DeleteIcon />} 
                                            colorScheme="red" 
                                            onClick={() => removeContentSection(index)} 
                                            aria-label="Delete content section"
                                        />
                                    </HStack>
                                    <Input 
                                        placeholder="Header" 
                                        value={section.Header} 
                                        onChange={(e) => handleContentChange(index, 'Header', e.target.value)} 
                                    />
                                    <Textarea 
                                        placeholder="Body" 
                                        value={section.Body} 
                                        onChange={(e) => handleContentChange(index, 'Body', e.target.value)} 
                                    />
                                </VStack>
                            ))}

                            <Button onClick={addContentSection} colorScheme="blue" mt={2}>Add Content</Button>

                            

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Create</Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateBlogModal;
