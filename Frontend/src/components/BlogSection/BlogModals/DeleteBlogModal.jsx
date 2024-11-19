import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    VStack
} from '@chakra-ui/react';
import axios from 'axios';
import apiClient from '../../../api/axiosInstance';

const DeleteBlogModal = ({ blog, isOpen, onClose, onDelete }) => {
    // Handle blog deletion with axios
    const handleDelete = async () => {
        try {
            // Send DELETE request to the server
            await apiClient.delete(`/api/blogs/delete-blog/${blog._id}`, {
                withCredentials: true,  // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            onDelete(blog._id);  // Notify parent component to update the state
            onClose();  // Close the modal after deleting
        } catch (error) {
            console.error('Error deleting blog:', error);
            // You can show an error notification here if needed
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Blog</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        {/* Confirmation message */}
                        <Text>
                            Are you sure you want to delete the blog post titled "<strong>{blog.title}</strong>"? This action cannot be undone.
                        </Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    {/* Delete confirmation button */}
                    <Button colorScheme="red" mr={3} onClick={handleDelete}>
                        Delete
                    </Button>
                    {/* Cancel button */}
                    <Button colorScheme="green" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteBlogModal;
