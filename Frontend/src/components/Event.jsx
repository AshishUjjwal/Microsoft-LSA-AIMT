import React from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Image,
    Divider,
    Button,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";
// import axios from 'axios';

// Example event data
const events = [
    {
        date: "20nd Jul - 2024",
        status: "Upcoming",
        title: "Git and GitHub",
        description:
            "Topics to be covered in the Workshop: What are Git and GitHub? Structure of Tutorial Hands-on Practice using Git and GitHub.",
        // icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
        date: "20nd Jul - 2024",
        status: "Upcoming",
        title: "Git and GitHub",
        description:
            "Topics to be covered in the Workshop: What are Git and GitHub? Structure of Tutorial Hands-on Practice using Git and GitHub.",
        icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
        date: "Feb 8th - 2024",
        status: "Completed",
        title: "Azure Skill Challenge",
        description:
            "Embark on a journey of innovation with the Power Platform App Maker Challenge! Unleash your creativity and technical prowess as you design.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
    },
    {
        date: "14th Jan - 2024",
        status: "Completed",
        title: "Git and GitHub",
        description:
            "Topics to be covered in the Workshop: What are Git and GitHub? Structure of Tutorial Hands-on Practice using Git and GitHub.",
        icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
];

// Main Component for Event Dashboard
const EventDashboard = () => {

    // const response = await fetch("https://localhost:8000/api/events/getevent", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(),
    //     credentials: 'include' // Important to send and receive cookies
    //     // credentials: 'include': This tells the browser to include cookies in the request and also save cookies sent from the backend. By default, cookies are not included in cross-origin requests, so this is necessary for cross-origin API calls.
    //   });
    //   const result = await response.json();
    //   console.log('result', result);

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box p={16} textColor={useColorModeValue('black.500', 'white.900')}>
            <VStack align="center" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    EVENTS DASHBOARD
                </Text>
                <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} />
                {!isMobile ? (
                    <VStack align="stretch" spacing={8} >
                        {events.map((event, index) => (
                            <EventItem key={index} event={event} />
                        ))}
                    </VStack>
                ) : (
                    <VStack spacing={4}>
                        {events.map((event, index) => (
                            <Box key={index}>
                                <EventItem event={event} />
                            </Box>
                        ))}
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

// EventItem Component using Chakra UI
const EventItem = ({ event }) => {
    // const connectorIcon = FaLaptop;
    const defImg = "https://t3.ftcdn.net/jpg/05/24/23/84/360_F_524238409_bhBWK45g7JQn9PI2TuUgzT8iZkLhTro5.jpg";
    return (
        <HStack
            alignItems="center"
            spacing={6}
            position="relative"
            w="100%"
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
            zIndex={-1}
            textColor={useColorModeValue('black.600', 'grey.900')}
            bg={useColorModeValue('gray.100', 'gray.700')}
        >
            <Image src={event.icon ? event.icon : defImg} alt={defImg} boxSize="80px" />
            <Divider orientation="vertical" h="100px" borderColor="gray.300" />
            <VStack align="start" spacing={2} flex={1}>
                <Text fontSize="lg" fontWeight="bold" color={event.status.toLowerCase() === "completed" ? "red.500" : "green.500"}>
                    {event.date} - {event.status.toUpperCase()}
                </Text>
                <HStack>
                    <Text fontSize="lg" fontWeight="bold">{event.title}</Text>
                </HStack>
                <Text fontSize="sm" >{event.description}</Text>

                {event.status === "Upcoming" && (
                    <Button size="sm" colorScheme="blue">
                        Register
                    </Button>
                )}
            </VStack>
        </HStack>
    );
};

export default EventDashboard;



