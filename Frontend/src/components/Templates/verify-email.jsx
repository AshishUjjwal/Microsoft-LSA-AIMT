import React, { useEffect, useState } from "react";
import { Box, Text, Spinner, useToast } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../api/axiosInstance";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams(); // Hook to access query parameters
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const toast = useToast();

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get("token"); // Extract the token from the query
            if (!token) {
                setMessage("No token provided.");
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get(
                    `/api/users/verify-email/${token}`
                );
                console.log('res', response);
                setMessage(response.data.message);
                toast({
                    title: "Success",
                    description: response.data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                setMessage(error.response?.data?.message || "Verification failed.");
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "Verification failed.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [searchParams, toast]);

    return (
        <Box minH={'84vh'} display="flex" justifyContent="center" alignItems="center">
            <Box
                alignContent={'center'}
                textAlign="center"

                maxW="80vw"
                minH={'15vh'}
                p="20px"
                borderWidth="1px"
                borderRadius="md"
                shadow="md"
            >
                {loading ? (
                    <Spinner size="xl" color="teal.500" />
                ) : (
                    <Text fontSize="lg" color="teal.700" fontWeight="bold">
                        {message}
                    </Text>
                )}
            </Box>
        </Box>
    );
};

export default VerifyEmail;
