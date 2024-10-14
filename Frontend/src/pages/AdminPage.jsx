
// import React, { useMemo } from 'react';
import EventPanel from '../components/EventAdminPanel.jsx';
import Hero from '../components/Hero.jsx';
import BlogPanel from '../components/BlogAdminPanel.jsx';
// import { Flex, Box, Heading, useBreakpointValue, Icon, Stack, Button } from '@chakra-ui/react';
import { Flex, Box, Heading,  Stack,  } from '@chakra-ui/react';
import UserPanel from '../components/UserAdmin.jsx';


const Home = () => {

  // const Blur = (props) => {
  //   return (
  //     <Icon
  //       width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
  //       zIndex={useBreakpointValue({ base: -1, md: -1, lg: -1 })}
  //       height="560px"
  //       viewBox="0 0 528 560"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //       {...props}>
  //       <circle cx="71" cy="61" r="111" fill="#F56565" />
  //       <circle cx="244" cy="106" r="139" fill="#ED64A6" />
  //       <circle cy="291" r="139" fill="#ED64A6" />
  //       <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
  //       <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
  //       <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
  //       <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
  //     </Icon>
  //   )
  // }


  // const expensiveDiv = useMemo(() => {
  //   return <Blur position={'absolute'} top={400} left={10} style={{ filter: 'blur(70px)' }} />
  // }, []); // It will only re-render if 'someProp' changes

  return (
    <Stack bgGradient={'linear(to-r, blackAlpha.600, transparent)'} w={'100vw'}>
      <Hero />
      <Heading m={6} textAlign="center" fontFamily={'monospace'} >
        Welcome To Admin Page!!
      </Heading>
      <Flex
        direction={{ base: "column", md: "row" }} // Stack vertically on small screens, side by side on medium+ screens
        maxW={'1100px'}
        mx={'auto'}
        // m={'20px'}
      >
        <Box flex="1" mb={{ base: 0, md: 0 }}>
          <EventPanel />
        </Box>
        <Box flex="1">
          <BlogPanel />
        </Box>
      </Flex>
      <UserPanel/>
      {/* {expensiveDiv} */}
      {/* <Button colorScheme="orange" width="100%" height='28' textAlign="center" fontFamily={'monospace'} fontSize={'30'}>
        Logout from Admin Panel
      </Button> */}
    </Stack>
  );
};

export default Home;
