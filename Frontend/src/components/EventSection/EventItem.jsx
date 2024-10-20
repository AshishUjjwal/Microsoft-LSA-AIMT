import React, { useState } from "react";
import {
    VStack,
    HStack,
    Text,
    Image,
    useColorModeValue,
    IconButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import EditEventForm from './EventModals/EditEvent.jsx'; // Import the EditEventForm component
import DeleteEvent from './EventModals/DeleteEvent.jsx'; // Import the DeleteEvent component

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

export default EventItem;
