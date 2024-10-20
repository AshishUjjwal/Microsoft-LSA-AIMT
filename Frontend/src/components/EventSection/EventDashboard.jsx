// // src/components/EventDashboard.js

// // Example Dummy Event Data for testing purposes
// const events = [
//     {
//         date: "20nd Jul - 2024",
//         status: "Upcoming",
//         title: "Git and GitHub",
//         description:
//             "Topics to be covered in the Workshop: What are Git and GitHub? Structure of Tutorial Hands-on Practice using Git and GitHub.",
//         // icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
//     },
//     {
//         date: "20nd Jul - 2024",
//         status: "Upcoming",
//         title: "Git and GitHub",
//         description:
//             "Topics to be covered in the Workshop: What are Git and GitHub? Structure of Tutorial Hands-on Practice using Git and GitHub.",
//         icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
//     },
//     {
//         date: "Feb 8th - 2024",
//         status: "Completed",
//         title: "Azure Skill Challenge",
//         description:
//             "Embark on a journey of innovation with the Power Platform App Maker Challenge! Unleash your creativity and technical prowess as you design.",
//         icon: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
//     },
//     {
//         date: "14th Jan - 2024",
//         status: "Completed",
//         title: "Git and GitHub",
//         description:
//             "Topics to be covered in the Workshop: What are Git and GitHub? Structure of Tutorial Hands-on Practice using Git and GitHub.",
//         icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
//     },
// ];

// src/components/EventDashboard.js
import React, { useEffect, useState, useContext } from "react";
import {
    Box,
    VStack,
    Text,
    Divider,
    useBreakpointValue,
    useToast,
    useDisclosure,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import {  AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext.js';
import CreateEventForm from './EventModals/CreateEvent.jsx'
import LoadingPage from "../../pages/LoadingPage.jsx";
import EventItem from './EventItem.jsx'

// EventItem Component


// Main Component for Event Dashboard
const EventDashboard = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [events, setEvents] = useState([]);      // To store fetched events
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);  // Access user from AuthContext
    const user = auth?.user;
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(""); // To track which modal to open

    useEffect(() => {
        // Define an asynchronous function to fetch events
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events/getevent',
                    {
                        withCredentials: true, // Include credentials like cookies, authorization headers, etc.
                        headers: {
                            'Content-Type': 'application/json',  // Adjust based on the type of data you're sending
                            // 'Authorization': `Bearer ${token}`,      // If you are using token-based authentication
                        }
                    }
                );
                setEvents(response.data.data.Event);   // Adjust based on your API response structure
                setLoading(false);
            } catch (err) {
                console.error(err.message || 'Error fetching events');
                toast({
                    title: "Error",
                    description: "Failed to fetch events.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
            }
        };

        fetchEvents(); // Invoke the fetch function
    },[toast]);

    // Handler to remove deleted event from state
    const handleDelete = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    };

    // Handler to update the event in state after editing
    const handleUpdate = (updatedEvent) => {
        setEvents(prevEvents => prevEvents.map(event => event._id === updatedEvent._id ? updatedEvent : event));
    };

    // Handler to create the event in state after adding a new event
    const handleCreate = (newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);  // Add the new event to the existing list of events
    };

    const openCreateModal = () => {
        setModalType("create");
        onOpen();
    };


    if (!user) {
        return <LoadingPage/>            
    }
    if (loading) {
        return <LoadingPage />;
    }

    return (
        <Box p={{ base: '5', md: '15' }} maxW={'1100px'} mx={'auto'} mb={10}>
            <VStack align="center" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    EVENTS DASHBOARD
                </Text>
                {user?.role === 'admin' && (
                    <Button
                        size="sm"
                        colorScheme="green"
                        aria-label="Add Event"
                        leftIcon={<AddIcon />}
                        _hover={{
                            cursor: 'pointer',
                            color: 'black.900',
                            transform: 'scale(1.05)',
                            transition: 'transform 0.2s ease, color 0.2s ease',
                        }}
                        onClick={openCreateModal}
                    >
                        Create New Event
                    </Button>
                )}

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {modalType === "create" && "Create New Event"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* Render different forms based on the action */}
                            {modalType === "create" &&
                                <CreateEventForm
                                    onClose={onClose}
                                    onCreate={handleCreate}
                                />}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Divider />
                {!isMobile ? (
                    <VStack align="stretch" spacing={8} >
                        {
                            Array.isArray(events) && events.slice().reverse().map(eventItem => (
                                <EventItem
                                    key={eventItem._id}
                                    event={eventItem}
                                    isAdmin={user?.role === 'admin'}
                                    onDelete={handleDelete}
                                    onEdit={handleUpdate}
                                />
                            ))
                        }
                    </VStack>
                ) : (
                    <VStack spacing={4}>
                        {
                            Array.isArray(events) && events.slice().reverse().map(eventItem => (
                                <EventItem
                                    key={eventItem._id}
                                    event={eventItem}
                                    isAdmin={user?.role === 'admin'}
                                    onDelete={handleDelete}
                                    onEdit={handleUpdate}
                                    onCreate={handleCreate}
                                />
                            ))
                        }
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

export default EventDashboard;