import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Image, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { EventAuthor, EventTags, TruncatedText } from './EventComponent';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const UpcomingEventRotator = ({ events, user }) => {

    const bgGradient = useColorModeValue(
        'radial(orange.600 1px, transparent 1px)',
        'radial(orange.300 1px, transparent 1px)'
    );

    const [isRegistered, setIsRegistered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter to only show admin blogs
    const UpcomingEvents = events.filter(event => event.status === 'Upcoming');

    // Rotate through admin blogs every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % UpcomingEvents.length);
        }, 5000); // 5 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [UpcomingEvents.length]);

    // If there are no admin blogs, show nothing
    if (UpcomingEvents.length === 0) {
        return <Text>No admin blogs available.</Text>;
    }

    const event = UpcomingEvents[currentIndex];



    return (
        <Box
            key={event._id}
            marginTop={{ base: '1', sm: '5' }}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
            transition="all 0.6s ease-in-out" // Smooth transition
            _hover={{ transform: 'scale(1.02)' }}  // Scale effect on hover
        >
            <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center"
            >
                <Box
                    width={{ base: '100%', sm: '85%' }}
                    height="250px"
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    marginTop="5%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        borderRadius="lg"
                        src={event?.connectorIcon}
                        alt={event.title}
                        objectFit="contain"
                        maxWidth="100%"
                        maxHeight="100%"
                    />
                </Box>

                <Box zIndex="1" width="100%" position="absolute" height="100%">
                    <Box
                        bgGradient={bgGradient}
                        backgroundSize="20px 20px"
                        opacity="0.9"
                        height="100%"
                    />
                </Box>
            </Box>


            <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: '3', sm: '0' }}
                marginBottom={{ base: '7', sm: '10' }}
            >
                <EventTags tags={event.status} />
                <Heading marginTop="1">
                    <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        {`${event?.title} `}
                    </Text>

                </Heading>
                <TruncatedText text={event.description} />
                <EventAuthor
                    authorImage={event.connectorIcon}
                    author={event?.createdBy}
                    date={event.date}
                />
                
                {/* {user.role === 'admin' | user.role === 'user' && (
                event.status === "Upcoming" && (
                    isRegistered ? (
                      <Button
                        size="sm"
                        mt={5}
                        colorScheme="red"
                        aria-label="Unregister Event"
                        onClick={handleUnregisterEvent}
                        leftIcon={<DeleteIcon />}
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
                        mt="auto"
                        colorScheme="blue"
                        aria-label="Register Event"
                        // onClick={handleRegisterEvent}
                        leftIcon={<AddIcon />}
                        _hover={{
                          cursor: "pointer",
                          color: "black.900",
                        //   transform: "scale(1.05)",
                          transition: "transform 0.2s ease, color 0.2s ease",
                        }}
                      >
                        Register
                      </Button>
                    )
                  )
                )} */}
                
            </Box>
        </Box>
    );
};

export default UpcomingEventRotator;
