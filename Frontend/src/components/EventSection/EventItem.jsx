import React, { useEffect, useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Image,
  IconButton,
  useDisclosure,
  Button,
  WrapItem,
  Box,
  Heading,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import EditEventForm from './EventModals/EditEvent.jsx'; // Import the EditEventForm component
import DeleteEvent from './EventModals/DeleteEvent.jsx'; // Import the DeleteEvent component
import axios from "axios";
import apiClient from "../../api/axiosInstance.js";

const BlogTags = (props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.connectorIcon || "https://via.placeholder.com/40"}
        alt={`Avatar of ${props.name}`}
      />
      {/* <Text fontWeight="medium">{props.name.toUpperCase()}</Text> */}
      <Text fontWeight="medium">{props?.name}</Text>
      <Text>—</Text>
      <Text>{new Date(props?.createdAt).toLocaleDateString()}</Text>
    </HStack>
  );
};

// EventItem Component
const EventItem = ({ event, isAdmin, onDelete, onEdit }) => {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(""); // To track which modal to open
  const [isRegistered, setIsRegistered] = useState(false);

  // Handlers for different modals
  const handleEditEvent = () => {
    setModalType("edit");
    onOpen();
  };

  const handleDeleteEvent = () => {
    setModalType("delete");
    onOpen();
  };

  // Check if the user is registered for this event on component mount
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await apiClient.get(
          `/api/registrations/registration-status/${event._id}`,
          {
            withCredentials: true, // Include credentials
            headers: {
              // Authorization: `Bearer ${token}`, // Attach the token here
              'Content-Type': 'application/json',
            },
          }
        );
        setIsRegistered(response.data.isRegistered);
      } catch (error) {
        console.error("Failed to check registration status:", error);
      }
    };
    checkRegistration();
  }, [event._id]);

  // Function to handle event registration with an API call
  const handleRegisterEvent = async () => {
    try {
      // const token = localStorage.getItem('token'); // Retrieve token from local storage or context

      const response = await apiClient.post(
        `${process.env.REACT_APP_BASE_URL}/api/registrations/register/${event._id}`,
        {}, // Empty body if no data is sent
        {
          withCredentials: true, // Include credentials
          headers: {
            // Authorization: `Bearer ${token}`, // Attach the token here
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: `Registration Successfull For this Event`,
        position: "top",
        duration: 2000,
        status: "success",
        isClosable: true,
      });
      setIsRegistered(true);
    } catch (error) {
      toast({
        title: `Already Registered For this Event!`,
        position: "top",
        duration: 2000,
        status: "error",
        isClosable: true,
      });
    }
  };

  // Function to handle event Unregistration with an API call
  const handleUnregisterEvent = async () => {
    try {
      // const token = localStorage.getItem("token");
      const response = await apiClient.delete(
        `/api/registrations/unregister/${event._id}`,
        {
          withCredentials: true,
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: `Unregistered For this Event!`,
        position: "top",
        duration: 2000,
        status: "error",
        isClosable: true,
      });
      setIsRegistered(false); // Update the state to reflect the unregistration status
    } catch (error) {
      console.error("Unregistration failed:", error);
      alert("Failed to unregister from the event. Please try again.");
    }
  };


  return (
    <WrapItem key={event._id} width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="4"
        borderWidth="2px"
        borderRadius="lg"
        position="relative"
        borderColor="transparent"  // Hide the default border
      >
        {/* Top Section: Image */}
        <Image
          borderRadius="lg"
          src={event.connectorIcon || 'https://via.placeholder.com/150'}
          alt={event.title}
          objectFit="contain"
          boxSize="220px"
          width="100%"
          maxHeight='100%'
          mx="auto"  // Center image horizontally
        />

        {/* Middle Section: Content */}
        <VStack alignItems="flex-start" >
          <BlogTags tags={[event.status]} />
          <Heading fontSize="xl">
            {event.title}
          </Heading>
          <Text as="p" fontSize="md" textAlign="justify" >
            {event.description}
          </Text>
        </VStack>

        {/* Bottom Section: Author */}
        <BlogAuthor
          name={event?.createdBy?.name}
          createdAt={event.date}
          connectorIcon={event.connectorIcon}
        />

        <HStack mt={3} justify={'right'}>
          {isAdmin ? (
            <HStack spacing={2}>
              <IconButton
                size="sm"
                colorScheme="yellow"
                aria-label="Edit Event"
                icon={<EditIcon />}
                onClick={handleEditEvent}  // Wrap in an anonymous function
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
                onClick={handleDeleteEvent}  // Same adjustment here
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
                isRegistered ? (
                  <Button
                    size="sm"
                    colorScheme="red"
                    aria-label="Unregister Event"
                    onClick={handleUnregisterEvent}
                    // leftIcon={<SubtractIcon />}
                    _hover={{
                      cursor: "pointer",
                      color: "red.900",
                      transform: "scale(1.05)",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                  >
                    Unregister
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    aria-label="Register Event"
                    onClick={handleRegisterEvent}
                    leftIcon={<AddIcon />}
                    _hover={{
                      cursor: "pointer",
                      color: "black.900",
                      transform: "scale(1.05)",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                  >
                    Register
                  </Button>
                )
              )
            )
          }
        </HStack>
      </Box>
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
    </WrapItem>
  );
};

export default EventItem;
