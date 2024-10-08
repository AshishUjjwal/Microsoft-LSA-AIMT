'use client'

import { Box, Flex, Heading, Text, Image, Stack } from '@chakra-ui/react';

export default function BuildFuture() {
    return (
        <Box   py={10} px={5} h={'100vh'}>
            <Heading fontSize="50" textAlign={'center'}>Build Your Future</Heading>
            <Text fontSize="lg" opacity="0.8" textAlign={'center'} mt={4} mb={20}>
                Join our community to learn, innovate, and develop essential tech skills for success.
            </Text>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align="center"
                justify="center"
                maxW="1150"
                mx="auto"
                gap={10}
            >
                {/* Left Section - Image */}
                <Box flex="1">
                    <Image
                        src="https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Technology Image"
                        rounded="2xl"
                        boxShadow="2xl"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                </Box>

                {/* Right Section - Text Content */}
                <Stack flex="1" spacing={3} mr={'30px'}>

                    <Stack spacing={7}>
                        <Box>
                            <Heading fontSize="2xl">Hackathons</Heading>
                            <Text opacity="0.8">
                            Collaborate with peers to solve real-world challenges, innovate, and showcase your tech solutions in a fast-paced environment. 
                            </Text>
                        </Box>
                        <Box>
                            <Heading fontSize="2xl">Coding Bootcamps</Heading>
                            <Text opacity="0.8">
                            Enhance your coding skills with intensive training programs designed to boost your career. Gain practical experience, build your portfolio, and master the latest technologies through hands-on learning.
                            </Text>
                        </Box>
                        <Box>
                            <Heading fontSize="2xl">Workshops & Events</Heading>
                            <Text opacity="0.8">
                            Engage in hands-on sessions to learn new technologies, sharpen your skills, and connect with like-minded professionals.
                            </Text>
                        </Box>
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    );
}
