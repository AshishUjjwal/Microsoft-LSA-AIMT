import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import EditEventForm from './EventModals/EditEvent.jsx'; // Import the EditEventForm component
import DeleteEvent from './EventModals/DeleteEvent.jsx'; // Import the DeleteEvent component

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
