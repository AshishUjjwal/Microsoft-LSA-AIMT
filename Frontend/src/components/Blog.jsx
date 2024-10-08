'use client'

import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    useColorModeValue,
    Container,
    VStack,
} from '@chakra-ui/react'

const BlogTags = () => {
    const tags = ['Engineering', 'Product']

    return (
        <HStack spacing={2} marginTop={5}>
            {tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                        {tag}
                    </Tag>
                )
            })}
        </HStack>
    )
}

const BlogAuthor = () => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src="https://100k-faces.glitch.me/random-image"
                alt="Avatar"
            />
            <Text fontWeight="medium">John Doe</Text>
            <Text>—</Text>
            <Text>{new Date('2021-04-06T19:01:27Z').toLocaleDateString()}</Text>
        </HStack>
    )
}

const BlogSection = () => {
    return (
        <Container maxWidth={'1170px'} p="12" zIndex={-1}>
            <Heading as="h1">Stories by Chakra Templates</Heading>
            <Box
                marginTop={{ base: '1', sm: '5' }}
                display="flex"
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="space-between">
                <Box
                    display="flex"
                    flex="1"
                    marginRight="3"
                    position="relative"
                    alignItems="center">
                    <Box
                        width={{ base: '100%', sm: '85%' }}
                        zIndex="2"
                        marginLeft={{ base: '0', sm: '5%' }}
                        marginTop="5%">
                        <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            <Image
                                borderRadius="lg"
                                src={
                                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                }
                                alt="some good alt text"
                                objectFit="contain"
                            />
                        </Box>
                    </Box>
                    <Box zIndex="1" width="100%" position="absolute" height="100%">
                        <Box
                            bgGradient={useColorModeValue(
                                'radial(orange.600 1px, transparent 1px)',
                                'radial(orange.300 1px, transparent 1px)',
                            )}
                            backgroundSize="20px 20px"
                            opacity="0.4"
                            height="100%"
                        />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="center"
                    marginTop={{ base: '3', sm: '0' }}>
                    <BlogTags />
                    <Heading marginTop="1">
                        <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            Blog article title
                        </Text>
                    </Heading>
                    <Text
                        as="p"
                        marginTop="2"
                        color={useColorModeValue('gray.700', 'gray.200')}
                        fontSize="lg">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </Text>
                    <BlogAuthor />
                </Box>
            </Box>
            <Heading as="h2" marginTop="5" zIndex={-1}>
                Latest articles
            </Heading>
            <Divider marginTop="5" />
            <Wrap spacing="30px" marginTop="5" justify={'space-between'}>
                <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
                    <Box w="100%">
                        <Box borderRadius="lg" overflow="hidden">
                            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                <Image
                                    transform="scale(1.0)"
                                    src={
                                        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                    }
                                    alt="some text"
                                    objectFit="contain"
                                    width="100%"
                                    transition="0.3s ease-in-out"
                                    _hover={{
                                        transform: 'scale(1.05)',
                                    }}
                                />
                            </Box>
                        </Box>
                        <BlogTags />
                        <Heading fontSize="xl" marginTop="2">
                            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                Some blog title
                            </Text>
                        </Heading>
                        <Text as="p" fontSize="md" marginTop="2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                        <BlogAuthor />
                    </Box>
                </WrapItem>
                <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
                    <Box w="100%">
                        <Box borderRadius="lg" overflow="hidden">
                            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                <Image
                                    
                                    transform="scale(1.0)"
                                    src={
                                        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                    }
                                    alt="some text"
                                    objectFit="contain"
                                    width="100%"
                                    transition="0.3s ease-in-out"
                                    _hover={{
                                        transform: 'scale(1.05)',
                                    }}
                                />
                            </Box>
                        </Box>
                        <BlogTags />
                        <Heading fontSize="xl" marginTop="2">
                            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                Some blog title
                            </Text>
                        </Heading>
                        <Text as="p" fontSize="md" marginTop="2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                        <BlogAuthor />
                    </Box>
                </WrapItem>
                <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
                    <Box w="100%">
                        <Box borderRadius="lg" overflow="hidden">
                            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                <Image
                                    transform="scale(1.0)"
                                    src={
                                        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                    }
                                    alt="some text"
                                    objectFit="contain"
                                    width="100%"
                                    transition="0.3s ease-in-out"
                                    _hover={{
                                        transform: 'scale(1.05)',
                                    }}
                                />
                            </Box>
                        </Box>
                        <BlogTags />
                        <Heading fontSize="xl" marginTop="2">
                            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                Some blog title
                            </Text>
                        </Heading>
                        <Text as="p" fontSize="md" marginTop="2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                        <BlogAuthor />
                    </Box>
                </WrapItem>
            </Wrap>
            <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                <Heading as="h2">What we write about</Heading>
                <Text as="p" fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Text as="p" fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Text as="p" fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
            </VStack>
        </Container>
    )
}

export default BlogSection
