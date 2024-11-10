// src/components/DeleteEvent.js
import React, { useState, useRef } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import axios from 'axios';

const DeleteEvent = ({ event, isOpen, onClose, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false); // For managing loading state
    const cancelRef = useRef(); // Used to manage the cancel button ref
    const toast = useToast(); // For toast notifications

    // Function to handle the event deletion
    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/events/delete-event/${event._id}`,
                {
                    withCredentials: true, // Include credentials like cookies, authorization headers, etc.
                    headers: {
                        'Content-Type': 'application/json',  // Adjust based on the type of data you're sending
                        // 'Authorization': `Bearer ${token}`,      // If you are using token-based authentication
                    }
                }
            );
            onDelete(event._id); // Update the state in the parent component after deletion
            onClose();
            toast({
                title: "Event Deleted",
                description: "The event has been successfully deleted.",
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Delete Failed",
                description: "There was an error deleting the event.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Event
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={confirmDelete}
                            isLoading={isDeleting}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

DeleteEvent.propTypes = {
    event: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        status: PropTypes.string,
        connectorIcon: PropTypes.string,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteEvent;
