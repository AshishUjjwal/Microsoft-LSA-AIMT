import React, { useState } from 'react';
import { Box, Flex, Image, Heading, Text, VStack, Collapse, IconButton, Grid } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import faqLogo from '../Images/faqs-concept-illustration_114360-5185-removebg-preview.png'; // Ensure the correct path

// Separate Logo Component
// const Logo = () => (

//   <Flex justifyContent="center" alignItems="center" h="100%"> {/* Centering */}
//     <Image src={faqLogo} alt="FAQ Logo" boxSize="350px" /> {/* Increased size */}
//   </Flex>
// );

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const faqData = [
    { question: 'What is the MLSA Program?', answer: 'The Microsoft Learn Student Ambassadors (MLSA) program is a global group of on-campus ambassadors who are eager to help students, build their careers, and use technology to solve real-world problems.' },
    { question: 'How can I join the MLSA program?', answer: 'You can apply for the MLSA program through the Microsoft Learn Student Ambassadors website. The application process includes submitting an online application form and potentially an interview.' },
    { question: 'How do I stay updated with MLSA activities?', answer: 'You can stay updated with MLSA activities by following the official MLSA social media channels and participating in community discussions on platforms like Microsoft Teams.' },
    { question: 'What are the benefits of becoming an MLSA?', answer: 'As an MLSA, you get access to exclusive resources, mentorship opportunities, and the chance to connect with like-minded peers and industry professionals. You also get the opportunity to enhance your skills through various learning resources.' },
    // { question: 'What kind of events can I organize as an MLSA?', answer: 'As an MLSA, you can organize workshops, hackathons, and other events to help fellow students learn about Microsoft technologies and other relevant topics.' },
    // Add more FAQ items as needed
  ];

  return (
    <Grid templateColumns={{ base: '1fr', md: '500px 1fr' }} h={'75vh'} maxW="1170px" mx="auto">
      {/* Left Side: Logo Component */}
      <Box>
        <Flex justifyContent="center" alignItems="center" h="100%"> {/* Centering */}
          <Image
            src={faqLogo}
            alt="FAQ Logo"
            boxSize="500px"
          /> {/* Increased size */}
        </Flex>
      </Box>

      {/* Right Side: FAQ Content */}
      <Box>
        {/* Heading */}
        <Heading as="h2" size="lg" mb={8} textAlign="center">
          Frequently Asked Questions
        </Heading>

        {/* FAQ Section */}
        <VStack spacing={6}>
          {faqData.map((item, index) => (
            <Box
              key={index}
              w="100%"
              p={3}
              h={'100%'}
              alignItems={'center'}
              // borderWidth="1px"
              borderRadius="15"
              // bg={openIndex === index ? 'teal.100' : 'gray.50'}
              // shadow="sm"
              cursor="pointer"
              onClick={() => toggleFAQ(index)}
              _hover={{ bg: 'blue.200' }}
              transition="background 0.2s ease"
            >
              <Flex h="100%" alignItems={'center'} justify="space-between"  >
                {/* Question */}
                <Heading as="h3" size="md">
                  {item.question}
                </Heading>

                {/* Toggle icon */}
                <IconButton
                  icon={openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  variant="ghost"
                  aria-label="Toggle FAQ"
                />
              </Flex>

              {/* Answer with Collapse animation */}
              <Collapse in={openIndex === index} animateOpacity>
                <Text mt={3}>{item.answer}</Text>
              </Collapse>
            </Box>
          ))}
        </VStack>
      </Box>
    </Grid>
  );
};

export default FAQ;
