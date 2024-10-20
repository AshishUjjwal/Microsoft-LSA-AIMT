'use client'

import { Box, Flex, Heading, Text, Image, Stack } from '@chakra-ui/react';

export default function BuildFuture() {
    return (
        <Box py={{ base: 8, md: 0 }} px={{ base: 4, md: 5 }} my={{base:'10', md:'0'}} h={{base: 'auto', md: '90vh'}} maxW={{base:'', md:'1100px'}} mx={'auto'}>
            <Heading fontSize={{ base: '3xl', md: '50' }} textAlign={'center'}>
                Build Your Future
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} opacity="0.8" textAlign={'center'} mt={4} mb={{ base: 10, md: 20 }}>
                Join our community to learn, innovate, and develop essential tech skills for success.
            </Text>

            <Flex
                direction={{ base: 'column', md: 'row' }}  // Stacks on smaller screens, row layout on larger screens
                align="center"
                justify="center"
                maxW="1150px"
                mx="auto"
                gap={{ base: 6, md: 10 }}  // Smaller gap on mobile
            >
                {/* Left Section - Image */}
                <Box flex="1" mb={{ base: 8, md: 0 }} /* Adds margin on mobile below the image for spacing */>
                    <Image
                        src="https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Technology Image"
                        rounded="2xl"
                        boxShadow="2xl"
                        w="100%"  // Ensures the image takes full width
                        h={{ base: '250px', md: '100%' }}  // Sets a fixed height on mobile
                        objectFit="cover"
                    />
                </Box>

                {/* Right Section - Text Content */}
                <Stack flex="1" spacing={5} p={{ base: '2px', md: '30px' }} /* Adds right padding on desktop */>
                    <Stack spacing={7}>
                        <Box>
                            <Heading fontSize={{ base: 'xl', md: '2xl' }}>Coding Bootcamps</Heading>
                            <Text fontSize={{ base: 'sm', md: 'md' }} opacity="0.8">
                                Enhance your coding skills with intensive training programs designed to boost your career. 
                            </Text>
                        </Box>
                        <Box>
                            <Heading fontSize={{ base: 'xl', md: '2xl' }}>Hackathons</Heading>
                            <Text fontSize={{ base: 'sm', md: 'md' }} opacity="0.8">
                                Collaborate with peers to solve real-world challenges, innovate, and showcase your tech solutions in a fast-paced environment.
                            </Text>
                        </Box>
                        <Box>
                            <Heading fontSize={{ base: 'xl', md: '2xl' }}>Workshops & Events</Heading>
                            <Text fontSize={{ base: 'sm', md: 'md' }} opacity="0.8">
                                Engage in hands-on sessions to learn new technologies, sharpen your skills, and connect with like-minded professionals.
                            </Text>
                        </Box>
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    );
}
