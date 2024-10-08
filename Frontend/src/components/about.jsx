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
    <Box h={'85vh'}  >

      <Flex
        maxWidth="1100px"
        mx="auto" // Centers the content horizontally
        h="100%"  // Ensures the Flex container takes the full height of the Box (80vh)
        align={'center'} // Centers content vertically
        justify={'space-between'} // Adds spacing between child elements
      >
        <Flex p={8} flex={1} align={'center'} justify={'center'} >
          <Stack spacing={6} maxW={'md'}>
            <Heading >
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
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            borderRadius="15px"
            maxWidth={'550'}
            h={'auto'}
            w={'auto'}
            boxShadow={'lg'}
            margin={'auto'}

            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Flex>

    </Box>
  )
}