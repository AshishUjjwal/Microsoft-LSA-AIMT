// src/App.js
import React from 'react';
import { Box } from '@chakra-ui/react';

// Import Global Components
import Navbar from './components/Navbar';
import Footer from './components/Templates/Footer.jsx';
// import SocialShareBar from './components/socialshare';

// Import Routes
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
        <Box flex="1">
          <AllRoutes />
        </Box>

      {/* Social Share Bar */}
      {/* <SocialShareBar /> */}

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App;


