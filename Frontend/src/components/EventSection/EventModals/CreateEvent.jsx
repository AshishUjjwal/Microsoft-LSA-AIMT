import React, { useEffect, useState, useContext } from "react";
import {
    useToast,
    Button,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
} from "@chakra-ui/react";
import axios from 'axios';
import apiClient from "../../../api/axiosInstance";


const CreateEventForm = ({onClose, onCreate}) => {

    const toast = useToast();

    // Form state
    const [formData, setFormData] = useState({
        date: "",
        status: "Upcoming",
        title: "",
        description: "",
        connectorIcon: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const { date, title, description, connectorIcon, status } = formData;
        if (!date || !title || !description || !connectorIcon || !status) {
            toast({
                title: "All fields are required.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // Add the new event (you can send formData to your API here)
        try {

            // Make a POST request to the backend API
            const response = await apiClient.post(`/api/events/create-event`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',  // Make sure content type is set correctly
                },
            });
            // console.log(`response : `, response);
            if (response.status === 200) {
                onCreate(response.data.event); // Assuming the API returns the Added event
                onClose();
                toast({
                    title: "Event Created Successfully",
                    description: response.data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }

            // Reset form after submission
            setFormData({
                date: "",
                status: "Upcoming",
                title: "",
                description: "",
                connectorIcon: "",
            });

        } catch (error) {
            // Handle errors if the API request fails
            console.log('Error adding event:', error);
            toast({
                title: "Error adding event.",
                description: error.response ? error.response.data.message : 'Something went wrong.',
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3} >
                {/* Event Title */}
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Event Title</FormLabel>
                        <Input
                            name="title"
                            placeholder="Enter event title"
                            value={formData.title}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                </GridItem>

                {/* Event Date */}
                <GridItem colSpan={1}>
                    <FormControl isRequired>
                        <FormLabel>Event Date</FormLabel>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                </GridItem>

                {/* Status */}
                <GridItem colSpan={1}>
                    <FormControl isRequired>
                        <FormLabel>Status</FormLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            mb={2}
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                        </Select>
                    </FormControl>
                </GridItem>

                {/* Connector Icon */}
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Connector Icon</FormLabel>
                        <Input
                            type="url"
                            name="connectorIcon"
                            placeholder="Enter icon URL"
                            value={formData.connectorIcon}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                </GridItem>

                {/* Event Description */}
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Event Description</FormLabel>
                        <Textarea
                            name="description"
                            placeholder="Enter event description"
                            value={formData.description}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                </GridItem>

                {/* Create Event Button */}
                <GridItem colSpan={2}>
                    <Button type="submit" colorScheme="blue" width="100%">
                        Create Event
                    </Button>
                </GridItem>
            </Grid>
        </form>
    );
};

export default CreateEventForm;