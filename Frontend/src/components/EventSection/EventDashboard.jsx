'use client'

import {
    Heading, Wrap, Container, useDisclosure, useToast, Button, Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    HStack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.js';
import LoadingPage from '../../pages/LoadingPage.jsx';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import EventItem from './EventItem.jsx';
import CreateEventForm from './EventModals/CreateEvent.jsx';
import UpcomingEventRotator from './UpcomingEventRotator.jsx';
import apiClient from '../../api/axiosInstance.js';

const EventDashBoard = () => {
    const [events, setEvents] = useState([]);  // To store fetched events
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);  // Access user from AuthContext
    const user = auth?.user;
    const token = auth?.token;
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(""); // To track which modal to open

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = useBreakpointValue({
        base: 3, // For mobile (base) view
        md: 4,   // For tablet (md) and up
        lg: 6,   // For desktop/laptop (lg) and up
    }); // Number of events per page

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/events/getevent`, {
                const response = await apiClient.get(`/api/events/getevent`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setEvents(response.data.data.Event);   // Adjust based on your API response structure
                setLoading(false);
            } catch (err) {
                console.error(err.message || 'Error fetching events');
            }
        };
        fetchEvents();
    }, [toast]);

    if ((!user && !token) || loading) {
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

    const handleRegister = (newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    // Handler to create the event in state after adding a new event
    const handleCreate = (newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    const openCreateModal = () => {
        setModalType("create");
        onOpen();
    };

    // Pagination Logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(events.length / eventsPerPage);

    // Handle page change
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        // Scroll to the top of the container or page
        window.scrollTo({
            top: 500,
            behavior: 'smooth', // Optional: Adds a smooth scrolling effect
        });
    }
    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        // Scroll to the top of the container or page
        window.scrollTo({
            top: 500,
            behavior: 'smooth', // Optional: Adds a smooth scrolling effect
        });
    }
    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to the top of the container or page
        window.scrollTo({
            top: 500,
            behavior: 'smooth', // Optional: Adds a smooth scrolling effect
        });
    };

    return (
        <Container maxW={'6xl'} p="12">
            <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                mb={6}
            >
                Latest Upcoming Event's ...!
            </Heading>

            <UpcomingEventRotator events={events} user={user} />

            {user?.role === 'admin' && (
                <Button
                    size="lg"
                    mt={5}
                    alignSelf="center"
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
                bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.4)"
                mt={6}
            >
                Explore Exciting Events
            </Heading>

            {/* Display paginated events */}
            <Wrap justify={'space-between'}>
                {Array.isArray(currentEvents) && currentEvents.slice().reverse().map(event => (
                    <EventItem
                        key={event._id}
                        event={event}
                        isAdmin={user?.role === 'admin'}
                        onDelete={handleDelete}
                        onEdit={handleUpdate}
                        onRegister={handleRegister}
                    />
                ))}
            </Wrap>

            {/* Pagination Controls */}
            <HStack justify="center" mt={6} spacing={2}>
                {/* Previous Button */}
                <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={prevPage}
                    isDisabled={currentPage === 1}
                    colorScheme="blue"
                    variant="outline"
                    _hover={{ bg: 'blue.400' }}
                >
                    
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    // Show first two, last two, current page, and pages close to the current page
                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(currentPage - pageNumber) < 2
                    ) {
                        return (
                            <Button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                colorScheme={currentPage === pageNumber ? 'blue' : 'gray'}
                                _hover={{
                                    backgroundColor: currentPage === pageNumber ? 'blue.500' : 'gray.500',
                                }}
                                variant={currentPage === pageNumber ? 'solid' : 'outline'}
                            >
                                {pageNumber}
                            </Button>
                        );
                    }

                    // Show ellipsis for skipped pages
                    if (
                        (pageNumber === 2 && currentPage > 4) ||
                        (pageNumber === totalPages - 1 && currentPage < totalPages - 3)
                    ) {
                        return <Text key={pageNumber}>...</Text>;
                    }

                    return null;
                })}

                {/* Next Button */}
                <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={nextPage}
                    isDisabled={currentPage === totalPages}
                    colorScheme="blue"
                    variant="outline"
                    _hover={{ bg: 'blue.400' }}
                >
                    
                </Button>
            </HStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalType === "create" && "Create New Event"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalType === "create" && <CreateEventForm onClose={onClose} onCreate={handleCreate} />}
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
