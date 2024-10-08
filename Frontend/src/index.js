import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


// Optional: Customize your theme
const theme = extendTheme({
  colors: {
    teal: {
      500: "#319795", // Ensure this color is defined
      // Add other shades if needed
    },
    // Define other colors or extend existing ones
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider> 
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
