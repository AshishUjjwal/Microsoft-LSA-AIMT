import React, { useState } from 'react';
import { Box, Flex, Image, Heading, Text, VStack, Collapse, IconButton, Grid } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import faqLogo from '../../Images/faqs-concept-illustration_114360-5185-removebg-preview.png'; // Ensure the correct path

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
  ];

  return (
    <Box maxW="1170px" mx="auto" p={{ base: 4, md: 8 }}>
      {/* Heading */}
      <Heading
        as="h2"
        size="lg"
        mt={10}
        textAlign="center"
        display={{ base: 'block', md: 'none' }} 
      >
        Frequently Asked Questions
      </Heading>

      <Grid
        templateColumns={{ base: '1fr', md: '500px 1fr' }}  // Adjust layout on mobile vs larger screens
        h={'auto'}
        gap={10}  // Space between the grid columns
      >
        {/* Left Side: Logo Component */}
        <Box> {/* Add margin-bottom for mobile */}
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Image
              src={faqLogo}
              alt="FAQ Logo"
              boxSize={{ base: '250px', md: '500px' }}  // Responsive image size
            />
          </Flex>
        </Box>

        {/* Right Side: FAQ Content */}
        <Box>
          {/* Heading for larger screens */}
          <Heading
            as="h2"
            size="lg"
            mb={8}
            textAlign="center"
            display={{ base: 'none', md: 'block' }} 
          >
            Frequently Asked Questions
          </Heading>

          {/* FAQ Section */}
          <VStack spacing={6} mb={10}>
            {faqData.map((item, index) => (
              <Box
                key={index}
                w="100%"
                p={3}
                borderRadius="10"
                shadow="lg"
                cursor="pointer"
                onClick={() => toggleFAQ(index)}
                _hover={{ bg: 'blue.200' }}
                transition="background 0.2s ease"
              >
                <Flex h="100%" alignItems="center" justify="space-between">
                  {/* Question */}
                  <Heading as="h3" size="md" fontSize={{ base: 'md', md: 'lg' }} alignSelf="center">
                    {item.question}
                  </Heading>

                  {/* Toggle icon */}
                  <IconButton
                    icon={openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                    variant="ghost"
                    aria-label="Toggle FAQ"
                    alignSelf="center"
                  />
                </Flex>

                {/* Answer with Collapse animation */}
                <Collapse in={openIndex === index} animateOpacity>
                  <Text fontSize={{ base: 'sm', md: 'md' }} mt={2}>
                    {item.answer}
                  </Text>
                </Collapse>
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default FAQ;
