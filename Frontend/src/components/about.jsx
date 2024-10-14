'use client'

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'

export default function About() {
  return (
    <Box h={{ base: 'auto', md: '90vh' }} my={{base:'10', md:'0'}}>
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: '2xl', md: '4xl' }}
        mt={{ base: '30px', md: '50px' }}
        px={4}
      >
        Empowering Future Innovators with MLSA
      </Heading>
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}  // Image moves to top on mobile
        mx="auto"  // Centers the content horizontally
        maxW="1100px"
        gap={10}
        mt={{base : '0', md: '-50px' }}
        h={{ base: 'auto', md: '100%' }}  // Full height on desktop, auto height on mobile
      >
        {/* Text Content */}
        <Flex p={4} flex={{ base: '0', md: '1' }} align={'center'} justify={'center'}>
          <Stack spacing={6} maxW={'md'}>
            {/* <Heading>
              <Text
                as={'span'}
                fontSize={'3xl'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}>
                Empowering Future Innovators with MLSA
              </Text>
              <br />{' '}
              <Text fontSize={'2xl'} color={'blue.400'} as={'span'}>
                Join the Microsoft Learn Student Ambassador Program
              </Text>{' '}
              </Heading> */}
            <Heading>
              <Text fontSize={'2xl'} color={'blue.400'} as={'span'}>
                Join the Microsoft Learn Student Ambassador Program
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Become part of a global community of student leaders passionate about technology. As an MLSA, you'll enhance your skills, collaborate on exciting projects, and inspire others by sharing knowledge.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Join Now
              </Button>
              <Button rounded={'full'}>How It Works</Button>
            </Stack>
          </Stack>
        </Flex>

        {/* Image Content */}
        <Flex p={4} flex="1" align="center" justify="center" >
          <Image
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            alt={'Login Image'}
            objectFit={'cover'}
            rounded="2xl"
            boxShadow="2xl"
            width={{ base: '100%', md: '600px' }}  // Full width on mobile, fixed width on desktop
            height={{ base: 'auto', md: '400px' }}  // Auto height on mobile, fixed height on desktop
          />
        </Flex>
      </Flex>
    </Box>
  )
}
