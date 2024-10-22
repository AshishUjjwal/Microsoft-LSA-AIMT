'use client'

import {
    Heading, Wrap, Container, useDisclosure, useToast, Button, Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext.js';
import LoadingPage from '../../pages/LoadingPage.jsx';
import { AddIcon } from '@chakra-ui/icons';
import EventItem from './EventItem.jsx';
import CreateEventForm from './EventModals/CreateEvent.jsx';
import UpcomingEventRotator from './UpcomingEventRotator.jsx';

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



const EventDashBoard = () => {
    const [events, setEvents] = useState([]);      // To store fetched events
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);  // Access user from AuthContext
    const user = auth?.user;
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(""); // To track which modal to open


    useEffect(() => {
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
                console.log(response.data);
                setEvents(response.data.data.Event);   // Adjust based on your API response structure
                setLoading(false);
            } catch (err) {
                console.error(err.message || 'Error fetching events');
                // toast({
                //     title: "Error",
                //     description: "Failed to fetch events.",
                //     status: "error",
                //     duration: 1000,
                //     isClosable: true,
                // });
            }
        }
        fetchEvents(); // Invoke the fetch function
    }, [toast]);

    if (!user || loading) {
        return <LoadingPage />;
    }

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

    
    return (
        <Container maxW={'6xl'} p="12">

            <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                // textAlign="center"
                bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                mb={6}
            >
                Latest Upcoming Event's ...!
            </Heading>

            <UpcomingEventRotator
                events={events}
                user={user}
                // bgGradient="linear(to-r, teal.500, green.500)" // Example gradient
                // handleEditEvent={handleEditEvent}
                // handleDeleteEvent={handleDeleteEvent}
            />

            {user?.role === 'admin' && (
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
                onClick={openCreateModal}
              >
                Create New Event
              </Button>
            )}
            
            <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                // textAlign="center"
                bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                mt={6}
            >
                Explore Exciting Events
            </Heading>
            <Wrap justify={'space-between'} >
                {Array.isArray(events) && events.slice().reverse().map(event => (
                    <EventItem
                        key={event._id}
                        event={event}
                        isAdmin={user?.role === 'admin'}
                        onDelete={handleDelete}
                        onEdit={handleUpdate}
                    />
                ))
                }
            </Wrap>
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
        </Container>
    );
};

export default EventDashBoard;
