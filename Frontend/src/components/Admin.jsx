import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
    Button,
    Heading,
    Grid,
    GridItem,
    Box,
    // useToast,
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
    Divider,
    Stack,
    VStack,
} from "@chakra-ui/react";

// Admin panel component ------------------------------------->>

const AdminPanel = () => {
    // const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(""); // To track which modal to open


    // Add New Events 
    // Form state
    // const toast = useToast();
    // const [formData, setFormData] = useState({
    //     date: "",
    //     status: "Upcoming",
    //     title: "",
    //     description: "",
    //     icon: "",
    //     connectorIcon: "FaSyncAlt",
    // });

    // Handle form input changes
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // Handle form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Basic validation
    //     const { date, title, description, icon, connectorIcon } = formData;
    //     if (!date || !title || !description || !icon || !connectorIcon) {
    //         toast({
    //             title: "All fields are required.",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //         });
    //         return;
    //     }

    //     // Add the new event
    //     // addEvent(formData);

    //     // Reset form
    //     setFormData({
    //         date: "",
    //         status: "Upcoming",
    //         title: "",
    //         description: "",
    //         icon: "",
    //         connectorIcon: "FaSyncAlt",
    //     });

    //     // Success toast
    //     toast({
    //         title: "Event added successfully!",
    //         status: "success",
    //         duration: 5000,
    //         isClosable: true,
    //     });
    // };

    // Handlers for different modals
    const openCreateModal = () => {
        setModalType("create");
        onOpen();
    };

    const openEditModal = () => {
        setModalType("edit");
        onOpen();
    };

    const openDeleteModal = () => {
        setModalType("delete");
        onOpen();
    };

    const openViewAllModal = () => {
        setModalType("view");
        onOpen();
    };

    return (
        <VStack position="relative" bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
            <Heading m={6} textAlign="center" fontFamily={'monospace'} >
                Welcome To Admin Page!!
            </Heading>
            <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} />
            <Stack
                mb={20}
                p={10}
                bg={useColorModeValue('gray.300', 'gray.700')}
                borderRadius="md"
                boxShadow="xl"
                w="100%"
                maxW="600px"
                mx="auto"
                mt={16}
            >
                <Heading mb={6} textAlign="center">
                    Admin Panel
                </Heading>
                {/* Grid layout for buttons */}
                <Stack templateColumns="repeat(2, 1fr)" gap={6} >
                    <GridItem colSpan={2}>
                        <Button colorScheme="green" width="100%" height='16' onClick={openCreateModal}>
                            Create New Event
                        </Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button colorScheme="blue" width="100%" height='16' onClick={openEditModal}>
                            Edit Existing Event
                        </Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button colorScheme="red" width="100%" height='16' onClick={openDeleteModal}>
                            Delete Event
                        </Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button colorScheme="yellow" width="100%" height='16' onClick={openViewAllModal}>
                            View All Events
                        </Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button colorScheme="orange" width="100%" height='16'>
                            Logout
                        </Button>
                    </GridItem>
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
const CreateEventForm = () => (
    <>
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            {/* Event Title */}
            <GridItem colSpan={2}>
                <FormLabel>Event Title</FormLabel>
                <Input placeholder="Enter event title" mb={2} />
            </GridItem>

            {/* Event Date */}
            <GridItem colSpan={1}>
                <FormLabel>Event Date</FormLabel>
                <Input type="date" mb={2} />
            </GridItem>

            {/* Status */}
            <GridItem colSpan={1}>
                <FormControl id="status" mb={2} isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select name="status">
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                    </Select>
                </FormControl>
            </GridItem>

            {/* Connector Icon */}
            <GridItem colSpan={2}>
                <FormControl id="connectorIcon" mb={2} isRequired>
                    <FormLabel>Connector Icon</FormLabel>
                    <Select name="connectorIcon">
                        <option value="FaSyncAlt">Sync</option>
                        <option value="FaLaptop">Laptop</option>
                        <option value="FaBed">Bed</option>
                    </Select>
                </FormControl>
            </GridItem>

            {/* Event Description */}
            <GridItem colSpan={2}>
                <FormLabel>Event Description</FormLabel>
                <Textarea placeholder="Enter event description" mb={2} />
            </GridItem>

            {/* Create Event Button */}
            <GridItem colSpan={2}>
                <Button colorScheme="blue" width="100%">
                    Create Event
                </Button>
            </GridItem>
        </Grid>
    </>
);

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

export default AdminPanel;
