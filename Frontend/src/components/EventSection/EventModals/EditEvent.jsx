// src/components/EditEventForm.js
import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
    Select,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import axios from 'axios';

const EditEventForm = ({ event, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        status: '',
        connectorIcon: '',
    });

    const toast = useToast();

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                date: event.date || '',
                status: event.status || 'Upcoming',
                connectorIcon: event.connectorIcon || '',
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            console.log(event._id);
            const response = await axios.put(`http://localhost:8000/api/events/update-event/${event._id}`, formData,
                {
                    withCredentials: true, // Include credentials like cookies, authorization headers, etc.
                    headers: {
                        'Content-Type': 'application/json',  // Adjust based on the type of data you're sending
                        // 'Authorization': `Bearer ${token}`,      // If you are using token-based authentication
                    }
                }
            );
            console.log(`Updated Response : `,response);
            if (response.status === 200) {
                onUpdate(response.data.event); // Assuming the API returns the updated event
                onClose();
                toast({
                    title: "Event Updated",
                    description: "The event has been successfully updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Update Failed",
                description: "There was an error updating the event.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="title" mb={4}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Event Title"
                        />
                    </FormControl>
                    <FormControl id="description" mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Event Description"
                        />
                    </FormControl>
                    <FormControl id="date" mb={4}>
                        <FormLabel>Date</FormLabel>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="status" mb={4}>
                        <FormLabel>Status</FormLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                        </Select>
                    </FormControl>
                    <FormControl id="icon" mb={4}>
                        <FormLabel>Icon URL</FormLabel>
                        <Input
                            name="connectorIcon"
                            value={formData.connectorIcon}
                            onChange={handleChange}
                            placeholder="URL of the event icon"
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditEventForm;
