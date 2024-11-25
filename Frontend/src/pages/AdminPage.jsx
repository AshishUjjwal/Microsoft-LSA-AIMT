import Hero from '../components/Templates/Hero.jsx';
import { Flex, Heading,  Stack,  } from '@chakra-ui/react';
import Sidebar from '../components/AdminSection/SideBar.Admin.jsx';
import UserManagement from '../components/AdminSection/UserManagement.Admin.jsx';
// import BlogPanel from '../components/AdminSection/BlogAdminPanel.jsx';
// import UserPanel from '../components/AdminSection/UserAdmin.jsx';


const Home = () => {
  return (
    <Stack bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
      <Hero />
      {/* <Heading m={6} textAlign="center" fontFamily={'monospace'} >
        Welcome To Admin Page!!
      </Heading> */}
      <Flex
        direction={{ base: "column", md: "row" }} // Stack vertically on small screens, side by side on medium+ screens
        mx={'auto'}
        my={10}
      >
          <Sidebar />
          <UserManagement/>
      </Flex>
    </Stack>
  );
};

export default Home;
