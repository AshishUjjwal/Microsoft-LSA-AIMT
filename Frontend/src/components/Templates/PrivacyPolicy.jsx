import React from "react";
import {
    Box,
    Heading,
    Text,
    VStack,
    Divider,
    Link,
    useColorModeValue,
} from "@chakra-ui/react";

const PrivacyPolicy = () => {
    const textColor = useColorModeValue("gray.600", "gray.300");
    const bgColor = useColorModeValue("white.50", "gray.800");

    return (
        <Box
            bg={bgColor}
            px={{ base: 4, md: 10, lg: 20 }}
            py={{ base: 8, md: 10, lg: 16 }}
            minH="100vh"
            maxW={"950px"}
            mx={"auto"}
            justifyContent={"space-between"}
        >
            <VStack align="flex-start" spacing={6}>
                <Heading
                    as="h1"
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    textAlign="left"
                    color="teal.500"
                >
                    Privacy Policy
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
                    Last updated: December 8, 2024
                </Text>
                <Divider />

                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Introduction
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                        Welcome to MLSAAIMT. We are committed to protecting your personal
                        information and your right to privacy. If you have any questions or
                        concerns about this privacy policy, or our practices with regards to
                        your personal information, please contact us at{" "}
                        <Link href="mailto:support@mlsa-aimt.com" color="teal.400">
                            support@mlsa-aimt.com
                        </Link>
                        .
                    </Text>
                </Box>

                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Personal information we collect:
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                        When you visit the microsoft-lsa-aimt.vercel.app, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site. We refer to this automatically-collected information as “Device Information.” Moreover, we might collect the personal data you provide to us (including but not limited to Name, Surname, Address, payment information, etc.) during registration to be able to fulfill the agreement.
                    </Text>
                </Box>

                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Why Do We Process Your Data?
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                        Our top priority is customer data security, and, as such, we may
                        process only minimal user data, only as much as it is absolutely
                        necessary to maintain the website. Information collected
                        automatically is used only to identify potential cases of abuse and
                        establish statistical information regarding website usage. This
                        statistical information is not otherwise aggregated in such a way
                        that it would identify any particular user of the system.
                    </Text>
                </Box>

                <Box>

                    <Text fontSize={{ base: "sm", md: "md" }} mt={4} color={textColor} textAlign="justify">
                        You can visit the website without telling us who you are or
                        revealing any information by which someone could identify you as a
                        specific, identifiable individual. If, however, you wish to use some
                        of the website’s features, or you wish to receive our newsletter or
                        provide other details by filling a form, you may provide personal
                        data to us, such as your email, first name, last name, city of
                        residence, organization, or telephone number. You can choose not to
                        provide us with your personal data, but then you may not be able to
                        take advantage of some of the website’s features. For example, you
                        won’t be able to receive our Newsletter or contact us directly from
                        the website. Users who are uncertain about what information is
                        mandatory are welcome to contact us via{" "}
                        <Link href="mailto:support@mlsa-aimt.com" color="teal.400">
                            support@mlsa-aimt.com
                        </Link>
                        .
                    </Text>
                </Box>

                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Your Rights
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                        If you are a European resident, you have the following rights
                        related to your personal data:
                    </Text>
                    <VStack align="flex-start" spacing={1} mt={2}>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right to be informed.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right of access.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right to rectification.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right to erasure.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right to restrict processing.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right to data portability.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - The right to object.
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                            - Rights in relation to automated decision-making and profiling.
                        </Text>
                    </VStack>
                    <Text fontSize={{ base: "sm", md: "md" }} mt={2} color={textColor}>
                        If you would like to exercise this right, please contact us through
                        the contact information below.
                    </Text>
                    <Text fontSize={{ base: "sm", md: "md" }} mt={2} color={textColor} textAlign="justify">
                        Additionally, if you are a European resident, we note that we are
                        processing your information in order to fulfill contracts we might
                        have with you (for example, if you make an order through the Site),
                        or otherwise to pursue our legitimate business interests listed
                        above. Additionally, please note that your information might be
                        transferred outside of Europe, including Canada and the United
                        States.
                    </Text>
                </Box>

                {/* Remaining sections go here */}

                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Links to other websites
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                    Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for such other websites or third parties' privacy practices. We encourage you to be aware when you leave our website and read the privacy statements of each website that may collect personal information.
                    </Text>
                </Box>
                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Information security
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                        We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We keep reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and personal data disclosure in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.
                    </Text>
                </Box>
                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Legal disclosure
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                        We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
                    </Text>
                </Box>
                <Box>
                    <Heading
                        as="h2"
                        fontSize={{ base: "lg", md: "xl" }}
                        mb={2}
                        color="teal.600"
                    >
                        Contact Information
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} textAlign="justify">
                        If you would like to contact us to understand more about this Policy
                        or wish to contact us concerning any matter relating to individual
                        rights and your personal information, you may send an email to{" "}
                        <Link href="mailto:support@mlsa-aimt.com" color="teal.400">
                            support@mlsa-aimt.com
                        </Link>
                        .
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default PrivacyPolicy;
