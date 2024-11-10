import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
    Button,
    Heading,
    Grid,
    GridItem,
    Box,
    useToast,
    FormControl,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormLabel,
    Textarea,
    useColorModeValue,
    Stack,
    VStack,
} from "@chakra-ui/react";

// Admin panel component ------------------------------------->>

const UserPanel = () => {
    // const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(""); // To track which modal to open


    // Handlers for different modals
    // const openCreateModal = () => {
    //     setModalType("create");
    //     onOpen();
    // };

    const openEditModal = () => {
        setModalType("edit");
        onOpen();
    };

    const openDeleteModal = () => {
        setModalType("delete");
        onOpen();
    };

    // const openViewAllModal = () => {
    //     setModalType("view");
    //     onOpen();
    // };

    return (
        <VStack position="relative">
            {/* <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} /> */}
            <Stack
                p={10}
                bg={useColorModeValue('gray.300', 'gray.700')}
                borderRadius="md"
                boxShadow="xl"
                width={{base: '350px', md: '450px'}}
                m={14}
            >
                <Heading mb={6} textAlign="center">
                    User Panel
                </Heading>
                {/* Grid layout for buttons */}
                <Stack templateColumns="repeat(2, 1fr)" gap={6} >
                    {/* <GridItem colSpan={2}>
                        <Button colorScheme="green" width="100%" height='16' onClick={openCreateModal}>
                            View Users
                        </Button>
                    </GridItem> */}
                    <GridItem colSpan={2}>
                        <Button colorScheme="blue" width="100%" height='16' onClick={openEditModal}>
                            Edit User
                        </Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button colorScheme="red" width="100%" height='16' onClick={openDeleteModal}>
                            View & Delete User
                        </Button>
                    </GridItem>
                    {/* <GridItem colSpan={2}>
                        <Button colorScheme="yellow" width="100%" height='16' onClick={openViewAllModal}>
                            View All Events
                        </Button>
                    </GridItem> */}
                    {/* <GridItem colSpan={2}>
                        <Button colorScheme="orange" width="100%" height='16'>
                            Logout
                        </Button>
                    </GridItem> */}
                </Stack>
            </Stack>

            {/* Modal for Create, Edit, Delete, View All actions */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalType === "create" && "Create New Event"}
                        {modalType === "edit" && "Edit Existing Event"}
                        {modalType === "delete" && "Delete Event"}
                        {modalType === "view" && "View All Events"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Render different forms based on the action */}
                        {modalType === "create" && <CreateEventForm />}
                        {modalType === "edit" && <EditEventForm />}
                        {modalType === "delete" && <DeleteEventForm />}
                        {modalType === "view" && <ViewAllEvents />}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
};

// Form components for different actions
const CreateEventForm = () => {

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
        console.log(formData);

        // const jsonData = { date, status, connectorIcon, title, description };

        // Add the new event (you can send formData to your API here)
        try {

            // Make a POST request to the backend API
            // const response = await fetch('${process.env.REACT_APP_BASE_URL}/api/events/create-event', {
            //     method: 'POST',
            //     body: JSON.stringify(formData), // Convert the data to JSON
            //     headers: { 
            //         'Content-Type': 'application/json', 
            //         // 'Authorization': `Bearer ${token}`,  // Add the token to the request
            //     }, // Ensure JSON Format
            //     credentials: 'include'
            // });
            // console.log(response);

            // Show success message if event is added successfully
            toast({
                title: "Event added successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

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
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
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

const EditEventForm = () => (
    <>
        <FormLabel>Event ID</FormLabel>
        <Input placeholder="Enter event ID to edit" mb={4} />
        <FormLabel>New Title</FormLabel>
        <Input placeholder="Enter new title" mb={4} />
        <FormLabel>New Description</FormLabel>
        <Textarea placeholder="Enter new description" mb={4} />
        <Button colorScheme="green">Update Event</Button>
    </>
);

const DeleteEventForm = () => (
    <>
        <FormLabel>Event ID</FormLabel>
        <Input placeholder="Enter event ID to delete" mb={4} />
        <Button colorScheme="red">Delete Event</Button>
    </>
);

const ViewAllEvents = () => (
    <Box>
        {/* Here you would display all events in a list format */}
        View all events section.
    </Box>
);

export default UserPanel;
