import React, { useState } from 'react';
import { Box, Flex, Avatar, Text, Heading, Stack, Button, Icon, useColorModeValue, Link, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { MdEmail, MdLocationOn, MdEdit } from 'react-icons/md';
import axios from 'axios';
import apiClient from '../../api/axiosInstance';

const ProfileHeader = ({ user, onUpdate }) => {
    // Define colors for light and dark modes using useColorModeValue
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.100', 'gray.200');
    const boxShadowColor = useColorModeValue('lg', 'dark-lg');
    const buttonBg = useColorModeValue('blue.400', 'gray.500');
    const buttonHoverBg = useColorModeValue('blue.500', 'green.700');

    // Assume you have a state for the user data
    const [prevuser, setUser] = useState(() => {
        // Initialize from local storage
        const savedUser = localStorage.getItem('auth');
        return savedUser ? JSON.parse(savedUser).prevuser : null;
    });

    // Modal control
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Chakra's toast hook
    const toast = useToast();

    // State for form data (editable fields)
    const [formData, setFormData] = useState({
        name: user.name,
        avatarUrl: user.avatarUrl,
        location: user.location,
        description: user.description,
        social: user.social
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submit (Edit Profile)
    const handleFormSubmit = async () => {
        try {
            // Assuming the backend endpoint is `/api/users/${user._id}`
            const response = await apiClient.post(`/api/users/update-account`, formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // console.log(`Response: `, response);

            // If successful, trigger the onUpdate callback to refresh the profile data
            if (response.status === 200) {
                const updatedProfile = response.data.user; // Extract updated user data

                // Get the existing user data from local storage
                const existingUser = JSON.parse(localStorage.getItem('auth'));


                if (existingUser) {
                    // Merge the existing user data with the updated profile data
                    const mergedUser = { ...existingUser.user, ...updatedProfile };

                    // Create a new auth object with the updated user but keep the existing token and other properties
                    const updatedAuth = {
                        ...existingUser,    // keep the token and other auth properties
                        user: mergedUser   // update only the user part
                    };

                    // Save the merged user data back to local storage
                    localStorage.setItem('auth', JSON.stringify(updatedAuth));


                    onUpdate(updatedProfile); // Pass the updated user data back
                    // Also update the React state to trigger a re-render
                    setUser(updatedAuth);
                }
                else {
                    console.log('No auth data found in local storage.');
                }
                toast({
                    title: 'Profile updated.',
                    description: "Your profile has been successfully updated.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
                onClose(); // Close modal after successful update
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: 'Update failed.',
                description: "There was an error updating your profile. Please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <>
            {/* Profile Header */}
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align="center"
                justify="space-between"
                p={8}
                bg={bgColor}
                borderRadius="md"
                boxShadow={boxShadowColor}
                w="100%"
                maxW="5xl"
                mx="auto"
                transition="all 0.3s ease"
                _hover={{ boxShadow: 'xl' }}
                backgroundImage="url('https://img.freepik.com/premium-photo/black-laptop-coffee-cup-plants-dark-tabletop_1271306-2097.jpg?semt=ais_hybrid')"  // Replace with your image URL
                backgroundSize="cover"  // Adjust the image size to cover the entire flex area
                backgroundPosition="center"  // Center the image
                backgroundRepeat="no-repeat"  // Avoid repeating the image
            >
                {/* Left Side - Profile Image */}
                <Flex justify="center" w={{ base: '100%', md: '40%' }} mb={{ base: 6, md: 0 }}>
                    <Avatar size="2xl" boxSize={{ base: '150px', md: '150px' }} src={user.avatarUrl} name={user.name} boxShadow="lg" />
                </Flex>

                {/* Right Side - User Details */}
                <Box w={{ base: '100%', md: '60%' }}>
                    <Heading as="h1" fontSize="2xl" color={useColorModeValue('gray.100', 'gray.200')} fontWeight="bold" mb={2}>
                        {user.name}
                    </Heading>
                    <Text fontSize="lg" color={textColor} display="flex" alignItems="center" mb={1}>
                        <Icon as={MdEmail} mr={2} /> {user.email}
                    </Text>
                    <Text fontSize="lg" color={textColor} display="flex" alignItems="center" mb={1}>
                        <Icon as={MdLocationOn} mr={2} /> {user.location}
                    </Text>
                    <Text fontSize="md" color={useColorModeValue('gray.100', 'gray.200')} mt={2} mb={2}>
                        {user.description}
                    </Text>
                    <Box my={2}>
                        <Flex align="center">
                            <Text mr={2} color={useColorModeValue('gray.100', 'gray.200')}>Let's Connect </Text>
                            <Link href={user.social} isExternal color={useColorModeValue('blue.500', 'blue.300')}>
                                <Text fontSize="md">{user.social}</Text>
                            </Link>
                        </Flex>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={4}>
                        {/* Edit Profile Button */}
                        <Button
                            leftIcon={<MdEdit />}
                            colorScheme="blue"
                            bg={buttonBg}
                            _hover={{ bg: buttonHoverBg }}
                            size="md"
                            fontWeight="bold"
                            onClick={onOpen}
                        >
                            Edit Profile
                        </Button>
                    </Stack>
                </Box>
            </Flex>

            {/* Edit Profile Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" value={formData.name} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Avatar</FormLabel>
                            <Input name="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Location</FormLabel>
                            <Input name="location" value={formData.location} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Description</FormLabel>
                            <Input name="description" value={formData.description} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Social</FormLabel>
                            <Input name="social" value={formData.social} onChange={handleInputChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
                            Save Changes
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileHeader;
