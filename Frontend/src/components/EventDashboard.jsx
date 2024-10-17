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
    HStack,
    Text,
    Image,
    Divider,
    useBreakpointValue,
    useColorModeValue,
    useToast,
    IconButton,
    useDisclosure,
    Button,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Modal,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext.js';
import EditEventForm from './EditEvent.jsx'; // Import the EditEventForm component
import DeleteEvent from './DeleteEvent.jsx'; // Import the DeleteEvent component
import LoadingPage from "../components/LoadingEvent.jsx";

// EventItem Component
const EventItem = ({ event, isAdmin, onDelete, onEdit }) => {
    const defImg = "https://t3.ftcdn.net/jpg/05/24/23/84/360_F_524238409_bhBWK45g7JQn9PI2TuUgzT8iZkLhTro5.jpg";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(""); // To track which modal to open

    // Handlers for different modals
    const handleEditEvent = () => {
        setModalType("edit");
        onOpen();
    };

    const handleDeleteEvent = () => {
        setModalType("delete");
        onOpen();
    };

    return (
        <HStack
            alignItems="center"
            spacing={6}
            position="relative"
            w="90%"
            p={4}
            mx={'auto'}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
            textColor={useColorModeValue('black.600', 'grey.900')}
            bg={useColorModeValue('gray.100', 'gray.700')}
        >
            <Image src={event.connectorIcon ? event.connectorIcon : defImg} alt="Event Icon" boxSize="80px" />
            <VStack align="start" spacing={2} flex={1}>
                <Text fontSize="lg" fontWeight="bold" color={event.status.toLowerCase() === "completed" ? "red.500" : "green.500"}>
                    {event.date}  {event.status.toUpperCase()}
                </Text>
                <HStack>
                    <Text fontSize="lg" fontWeight="bold">{event.title}</Text>
                </HStack>
                <Text fontSize="sm">{event.description}</Text>

                <HStack>
                    {isAdmin ? (
                        <HStack spacing={2}>
                            <IconButton
                                size="sm"
                                colorScheme="yellow"
                                aria-label="Edit Event"
                                icon={<EditIcon />}
                                onClick={handleEditEvent}
                                _hover={{
                                    cursor: 'pointer',
                                    color: 'yellow.900',
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.2s ease, color 0.2s ease',
                                }}
                            />
                            <IconButton
                                size="sm"
                                colorScheme="red"
                                aria-label="Delete Event"
                                icon={<DeleteIcon />}
                                onClick={handleDeleteEvent}
                                _hover={{
                                    cursor: 'pointer',
                                    color: 'red.900',
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.2s ease, color 0.2s ease',
                                }}
                            />
                        </HStack>
                    ) :
                        (
                            event.status === "Upcoming" && (
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    aria-label="Register Event"
                                    leftIcon={<AddIcon />}
                                    _hover={{
                                        cursor: 'pointer',
                                        color: 'black.900',
                                        transform: 'scale(1.05)',
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                    }}
                                >
                                    Register
                                </Button>
                            )
                        )
                    }
                </HStack>
            </VStack>

            {/* Modal for Edit and Delete */}
            {modalType === "edit" && (
                <EditEventForm
                    event={event}
                    isOpen={isOpen}
                    onClose={onClose}
                    onUpdate={onEdit} // Pass the onEdit handler
                />
            )}
            {modalType === "delete" && (
                <DeleteEvent
                    event={event}
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={onDelete} // Pass the onDelete handler
                />
            )}
        </HStack>
    );
};
EventItem.propTypes = {
    event: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        connectorIcon: PropTypes.string,
        date: PropTypes.string,
        status: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

// Form components for different actions
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
            const response = await axios.post('http://localhost:8000/api/events/create-event', formData, {
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


// Main Component for Event Dashboard
const EventDashboard = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [events, setEvents] = useState([]);      // To store fetched events
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
                                <
                                    CreateEventForm
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