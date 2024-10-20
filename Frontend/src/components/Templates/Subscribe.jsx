'use client'

import {
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    Text,
    Container,
    Flex,
} from '@chakra-ui/react'

export default function Subscribe() {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            w={{base: '100', md: '200', lg: '200%' }}
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={{ base: 0, md: 0 }} // Padding for mobile and larger screens
        >
            <Container
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                boxShadow={'xl'}
                rounded={'lg'}
                p={6}
            >
                <Heading
                    as={'h2'}
                    fontSize={{ base: 'lg', sm: '2xl' }}
                    textAlign={'center'}
                    mb={5}
                >
                    Subscribe to our Newsletter
                </Heading>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
                    <FormControl>
                        <Input
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            textColor={useColorModeValue('black.800', 'black.900')}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={'email'}
                            type={'email'}
                            required
                            placeholder={'Your Email'}
                            aria-label={'Your Email'}
                        />
                    </FormControl>
                    <FormControl w={{ base: '100%', md: 'auto' }}>
                        <Button colorScheme={'blue'} w="100%" type={'submit'}>
                            Submit
                        </Button>
                    </FormControl>
                </Stack>
                <Text mt={2} textAlign={'center'} color={'gray.500'}>
                    You won't receive any spam! ✌️
                </Text>
            </Container>
        </Flex>
    )
}
